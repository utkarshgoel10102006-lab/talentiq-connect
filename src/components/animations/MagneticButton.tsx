"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  dataCursor?: string;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.25,
  dataCursor = "OPEN",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (clientX - centerX) * strength;
    const distanceY = (clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.2 }}
      className={`inline-block ${className}`}
      onClick={onClick}
      data-cursor={dataCursor}
    >
      {children}
    </motion.div>
  );
}
