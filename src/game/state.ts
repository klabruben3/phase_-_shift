import { Server } from "socket.io";
import { RoomState } from "./types";

export const rooms: Record<string, RoomState> = {};

export function broadcastRoom(io: Server, roomName: string) {
  io.to(roomName).emit("room_state", rooms[roomName]);
}
