"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

export default function Accessibility() {
  const handleClick = () => {
    document.body.requestPointerLock();
  };

  return (
    <div
      onClick={handleClick}
      className="pointer-events-none absolute bottom-20 left-4 md:hidden"
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
