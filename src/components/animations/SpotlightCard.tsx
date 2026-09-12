"use client";

import React, { useState, useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderBeam?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(56, 189, 248, 0.18)",
  borderBeam = false,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty("--spotlight-x", `${x}px`);
    divRef.current.style.setProperty("--spotlight-y", `${y}px`);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-b from-slate-900/90 via-[#0a0f24]/90 to-slate-950/90 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/10 ${className}`}
      {...props}
    >
      {/* Moving cursor spotlight using CSS variables - zero re-render overhead */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at var(--spotlight-x, 150px) var(--spotlight-y, 150px), ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Optional animated border beam light */}
      {borderBeam && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl [mask-image:linear-gradient(white,transparent_80%)]">
          <div className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,#38bdf8_320deg,#818cf8_360deg)] opacity-60" />
        </div>
      )}

      {/* Inner surface glow */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
