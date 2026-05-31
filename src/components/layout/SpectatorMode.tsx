"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Eye, Users, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Screen } from "../../game/types";

interface SpectatorModeProps {
  onNavigate: Dispatch<SetStateAction<Screen>>;
}

export default function SpectatorMode({ onNavigate }: SpectatorModeProps) {
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const players = [
    { name: "PHASE_MASTER", score: 8450, alive: true },
    { name: "GHOST_HUNTER", score: 7200, alive: true },
    { name: "PLAYER_X", score: 6900, alive: true },
    { name: "VOID_WALKER", score: 5100, alive: false },
  ];

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  const prevPlayer = () => {
    setCurrentPlayer((prev) => (prev - 1 + players.length) % players.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b-2 border-primary bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-primary">
              <Eye className="h-5 w-5" />
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontFamily: 'monospace' }}>SPECTATING</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{players[currentPlayer].name}</span>
              <span className="text-muted-foreground">|</span>
              <span className="font-mono text-primary">{players[currentPlayer].score}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate("menu")}
            className="flex items-center gap-2 border border-border bg-card px-4 py-2 transition-colors hover:border-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
            <span style={{ fontFamily: 'monospace' }}>EXIT</span>
          </button>
        </div>
      </div>

      {/* Game view */}
      <div className="absolute inset-0 flex items-center justify-center pt-16">
        <div className="relative h-full w-full" style={{
          backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Eye className="mx-auto mb-4 h-16 w-16" />
              <p style={{ fontFamily: 'monospace' }}>SPECTATING {players[currentPlayer].name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Player switcher */}
      <div className="absolute left-1/2 bottom-8 z-20 flex -translate-x-1/2 items-center gap-4">
        <button
          onClick={prevPlayer}
          className="border border-border bg-card p-3 transition-colors hover:border-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {players.map((player, index) => (
            <button
              key={index}
              onClick={() => setCurrentPlayer(index)}
              className={`border px-4 py-2 transition-all ${
                index === currentPlayer
                  ? "border-primary bg-muted"
                  : "border-border bg-card hover:border-primary"
              } ${!player.alive && "opacity-30"}`}
            >
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{player.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={nextPlayer}
          className="border border-border bg-card p-3 transition-colors hover:border-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Alive count */}
      <div className="absolute right-4 top-20 z-20 border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
          <Users className="h-4 w-4" />
          <span>{players.filter(p => p.alive).length}/{players.length} ALIVE</span>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-4 z-20 border border-border bg-card px-3 py-2">
        <div className="flex items-center gap-3 text-muted-foreground" style={{ fontSize: '0.625rem', fontFamily: 'monospace' }}>
          <span>← →</span>
          <span>|</span>
          <span>ESC</span>
        </div>
      </div>
    </div>
  );
}
