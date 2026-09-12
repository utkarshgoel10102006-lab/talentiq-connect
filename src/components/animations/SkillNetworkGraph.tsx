"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  category: "STUDENT" | "SKILL" | "GAP" | "BRIDGE" | "OPPORTUNITY" | "OUTCOME";
  level?: string;
  status: string;
  verifiedBy?: string;
  demandScore?: number;
  description: string;
  color: string;
}

const NODES: NodeData[] = [
  {
    id: "student",
    name: "Priya Sharma (BAMS)",
    category: "STUDENT",
    status: "APAAR Verified (DigiLocker)",
    description: "Final-Year BAMS Scholar at AIIA. Targeted Career: Clinical Research Associate.",
    color: "#38bdf8",
  },
  {
    id: "skill-1",
    name: "Dravyaguna Pharmacology",
    category: "SKILL",
    level: "Level 4 (Advanced)",
    status: "Clinical Marks Verified",
    verifiedBy: "AIIA Faculty Evaluation",
    demandScore: 94,
    description: "Comprehensive knowledge of herbal drug formulations, active botanical constituents, and standardized dosage regimens.",
    color: "#10b981",
  },
  {
    id: "skill-2",
    name: "Ayurvedic Diagnostics",
    category: "SKILL",
    level: "Level 4 (Advanced)",
    status: "OPD Logbook Ingested",
    verifiedBy: "AIIA Hospital Board",
    demandScore: 91,
    description: "Roga Nidana clinical assessment, pulse diagnostics, and patient observation methodology.",
    color: "#10b981",
  },
  {
    id: "skill-3",
    name: "ICH-GCP Trial Protocol",
    category: "GAP",
    level: "Level 2 (Deficit)",
    status: "Actionable Skill Gap",
    verifiedBy: "AICTE Industry Benchmark",
    demandScore: 98,
    description: "Good Clinical Practice trial procedures required by multi-national pharmaceutical sponsors.",
    color: "#f59e0b",
  },
  {
    id: "bridge",
    name: "NPTEL GCP 4-Wk Bridge",
    category: "BRIDGE",
    level: "Active Coursework",
    status: "80% Completed",
    verifiedBy: "SWAYAM Credit Protocol",
    demandScore: 96,
    description: "Targeted bridge module auto-prescribed by AI Career GPS to eradicate the trial protocol gap.",
    color: "#a855f7",
  },
  {
    id: "opportunity",
    name: "Dabur AYUSH R&D Fellow",
    category: "OPPORTUNITY",
    level: "Phase-II Trial Monitor",
    status: "92% Explainable Fit",
    verifiedBy: "Dabur Healthcare Recruiter",
    demandScore: 99,
    description: "6-Month hybrid rotation monitoring herbal formulation efficacy across 4 hospital test sites.",
    color: "#06b6d4",
  },
  {
    id: "outcome",
    name: "Boardroom Placement + ABC",
    category: "OUTCOME",
    level: "8 NEP Academic Credits",
    status: "DigiLocker Certified",
    verifiedBy: "Academic Bank of Credits (ABC)",
    demandScore: 100,
    description: "Automatic deposit of verified credits into National Credit Framework (NCrF) repository upon mentor sign-off.",
    color: "#ec4899",
  },
];

export function SkillNetworkGraph() {
  const [selectedNode, setSelectedNode] = useState<NodeData>(NODES[0]);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  return (
    <div className="w-full space-y-6">
      {/* 1. Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            Dynamic Competency Pipeline
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Student Skill Intelligence Network
          </h3>
        </div>

        {/* Node Categories */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {["ALL", "SKILL", "GAP", "BRIDGE", "OPPORTUNITY"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 rounded-xl font-bold transition-all text-[11px] ${
                activeFilter === cat
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                  : "bg-white/[0.04] text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Network Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Interactive Graph Nodes Canvas */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-950/80 border border-white/[0.1] backdrop-blur-xl relative overflow-hidden shadow-2xl">
          {/* Animated Background Mesh Conduit Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <defs>
              <linearGradient id="grad-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Connecting lines between pipeline stages */}
            <line x1="15%" y1="50%" x2="45%" y2="25%" stroke="url(#grad-pulse)" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="15%" y1="50%" x2="45%" y2="50%" stroke="url(#grad-pulse)" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="15%" y1="50%" x2="45%" y2="75%" stroke="url(#grad-pulse)" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="45%" y1="75%" x2="70%" y2="75%" stroke="url(#grad-pulse)" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="45%" y1="25%" x2="75%" y2="40%" stroke="url(#grad-pulse)" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="70%" y1="75%" x2="75%" y2="40%" stroke="url(#grad-pulse)" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="75%" y1="40%" x2="90%" y2="50%" stroke="url(#grad-pulse)" strokeWidth="2" strokeDasharray="6 4" />
          </svg>

          {/* Node Grid Layout */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Column 1: Student Origin */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-center">
                1. Candidate Profile
              </span>
              <motion.div
                whileHover={{ scale: 1.04 }}
                onClick={() => setSelectedNode(NODES[0])}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedNode.id === "student"
                    ? "bg-blue-950/90 border-sky-400 shadow-xl shadow-sky-500/20"
                    : "bg-slate-900/60 border-white/[0.08] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{NODES[0].name}</h4>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Verified APAAR
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Column 2: Competency & Gap Diagnosis */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-center">
                2. Skills &amp; Gaps
              </span>
              <div className="space-y-2">
                {[NODES[1], NODES[2], NODES[3]].map((node) => (
                  <motion.div
                    key={node.id}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                      selectedNode.id === node.id
                        ? "bg-slate-900 border-sky-400 shadow-lg shadow-sky-500/20"
                        : "bg-slate-900/40 border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate mr-2">{node.name}</span>
                      {node.category === "GAP" ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 flex items-center gap-0.5 shrink-0">
                          <AlertTriangle className="w-2.5 h-2.5" /> Deficit
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 flex items-center gap-0.5 shrink-0">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Column 3: Opportunities & NEP Outcomes */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-center">
                3. Industry Match &amp; ABC
              </span>
              <div className="space-y-2">
                {[NODES[4], NODES[5], NODES[6]].map((node) => (
                  <motion.div
                    key={node.id}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                      selectedNode.id === node.id
                        ? "bg-slate-900 border-sky-400 shadow-lg shadow-sky-500/20"
                        : "bg-slate-900/40 border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate mr-2">{node.name}</span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0"
                        style={{ backgroundColor: `${node.color}25`, color: node.color }}
                      >
                        {node.level}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Node Inspector Panel */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-blue-950/70 via-slate-900 to-indigo-950/80 border border-sky-500/30 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{
                backgroundColor: `${selectedNode.color}20`,
                color: selectedNode.color,
                border: `1px solid ${selectedNode.color}40`,
              }}
            >
              {selectedNode.category}
            </span>
            {selectedNode.demandScore && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Industry Demand: {selectedNode.demandScore}%
              </span>
            )}
          </div>

          <div>
            <h4 className="text-lg font-black text-white">{selectedNode.name}</h4>
            <p className="text-xs text-sky-300 font-medium mt-0.5">{selectedNode.status}</p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3 rounded-2xl border border-white/5">
            {selectedNode.description}
          </p>

          <div className="space-y-2 pt-1 text-xs">
            {selectedNode.verifiedBy && (
              <div className="flex items-center justify-between text-slate-300 border-b border-white/5 pb-2">
                <span className="text-slate-400">Verifying Authority:</span>
                <span className="font-semibold text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedNode.verifiedBy}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">NCrF / NEP Compliance:</span>
              <span className="font-semibold text-sky-300">National Credit Framework Aligned</span>
            </div>
          </div>

          <button
            onClick={() => {
              const nextIdx = (NODES.findIndex((n) => n.id === selectedNode.id) + 1) % NODES.length;
              setSelectedNode(NODES[nextIdx]);
            }}
            className="w-full py-2.5 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white text-xs transition-all flex items-center justify-center gap-2"
          >
            Inspect Next Pipeline Node <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
