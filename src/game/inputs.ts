import { socket } from "@/lib/socketClient";
import { MouseMoveProp } from "./types";

export const handleKeyDown = (e: KeyboardEvent) => {
  if (e.repeat) return;

  switch (e.key) {
    case "ArrowUp":
      socket.emit("input", { direction: "up" });
      break;

    case "ArrowDown":
      socket.emit("input", { direction: "down" });
      break;

    case "ArrowLeft":
      socket.emit("input", { direction: "left" });
      break;

    case "ArrowRight":
      socket.emit("input", { direction: "right" });
      break;
  }
};

export const sendMouseInput = (direction: MouseMoveProp) => {
  switch (direction) {
    case "mouseUp":
      socket.emit("input", { direction: "up" });
      break;

    case "mouseDown":
      socket.emit("input", { direction: "down" });
      break;

    case "mouseLeft":
      socket.emit("input", { direction: "left" });
      break;

    case "mouseRight":
      socket.emit("input", { direction: "right" });
      break;
  }
};
