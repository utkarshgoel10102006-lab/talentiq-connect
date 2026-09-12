"use client";

import React, { useRef } from "react";
import { motion, useInView, Variant } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "rotate";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const getVariants = (direction: Direction, distance: number) => {
  const hidden: Record<Direction, Variant> = {
    up: { opacity: 0, y: distance },
    down: { opacity: 0, y: -distance },
    left: { opacity: 0, x: distance },
    right: { opacity: 0, x: -distance },
    scale: { opacity: 0, scale: 0.9 },
    rotate: { opacity: 0, scale: 0.95, rotate: -4 },
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
  };

  return { hidden: hidden[direction], visible };
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 60,
  className = "",
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const variants = getVariants(direction, distance);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Staggered children wrapper - each child animates in sequence */
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
  direction = "up",
  distance = 50,
  duration = 0.6,
  once = true,
  threshold = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const { hidden } = getVariants(direction, distance);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden,
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
            },
          }}
          transition={{
            duration,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
