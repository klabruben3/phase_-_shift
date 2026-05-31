import { Server } from "socket.io";
import { rooms } from "./state";
import { moveEntity } from "./movement";
import { TICK_RATE } from "./constants";

let interval: ReturnType<typeof setInterval> | null = null;

export function startGameLoop(io: Server) {
  if (interval) return;
  interval = setInterval(() => {
    Object.entries(rooms).forEach(([roomName, room]) => {
      // MOVE PLAYERS
      for (const player of Object.values(room.players)) {
        moveEntity(player);
      }

      // MOVE GHOSTS
      // for (const ghost of Object.values(room.ghosts)) {
      //   moveEntity(ghost);
      // }

      // BROADCAST STATE
      io.to(roomName).emit("room_state", room);
    });
  }, TICK_RATE);
}

export function endGameLoop() {
  if (!interval) return;

  clearInterval(interval);
  interval = null;
}
