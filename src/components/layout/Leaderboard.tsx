"use client";

import { ArrowLeft, Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { Screen } from "../../game/types";

interface LeaderboardProps {
  onNavigate: Dispatch<SetStateAction<Screen>>;
}

interface Player {
  rank: number;
  name: string;
  score: number;
  wins: number;
  winRate: number;
  level: number;
  trend: "up" | "down" | "stable";
}

export default function Leaderboard({ onNavigate }: LeaderboardProps) {
  const timeframes = ["DAILY", "WEEKLY", "MONTHLY", "ALL TIME"];
  const selectedTimeframe = "WEEKLY";

  const topPlayers: Player[] = [
    {
      rank: 1,
      name: "QUANTUM_RUNNER",
      score: 98750,
      wins: 342,
      winRate: 87.5,
      level: 99,
      trend: "up",
    },
    {
      rank: 2,
      name: "PHASE_MASTER",
      score: 95200,
      wins: 318,
      winRate: 84.2,
      level: 95,
      trend: "stable",
    },
    {
      rank: 3,
      name: "GHOST_HUNTER",
      score: 92100,
      wins: 305,
      winRate: 82.8,
      level: 92,
      trend: "up",
    },
    {
      rank: 4,
      name: "VOID_WALKER",
      score: 88900,
      wins: 289,
      winRate: 80.1,
      level: 88,
      trend: "down",
    },
    {
      rank: 5,
      name: "TIME_WARPER",
      score: 85600,
      wins: 271,
      winRate: 78.5,
      level: 85,
      trend: "up",
    },
    {
      rank: 6,
      name: "PLAYER_X",
      score: 82400,
      wins: 256,
      winRate: 76.2,
      level: 82,
      trend: "stable",
    },
    {
      rank: 7,
      name: "SHIFT_OPS",
      score: 79300,
      wins: 242,
      winRate: 74.8,
      level: 79,
      trend: "up",
    },
    {
      rank: 8,
      name: "PHASE_ZERO",
      score: 76100,
      wins: 228,
      winRate: 72.5,
      level: 76,
      trend: "down",
    },
    {
      rank: 9,
      name: "GRID_MASTER",
      score: 73200,
      wins: 215,
      winRate: 70.9,
      level: 73,
      trend: "stable",
    },
    {
      rank: 10,
      name: "TACTICAL_ONE",
      score: 70500,
      wins: 203,
      winRate: 69.2,
      level: 70,
      trend: "up",
    },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-primary" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-muted-foreground" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-muted-foreground" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
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
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}>
              LEADERBOARD
            </h2>
          </div>
          <div className="w-20" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Timeframe selector */}
        <div className="mb-8 flex justify-center gap-2">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              className={`border px-6 py-2 transition-all ${
                selectedTimeframe === timeframe
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "monospace", fontSize: "0.75rem" }}
            >
              {timeframe}
            </button>
          ))}
        </div>

        {/* Top 3 */}
        <div className="mb-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* 2nd */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 border border-border bg-card p-4 text-center"
          >
            <div className="mb-2 flex justify-center">{getRankIcon(2)}</div>
            <div className="mb-2 text-4xl" style={{ fontFamily: "monospace" }}>
              2
            </div>
            <h3
              className="mb-1 uppercase"
              style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
            >
              {topPlayers[1].name}
            </h3>
            <p className="text-foreground" style={{ fontFamily: "monospace" }}>
              {topPlayers[1].score.toLocaleString()}
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
            >
              LVL {topPlayers[1].level}
            </p>
          </motion.div>

          {/* 1st */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-primary bg-card p-4 text-center"
          >
            <div className="mb-2 flex justify-center">{getRankIcon(1)}</div>
            <div
              className="mb-2 text-5xl text-primary"
              style={{ fontFamily: "monospace" }}
            >
              1
            </div>
            <h3
              className="mb-1 uppercase text-primary"
              style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
            >
              {topPlayers[0].name}
            </h3>
            <p
              className="text-foreground"
              style={{ fontFamily: "monospace", fontSize: "1.125rem" }}
            >
              {topPlayers[0].score.toLocaleString()}
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
            >
              LVL {topPlayers[0].level}
            </p>
          </motion.div>

          {/* 3rd */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 border border-border bg-card p-4 text-center"
          >
            <div className="mb-2 flex justify-center">{getRankIcon(3)}</div>
            <div className="mb-2 text-4xl" style={{ fontFamily: "monospace" }}>
              3
            </div>
            <h3
              className="mb-1 uppercase"
              style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
            >
              {topPlayers[2].name}
            </h3>
            <p className="text-foreground" style={{ fontFamily: "monospace" }}>
              {topPlayers[2].score.toLocaleString()}
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
            >
              LVL {topPlayers[2].level}
            </p>
          </motion.div>
        </div>

        {/* Full list */}
        <div className="mx-auto max-w-4xl">
          <div className="border border-border bg-card overflow-hidden">
            {/* Header */}
            <div
              className="grid grid-cols-12 gap-4 border-b border-border bg-muted px-6 py-3 text-muted-foreground"
              style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
            >
              <div className="col-span-1">RANK</div>
              <div className="col-span-4">PLAYER</div>
              <div className="col-span-2 text-right">SCORE</div>
              <div className="col-span-2 text-right">WINS</div>
              <div className="col-span-2 text-right">WIN%</div>
              <div className="col-span-1 text-center">TREND</div>
            </div>

            {/* Rows */}
            {topPlayers.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="grid grid-cols-12 gap-4 border-b border-border px-6 py-4 transition-colors hover:bg-muted"
              >
                <div className="col-span-1 flex items-center gap-2">
                  {getRankIcon(player.rank)}
                  <span
                    className={player.rank <= 3 ? "text-primary" : ""}
                    style={{ fontFamily: "monospace" }}
                  >
                    {player.rank}
                  </span>
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <span
                    style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                  >
                    {player.name}
                  </span>
                  <span
                    className="border border-border bg-muted px-2 py-0.5 text-muted-foreground"
                    style={{ fontSize: "0.625rem", fontFamily: "monospace" }}
                  >
                    {player.level}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end font-mono text-foreground">
                  {player.score.toLocaleString()}
                </div>
                <div
                  className="col-span-2 flex items-center justify-end text-muted-foreground"
                  style={{ fontFamily: "monospace" }}
                >
                  {player.wins}
                </div>
                <div
                  className="col-span-2 flex items-center justify-end"
                  style={{ fontFamily: "monospace" }}
                >
                  <span
                    className={
                      player.winRate >= 80
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    {player.winRate}%
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  {player.trend === "up" && (
                    <TrendingUp className="h-4 w-4 text-primary" />
                  )}
                  {player.trend === "down" && (
                    <TrendingUp className="h-4 w-4 rotate-180 text-destructive" />
                  )}
                  {player.trend === "stable" && (
                    <div className="h-px w-4 bg-muted-foreground" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Your rank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 border-2 border-primary bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span
                  className="text-primary"
                  style={{ fontFamily: "monospace" }}
                >
                  #127
                </span>
                <span style={{ fontFamily: "monospace" }}>YOUR_RANK</span>
              </div>
              <div className="text-right">
                <div
                  className="text-foreground"
                  style={{ fontSize: "1.125rem", fontFamily: "monospace" }}
                >
                  45,280
                </div>
                <div
                  className="text-muted-foreground"
                  style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
                >
                  124 WINS • 68.5%
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
