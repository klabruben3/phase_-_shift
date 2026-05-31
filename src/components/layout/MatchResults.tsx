"use client";

import { Trophy, Target, Clock, Zap, TrendingUp, Home } from "lucide-react";
import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { Screen } from "../../game/types";

interface MatchResultsProps {
  onNavigate: Dispatch<SetStateAction<Screen>>;
}

export default function MatchResults({ onNavigate }: MatchResultsProps) {
  const playerStats = {
    placement: 1,
    score: 12450,
    kills: 8,
    survived: "4:32",
    powerupsUsed: 12,
    distance: 2847,
    xpGained: 850,
    levelUp: true,
    newLevel: 46,
  };

  const allPlayers = [
    { rank: 1, name: "YOU", score: 12450, kills: 8 },
    { rank: 2, name: "PHASE_MASTER", score: 11200, kills: 6 },
    { rank: 3, name: "GHOST_HUNTER", score: 9850, kills: 5 },
    { rank: 4, name: "PLAYER_X", score: 8900, kills: 4 },
    { rank: 5, name: "VOID_WALKER", score: 7650, kills: 3 },
    { rank: 6, name: "TACTICAL_ONE", score: 6420, kills: 2 },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Victory banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="border-2 border-primary p-6">
              <Trophy className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="mb-2 text-primary" style={{ fontSize: '3rem', fontFamily: 'monospace', letterSpacing: '0.2em' }}>
            VICTORY
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: '1rem', fontFamily: 'monospace' }}>
            RANK #{playerStats.placement}
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score breakdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-border bg-card p-6"
            >
              <h3 className="mb-4 uppercase tracking-wider" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>MATCH SUMMARY</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="border border-border bg-muted p-4 text-center">
                  <Target className="mx-auto mb-2 h-6 w-6 text-foreground" />
                  <div className="mb-1" style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{playerStats.score.toLocaleString()}</div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>SCORE</div>
                </div>
                <div className="border border-border bg-muted p-4 text-center">
                  <Zap className="mx-auto mb-2 h-6 w-6 text-foreground" />
                  <div className="mb-1" style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{playerStats.kills}</div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>KILLS</div>
                </div>
                <div className="border border-border bg-muted p-4 text-center">
                  <Clock className="mx-auto mb-2 h-6 w-6 text-foreground" />
                  <div className="mb-1" style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{playerStats.survived}</div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>TIME</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="flex items-center justify-between border border-border bg-muted px-4 py-3">
                  <span className="text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>POWERUPS</span>
                  <span style={{ fontFamily: 'monospace' }}>{playerStats.powerupsUsed}</span>
                </div>
                <div className="flex items-center justify-between border border-border bg-muted px-4 py-3">
                  <span className="text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>DISTANCE</span>
                  <span style={{ fontFamily: 'monospace' }}>{playerStats.distance}M</span>
                </div>
                <div className="flex items-center justify-between border border-border bg-muted px-4 py-3">
                  <span className="text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>XP</span>
                  <span className="text-primary" style={{ fontFamily: 'monospace' }}>+{playerStats.xpGained}</span>
                </div>
              </div>
            </motion.div>

            {/* Final standings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-border bg-card p-6"
            >
              <h3 className="mb-4 uppercase tracking-wider" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>FINAL STANDINGS</h3>
              <div className="space-y-2">
                {allPlayers.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.03 }}
                    className={`flex items-center justify-between border p-4 ${
                      player.rank === 1
                        ? "border-primary bg-muted"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-8 w-8 items-center justify-center border ${
                        player.rank === 1 ? "border-primary text-primary" : "border-border"
                      }`} style={{ fontFamily: 'monospace' }}>
                        {player.rank}
                      </div>
                      <span className={player.rank === 1 ? "text-primary" : ""} style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {player.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">{player.score.toLocaleString()}</div>
                      <div className="text-muted-foreground" style={{ fontSize: '0.625rem', fontFamily: 'monospace' }}>
                        {player.kills} KILLS
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            {/* Level up */}
            {playerStats.levelUp && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="border-2 border-primary bg-card p-6 text-center"
              >
                <TrendingUp className="mx-auto mb-3 h-10 w-10 text-primary" />
                <h3 className="mb-2 uppercase tracking-wider" style={{ fontFamily: 'monospace' }}>LEVEL UP</h3>
                <div className="mb-2 text-primary" style={{ fontSize: '2rem', fontFamily: 'monospace' }}>
                  {playerStats.newLevel}
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  NEW POWERUPS UNLOCKED
                </p>
              </motion.div>
            )}

            {/* Performance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="border border-border bg-card p-6"
            >
              <h4 className="mb-4 uppercase tracking-wider" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>PERFORMANCE</h4>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    <span className="text-muted-foreground">ACCURACY</span>
                    <span className="text-foreground">87%</span>
                  </div>
                  <div className="h-1 bg-muted">
                    <div className="h-full bg-primary" style={{ width: "87%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    <span className="text-muted-foreground">SURVIVAL</span>
                    <span className="text-foreground">92%</span>
                  </div>
                  <div className="h-1 bg-muted">
                    <div className="h-full bg-primary" style={{ width: "92%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    <span className="text-muted-foreground">STRATEGY</span>
                    <span className="text-foreground">78%</span>
                  </div>
                  <div className="h-1 bg-muted">
                    <div className="h-full bg-primary" style={{ width: "78%" }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => onNavigate("matchmaking")}
                className="w-full border border-primary bg-primary px-6 py-4 text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
                style={{ fontFamily: 'monospace' }}
              >
                PLAY AGAIN
              </button>
              <button
                onClick={() => onNavigate("menu")}
                className="flex w-full items-center justify-center gap-2 border border-border bg-card px-6 py-4 transition-colors hover:bg-muted"
                style={{ fontFamily: 'monospace' }}
              >
                <Home className="h-5 w-5" />
                MAIN MENU
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
