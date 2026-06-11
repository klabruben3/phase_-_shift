"use client";

import { MouseMoveProp, sendMouseInput } from "@/game";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function Accessibility() {
  const controlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const control = controlRef.current;

    if (!control) return;

    const handleClick = () => {
      control.requestPointerLock();
    };

    let mouseDirection: MouseMoveProp | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!document.pointerLockElement) return;

      const magnitude = Math.hypot(e.movementX, e.movementY);
      if (magnitude < 10) return;

      const angle = Math.atan2(e.movementY, e.movementX);

      let currentDirection: MouseMoveProp;

      if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
        currentDirection = "mouseRight";
      } else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) {
        currentDirection = "mouseDown";
      } else if (angle >= -(3 * Math.PI) / 4 && angle < -Math.PI / 4) {
        currentDirection = "mouseUp";
      } else {
        currentDirection = "mouseLeft";
      }

      if (mouseDirection !== currentDirection) {
        console.log(currentDirection);
        sendMouseInput(currentDirection);

        mouseDirection = currentDirection;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    control.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);

      control.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={controlRef}
      className="pointer-events-none absolute bottom-20 left-4"
    >
      <div className="pointer-events-auto relative h-28 w-28">
        <div className="absolute inset-0 border border-border bg-card" />
        <button className="absolute left-1/2 top-2 -translate-x-1/2 p-2">
          <ChevronUp className="h-5 w-5 text-foreground" />
        </button>
        <button className="absolute bottom-2 left-1/2 -translate-x-1/2 p-2">
          <ChevronDown className="h-5 w-5 text-foreground" />
        </button>
        <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2">
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </div>
  );
}
