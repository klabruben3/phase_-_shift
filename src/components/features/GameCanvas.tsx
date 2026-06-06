"use client";

import { handleKeyDown, Player, SKINS } from "@/game";
import { useEffect, useRef } from "react";

interface GameCanvasProp {
  players: Player[];
}

interface RenderPlayer extends Player {
  renderX: number;
  renderY: number;
}

const circleRad = 20;
const interpolationSpeed = 0.2;

export default function GameCanvas({ players }: GameCanvasProp) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const playersRef = useRef<RenderPlayer[]>([]);

  useEffect(() => {
    const existingPlayers = playersRef.current;
    const playerMap = new Map(existingPlayers.map((p) => [p.id, p]));

    for (const incomingPlayer of players) {
      const existing = playerMap.get(incomingPlayer.id);

      if (existing) {
        existing.position.x = incomingPlayer.position.x;
        existing.position.y = incomingPlayer.position.y;
      } else {
        existingPlayers.push({
          ...incomingPlayer,
          position: {
            x: incomingPlayer.position.x,
            y: incomingPlayer.position.y,
          },
          renderX: incomingPlayer.position.x,
          renderY: incomingPlayer.position.y,
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

    let lastFrame = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - lastFrame) / 16.67, 3);
      lastFrame = now;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (const player of playersRef.current) {
        const dx = player.position.x - player.renderX;
        const dy = player.position.y - player.renderY;

        if (Math.abs(dx) < 0.01) {
          player.renderX = player.position.x;
        } else {
          player.renderX += dx * interpolationSpeed * dt;
        }

        if (Math.abs(dy) < 0.01) {
          player.renderY = player.position.y;
        } else {
          player.renderY += dy * interpolationSpeed * dt;
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
