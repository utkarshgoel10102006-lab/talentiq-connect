"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  dataCursor?: string;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
  dataCursor = "EXPLORE",
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const springConfig = { stiffness: 260, damping: 20, mass: 0.4 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    rotateX.set(tiltX);
    rotateY.set(tiltY);

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.22,
      });
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    if (glare) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="inline-block w-full"
      data-cursor={dataCursor}
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative overflow-hidden rounded-3xl transition-shadow duration-300 ${className}`}
      >
        {children}

        {/* Specular Glare / Sheen Overlay */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4), transparent 80%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
