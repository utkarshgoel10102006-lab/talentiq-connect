"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Award } from "lucide-react";

export function FloatingHeroEcosystem() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. FLOATING AYURVEDIC BOTANICAL LEAF (Top Left) */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 6, -4, 0],
          x: mouseOffset.x * 0.8,
        }}
        transition={{
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.8, ease: "easeOut" },
        }}
        className="absolute top-20 left-4 sm:left-12 lg:left-24 opacity-40 hover:opacity-80 transition-opacity"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 border border-emerald-400/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <svg
            className="w-10 h-10 text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>
      </motion.div>

      {/* 2. ANCIENT SANSKRIT SEAL / MANDALA GLYPH (Top Right) */}
      <motion.div
        animate={{
          y: [0, 16, 0],
          rotate: [0, 360],
          x: mouseOffset.x * -0.6,
        }}
        transition={{
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          x: { duration: 0.8, ease: "easeOut" },
        }}
        className="absolute top-24 right-4 sm:right-16 lg:right-28 opacity-35"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-amber-400/30 bg-amber-500/5 backdrop-blur-md flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.25)]">
          <div className="w-14 h-14 rounded-full border border-dashed border-amber-300/40 flex items-center justify-center text-amber-200 font-serif text-lg font-bold">
            ॐ
          </div>
        </div>
      </motion.div>

      {/* 3. GLOWING TALENT INTELLIGENCE 3D ORB (Middle Left) */}
      <motion.div
        animate={{
          y: [0, -22, 0],
          x: mouseOffset.x * 1.2,
          scale: [1, 1.05, 1],
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.8, ease: "easeOut" },
        }}
        className="absolute top-[48%] left-2 sm:left-10 lg:left-16 opacity-70 hidden md:block"
      >
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full blur-xl opacity-60 animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/60 via-slate-900 to-sky-400/40 border border-sky-300/40 backdrop-blur-xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-7 h-7 text-sky-200 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
        </div>
      </motion.div>

      {/* 4. LIVE FLOATING OPPORTUNITY CARD (Middle Right) */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: mouseOffset.x * -0.9,
          rotate: [0, -2, 1, 0],
        }}
        transition={{
          y: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.8, ease: "easeOut" },
        }}
        className="absolute top-[52%] right-2 sm:right-8 lg:right-20 hidden lg:block opacity-85"
      >
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 backdrop-blur-xl shadow-2xl shadow-emerald-950/50 space-y-1.5 w-56">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Verified Match
            </span>
            <span className="text-[10px] font-black text-white">92%</span>
          </div>
          <p className="text-xs font-bold text-white truncate">Clinical Trial Intern</p>
          <p className="text-[10px] text-slate-400">Dabur AYUSH R&amp;D &bull; ₹25,000/mo</p>
          <div className="flex items-center gap-1 pt-0.5 text-[9px] text-sky-300 font-semibold">
            <Award className="w-3 h-3" />
            <span>NEP 2020: 8 ABC Credits</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
