"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Sparkles,
  ShieldCheck,
  Award,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { PRIMARY_STUDENT_PROFILE } from "@/lib/data-store";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SkillTwinPage() {
  const student = PRIMARY_STUDENT_PROFILE;
  const [explainOpen, setExplainOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(student.skills[0]);

  // Radar data preparation
  const radarData = student.skills.map((s) => ({
    skill: s.name.length > 18 ? s.name.substring(0, 16) + "..." : s.name,
    fullName: s.name,
    proficiency: (s.proficiency / 5) * 100,
    required: 80, // Benchmark
  }));

  // Timeline growth data
  const growthTimelineData = [
    { month: "Jan 25", level: 48 },
    { month: "Apr 25", level: 56 },
    { month: "Aug 25", level: 64 },
    { month: "Nov 25", level: 71 },
    { month: "Feb 26", level: 78 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="ayush" className="gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Digital Twin v2.4
            </Badge>
            <span className="text-xs text-slate-500">Continuous Employability Modeling</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            My Skill Twin
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            A dynamic, evidence-backed digital replica of your verified clinical proficiencies, diagnostic skills, and industry readiness.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExplainOpen(true)}
            className="text-xs gap-1 border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-100"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Why is my score 78%?
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-5">
          <p className="text-[11px] text-blue-200 font-semibold uppercase tracking-wider">
            Career Readiness Index
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-extrabold text-emerald-400">78%</span>
            <span className="text-xs text-emerald-300 font-medium">+12% vs last sem</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-2">
            Target: Clinical Research Associate
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Verified Skills</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">6</span>
            <span className="text-xs text-slate-500">/ 8 skills</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-2">
            75% of skills backed by hard evidence
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Critical Gaps</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-extrabold text-amber-600">1</span>
            <span className="text-xs text-slate-500">skill below benchmark</span>
          </div>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-2">
            Biostatistics (Level 2/5 vs req 3/5)
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>DigiLocker Trust</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-extrabold text-blue-600">100%</span>
            <span className="text-xs text-slate-500">Zero fraud risk</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            APAAR: {student.apaarId}
          </p>
        </Card>
      </div>

      {/* 3. Skill Radar & Growth Timeline Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader className="p-5 pb-2">
            <CardTitle className="text-base font-bold">Multidimensional Skill Radar</CardTitle>
            <CardDescription className="text-xs">
              Candidate capability (Blue) compared with Industry Target Benchmark (Slate).
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "#64748b", fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                  <Radar
                    name="Industry Benchmark"
                    dataKey="required"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.15}
                  />
                  <Radar
                    name="Priya Sharma"
                    dataKey="proficiency"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.45}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 text-xs text-slate-600 dark:text-slate-400 mt-2">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Candidate Competency</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-400" />
                <span>Industry Role Standard</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth Over Time Line Chart */}
        <Card>
          <CardHeader className="p-5 pb-2">
            <CardTitle className="text-base font-bold">Readiness Trajectory Over Time</CardTitle>
            <CardDescription className="text-xs">
              Continuous score evolution as evidence, assessments, and OPD rotations are logged.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthTimelineData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[40, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="level"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs text-slate-600 dark:text-slate-300 mt-2 flex items-center justify-between">
              <span>🎯 Projected readiness after Biostatistics bridge:</span>
              <span className="font-bold text-emerald-600 text-sm">92% (+14%)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Interactive Individual Skills & Evidence Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills List */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            All Competency Dimensions (Click to Inspect Evidence)
          </h3>

          <div className="space-y-2.5">
            {student.skills.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        {skill.verified ? (
                          <Badge variant="success" className="text-[9px] py-0">
                            ✓ {skill.verificationSource?.replace("_", " ")}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[9px] py-0">
                            Self-Declared
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Category: {skill.category.replace("_", " ")} &bull; AI Confidence: {skill.confidence}%
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Level {skill.proficiency} / 5
                      </span>
                      <p className="text-[10px] text-slate-400">
                        {skill.evidence.length} Evidence Links
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-3">
                    <div
                      className={`h-2 rounded-full ${
                        skill.proficiency >= 4
                          ? "bg-emerald-500"
                          : skill.proficiency === 3
                          ? "bg-blue-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Skill Evidence Panel */}
        <div>
          <Card className="sticky top-20 border-blue-200 dark:border-blue-900 shadow-md">
            <CardHeader className="p-5 pb-3 bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-slate-900 dark:to-blue-950/20">
              <div className="flex items-center justify-between">
                <Badge variant="info">Evidence Dossier</Badge>
                <span className="text-xs font-bold text-blue-700">
                  Level {selectedSkill.proficiency}/5
                </span>
              </div>
              <CardTitle className="text-sm font-bold mt-2">
                {selectedSkill.name}
              </CardTitle>
              <CardDescription className="text-xs">
                Auditable proof validating this skill against industry standards.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>AI Confidence Score:</span>
                <span className="font-bold text-emerald-600">{selectedSkill.confidence}%</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Verification Authority:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedSkill.verificationSource?.replace("_", " ") || "Self-Declared"}
                </span>
              </div>

              <div className="border-t pt-3 space-y-2.5">
                <p className="font-bold text-[11px] text-slate-500 uppercase tracking-wider">
                  Verified Records ({selectedSkill.evidence.length})
                </p>
                {selectedSkill.evidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                        {ev.title}
                      </span>
                      {ev.verified && (
                        <span className="text-[10px] text-emerald-600 font-bold">✓ Verified</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Type: {ev.type}</span>
                      {ev.score && <span>Score: {ev.score}%</span>}
                      <span>{ev.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button className="w-full text-xs bg-blue-600 hover:bg-blue-700">
                  Take Skill Advancement Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Explainable Dialog */}
      <Dialog open={explainOpen} onOpenChange={setExplainOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Explainable Skill Twin Formula</DialogTitle>
            <DialogDescription className="text-xs">
              Every score on TalentIQ is derived from auditable empirical formulas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-xs leading-relaxed">
            <p className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded font-mono text-[11px]">
              Readiness Score = 0.4 × Clinical Proficiency (4/5) + 0.3 × GCP Research (3/5) + 0.2 × Evidence Ratio (75%) + 0.1 × Academic GPA (8.85) = <strong>78%</strong>
            </p>
            <p>
              Your score is currently at <strong>78%</strong> because while your foundational Ayurvedic clinical mastery and GCP knowledge are distinguished, your <strong>Biostatistics & Analytics</strong> proficiency is at Level 2/5.
            </p>
            <p className="font-semibold text-emerald-700 dark:text-emerald-400">
              ✓ Once you complete the 4-week Biostatistics SWAYAM course and submit the capstone analysis, your Readiness Score will rise to <strong>92%</strong>.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
