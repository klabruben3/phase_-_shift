"use client";

import { handleKeyDown, type Player, SKINS } from "@/game";
import { useEffect, useRef } from "react";

interface GameCanvasProp {
  players: Player[];
}

interface Snapshot {
  timestamp: number;
  x: number;
  y: number;
}

interface RenderPlayer extends Player {
  history: Snapshot[];
  renderX: number;
  renderY: number;
}

const circleRad = 20;
const interpolationDelay = 100;
const maxSnapshots = 20;

export default function GameCanvas({ players }: GameCanvasProp) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const playersRef = useRef<RenderPlayer[]>([]);

  useEffect(() => {
    const existingPlayers = playersRef.current;
    const playerMap = new Map(existingPlayers.map((p) => [p.id, p]));

    const now = performance.now();

    for (const incomingPlayer of players) {
      const existing = playerMap.get(incomingPlayer.id);

      if (existing) {
        existing.position.x = incomingPlayer.position.x;
        existing.position.y = incomingPlayer.position.y;

        const lastSnapshot = existing.history[existing.history.length - 1];

        if (
          !lastSnapshot ||
          lastSnapshot.x !== incomingPlayer.position.x ||
          lastSnapshot.y !== incomingPlayer.position.y
        ) {
          existing.history.push({
            timestamp: now,
            x: incomingPlayer.position.x,
            y: incomingPlayer.position.y,
          });

          while (existing.history.length > maxSnapshots) {
            existing.history.shift();
          }
        }
      } else {
        existingPlayers.push({
          ...incomingPlayer,
          renderX: incomingPlayer.position.x,
          renderY: incomingPlayer.position.y,
          history: [
            {
              timestamp: now,
              x: incomingPlayer.position.x,
              y: incomingPlayer.position.y,
            },
          ],
        });
      }
    }

    const serverIds = new Set(players.map((p) => p.id));

    playersRef.current = existingPlayers.filter((p) => serverIds.has(p.id));
  }, [players]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const renderTime = now - interpolationDelay;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (const player of playersRef.current) {
        const history = player.history;

        if (history.length === 0) continue;

        if (history.length === 1) {
          player.renderX = history[0].x;
          player.renderY = history[0].y;
        } else {
          let older = history[0];
          let newer = history[0];

          for (let i = 1; i < history.length; i++) {
            if (history[i].timestamp > renderTime) {
              older = history[i - 1];
              newer = history[i];
              break;
            }

            older = history[i];
            newer = history[i];
          }

          if (older === newer) {
            player.renderX = older.x;
            player.renderY = older.y;
          } else {
            const range = newer.timestamp - older.timestamp;

            const alpha = Math.max(
              0,
              Math.min(
                1,
                range === 0 ? 1 : (renderTime - older.timestamp) / range,
              ),
            );

            player.renderX = older.x + (newer.x - older.x) * alpha;

            player.renderY = older.y + (newer.y - older.y) * alpha;
          }
        }

        ctx.beginPath();

        ctx.fillStyle = SKINS[player.skin].color;
        ctx.strokeStyle = SKINS[player.skin].border;

        ctx.arc(player.renderX, player.renderY, circleRad, 0, Math.PI * 2);

        ctx.fill();
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    handleResize();

    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);

      window.removeEventListener("keydown", handleKeyDown);

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed w-full h-full pointer-events-none bg-[darkcyan]/20"
    />
  );
}
