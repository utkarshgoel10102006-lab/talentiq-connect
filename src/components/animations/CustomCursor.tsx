"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer trailing ring
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices or screens without fine pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element for cursor data attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setCursorVariant("text");
      } else if (target.closest("button, a, input, select, textarea, [role='button']")) {
        setCursorText("");
        setCursorVariant("hover");
      } else {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* 1. Core Dot (Immediate Position) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorVariant === "text" ? 0 : cursorVariant === "hover" ? 1.5 : 1,
          opacity: cursorVariant === "text" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]"
      />

      {/* 2. Outer Smooth Follower Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "text" ? 64 : cursorVariant === "hover" ? 44 : 32,
          height: cursorVariant === "text" ? 64 : cursorVariant === "hover" ? 44 : 32,
          backgroundColor:
            cursorVariant === "text"
              ? "rgba(14, 165, 233, 0.25)"
              : cursorVariant === "hover"
              ? "rgba(56, 189, 248, 0.12)"
              : "rgba(255, 255, 255, 0.04)",
          borderColor:
            cursorVariant === "text"
              ? "rgba(56, 189, 248, 0.7)"
              : cursorVariant === "hover"
              ? "rgba(56, 189, 248, 0.5)"
              : "rgba(255, 255, 255, 0.25)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="rounded-full border backdrop-blur-[2px] flex items-center justify-center text-center shadow-[0_0_20px_rgba(56,189,248,0.2)]"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-black tracking-widest text-white uppercase drop-shadow-md select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
