"use client";

import { useRoomStateContext } from "@/context";
import { Screen } from "@/game";
import { socket } from "@/lib/socketClient";
import {
  Clock,
  Eye,
  Heart,
  Menu,
  Shield,
  Target,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Accessibility } from "../ui";
import { motion } from "motion/react";
import { GameCanvas } from "../features";

interface GameScreenProps {
  onNavigate: Dispatch<SetStateAction<Screen>>;
}

export default function GameScreen({ onNavigate }: GameScreenProps) {
  const [gameTime, setGameTime] = useState(180);

  const activePowerups = [
    { id: 1, name: "TIME", icon: Clock, duration: 15 },
    { id: 2, name: "SHIELD", icon: Shield, duration: 8 },
  ];

  const powerupSlots = [
    { icon: Wind, name: "SPEED", available: true },
    { icon: Eye, name: "PHASE", available: true },
    { icon: Shield, name: "SHIELD", available: false },
    { icon: Zap, name: "POWER", available: true },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const { roomState } = useRoomStateContext();
  if (!roomState.players) return <div>Waiting for room state...</div>;

  const players = Object.values(roomState.players);
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Current Player info
  const userId = socket.id;
  if (!userId) return <div>Connecting...</div>;

  const currentPlayer = roomState.players[userId];

  if (!currentPlayer) return <div>Waiting for player data...</div>;
  //

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <GameCanvas players={players} />

      {/* Top HUD */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="pointer-events-auto flex flex-col gap-2">
            <div className="border border-border bg-card px-4 py-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-mono text-foreground">
                  {formatTime(gameTime)}
                </span>
              </div>
            </div>

            <div className="border border-border bg-card px-4 py-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-foreground" />
                <span className="font-mono text-foreground">
                  {currentPlayer.score}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 border border-border bg-card px-4 py-2">
              {[...Array(3)].map((_, i) => (
                <Heart key={i} className="h-4 w-4 fill-white text-white" />
              ))}
            </div>
          </div>

          <div className="pointer-events-auto flex flex-col gap-2">
            {activePowerups.map((powerup) => (
              <motion.div
                key={powerup.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 border border-border bg-card px-3 py-2"
              >
                <powerup.icon className="h-4 w-4 text-primary" />
                <span style={{ fontSize: "0.75rem", fontFamily: "monospace" }}>
                  {powerup.name}
                </span>
                <span className="font-mono text-muted-foreground text-[0.75rem]">
                  {powerup.duration}s
                </span>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => onNavigate("results")}
            className="border border-border bg-card p-3 transition-colors hover:border-primary"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Left sidebar */}
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <div className="pointer-events-auto w-48 space-y-1">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground text-[0.75rem] font-mono">
            <Users className="h-4 w-4" />
            <span>PLAYERS</span>
          </div>

          {sortedPlayers.map((player) => (
            <div
              key={player.id}
              className={`flex items-center justify-between border border-border bg-card px-3 py-2 ${
                !player.alive ? "opacity-30" : ""
              }`}
            >
              <span className="text-[0.75rem] font-mono">
                {player.userName}
              </span>
              <span className="text-[0.75rem] font-mono text-muted-foreground">
                {player.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom powerups */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="pointer-events-auto flex gap-2">
          {powerupSlots.map((powerup, i) => (
            <button
              key={i}
              disabled={!powerup.available}
              className={`group relative flex h-14 w-14 items-center justify-center border ${
                powerup.available
                  ? "border-border bg-card hover:border-primary"
                  : "border-border bg-card opacity-30"
              }`}
            >
              <powerup.icon className="h-6 w-6" />
              {powerup.available && (
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Accessibility />

      <div className="pointer-events-none absolute bottom-4 right-4 hidden md:block">
        <div className="pointer-events-auto border border-border bg-card px-3 py-2">
          <div className="flex gap-3 text-[0.625rem] font-mono text-muted-foreground">
            <span>WASD</span>
            <span>|</span>
            <span>1-4</span>
            <span>|</span>
            <span>ESC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
