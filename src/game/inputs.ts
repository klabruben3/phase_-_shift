import { socket } from "@/lib/socketClient";

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
