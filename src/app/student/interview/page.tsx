"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Bot,
} from "lucide-react";
import { INTERVIEW_QUESTIONS, ROLES_CATALOG } from "@/lib/data-store";
import { AIInterviewEvaluation } from "@/lib/ai/ai-service";

export default function MockInterviewPage() {
  const [selectedRole, setSelectedRole] = useState(ROLES_CATALOG[0].title);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<AIInterviewEvaluation | null>(null);

  const currentQ = INTERVIEW_QUESTIONS[currentIdx] || INTERVIEW_QUESTIONS[0];

  const handleEvaluate = async () => {
    if (!answerText.trim()) return;
    setIsEvaluating(true);

    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQ.question,
          answer: answerText,
          role: selectedRole,
        }),
      });
      const data = await res.json();
      if (data.evaluation) {
        setEvaluation(data.evaluation);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    setAnswerText("");
    setEvaluation(null);
    setCurrentIdx((prev) => (prev + 1) % INTERVIEW_QUESTIONS.length);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="purple" className="gap-1">
              <Mic className="w-3 h-3" /> AI Interview Simulator
            </Badge>
            <span className="text-xs text-slate-500">Autonomous Domain Evaluator</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            AI Mock Interviewer
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Simulate real industry interviews tailored to your role. Receive instant evaluation on communication, clinical accuracy, and reasoning.
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

      {/* 2. Interview Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Interactive Q&A Session */}
        <Card className="flex flex-col">
          <CardHeader className="p-5 pb-3 border-b bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="info">{currentQ.type} QUESTION</Badge>
                <span className="text-xs text-slate-400">
                  Question {currentIdx + 1} of {INTERVIEW_QUESTIONS.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextQuestion}
                className="text-xs text-slate-500 hover:text-blue-600"
              >
                Skip Question &rarr;
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 flex-1 flex flex-col space-y-4">
            {/* Interviewer Prompt Bubble */}
            <div className="flex items-start space-x-3 p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-blue-900 dark:text-blue-200">AI Senior Interviewer:</p>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  &ldquo;{currentQ.question}&rdquo;
                </p>
              </div>
            </div>

            {/* Answer Input */}
            <div className="flex-1 flex flex-col space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium">Your Response:</span>
                <span className="text-[11px] text-slate-400">
                  Voice input module: text-enabled for hackathon demo
                </span>
              </div>

              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                rows={10}
                placeholder="Type your structured answer here... (Tip: Highlight ethical clearances, randomized clinical trial protocols, or relevant classical parameters)"
                className="w-full flex-1 p-3.5 text-xs font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
              />
            </div>

            {/* Quick Sample Response Insertion (For 30-second SIH demo) */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setAnswerText(
                    "To design this clinical trial, I would first obtain institutional ethics committee approval and register the protocol on CTRI. We would conduct a double-blind, randomized, placebo-controlled study with 120 cohorts divided into standard-of-care plus Ayurvedic botanical extract vs placebo. Primary endpoints would quantify HbA1c reductions and fasting glucose, while secondary endpoints correlate Prakriti phenotypes with biomarker responses per ICH-GCP guidelines."
                  )
                }
                className="text-[11px] text-blue-600 hover:underline font-medium"
              >
                ⚡ Insert Sample Professional Response
              </button>

              <Button
                onClick={handleEvaluate}
                disabled={isEvaluating || !answerText.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-xs px-5"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 mr-2" />
                    Evaluate Response
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: AI Feedback Report */}
        <div>
          {!evaluation ? (
            <Card className="h-full flex flex-col items-center justify-center p-12 text-center border-dashed border-2">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mb-3">
                <Mic className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                Awaiting Candidate Response
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Submit an answer or click <strong>&ldquo;Insert Sample Professional Response&rdquo;</strong> to trigger real-time AI scoring across 4 professional dimensions.
              </p>
            </Card>
          ) : (
            <Card className="space-y-4 p-5 shadow-lg border-purple-200 dark:border-purple-900 animate-in fade-in">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <Badge variant="purple" className="mb-1">AI Evaluation Dossier</Badge>
                  <CardTitle className="text-base font-bold">
                    Interview Performance: {evaluation.overallScore}%
                  </CardTitle>
                </div>
                <Button
                  size="sm"
                  onClick={handleNextQuestion}
                  className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                >
                  Next Question &rarr;
                </Button>
              </div>

              {/* 4 Score Dimensions Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                  <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300">
                    Communication
                  </span>
                  <p className="text-xl font-extrabold text-blue-900 dark:text-blue-100">
                    {evaluation.communicationScore}%
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">
                    Technical Rigor
                  </span>
                  <p className="text-xl font-extrabold text-emerald-900 dark:text-emerald-100">
                    {evaluation.technicalScore}%
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
                  <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300">
                    Confidence
                  </span>
                  <p className="text-xl font-extrabold text-purple-900 dark:text-purple-100">
                    {evaluation.confidenceScore}%
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                  <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300">
                    Problem Solving
                  </span>
                  <p className="text-xl font-extrabold text-amber-900 dark:text-amber-100">
                    {evaluation.problemSolvingScore}%
                  </p>
                </div>
              </div>

              {/* Model Summary */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 italic border">
                &ldquo;{evaluation.modelFeedback}&rdquo;
              </div>

              {/* Strengths & Improvements */}
              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Key Strengths:
                  </h4>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-300 pl-2">
                    {evaluation.strengths.map((str: string, i: number) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-emerald-600 font-bold">&bull;</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Recommended Upgrades:
                  </h4>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-300 pl-2">
                    {evaluation.improvements.map((imp: string, i: number) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-amber-600 font-bold">&bull;</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
