"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  AlertTriangle,
  Lightbulb,
  Filter,
  Download,
  Calendar,
} from "lucide-react";
import { TPO_HEATMAP_DATA, SEEDED_STUDENTS_LIST } from "@/lib/data-store";

export default function TpoDashboardPage() {
  const [filterDept, setFilterDept] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"HEATMAP" | "STUDENTS" | "PIPELINE">("HEATMAP");

  const filteredStudents = SEEDED_STUDENTS_LIST.filter((s) => {
    const matchesDept = filterDept === "ALL" || s.department.includes(filterDept);
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const getHeatmapColor = (score: number) => {
    if (score >= 75) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300";
    if (score >= 55) return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300";
    return "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300";
  };

  const getHeatmapIndicator = (score: number) => {
    if (score >= 75) return "🟢";
    if (score >= 55) return "🟡";
    return "🔴";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="warning" className="gap-1">
              <Shield className="w-3 h-3 text-amber-600" /> Institutional Intelligence Command Center
            </Badge>
            <span className="text-xs text-slate-500">All India Institute of Ayurveda & Affiliated Colleges</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Placement Intelligence Command Center
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Real-time batch readiness metrics, cross-department skill gap heatmaps, and AI-recommended curriculum interventions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <Download className="w-3.5 h-3.5" /> One-Click TPO Report (PDF)
          </Button>
          <Button size="sm" className="text-xs gap-1 bg-blue-600 hover:bg-blue-700 text-white">
            <Calendar className="w-3.5 h-3.5" /> Schedule Campus Drive
          </Button>
        </div>
      </div>

      {/* 2. Command Center KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3.5">
        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Batch Cohort</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">1,240</p>
          <span className="text-[10px] text-slate-500">5 Departments</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Avg Readiness</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">74.2%</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+8.4% this year</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Internship Placed</span>
          <p className="text-2xl font-black text-blue-600 mt-1">428</p>
          <span className="text-[10px] text-slate-500">Active Rotations</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Applications</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">2,890</p>
          <span className="text-[10px] text-slate-500">Via TalentIQ Portal</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Shortlisted</span>
          <p className="text-2xl font-black text-purple-600 mt-1">840</p>
          <span className="text-[10px] text-purple-600 font-semibold">29% conversion</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Confirmed Offers</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">312</p>
          <span className="text-[10px] text-slate-500">FTE + Stipends</span>
        </Card>
      </div>

      {/* 3. Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b">
        <button
          onClick={() => setActiveTab("HEATMAP")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "HEATMAP"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          🔥 Skill Gap Heatmap (Department Matrix)
        </button>
        <button
          onClick={() => setActiveTab("PIPELINE")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "PIPELINE"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          📊 Recruitment Funnel & Missing Skills
        </button>
        <button
          onClick={() => setActiveTab("STUDENTS")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "STUDENTS"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          👥 Candidate Roster & Readiness (50 Students)
        </button>
      </div>

      {/* TAB 1: SKILL GAP HEATMAP */}
      {activeTab === "HEATMAP" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="p-5 pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-bold">
                    Institutional Competency Heatmap
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Cross-departmental proficiency distribution highlighting critical curricular deficits (Green = Proficient, Yellow = Developing, Red = High Deficit).
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span>🟢 &ge; 75%</span>
                  <span>🟡 55-74%</span>
                  <span>🔴 &lt; 55%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-0 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b bg-slate-50 dark:bg-slate-800/60 text-slate-500">
                    <th className="p-3 font-semibold">Department</th>
                    <th className="p-3 font-semibold text-center">Clinical Diagnostics</th>
                    <th className="p-3 font-semibold text-center">Herbal Pharmacology</th>
                    <th className="p-3 font-semibold text-center">Panchakarma Protocol</th>
                    <th className="p-3 font-semibold text-center">Biostatistics & Analytics</th>
                    <th className="p-3 font-semibold text-center">Research GCP</th>
                    <th className="p-3 font-semibold text-center">Medical Communication</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {TPO_HEATMAP_DATA.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        {row.department}
                      </td>
                      {Object.entries(row.skills).map(([, val], idx) => (
                        <td key={idx} className="p-3 text-center">
                          <span
                            className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold border ${getHeatmapColor(
                              val
                            )}`}
                          >
                            <span>{getHeatmapIndicator(val)}</span>
                            <span>{val}%</span>
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Top 5 Missing Skills & Recommended Intervention */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Top 5 Skills Missing Across Current 2026 Batch
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200 border border-red-200 dark:border-red-900">
                  <span className="font-semibold">1. Biostatistics & Health Analytics</span>
                  <span className="font-bold">62% students lacking</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200 border border-red-200 dark:border-red-900">
                  <span className="font-semibold">2. ICH-GCP Regulatory Trial Documentation</span>
                  <span className="font-bold">48% students lacking</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900">
                  <span className="font-semibold">3. HPLC / HPTLC Lab Instrumentation</span>
                  <span className="font-bold">41% students lacking</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900">
                  <span className="font-semibold">4. Electronic Health Records (EHR) Telemedicine</span>
                  <span className="font-bold">38% students lacking</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  <span className="font-semibold">5. Python for Biomedical Data Analysis</span>
                  <span className="font-bold">35% students lacking</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-3 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-slate-900 dark:to-blue-950/20 border-blue-200 dark:border-blue-900">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100">
                  AI-Recommended Curricular Intervention
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Based on active recruiter mandates from <strong>Dabur, Himalaya, and TCS HealthTech</strong>:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800 text-xs space-y-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  🚀 Launch 4-Week &ldquo;Biostatistics & Clinical Research GCP Bridge Program&rdquo;
                </p>
                <p className="text-[11px] text-slate-500">
                  Target cohort: 3rd & 4th Year BAMS and B.Pharm students (approx. 240 scholars). Partner with SWAYAM Plus for automated ABC credit issuance upon completion.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-600 font-bold">
                    Projected placement lift: +24%
                  </span>
                  <Button size="sm" className="h-7 text-[11px] bg-blue-600 hover:bg-blue-700">
                    Deploy Bridge Course
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: PIPELINE FUNNEL */}
      {activeTab === "PIPELINE" && (
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold">Institutional Placement Pipeline Funnel</CardTitle>
            <CardDescription className="text-xs">
              Conversion throughput from application submissions to verified job offers.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                <span className="text-xs font-semibold text-blue-600">Stage 1: Applications</span>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">2,890</p>
                <span className="text-[10px] text-slate-500">100% Volume</span>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
                <span className="text-xs font-semibold text-purple-600">Stage 2: Shortlisted</span>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">840</p>
                <span className="text-[10px] text-purple-600 font-bold">29.0% Pass Rate</span>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                <span className="text-xs font-semibold text-amber-600">Stage 3: Interviewed</span>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">492</p>
                <span className="text-[10px] text-amber-600 font-bold">58.5% of Shortlists</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
                <span className="text-xs font-semibold text-emerald-600">Stage 4: Offers Issued</span>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">312</p>
                <span className="text-[10px] text-emerald-600 font-bold">63.4% Final Conversion</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 3: CANDIDATE ROSTER (50 Students) */}
      {activeTab === "STUDENTS" && (
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="text-xs border rounded-lg p-2 bg-white dark:bg-slate-900"
              >
                <option value="ALL">All Departments (AYUSH + STEM)</option>
                <option value="Dravyaguna">Dravyaguna (Herbal)</option>
                <option value="Panchakarma">Panchakarma</option>
                <option value="Computer Science">Computer Science</option>
                <option value="AI & Data Science">AI & Data Science</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search student or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs border rounded-lg p-2 w-full sm:w-64 bg-white dark:bg-slate-900"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b bg-slate-50 dark:bg-slate-800/60 text-slate-500">
                  <th className="p-3">Student Name</th>
                  <th className="p-3">College & Department</th>
                  <th className="p-3">Year / CGPA</th>
                  <th className="p-3">Career Readiness</th>
                  <th className="p-3">Verified Skills</th>
                  <th className="p-3">Placement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStudents.slice(0, 15).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      {s.name}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      <p className="font-medium">{s.department}</p>
                      <p className="text-[10px] text-slate-400 truncate max-w-xs">{s.college}</p>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      Year {s.year} &bull; {s.cgpa} CGPA
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                          {s.readinessScore}%
                        </span>
                        <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              s.readinessScore >= 75 ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${s.readinessScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="info" className="text-[10px]">
                        {s.verifiedSkillsCount} Verified
                      </Badge>
                    </td>
                    <td className="p-3">
                      {s.internshipPlaced ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          ✓ Placed
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium">In Pipeline</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
