"use client";

import { useEffect, useState } from "react";
import {
  MainMenu,
  MultiplayerLobby,
  MatchmakingScreen,
  GameScreen,
  Leaderboard,
  SettingsPanel,
  MatchResults,
  SpectatorMode,
} from "../components/layout";
import type { Screen } from "../game/types";
import { useRoomStateContext } from "@/context";
import { socket } from "@/lib/socketClient";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");
  const { setRoomState } = useRoomStateContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case "menu":
        return <MainMenu onNavigate={setCurrentScreen} />;
      case "lobby":
        return <MultiplayerLobby onNavigate={setCurrentScreen} />;
      case "matchmaking":
        return <MatchmakingScreen onNavigate={setCurrentScreen} />;
      case "game":
        return <GameScreen onNavigate={setCurrentScreen} />;
      case "leaderboard":
        return <Leaderboard onNavigate={setCurrentScreen} />;
      case "settings":
        return <SettingsPanel onNavigate={setCurrentScreen} />;
      case "results":
        return <MatchResults onNavigate={setCurrentScreen} />;
      case "spectator":
        return <SpectatorMode onNavigate={setCurrentScreen} />;
      default:
        return <MainMenu onNavigate={setCurrentScreen} />;
    }
  };

  useEffect(() => {
    socket.on("room_state", (roomState) => {
      setRoomState(roomState);
    });

    return () => {
      socket.off("room_state");
    };
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground antialiased">
      {renderScreen()}
    </div>
  );
}
