"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  RefreshCw,
} from "lucide-react";
import { AIResumeAnalysis } from "@/lib/ai/ai-service";
import confetti from "canvas-confetti";

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState(
    `PRIYA SHARMA
Candidate for BAMS (Bachelor of Ayurvedic Medicine & Surgery)
All India Institute of Ayurveda (AIIA), New Delhi | CGPA: 8.85
Email: student@demo.com | Phone: +91 98765 43210

PROFILE SUMMARY:
Dedicated Ayurvedic clinical researcher with deep training in classical textual diagnostics (Charaka Samhita), Dravyaguna (botanical pharmacology), and Good Clinical Practice (ICH-GCP) protocols. Seeking Clinical Research Associate (CRA) internship in botanical clinical trials.

EDUCATION:
- BAMS, All India Institute of Ayurveda, New Delhi (2023 - 2027) - CGPA: 8.85
- Senior Secondary (CBSE Science Stream) - 94.2%

CORE CLINICAL & TECHNICAL SKILLS:
- Ayurvedic Clinical Diagnostics (Roga Nidana & Prakriti assessment)
- Dravyaguna (Herbal Pharmacology, botanical identification)
- Clinical Research & ICH-GCP trial documentation
- Medical Sanskrit & classical textual references
- Data Analytics & Biostatistics (SPSS basics, MS Excel)
- Python for health data parsing (Foundational)

PROJECTS & CLINICAL ROTATIONS:
1. Observational Study on Standardized Ashwagandha in Stress Biometrics (AIIA OPD)
   - Assisted senior investigators in reviewing Case Report Forms (CRFs) for 60 patient cohorts.
   - Evaluated serum cortisol correlation with subjective Manasa Bhava clinical scales.
2. Phytochemical Profiling of Himalayan Anti-Inflammatory Polyherbal Extracts
   - Conducted laboratory thin-layer chromatography and yield assessments.

CERTIFICATIONS:
- Good Clinical Practice (GCP) Certification - NIDA Clinical Trials Network
- DigiLocker Verified Marksheet Credential (APAAR: 2024-9981-4412)`
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIResumeAnalysis | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/ai/resume-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: resumeText }),
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysisResult(data.analysis);
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      }
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
            <Badge variant="purple" className="gap-1">
              <Sparkles className="w-3 h-3" /> AI NLP Parser & ATS Optimizer
            </Badge>
            <span className="text-xs text-slate-500">Zero Manual Data Entry</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            AI Resume Analyzer
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Upload or paste your resume. Our AI NLP engine extracts structured skill objects, detects missing evidence, and suggests targeted resume upgrades.
          </p>
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-blue-600 hover:bg-blue-700 text-xs px-5 shadow-sm"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
              Analyzing with NLP...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Extract Skills & Score Resume
            </>
          )}
        </Button>
      </div>

      {/* 2. Main Workspace: Input vs Extracted Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Editor */}
        <Card className="flex flex-col h-full">
          <CardHeader className="p-5 pb-3 bg-slate-50/70 dark:bg-slate-800/40 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <CardTitle className="text-sm font-bold">Resume Content / Paste Box</CardTitle>
              </div>
              <span className="text-[11px] text-slate-400">PDF text or raw text</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col space-y-3">
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={22}
              className="w-full flex-1 p-3.5 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-none"
              placeholder="Paste raw resume text here..."
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Characters: {resumeText.length}</span>
              <Button
                size="sm"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="text-xs bg-blue-600 hover:bg-blue-700"
              >
                Run AI Extraction
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: AI Output Structure */}
        <div className="space-y-4">
          {!analysisResult ? (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center border-dashed border-2">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center mb-3">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                Ready for AI Extraction
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Click <strong>&ldquo;Extract Skills & Score Resume&rdquo;</strong> to run our multi-pass NLP extraction on the sample BAMS resume.
              </p>
              <Button
                size="sm"
                onClick={handleAnalyze}
                className="mt-4 text-xs bg-blue-600 hover:bg-blue-700"
              >
                Trigger Demo Extraction
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* ATS Score Banner */}
              <Card className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-200">
                      Overall ATS Readiness Score
                    </span>
                    <h3 className="text-2xl font-black text-emerald-400">
                      {analysisResult.overallAtsScore} / 100
                    </h3>
                    <p className="text-xs text-slate-300">
                      High match probability for AYUSH Clinical Research Associate roles.
                    </p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl text-center">
                    <span className="text-xs font-bold text-white">Skills Detected</span>
                    <p className="text-xl font-extrabold text-emerald-400">
                      {analysisResult.technicalSkills.length + analysisResult.softSkills.length}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Extracted Structured Skills */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    AI-Extracted Structured Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2">
                  {analysisResult.technicalSkills.map((sk, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {sk.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-500">
                        <span>Confidence: {sk.confidence}%</span>
                        <Badge variant="info" className="text-[10px]">
                          Level {sk.proficiency}/5
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Suggestions to Improve Resume */}
              <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/30 dark:bg-amber-950/20">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <CardTitle className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                      Targeted Resume Upgrades (AI Advisor)
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2 text-xs text-amber-950 dark:text-amber-200">
                  {analysisResult.suggestions.map((sug, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <span className="font-bold text-amber-600">&bull;</span>
                      <span>{sug}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
