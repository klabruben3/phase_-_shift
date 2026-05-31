import { Ghost, Player } from "./types";

export function moveEntity(entity: Player | Ghost) {
  switch (entity.direction) {
    case "up":
      entity.position.y -= entity.speed;
      break;
    case "down":
      entity.position.y += entity.speed;
      break;
    case "left":
      entity.position.x -= entity.speed;
      break;
    case "right":
      entity.position.x += entity.speed;
      break;
  }
}