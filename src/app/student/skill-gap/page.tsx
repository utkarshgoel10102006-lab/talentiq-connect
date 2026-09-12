"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BookOpen,
  Code2,
  Sparkles,
} from "lucide-react";
import { PRIMARY_STUDENT_PROFILE, ROLES_CATALOG } from "@/lib/data-store";
import { aiService } from "@/lib/ai/ai-service";

export default function SkillGapPage() {
  const student = PRIMARY_STUDENT_PROFILE;
  const [selectedRole, setSelectedRole] = useState(ROLES_CATALOG[0].title);

  const gapItems = aiService.analyzeSkillGap(student.skills, selectedRole);

  const readyItems = gapItems.filter((i) => i.status === "READY");
  const needsImpItems = gapItems.filter((i) => i.status === "NEEDS_IMPROVEMENT");
  const missingItems = gapItems.filter((i) => i.status === "MISSING");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="warning" className="gap-1">
              <Layers className="w-3 h-3 text-amber-600" /> Core SIH Intelligence Engine
            </Badge>
            <span className="text-xs text-slate-500">Curriculum-to-Industry Alignment</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Skill Gap Analyzer
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Deep comparative analysis between your verified competencies and standard market prerequisites for your targeted role.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Target Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ROLES_CATALOG.map((r) => (
              <option key={r.id} value={r.title}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Gap Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              Ready Competencies
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-2">
            {readyItems.length}
          </p>
          <p className="text-[11px] text-emerald-600 mt-1">
            Fully meeting or exceeding required level
          </p>
        </Card>

        <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              Needs Advancement
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-amber-700 dark:text-amber-400 mt-2">
            {needsImpItems.length}
          </p>
          <p className="text-[11px] text-amber-600 mt-1">
            Partial foundation present, needs leveling up
          </p>
        </Card>

        <Card className="bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-wider">
              Missing Critical Skills
            </span>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-extrabold text-red-700 dark:text-red-400 mt-2">
            {missingItems.length}
          </p>
          <p className="text-[11px] text-red-600 mt-1">
            Zero current evidence or self-declaration
          </p>
        </Card>
      </div>

      {/* 3. Detailed Side-by-Side Matrix */}
      <Card>
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-base font-bold">
            Competency Gap Breakdown for: {selectedRole}
          </CardTitle>
          <CardDescription className="text-xs">
            Direct comparison between student level vs industry required benchmark.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-3">
          {gapItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    {item.status === "READY" && (
                      <Badge variant="success" className="gap-1 text-[10px]">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </Badge>
                    )}
                    {item.status === "NEEDS_IMPROVEMENT" && (
                      <Badge variant="warning" className="gap-1 text-[10px]">
                        <AlertTriangle className="w-3 h-3" /> Needs Improvement
                      </Badge>
                    )}
                    {item.status === "MISSING" && (
                      <Badge variant="destructive" className="gap-1 text-[10px]">
                        <XCircle className="w-3 h-3" /> Missing
                      </Badge>
                    )}
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.skill}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Your Level: <strong className="text-slate-800 dark:text-slate-200">{item.currentLevel}/5</strong> &bull; Industry Target: <strong className="text-slate-800 dark:text-slate-200">{item.requiredLevel}/5</strong>
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full md:w-56 space-y-1">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        item.status === "READY"
                          ? "bg-emerald-500"
                          : item.status === "NEEDS_IMPROVEMENT"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${(item.currentLevel / item.requiredLevel) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Current ({item.currentLevel})</span>
                    <span>Target ({item.requiredLevel})</span>
                  </div>
                </div>
              </div>

              {/* Actionable Interventions if Gap Exists */}
              {item.status !== "READY" && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-lg space-y-2">
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    How to close this gap:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-400">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.recommendations.courses[0].title}
                        </span>
                        <p className="text-[10px] text-slate-400">
                          {item.recommendations.courses[0].provider}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-400">
                      <Code2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{item.recommendations.projects[0]}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
