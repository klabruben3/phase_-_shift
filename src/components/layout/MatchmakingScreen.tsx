"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight } from "lucide-react";
import { Screen, SKINS } from "@/game";
import { socket } from "@/lib/socketClient";
import { MAX_PLAYERS } from "@/game/constants";
import { useRoomStateContext } from "@/context";

interface MatchmakingScreenProps {
  onNavigate: Dispatch<SetStateAction<Screen>>;
}

export default function MatchmakingScreen({
  onNavigate,
}: MatchmakingScreenProps) {
  const [username, setUsername] = useState("");
  const [selectedSkin, setSelectedSkin] = useState(2);
  const { roomState } = useRoomStateContext();

  const GLOBAL_ROOM = "QUICK_PLAY_GLOBAL";

  const skin = SKINS[selectedSkin];
  const playersCount = roomState.players
    ? Object.keys(roomState.players).length
    : 0;
  const handleJoinMatch = () => {
    const trimmed = username.trim();

    if (!trimmed) return;

    socket.emit("join_room", {
      roomName: GLOBAL_ROOM,
      userName: trimmed,
      skin: selectedSkin,
    });

    onNavigate("game");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background">
      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-white"
            style={{ top: `${(i / 60) * 100}%` }}
          />
        ))}
      </div>

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "monospace",
              letterSpacing: "0.25em",
              fontSize: "0.75rem",
            }}
            className="text-primary"
          >
            PHASE//SHIFT — QUICK PLAY
          </motion.h1>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={() => onNavigate("menu")}
            className="flex items-center gap-2 border border-border bg-card px-3 py-2 text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            style={{ fontFamily: "monospace", fontSize: "0.75rem" }}
          >
            <X className="h-3 w-3" />
            BACK
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key="lobby"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Section 1: Player Setup */}
            <div className="border border-border bg-card">
              <div
                className="border-b border-border px-6 py-3 text-muted-foreground"
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                }}
              >
                01 / PLAYER SETUP
              </div>
              <div className="px-6 py-5 space-y-4">
                {/* Username input */}
                <div>
                  <label
                    className="mb-2 block text-muted-foreground"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                    }}
                  >
                    USERNAME
                  </label>
                  <div className="relative">
                    <span
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                      }}
                    >
                      &gt;
                    </span>
                    <input
                      autoFocus={true}
                      type="text"
                      maxLength={16}
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value.toUpperCase())
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleJoinMatch();
                        }
                      }}
                      placeholder="ENTER USERNAME"
                      className="w-full border border-border bg-background py-3 pl-8 pr-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                        letterSpacing: "0.1em",
                      }}
                    />
                  </div>
                </div>

                {/* Room */}
                <div>
                  <label
                    className="mb-2 block text-muted-foreground"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                    }}
                  >
                    ROOM
                  </label>
                  <div className="flex items-center gap-3 border border-border bg-muted px-4 py-3">
                    <span
                      className="text-muted-foreground"
                      style={{ fontFamily: "monospace", fontSize: "0.65rem" }}
                    >
                      #
                    </span>
                    <span
                      className="text-foreground"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {GLOBAL_ROOM}
                    </span>
                    <span
                      className="ml-auto border border-border px-2 py-0.5 text-muted-foreground"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                      }}
                    >
                      AUTO
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Skin Selection */}
            <div className="border border-border bg-card">
              <div
                className="border-b border-border px-6 py-3 text-muted-foreground"
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                }}
              >
                02 / SELECT SKIN
              </div>
              <div className="px-6 py-5">
                {/* Preview */}
                <div className="mb-5 flex items-center gap-4">
                  <motion.div
                    animate={{ scale: 1 }}
                    className="relative flex h-14 w-14 shrink-0 items-center justify-center"
                  >
                    <motion.div
                      key={selectedSkin}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="h-10 w-10 rounded-full"
                      style={{
                        backgroundColor: skin.color,
                        border: `2px solid ${skin.border}`,
                      }}
                    />
                  </motion.div>
                  <div>
                    <div
                      className="text-foreground"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {username || "PLAYER"} — {skin.label}
                    </div>
                    <div
                      className="mt-1 text-muted-foreground"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                      }}
                    >
                      IN-GAME PREVIEW
                    </div>
                  </div>
                </div>

                {/* Skin grid */}
                <div className="grid grid-cols-6 gap-3 sm:gap-4">
                  {SKINS.map((s) => {
                    const isSelected = selectedSkin === s.id;
                    return (
                      <motion.button
                        key={s.id}
                        onClick={() => setSelectedSkin(s.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ scale: isSelected ? 1.15 : 1 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col items-center gap-2 outline-none"
                      >
                        <div
                          className="h-10 w-10 rounded-full"
                          style={{
                            backgroundColor: s.color,
                            border: isSelected
                              ? `2px solid ${s.border}`
                              : `1px solid ${s.border}55`,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: "0.5rem",
                            letterSpacing: "0.15em",
                            color: isSelected
                              ? s.border
                              : "var(--muted-foreground)",
                            opacity: isSelected ? 1 : 0,
                            height: "0.75rem",
                            display: "block",
                          }}
                        >
                          SELECTED
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 3: Find Match */}
            <div className="border border-border bg-card">
              <div
                className="border-b border-border px-6 py-3 text-muted-foreground"
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                }}
              >
                03 / MATCHMAKING
              </div>
              <div className="px-6 py-5 space-y-3">
                <div
                  className="flex items-center justify-between"
                  style={{ fontFamily: "monospace", fontSize: "0.7rem" }}
                >
                  <span className="text-muted-foreground">MODE</span>
                  <span>
                    QUICK PLAY — {playersCount} / {MAX_PLAYERS} PLAYERS
                  </span>
                </div>
                <div
                  className="flex items-center justify-between"
                  style={{ fontFamily: "monospace", fontSize: "0.7rem" }}
                >
                  <span className="text-muted-foreground">REGION</span>
                  <span>GLOBAL</span>
                </div>
                <div
                  className="flex items-center justify-between"
                  style={{ fontFamily: "monospace", fontSize: "0.7rem" }}
                >
                  <span className="text-muted-foreground">SKILL</span>
                  <span>BALANCED</span>
                </div>

                <motion.button
                  onClick={handleJoinMatch}
                  disabled={!username.trim()}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 flex w-full items-center justify-between border border-primary bg-primary px-6 py-4 text-primary-foreground transition-colors hover:bg-accent"
                  style={{ fontFamily: "monospace", letterSpacing: "0.25em" }}
                >
                  <span>JOIN MATCH</span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
