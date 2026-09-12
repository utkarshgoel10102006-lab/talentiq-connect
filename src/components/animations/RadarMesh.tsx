"use client";

import React, { useState } from "react";

interface SkillNode {
  name: string;
  level: number;
  x: number; // percentage
  y: number; // percentage
  status: "VERIFIED" | "GAP" | "PROGRESS";
}

const NODES: SkillNode[] = [
  { name: "Ayurvedic Clinical Diagnostics", level: 4, x: 50, y: 15, status: "VERIFIED" },
  { name: "Dravyaguna Pharmacology", level: 4, x: 82, y: 35, status: "VERIFIED" },
  { name: "ICH-GCP Clinical Trials", level: 3, x: 75, y: 75, status: "PROGRESS" },
  { name: "Health Biostatistics", level: 2, x: 50, y: 88, status: "GAP" },
  { name: "Botanical Extraction", level: 4, x: 22, y: 72, status: "VERIFIED" },
  { name: "Roga Nidana Assessment", level: 4, x: 18, y: 35, status: "VERIFIED" },
  { name: "Medical Sanskrit & Charaka", level: 5, x: 50, y: 38, status: "VERIFIED" },
];

export function RadarMesh() {
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);

  return (
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/20 via-sky-500/10 to-teal-500/20 blur-xl animate-pulse" />

      {/* Concentric Rings */}
      <div className="absolute inset-0 rounded-full border border-blue-500/20" />
      <div className="absolute inset-8 rounded-full border border-blue-500/15" />
      <div className="absolute inset-16 rounded-full border border-blue-500/15" />
      <div className="absolute inset-24 rounded-full border border-blue-500/25" />
      <div className="absolute inset-[130px] rounded-full border border-blue-400/40" />

      {/* Crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
      </div>

      {/* Rotating 360-degree Radar Scanner Beam */}
      <div className="absolute inset-0 rounded-full animate-radar-scan pointer-events-none origin-center">
        <div className="w-1/2 h-1/2 ml-auto rounded-tl-full bg-gradient-to-br from-sky-400/25 via-blue-500/5 to-transparent blur-[1px]" />
      </div>

      {/* Center Beacon Core */}
      <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-teal-400 p-0.5 shadow-lg shadow-sky-500/50 flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
        </div>
      </div>

      {/* Skill Nodes */}
      {NODES.map((node, i) => {
        const isVerified = node.status === "VERIFIED";
        const isGap = node.status === "GAP";

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="relative flex items-center justify-center">
              <span
                className={`absolute w-4 h-4 rounded-full animate-ping opacity-75 ${
                  isVerified ? "bg-emerald-400" : isGap ? "bg-red-400" : "bg-sky-400"
                }`}
              />
              <span
                className={`relative w-3.5 h-3.5 rounded-full border-2 border-slate-950 shadow-md ${
                  isVerified
                    ? "bg-emerald-400 shadow-emerald-500/50"
                    : isGap
                    ? "bg-red-400 shadow-red-500/50"
                    : "bg-sky-400 shadow-sky-500/50"
                }`}
              />
            </div>
          </div>
        );
      })}

      {/* Tooltip Overlay */}
      {hoveredNode && (
        <div className="absolute bottom-2 z-30 px-3 py-1.5 rounded-xl bg-slate-950/95 border border-white/20 text-[11px] text-white shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
          <p className="font-bold flex items-center gap-1">
            <span>{hoveredNode.status === "VERIFIED" ? "✓" : hoveredNode.status === "GAP" ? "⚠" : "⚡"}</span>
            {hoveredNode.name}
          </p>
          <span className="text-[10px] text-slate-400">
            Proficiency Level {hoveredNode.level} / 5 &bull; {hoveredNode.status}
          </span>
        </div>
      )}
    </div>
  );
}
