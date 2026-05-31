"use client";
import { ProviderProps, RoomState } from "@/game/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface RoomStateProp {
  roomState: RoomState;
  setRoomState: Dispatch<SetStateAction<RoomState>>;
}

const RoomStateContext = createContext<RoomStateProp | undefined>(
  undefined,
);
function RoomStateContextProvider({ children }: ProviderProps) {
  const [roomState, setRoomState] = useState<RoomState>({} as RoomState);

  return (
    <RoomStateContext.Provider value={{ roomState, setRoomState }}>
      {children}
    </RoomStateContext.Provider>
  );
}

function useRoomStateContext() {
  const context = useContext(RoomStateContext);
  if (!context) {
    throw new Error(
      "useRoomStateContext cannot be used outside the RoomStateContextProvider.",
    );
  }

  return context;
}

export { RoomStateContextProvider, useRoomStateContext };
