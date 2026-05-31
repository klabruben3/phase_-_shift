"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ArrowLeft, Plus, Search, Users, Lock, Globe } from "lucide-react";
import { motion } from "motion/react";
import { Screen } from "../../game/types";

interface MultiplayerLobbyProps {
  onNavigate: Dispatch<SetStateAction<Screen>>;
}

interface Room {
  id: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
  isPrivate: boolean;
  map: string;
}

export default function MultiplayerLobby({
  onNavigate,
}: MultiplayerLobbyProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const rooms: Room[] = [
    {
      id: "1",
      name: "SPEED_RUN_01",
      host: "PLAYER_X",
      players: 6,
      maxPlayers: 8,
      isPrivate: false,
      map: "GRID_ALPHA",
    },
    {
      id: "2",
      name: "TACTICAL_ZONE",
      host: "PHASE_MASTER",
      players: 3,
      maxPlayers: 4,
      isPrivate: false,
      map: "MAZE_DELTA",
    },
    {
      id: "3",
      name: "PRO_ONLY",
      host: "GHOST_OPS",
      players: 7,
      maxPlayers: 8,
      isPrivate: true,
      map: "VOID_ARENA",
    },
    {
      id: "4",
      name: "TRAINING",
      host: "ROOKIE_01",
      players: 2,
      maxPlayers: 6,
      isPrivate: false,
      map: "CLASSIC",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <button
            onClick={() => onNavigate("menu")}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            <span style={{ fontFamily: "monospace" }}>BACK</span>
          </button>
          <h2 style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}>
            MULTIPLAYER LOBBY
          </h2>
          <button
            onClick={() => onNavigate("game")}
            className="border border-primary bg-primary px-4 py-2 text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
          >
            <Plus className="inline h-4 w-4 mr-2" />
            <span style={{ fontFamily: "monospace" }}>CREATE</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Room list */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="SEARCH ROOMS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-border bg-input px-10 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                style={{ fontFamily: "monospace" }}
              />
            </div>

            {/* Rooms */}
            <div className="space-y-2">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="group border border-border bg-card p-4 transition-all hover:border-primary"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3
                          className="uppercase tracking-wider transition-colors group-hover:text-primary"
                          style={{ fontFamily: "monospace" }}
                        >
                          {room.name}
                        </h3>
                        {room.isPrivate && (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div
                        className="flex items-center gap-4 text-muted-foreground"
                        style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
                      >
                        <span>HOST: {room.host}</span>
                        <span>|</span>
                        <span>{room.map}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div
                        className="flex items-center gap-2 text-muted-foreground"
                        style={{ fontFamily: "monospace" }}
                      >
                        <Users className="h-4 w-4" />
                        <span>
                          {room.players}/{room.maxPlayers}
                        </span>
                      </div>
                      <button
                        onClick={() => onNavigate("game")}
                        className="border border-border bg-transparent px-6 py-2 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        style={{ fontFamily: "monospace" }}
                      >
                        JOIN
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Server stats */}
          <div className="space-y-4">
            <div className="border border-border bg-card p-6">
              <h3
                className="mb-4 uppercase tracking-wider"
                style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
              >
                SERVER STATUS
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
                  >
                    ACTIVE PLAYERS
                  </span>
                  <span
                    className="text-primary"
                    style={{ fontFamily: "monospace" }}
                  >
                    1,247
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
                  >
                    ACTIVE ROOMS
                  </span>
                  <span
                    className="text-foreground"
                    style={{ fontFamily: "monospace" }}
                  >
                    89
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
                  >
                    REGION
                  </span>
                  <span
                    className="text-foreground"
                    style={{ fontFamily: "monospace" }}
                  >
                    US-EAST
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
