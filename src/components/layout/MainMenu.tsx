"use client";

import { Play, Users, Trophy, Settings, Info, LucideIcon } from "lucide-react";

import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";

import { Screen } from "@/game/types";

import { Courier_Prime } from "next/font/google";
import { useRoomStateContext } from "@/context";

const Courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
});

interface MainMenuProps {
  onNavigate: Dispatch<SetStateAction<Screen>>;
}

interface MenuItemProp {
  icon: LucideIcon;
  label: string;
  action: Screen;
}

export default function MainMenu({ onNavigate }: MainMenuProps) {
  const menuItems: MenuItemProp[] = [
    {
      icon: Play,
      label: "Quick Play",
      action: "matchmaking",
    },

    {
      icon: Users,
      label: "Multiplayer Lobby",
      action: "lobby",
    },

    {
      icon: Trophy,
      label: "Leaderboard",
      action: "leaderboard",
    },

    {
      icon: Settings,
      label: "Settings",
      action: "settings",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* GRID */}
      <div className="absolute inset-0 opacity-100">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16 text-center relative"
        >
          <h1
            className="mb-2 text-foreground"
            style={{
              fontSize: "5rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontFamily: "monospace",
            }}
          >
            PHASE<span className="text-primary">//</span>SHIFT
          </h1>

          <p
            className="text-muted-foreground"
            style={{
              letterSpacing: "0.4em",
              fontSize: "0.75rem",
              fontFamily: "monospace",
            }}
          >
            TACTICAL MAZE SURVIVAL
          </p>
        </motion.div>

        {/* MENU */}
        <div className="w-full max-w-md space-y-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.action}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              onClick={() => {
                onNavigate(item.action);
              }}
              className="group relative w-full border border-border bg-card p-5 transition-all hover:border-primary hover:bg-muted"
            >
              <div className="flex items-center gap-4">
                <item.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />

                <span
                  className="text-lg uppercase tracking-wider transition-colors group-hover:text-primary"
                  style={{ fontFamily: "monospace" }}
                >
                  {item.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* VERSION */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => onNavigate("about")}
          className="mt-12 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Info className="h-4 w-4" />

          <span
            style={{
              fontSize: "0.75rem",
              fontFamily: "monospace",
            }}
          >
            v1.0.0
          </span>
        </motion.button>
      </div>
    </div>
  );
}
