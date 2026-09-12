"use client";

import React, { useState } from "react";
import {
  FileText,
  Cpu,
  Share2,
  AlertTriangle,
  Compass,
  CheckCircle,
  Briefcase,
  Play,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PipelineStage {
  id: string;
  name: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  output: string;
}

const STAGES: PipelineStage[] = [
  {
    id: "input",
    name: "1. Raw Evidence",
    sub: "DigiLocker & APAAR",
    icon: FileText,
    color: "#38bdf8",
    output: "45 OPD Shifts, BAMS Transcripts, SWAYAM Certs",
  },
  {
    id: "extraction",
    name: "2. NLP Extraction",
    sub: "Semantic Parser",
    icon: Cpu,
    color: "#818cf8",
    output: "Dravyaguna (L4), Ayurvedic Diag (L4), Biostatistics (L2)",
  },
  {
    id: "graph",
    name: "3. Skill Twin",
    sub: "8-Axis Multidimensional",
    icon: Share2,
    color: "#a855f7",
    output: "Vectorized Competency Graph with 78% Initial Readiness",
  },
  {
    id: "gap",
    name: "4. Deficit Matrix",
    sub: "AICTE / NCISM Check",
    icon: AlertTriangle,
    color: "#f59e0b",
    output: "Detected ICH-GCP Clinical Trial Gap (Level 2 required L3)",
  },
  {
    id: "gps",
    name: "5. Career GPS",
    sub: "Auto-Prescription",
    icon: Compass,
    color: "#06b6d4",
    output: "Prescribed 4-Wk NPTEL Trial Protocol Bridge (+14% Boost)",
  },
  {
    id: "match",
    name: "6. Explainable AI",
    sub: "Transparent Weights",
    icon: CheckCircle,
    color: "#10b981",
    output: "Matched Dabur Clinical Fellow with 92% Mathematical Fit",
  },
  {
    id: "outcome",
    name: "7. Boardroom Offer",
    sub: "Direct Appointment",
    icon: Briefcase,
    color: "#ec4899",
    output: "₹25,000/mo Stipend + 8 National ABC Credits Awarded",
  },
];

export function AIPipelineVisualizer() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isRunningSim, setIsRunningSim] = useState(false);

  const runSimulation = () => {
    setIsRunningSim(true);
    setActiveStageIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < STAGES.length) {
        setActiveStageIndex(current);
      } else {
        clearInterval(interval);
        setIsRunningSim(false);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 900);
  };

  const currentStage = STAGES[activeStageIndex];
  const CurrentIcon = currentStage.icon;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-white/[0.1] backdrop-blur-xl shadow-2xl space-y-6">
      {/* Visualizer Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            Neural Extraction Engine
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Autonomous Talent Ingestion &amp; Match Pipeline
          </h3>
        </div>

        <button
          onClick={runSimulation}
          disabled={isRunningSim}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isRunningSim ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Simulating Pipeline Flow...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              Simulate Live Ingestion Flow
            </>
          )}
        </button>
      </div>

      {/* Horizontal Pipeline Steps Track */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStageIndex === idx;
          const isPassed = activeStageIndex > idx;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? "bg-slate-900 border-sky-400 shadow-lg shadow-sky-500/20 scale-105"
                  : isPassed
                  ? "bg-emerald-950/20 border-emerald-500/30"
                  : "bg-slate-900/40 border-white/[0.06] hover:border-white/15"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: `${stage.color}20`,
                    color: stage.color,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-500">0{idx + 1}</span>
              </div>
              <p className="text-xs font-bold text-white truncate">{stage.name.split(" ")[1]}</p>
              <p className="text-[9px] text-slate-400 truncate">{stage.sub}</p>
            </button>
          );
        })}
      </div>

      {/* Active Pipeline Stage Telemetry Display */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl shrink-0"
            style={{
              backgroundColor: `${currentStage.color}25`,
              color: currentStage.color,
              border: `1px solid ${currentStage.color}40`,
            }}
          >
            <CurrentIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white">{currentStage.name}</span>
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${currentStage.color}20`,
                  color: currentStage.color,
                }}
              >
                {currentStage.sub}
              </span>
            </div>
            <p className="text-xs font-semibold text-emerald-300 mt-0.5">
              Live Synthesis Output: <span className="text-slate-200">{currentStage.output}</span>
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Stage Execution</span>
          <span className="text-xs font-mono font-bold text-sky-300">
            {activeStageIndex + 1} / {STAGES.length} Completed
          </span>
        </div>
      </div>
    </div>
  );
}
