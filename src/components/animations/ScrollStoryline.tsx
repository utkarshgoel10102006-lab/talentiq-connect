"use client";

import React, { useState } from "react";
import {
  FileSearch,
  AlertCircle,
  BookOpen,
  Target,
  Building2,
  Award,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const STORY_STEPS = [
  {
    step: "01",
    title: "Discover Hidden Competencies",
    subtitle: "Digital Twin Synthesis & APAAR Ingestion",
    icon: FileSearch,
    tag: "Cryptographic Foundation",
    color: "#38bdf8",
    description:
      "TalentIQ cryptographically binds to the candidate's APAAR ID, ingesting verified transcripts, clinical rotation logs, and university marks to compile an 8-axis living competency vector.",
    detail: "Zero resume inflation — every node backed by verified institutional evidence.",
  },
  {
    step: "02",
    title: "Identify Immediate Skill Gaps",
    subtitle: "AICTE & NCISM Industry Benchmark Diagnostics",
    icon: AlertCircle,
    tag: "Deficit Diagnostics",
    color: "#f59e0b",
    description:
      "Our AI parser continuously analyzes active pharma and healthcare requisites against student vectors, revealing hidden deficits like GCP trial monitoring or biostatistical reporting.",
    detail: "Visualizes deficiencies in real-time before corporate campus hiring commences.",
  },
  {
    step: "03",
    title: "Bridge Deficits with Micro-Modules",
    subtitle: "AI Career GPS & SWAYAM Integration",
    icon: BookOpen,
    tag: "Curricular Agility",
    color: "#a855f7",
    description:
      "Rather than waiting a full academic semester, the student receives an adaptive 4-week NPTEL/SWAYAM bridge pathway that raises competency velocity directly toward role targets.",
    detail: "Dynamic milestone checklists raise readiness scores from 72% to 94%.",
  },
  {
    step: "04",
    title: "Connect via Explainable Match",
    subtitle: "Transparent Multi-Variable Matching (92%)",
    icon: Target,
    tag: "Explainable AI",
    color: "#10b981",
    description:
      "Recruiters and students see the transparent breakdown: 60% core skill overlap, 20% proficiency depth, 10% course eligibility, and 10% domain focus. Zero black-box bias.",
    detail: "One-click application with pre-verified credentials and mentor endorsements.",
  },
  {
    step: "05",
    title: "Undergo High-Impact Rotations",
    subtitle: "AIIA & Dabur Corporate Mentorship",
    icon: Building2,
    tag: "Industry Immersion",
    color: "#6366f1",
    description:
      "Students complete verified rotations (e.g. 45 OPD shifts or 120 formulation trial hours). Industry mentors record direct observational evaluations and competency scores.",
    detail: "Direct DBT stipend disbursement ranging from ₹20,000 to ₹35,000/month.",
  },
  {
    step: "06",
    title: "Deposit Credits & Enter Boardroom",
    subtitle: "Academic Bank of Credits (ABC) Transfer",
    icon: Award,
    tag: "NEP 2020 Realized",
    color: "#ec4899",
    description:
      "Mentor evaluation automatically deposits verified academic credits into the National ABC repository, fulfilling degree criteria while securing high-retention corporate offers.",
    detail: "Closes the loop by feeding company hiring outcomes back into university curricula.",
  },
];

export function ScrollStoryline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 px-4 sm:px-8 bg-[#030611] border-t border-white/[0.08] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/30">
              Continuous Educational Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              From Potential to <span className="text-gradient-iridescent font-serif italic">Placement</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              How TalentIQ Connect transforms raw student ambition into verified institutional placement in 6 orchestrated milestones.
            </p>
          </div>
        </ScrollReveal>

        {/* Story Spine & Cards Grid */}
        <div className="relative">
          {/* Central Connecting Spine Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-sky-500 via-purple-500 to-emerald-500 opacity-30 pointer-events-none" />

          <div className="space-y-8 sm:space-y-12">
            {STORY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <ScrollReveal
                  key={step.step}
                  direction={isEven ? "right" : "left"}
                  distance={40}
                  delay={0.1}
                >
                  <div
                    onMouseEnter={() => setActiveStep(idx)}
                    className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content Card */}
                    <div className="w-full lg:w-1/2">
                      <div
                        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 backdrop-blur-xl relative overflow-hidden group ${
                          activeStep === idx
                            ? "bg-slate-900/90 border-sky-400 shadow-2xl shadow-sky-500/20 scale-[1.02]"
                            : "bg-slate-950/60 border-white/[0.09] hover:border-white/20"
                        }`}
                      >
                        {/* Top Indicator */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span
                              className="text-3xl sm:text-4xl font-black font-serif italic tracking-tighter"
                              style={{ color: step.color }}
                            >
                              {step.step}
                            </span>
                            <span
                              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                              style={{
                                backgroundColor: `${step.color}20`,
                                color: step.color,
                                border: `1px solid ${step.color}40`,
                              }}
                            >
                              {step.tag}
                            </span>
                          </div>

                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{
                              backgroundColor: `${step.color}20`,
                              color: step.color,
                              border: `1px solid ${step.color}35`,
                            }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 mt-0.5 mb-3">
                          {step.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center gap-2 text-xs font-semibold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>{step.detail}</span>
                        </div>
                      </div>
                    </div>

                    {/* Central Node Badge */}
                    <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-slate-950 border-2 border-sky-400/80 text-white font-black text-xs shadow-xl z-20 shrink-0">
                      <span style={{ color: step.color }}>{step.step}</span>
                    </div>

                    {/* Spacer for 50/50 balance */}
                    <div className="hidden lg:block w-1/2" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
