"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  RefreshCw,
  FileText,
} from "lucide-react";
import { aiService, AICurriculumAnalysis } from "@/lib/ai/ai-service";
import confetti from "canvas-confetti";

export default function FacultyPage() {
  const [syllabusText, setSyllabusText] = useState(
    `DEPARTMENT OF DRAVYAGUNA & CLINICAL RESEARCH
All India Institute of Ayurveda, New Delhi
Course: BAMS 3rd Professional Syllabus (Integrative Pharmacology)

MODULE 1: Classical Dravyaguna Principles
- Rasa, Guna, Virya, Vipaka, Prabhava evaluation
- Identification of 120 medicinal plants according to Bhavaprakasha Nighantu
- Classical extraction methods (Kashaya, Asava, Arishta, Taila)

MODULE 2: Ayurvedic Diagnostics & Clinical Observation
- Roga Nidana principles & Rogi Pariksha (Ashtavidha Pariksha)
- Pulse assessment foundations (Nadi Pariksha)
- Basic outpatient case documentation

MODULE 3: Modern Human Anatomy & Physiology Correlation
- Hepatic and renal pharmacokinetic pathways
- Preliminary in-vitro screening protocols
- Standard toxicology endpoints`
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [curriculumResult, setCurriculumResult] = useState<AICurriculumAnalysis | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const res = await aiService.analyzeCurriculum(syllabusText);
      setCurriculumResult(res);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="info" className="gap-1">
              <BookOpen className="w-3 h-3" /> Academia-Industry Curriculum Intelligence
            </Badge>
            <span className="text-xs text-slate-500">Major Differentiator from Job Portals</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            AI Curriculum Analyzer & Collaboration Hub
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Upload or paste academic syllabus. Our AI evaluates curricular alignment against real-time industry job demand and suggests modern accredited bridge modules.
          </p>
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-blue-600 hover:bg-blue-700 text-xs shadow-sm"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
              Benchmarking Against Industry...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Analyze Syllabus Alignment
            </>
          )}
        </Button>
      </div>

      {/* 2. Syllabus Analyzer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Syllabus Input */}
        <Card className="flex flex-col">
          <CardHeader className="p-5 pb-3 border-b bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <CardTitle className="text-sm font-bold">College Syllabus / Module Outline</CardTitle>
              </div>
              <span className="text-[11px] text-slate-400">PDF text or draft syllabus</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col space-y-3">
            <textarea
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              rows={18}
              className="w-full flex-1 p-3.5 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
            />
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
            >
              Run AI Curriculum Evaluation
            </Button>
          </CardContent>
        </Card>

        {/* Right: AI Alignment Output */}
        <div>
          {!curriculumResult ? (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center border-dashed border-2">
              <BookOpen className="w-10 h-10 text-slate-300 mb-2" />
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                Awaiting Syllabus Analysis
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Click <strong>&ldquo;Analyze Syllabus Alignment&rdquo;</strong> to discover covered skills, missing industrial competencies, and recommended regulatory additions.
              </p>
            </Card>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              {/* Alignment Score */}
              <Card className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-200">
                      Industry Alignment Index
                    </span>
                    <h3 className="text-3xl font-black text-emerald-400">
                      {curriculumResult.industryAlignmentScore}%
                    </h3>
                    <p className="text-xs text-slate-300">
                      {curriculumResult.courseTitle}
                    </p>
                  </div>
                  <Badge variant="ayush" className="text-xs">
                    NEP 2020 Validated
                  </Badge>
                </div>
              </Card>

              {/* Covered vs Missing */}
              <Card className="p-4 space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Well-Covered Competencies:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {curriculumResult.coveredSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200"
                      >
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="font-bold text-red-700 dark:text-red-400 mb-1 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Missing Industry Requirements:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {curriculumResult.missingSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300 px-2 py-0.5 rounded text-[11px] font-medium border border-red-200"
                      >
                        ✕ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Emerging Frontiers to Integrate:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {curriculumResult.emergingSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300 px-2 py-0.5 rounded text-[11px] font-medium border border-purple-200"
                      >
                        ✨ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Recommended Modules */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Recommended Additions:
                </p>
                {curriculumResult.recommendedModules.map((mod, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950 dark:text-blue-100">
                        {mod.title}
                      </span>
                      <Badge variant="info" className="text-[10px]">
                        Suggested Partner: {mod.suggestedIndustryPartner}
                      </Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{mod.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Industry Collaboration Hub (Faculty Sabbaticals, PoP, Sponsored R&D) */}
      <Card className="p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-base font-bold">Faculty–Industry Collaboration Hub</CardTitle>
          <CardDescription className="text-xs">
            Discover sponsored industrial research, Professor of Practice (PoP) openings, and Faculty Development Programs (FDPs).
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-900">
            <Badge variant="secondary">Industrial FDP</Badge>
            <h4 className="font-bold text-slate-900 dark:text-white">
              Advanced Clinical Trial Biostatistics for Faculty
            </h4>
            <p className="text-slate-500 text-[11px]">
              Sponsored by Dabur R&D & CCRAS &bull; 2-Week Intensive Hands-on Workshop with SPSS & Python.
            </p>
            <Button size="sm" variant="outline" className="w-full text-xs">
              Apply for Fellowship
            </Button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-900">
            <Badge variant="purple">Professor of Practice (PoP)</Badge>
            <h4 className="font-bold text-slate-900 dark:text-white">
              Pharma Quality Control & HPTLC Instrumentation
            </h4>
            <p className="text-slate-500 text-[11px]">
              Himalaya Wellness Corporate Guest Lectureship for 5th Semester Scholars.
            </p>
            <Button size="sm" variant="outline" className="w-full text-xs">
              Host Industry Expert
            </Button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-900">
            <Badge variant="ayush">Sponsored R&D</Badge>
            <h4 className="font-bold text-slate-900 dark:text-white">
              Ayurgenomics & Botanical Marker Standardization
            </h4>
            <p className="text-slate-500 text-[11px]">
              ₹15,00,000 Industry-Academia Joint Research Grant &bull; Apply by April 2026.
            </p>
            <Button size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700">
              Submit Joint Proposal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
