"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Sparkles,
  Compass,
  TrendingUp,
  Award,
  ArrowRight,
  ShieldCheck,
  Flame,
  FileCheck,
  Layers,
  ChevronRight,
} from "lucide-react";
import { PRIMARY_STUDENT_PROFILE, OPPORTUNITIES } from "@/lib/data-store";

export default function StudentDashboardPage() {
  const student = PRIMARY_STUDENT_PROFILE;
  const [explainScoreOpen, setExplainScoreOpen] = useState(false);

  // Top matched opportunity
  const topMatch = OPPORTUNITIES[0]; // Dabur 92% match

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> DigiLocker & APAAR Verified Profile
              </span>
              <span className="text-xs text-blue-200">ID: {student.apaarId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome, {student.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {student.degree} &bull; {student.branch} &bull; Year {student.year} (CGPA {student.cgpa})
            </p>
            <p className="text-xs text-slate-400">
              {student.college}
            </p>
          </div>

          {/* Quick Readiness Score Widget */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 flex items-center space-x-5 shrink-0">
            <div className="text-center">
              <p className="text-[11px] text-blue-200 font-medium uppercase tracking-wider">Career Readiness</p>
              <div className="flex items-baseline justify-center space-x-1">
                <span className="text-4xl font-extrabold text-emerald-400">78</span>
                <span className="text-lg font-bold text-slate-300">%</span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5">Target: CRA</p>
            </div>
            <div className="border-l border-white/20 pl-4 space-y-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setExplainScoreOpen(true)}
                className="text-xs h-8 bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Why 78%?
              </Button>
              <Link href="/student/skill-twin" className="block">
                <Button size="sm" className="text-xs h-8 bg-emerald-500 hover:bg-emerald-600 text-white w-full">
                  Skill Twin <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Pillars Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Skill Twin */}
        <Link href="/student/skill-twin" className="group">
          <Card className="hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all h-full bg-gradient-to-b from-white to-blue-50/30 dark:from-slate-900 dark:to-slate-900/50">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <Badge variant="info">Digital Twin</Badge>
              </div>
              <CardTitle className="text-sm font-bold mt-2">My Skill Twin</CardTitle>
              <CardDescription className="text-xs">
                Interactive skill radar, 8 competencies & evidence breakdown.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                Explore Twin <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Card 2: Career GPS */}
        <Link href="/student/career-gps" className="group">
          <Card className="hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 transition-all h-full bg-gradient-to-b from-white to-emerald-50/30 dark:from-slate-900 dark:to-slate-900/50">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  <Compass className="w-5 h-5" />
                </div>
                <Badge variant="success">Roadmap</Badge>
              </div>
              <CardTitle className="text-sm font-bold mt-2">AI Career GPS</CardTitle>
              <CardDescription className="text-xs">
                Month-by-month dynamic path from BAMS to Clinical Researcher.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                View Roadmap <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Card 3: Skill Gap Analyzer */}
        <Link href="/student/skill-gap" className="group">
          <Card className="hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700 transition-all h-full bg-gradient-to-b from-white to-amber-50/30 dark:from-slate-900 dark:to-slate-900/50">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  <Layers className="w-5 h-5" />
                </div>
                <Badge variant="warning">Gap Matrix</Badge>
              </div>
              <CardTitle className="text-sm font-bold mt-2">Skill Gap Analyzer</CardTitle>
              <CardDescription className="text-xs">
                Compare skills vs industry demand & discover recommended bridge courses.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
                Analyze Gaps <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Card 4: AI Mock Interview */}
        <Link href="/student/interview" className="group">
          <Card className="hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 transition-all h-full bg-gradient-to-b from-white to-purple-50/30 dark:from-slate-900 dark:to-slate-900/50">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  <Flame className="w-5 h-5" />
                </div>
                <Badge variant="purple">AI Simulator</Badge>
              </div>
              <CardTitle className="text-sm font-bold mt-2">AI Interviewer</CardTitle>
              <CardDescription className="text-xs">
                Practice technical & behavioral questions with real-time AI scoring.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center text-xs font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
                Start Practice <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 3. Differentiator Spotlight: 92% Matched Opportunity Banner */}
      <Card className="border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl">🌿</span>
                <Badge variant="ayush">Featured Ayush Partnership</Badge>
                <Badge variant="success" className="text-xs font-black">
                  92% EXPLAINABLE AI MATCH
                </Badge>
                <span className="text-xs text-slate-500">Stipend: {topMatch.stipend}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {topMatch.title} &bull; {topMatch.company}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                  {topMatch.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-500">Matched Competencies:</span>
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">
                  ✓ Ayurvedic Clinical Knowledge (L4)
                </span>
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">
                  ✓ Dravyaguna (L4)
                </span>
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">
                  ✓ Research GCP (L3)
                </span>
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded font-medium">
                  ⚠ Biostatistics (L2 &lt; req L3)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 w-full sm:w-auto">
              <Link href="/student/opportunities">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
                  Review & Apply Now <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => setExplainScoreOpen(true)}
              >
                Inspect 92% Formula
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Active Skills Snapshot & Verified Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Top Verified Skills</CardTitle>
                  <CardDescription className="text-xs">
                    Skills backed by collegiate transcripts, assessments, and DigiLocker certificates.
                  </CardDescription>
                </div>
                <Link href="/student/skill-twin">
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                    View All 8 Skills
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              {student.skills.slice(0, 5).map((sk) => (
                <div key={sk.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {sk.name}
                      </span>
                      {sk.verified ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded font-medium flex items-center gap-0.5">
                          ✓ {sk.verificationSource?.replace("_", " ")}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                          Self-Declared
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Level {sk.proficiency} / 5 ({sk.confidence}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        sk.proficiency >= 4
                          ? "bg-emerald-500"
                          : sk.proficiency === 3
                          ? "bg-blue-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${(sk.proficiency / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Trust & Credentials status */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Trust & Verification
              </CardTitle>
              <CardDescription className="text-xs">
                Zero-fraud verifiable credential chain.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start space-x-3">
                <FileCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-200">DigiLocker Linked</p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                    BAMS Enrollment & Sem 1-4 Marksheets authenticated via NeGD gateway.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex items-start space-x-3">
                <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">Academic Bank of Credits</p>
                  <p className="text-[11px] text-blue-700 dark:text-blue-300">
                    4 Credits recorded from completed AIIA OPD clinical rotation.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Skill Growth Velocity</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    +2 skill points gained over the last 6 months through clinical rotations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Explainable Score Dialog */}
      <Dialog open={explainScoreOpen} onOpenChange={setExplainScoreOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Why is my Readiness Score 78%?
            </DialogTitle>
            <DialogDescription className="text-xs">
              Transparent, explainable AI breakdown for role: <strong>Clinical Research Associate</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg font-mono text-[11px] text-blue-900 dark:text-blue-200">
              Readiness = 0.6 × Skill Match (85%) + 0.2 × Proficiency (80%) + 0.1 × Eligibility (100%) + 0.1 × Evidence (60%) = <strong>78%</strong>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300">
                <span>✓ High Classical Knowledge & Pharmacognosy (Level 4/5)</span>
                <span className="font-bold">+35%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300">
                <span>✓ Good Clinical Practice (GCP) Protocol Certified (Level 3/5)</span>
                <span className="font-bold">+25%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300">
                <span>✓ CGPA 8.85 at AIIA (Exceeds 7.5 requirement)</span>
                <span className="font-bold">+18%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300">
                <span>⚠ Biostatistics Level 2/5 (Role requires Level 3/5)</span>
                <span className="font-bold">-12%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300">
                <span>✕ Missing Cloud Data Pipeline / SPSS Advanced Module</span>
                <span className="font-bold">-10%</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
              💡 <strong>Actionable Next Step:</strong> Complete the 4-week SWAYAM Biostatistics module on Career GPS to raise your score from <strong>78% to 92%</strong>!
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
