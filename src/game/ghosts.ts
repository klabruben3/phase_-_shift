import { GRID_SIZE, speed } from "./constants";
import { Color, Ghost } from "./types";

export function createGhosts(): Record<Color, Ghost> {
  const colors: Color[] = ["red", "blue", "lime", "pink"];
  const ghosts = Object.fromEntries(
    colors.map((color, i) => [
      color,
      {
        position: { x: 100, y: (i + 1) * GRID_SIZE },
        direction: "up" as const, // matching literal "up" type if needed
        speed: speed,
      },
    ]),
  ) as Record<Color, Ghost>;

  return ghosts;
}
