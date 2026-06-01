"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";
import {
  Heart,
  Zap,
  Clock,
  Users,
  Menu,
  Target,
  Shield,
  Wind,
  Eye,
} from "lucide-react";
import { Screen } from "../../game/types";
import { useRoomStateContext } from "@/context";
import { socket } from "@/lib/socketClient";
import { SKINS } from "@/game";
import { Accessibility } from "../ui";

interface GameScreenProps {
  onNavigate: Dispatch<SetStateAction<Screen>>;
}

export default function GameScreen({ onNavigate }: GameScreenProps) {
  const [gameTime, setGameTime] = useState(180);

  const { roomState } = useRoomStateContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prev) => Math.max(0, prev - 1));
    }, 1000);
    const handleKeyDown = (e: KeyboardEvent) => {
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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!roomState?.players) {
    return <div>Waiting for room state...</div>;
  }

  const userId = socket.id;
  if (!userId) return <div>Connecting...</div>;

  const currentPlayer = roomState.players[userId];

  if (!currentPlayer) {
    return <div>Waiting for player data...</div>;
  }
  const players = Object.values(roomState.players);
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

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

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Game canvas */}
      <div className="absolute inset-0 bg-[darkcyan]/20">
        <div
          className="relative h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
            backgroundSize: "30px 30px",
          }}
        >
          {players.map((player) => (
            <div
              key={player.id}
              className="absolute h-7 w-7 rounded-full"
              style={{
                backgroundColor: SKINS[player.skin].color,
                border: `${player.id === userId ? "2px solid" : "1px dashed"} ${SKINS[player.skin].border}`,
                transform: `translate(${player.position.x}px, ${player.position.y}px)`,
                transition: "transform 50ms linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Top HUD */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Stats */}
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

          {/* Active powerups */}
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
                <span
                  className="font-mono text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
                  {powerup.duration}s
                </span>
              </motion.div>
            ))}
          </div>

          {/* Menu */}
          <button
            onClick={() => onNavigate("results")}
            className="pointer-events-auto border border-border bg-card p-3 transition-colors hover:border-primary"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Left sidebar: Players */}
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <div className="pointer-events-auto w-48 space-y-1">
          <div
            className="mb-2 flex items-center gap-2 text-muted-foreground"
            style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
          >
            <Users className="h-4 w-4" />
            <span>PLAYERS</span>
          </div>
          {sortedPlayers.map((player) => (
            <div
              key={player.id}
              className={`flex items-center justify-between border border-border bg-card px-3 py-2 ${
                !player.alive && "opacity-30"
              }`}
            >
              <span style={{ fontSize: "0.75rem", fontFamily: "monospace" }}>
                {player.userName}
              </span>
              <span
                className="font-mono text-muted-foreground"
                style={{ fontSize: "0.75rem" }}
              >
                {player.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Powerups */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="pointer-events-auto flex gap-2">
          {powerupSlots.map((powerup, index) => (
            <button
              key={index}
              disabled={!powerup.available}
              className={`group relative flex h-14 w-14 items-center justify-center border transition-all ${
                powerup.available
                  ? "border-border bg-card hover:border-primary"
                  : "border-border bg-card opacity-30"
              }`}
            >
              <powerup.icon
                className="h-6 w-6"
                style={{
                  color: powerup.available
                    ? "var(--foreground)"
                    : "var(--muted-foreground)",
                }}
              />
              {powerup.available && (
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility controls */}
      <Accessibility />

      {/* Controls hint */}
      <div className="pointer-events-none absolute bottom-4 right-4 hidden md:block">
        <div className="pointer-events-auto border border-border bg-card px-3 py-2">
          <div
            className="flex gap-3 text-muted-foreground"
            style={{ fontSize: "0.625rem", fontFamily: "monospace" }}
          >
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
