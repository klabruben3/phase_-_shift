import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

import {
  rooms,
  createGhosts,
  startGameLoop,
  endGameLoop,
  broadcastRoom,
} from "./game";
import { speed } from "./game/constants";

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    // JOIN ROOM
    socket.on("join_room", ({ roomName, userName, skin }) => {
      if (!rooms[roomName]) {
        rooms[roomName] = {
          players: {},
          ghosts: createGhosts(),
        };
      }

      rooms[roomName].players[socket.id] = {
        id: socket.id,
        userName,
        position: { x: 100, y: 100 },
        direction: "right",
        speed: speed,
        skin: skin,
        score: 0,
        alive: true,
      };

      socket.join(roomName);
      socket.data.roomName = roomName;

      broadcastRoom(io, roomName);

      io.to(roomName).emit("system_message", `${userName} joined`);

      startGameLoop(io);
    });

    // INPUT (PLAYER CONTROL)
    socket.on("input", ({ direction }) => {
      const roomName = socket.data.roomName;
      if (!roomName) return;

      const player = rooms[roomName]?.players[socket.id];
      if (!player) return;

      player.direction = direction;
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      const roomName = socket.data.roomName;
      if (!roomName) return;

      const room = rooms[roomName];
      if (!room) return;

      const player = room.players[socket.id];

      if (!player) return;

      delete room.players[socket.id];

      io.to(roomName).emit("system_message", `${player.userName} left`);

      // cleanup empty room
      if (Object.keys(room.players).length === 0) {
        delete rooms[roomName];
      }

      if (Object.keys(rooms).length === 0) {
        endGameLoop();
      }
    });
  });

  httpServer.listen(port, () => {
    console.log("server running on", port);
  });
});
