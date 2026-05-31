import { Dispatch, SetStateAction } from "react";

// Client
export type Screen =
  | "menu"
  | "lobby"
  | "matchmaking"
  | "game"
  | "leaderboard"
  | "settings"
  | "results"
  | "spectator"
  | "about";

type State<T> = Dispatch<SetStateAction<T>>;

export interface PlayerProp {
  userName: string;
  setUserName: State<string>;
  room: string;
  setRoom: State<string>;
}

export type ProviderProps = {
  children: React.ReactNode;
};

// Server
export type Direction = "up" | "down" | "left" | "right";

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  userName: string;
  position: Position;
  direction: Direction;
  speed: number;
  skin: number;
  score: number;
  alive: boolean;
}

export interface Ghost {
  position: Position;
  direction: Direction;
  speed: number;
}

export type Color = "red" | "blue" | "lime" | "pink";

export interface RoomState {
  players: Record<string, Player>;
  ghosts: Record<Color, Ghost>;
}
