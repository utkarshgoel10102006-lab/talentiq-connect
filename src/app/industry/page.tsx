"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Sparkles,
  Filter,
} from "lucide-react";
import { aiService } from "@/lib/ai/ai-service";
import confetti from "canvas-confetti";

interface GeneratedJobDescription {
  title: string;
  department: string;
  suggestedStipend: string;
  suggestedSkills: { name: string; minLevel: number }[];
  generatedDescription: string;
}

export default function IndustryDashboardPage() {
  const [activeTab, setActiveTab] = useState<"SEARCH" | "COPILOT" | "POSTINGS">("SEARCH");
  const [copilotPrompt, setCopilotPrompt] = useState("Need an AYUSH Clinical Research Intern with GCP knowledge");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedJD, setGeneratedJD] = useState<GeneratedJobDescription | null>(null);
  const [shortlisted, setShortlisted] = useState<Record<string, boolean>>({
    std_gen_1: true,
  });

  // AI-Ranked candidates
  const rankedCandidates = [
    {
      id: "std_priya_01",
      rank: "#1",
      name: "Priya Sharma",
      fit: 96,
      college: "All India Institute of Ayurveda (AIIA)",
      degree: "BAMS (3rd Year) &bull; CGPA 8.85",
      matchedSkills: [
        "Ayurvedic Clinical Diagnostics (L4)",
        "Dravyaguna (L4)",
        "ICH-GCP Protocols (L3)",
      ],
      missing: "Biostatistics (L2)",
      verified: true,
    },
    {
      id: "std_gen_1",
      rank: "#2",
      name: "Aarav Patel",
      fit: 92,
      college: "National Institute of Ayurveda (NIA), Jaipur",
      degree: "BAMS (4th Year) &bull; CGPA 8.60",
      matchedSkills: [
        "Ayurvedic Clinical Diagnostics (L4)",
        "Botanical Identification (L4)",
        "Case Report Audit (L3)",
      ],
      missing: "Biostatistics (L2)",
      verified: true,
    },
    {
      id: "std_gen_2",
      rank: "#3",
      name: "Ananya Rao",
      fit: 89,
      college: "Faculty of Ayurveda, IMS BHU Varanasi",
      degree: "B.Pharm Ayurveda &bull; CGPA 8.45",
      matchedSkills: [
        "Phytochemistry (L4)",
        "Dravyaguna (L4)",
        "Good Clinical Practice (L2)",
      ],
      missing: "Clinical Rotation (L2)",
      verified: true,
    },
    {
      id: "std_gen_3",
      rank: "#4",
      name: "Himanshu Kulkarni",
      fit: 85,
      college: "ITRA Jamnagar",
      degree: "BAMS (3rd Year) &bull; CGPA 8.10",
      matchedSkills: [
        "Classical Samhitas (L4)",
        "Clinical Observation (L3)",
      ],
      missing: "ICH-GCP Certification",
      verified: true,
    },
  ];

  const handleGenerateJD = async () => {
    setIsGenerating(true);
    try {
      const res = await aiService.generateJobDescription(copilotPrompt);
      setGeneratedJD(res);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleShortlist = (id: string) => {
    setShortlisted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="gap-1">
              <Building2 className="w-3 h-3 text-purple-600" /> Verified Industry Partner
            </Badge>
            <span className="text-xs text-slate-500">Corporate Talent Portal</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Dabur India Healthcare & R&D Hub
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Recruit pre-assessed, verified collegiate talent with explainable competency ranking.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            onClick={() => setActiveTab("COPILOT")}
            className="text-xs gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Recruiter Copilot
          </Button>
        </div>
      </div>

      {/* 2. Recruiter Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Postings</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">4</p>
          <span className="text-[10px] text-slate-500">Internships & Fellowships</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Applicants</span>
          <p className="text-2xl font-black text-blue-600 mt-1">142</p>
          <span className="text-[10px] text-blue-600 font-semibold">+18 this week</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">High-Fit Candidates (&ge;85%)</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">38</p>
          <span className="text-[10px] text-emerald-600 font-semibold">AI Pre-Ranked</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Interviews Scheduled</span>
          <p className="text-2xl font-black text-purple-600 mt-1">12</p>
          <span className="text-[10px] text-slate-500">AIIA Cohort</span>
        </Card>
      </div>

      {/* 3. Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b">
        <button
          onClick={() => setActiveTab("SEARCH")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "SEARCH"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          🔍 AI Ranked Talent Search
        </button>
        <button
          onClick={() => setActiveTab("COPILOT")}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "COPILOT"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          ✨ AI Recruiter Copilot (JD Generator)
        </button>
      </div>

      {/* TAB 1: AI RANKED TALENT SEARCH */}
      {activeTab === "SEARCH" && (
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Role: Clinical Research Associate Intern
                </span>
              </div>
              <span className="text-xs text-slate-500">
                Sorted by Explainable Candidate Competency Fit
              </span>
            </div>

            <div className="space-y-3">
              {rankedCandidates.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all bg-white dark:bg-slate-900"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                      <span className="text-sm font-black text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                        {c.rank}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {c.name}
                          </h4>
                          {c.verified && (
                            <Badge variant="success" className="text-[10px]">
                              ✓ DigiLocker Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          {c.college} &bull; <span dangerouslySetInnerHTML={{ __html: c.degree }} />
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                          <span className="font-semibold text-slate-400">Matched:</span>
                          {c.matchedSkills.map((sk, i) => (
                            <span
                              key={i}
                              className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded font-medium border border-emerald-200 dark:border-emerald-800"
                            >
                              ✓ {sk}
                            </span>
                          ))}
                          <span className="bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded font-medium border border-amber-200 dark:border-amber-800">
                            ⚠ {c.missing}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0">
                      <div className="text-right">
                        <span className="text-2xl font-black text-emerald-600">{c.fit}%</span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Role Fit</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant={shortlisted[c.id] ? "default" : "outline"}
                          onClick={() => toggleShortlist(c.id)}
                          className={`text-xs h-8 ${
                            shortlisted[c.id]
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : ""
                          }`}
                        >
                          {shortlisted[c.id] ? "✓ Shortlisted" : "Shortlist"}
                        </Button>
                        <Button size="sm" className="text-xs h-8 bg-blue-600 hover:bg-blue-700">
                          Schedule Interview
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: AI RECRUITER COPILOT */}
      {activeTab === "COPILOT" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5 space-y-4">
            <CardHeader className="p-0">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                AI Recruiter Copilot Prompt
              </CardTitle>
              <CardDescription className="text-xs">
                Enter your vacancy requirement in plain language. AI suggests essential skill competencies and auto-drafts the job description.
              </CardDescription>
            </CardHeader>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Describe the role you need to fill:
              </label>
              <textarea
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
                rows={4}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Need a Data Analyst intern or AYUSH Clinical Research Fellow..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={handleGenerateJD}
                disabled={isGenerating || !copilotPrompt.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
              >
                {isGenerating ? "Analyzing Benchmarks & Drafting..." : "Generate AI Job Description"}
              </Button>
            </div>
          </Card>

          {/* Generated Result */}
          <div>
            {!generatedJD ? (
              <Card className="h-full flex flex-col items-center justify-center p-12 text-center border-dashed border-2">
                <Sparkles className="w-8 h-8 text-slate-400 mb-2" />
                <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Awaiting Job Prompt
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Click <strong>&ldquo;Generate AI Job Description&rdquo;</strong> to view suggested skills, benchmark stipends, and draft copy.
                </p>
              </Card>
            ) : (
              <Card className="p-5 space-y-4 shadow-md border-blue-200 dark:border-blue-900 animate-in fade-in">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <Badge variant="info" className="mb-1">{generatedJD.department}</Badge>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {generatedJD.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">
                    {generatedJD.suggestedStipend}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    AI Suggested Competencies & Minimum Levels:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedJD.suggestedSkills.map((sk, i: number) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium border border-blue-200"
                      >
                        ✓ {sk.name} (Min Level {sk.minLevel}/5)
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="font-bold text-slate-500 uppercase tracking-wider">
                    Drafted Job Description:
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                    {generatedJD.generatedDescription}
                  </p>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs">
                  Publish to TalentIQ National Opportunity Marketplace &rarr;
                </Button>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
