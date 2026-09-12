"use client";

import React, { useState, useEffect } from "react";
import { Zap, Sparkles, Gauge } from "lucide-react";

export type PerformanceMode = "smooth" | "cinematic";

export function useSmoothnessMode() {
  const [mode, setMode] = useState<PerformanceMode>("cinematic");

  useEffect(() => {
    const saved = localStorage.getItem("talentiq_perf_mode") as PerformanceMode | null;
    if (saved) {
      setMode(saved);
      document.documentElement.dataset.perfMode = saved;
    } else {
      // Default to smooth if low memory / mobile, else cinematic
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const initial = isMobile ? "smooth" : "cinematic";
      setMode(initial);
      document.documentElement.dataset.perfMode = initial;
    }

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<PerformanceMode>;
      if (customEvent.detail) {
        setMode(customEvent.detail);
      }
    };

    window.addEventListener("perfModeChange", handler);
    return () => {
      window.removeEventListener("perfModeChange", handler);
    };
  }, []);

  const toggleMode = () => {
    const next = mode === "smooth" ? "cinematic" : "smooth";
    setMode(next);
    localStorage.setItem("talentiq_perf_mode", next);
    document.documentElement.dataset.perfMode = next;
    window.dispatchEvent(new CustomEvent("perfModeChange", { detail: next }));
  };

  return { mode, toggleMode, isSmooth: mode === "smooth" };
}

export function SmoothnessControl() {
  const { mode, toggleMode } = useSmoothnessMode();

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-slate-900/90 border border-white/15 backdrop-blur-xl shadow-xl">
      <button
        onClick={toggleMode}
        type="button"
        title={mode === "smooth" ? "Switch to Ultra Cinematic Mode" : "Switch to 60FPS Butter Smooth Mode"}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-200"
      >
        <span className="flex items-center gap-1">
          <Gauge className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline text-slate-300">Smoothness:</span>
        </span>

        {mode === "smooth" ? (
          <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/40">
            <Zap className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>60FPS Turbo</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/40">
            <Sparkles className="w-3 h-3 text-purple-300" />
            <span>Ultra VFX</span>
          </span>
        )}
      </button>
    </div>
  );
}
