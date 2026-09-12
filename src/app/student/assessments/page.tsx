"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  ArrowRight,
  Award,
} from "lucide-react";
import { ASSESSMENT_QUESTIONS } from "@/lib/data-store";
import { AssessmentQuestion } from "@/types";
import confetti from "canvas-confetti";

export default function AssessmentsPage() {
  const availableSkills = Object.keys(ASSESSMENT_QUESTIONS);
  const [selectedSkill, setSelectedSkill] = useState<string>(availableSkills[0]);
  const [inProgress, setInProgress] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("EASY");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ isCorrect: boolean; difficulty: string }[]>([]);

  const questionsList = ASSESSMENT_QUESTIONS[selectedSkill] || [];
  // Pick question by difficulty or current index
  const currentQuestion: AssessmentQuestion =
    questionsList.find((q) => q.difficulty === currentDifficulty) || questionsList[currentQuestionIdx] || questionsList[0];

  const handleStart = () => {
    setInProgress(true);
    setCompleted(false);
    setCurrentDifficulty("EASY");
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setAnswersLog([]);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);

    const updatedLog = [...answersLog, { isCorrect, difficulty: currentDifficulty }];
    setAnswersLog(updatedLog);

    // Adaptive difficulty logic:
    if (isCorrect) {
      if (currentDifficulty === "EASY") setCurrentDifficulty("MEDIUM");
      else if (currentDifficulty === "MEDIUM") setCurrentDifficulty("HARD");
    } else {
      if (currentDifficulty === "HARD") setCurrentDifficulty("MEDIUM");
      else if (currentDifficulty === "MEDIUM") setCurrentDifficulty("EASY");
    }

    if (updatedLog.length >= 3) {
      setCompleted(true);
      setInProgress(false);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      setSelectedOption(null);
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const finalPercentage = Math.round((score / 3) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="warning" className="gap-1">
              <Flame className="w-3 h-3 text-amber-600" /> Adaptive Testing Engine
            </Badge>
            <span className="text-xs text-slate-500">Item Response Theory &bull; Anti-Cheating</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Skill Assessments
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Take adaptive assessments to prove competencies and convert self-declared skills into tamper-proof verified credentials.
          </p>
        </div>
      </div>

      {/* 2. Assessment Module */}
      {!inProgress && !completed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Badge variant="ayush">Domain Diagnostic</Badge>
              <h3 className="text-lg font-bold">Ayurvedic Clinical Knowledge Assessment</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluates your diagnostic methodology, classical textual understanding, and clinical trial formulation reasoning.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t pt-3">
              <div className="flex justify-between">
                <span>Adaptive Level:</span>
                <span className="font-semibold text-blue-600">Dynamic (Easy &rarr; Hard)</span>
              </div>
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-semibold">3 Adaptive Problems</span>
              </div>
              <div className="flex justify-between">
                <span>Credential Earned:</span>
                <span className="font-semibold text-emerald-600">Verified Clinical Badge</span>
              </div>
            </div>

            <Button
              onClick={() => {
                setSelectedSkill("Ayurvedic Clinical Knowledge");
                handleStart();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
            >
              Start Clinical Assessment <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Badge variant="info">Technical Diagnostic</Badge>
              <h3 className="text-lg font-bold">Data Analytics & Biostatistics Diagnostic</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluates parametric hypothesis testing, p-values, Kaplan-Meier curves, and clinical trial cohort metrics.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t pt-3">
              <div className="flex justify-between">
                <span>Adaptive Level:</span>
                <span className="font-semibold text-blue-600">Dynamic (Easy &rarr; Hard)</span>
              </div>
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-semibold">3 Adaptive Problems</span>
              </div>
              <div className="flex justify-between">
                <span>Target Skill:</span>
                <span className="font-semibold text-amber-600">Biostatistics (Bridge Gap)</span>
              </div>
            </div>

            <Button
              onClick={() => {
                setSelectedSkill("Data Analytics & Biostatistics");
                handleStart();
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-xs text-white"
            >
              Start Biostatistics Assessment <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Card>
        </div>
      )}

      {/* 3. In-Progress Question Card */}
      {inProgress && currentQuestion && (
        <Card className="max-w-2xl mx-auto shadow-xl border-blue-200 dark:border-blue-900 animate-in fade-in">
          <CardHeader className="p-5 pb-3 border-b bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="info">{selectedSkill}</Badge>
                <Badge
                  variant={
                    currentDifficulty === "HARD"
                      ? "destructive"
                      : currentDifficulty === "MEDIUM"
                      ? "warning"
                      : "success"
                  }
                  className="text-[10px]"
                >
                  Difficulty: {currentDifficulty}
                </Badge>
              </div>
              <span className="text-xs font-bold text-slate-500">
                Question {answersLog.length + 1} of 3
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
              {currentQuestion.question}
            </h3>

            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                    selectedOption === idx
                      ? "border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-950 dark:text-blue-200 shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        selectedOption === idx
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>

          <CardFooter className="p-5 border-t bg-slate-50/50 dark:bg-slate-800/30 flex justify-between">
            <span className="text-[11px] text-slate-400">
              💡 Correct answers adaptively increase problem difficulty
            </span>
            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="bg-blue-600 hover:bg-blue-700 text-xs px-6"
            >
              {answersLog.length === 2 ? "Finish Assessment" : "Submit Answer &rarr;"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* 4. Completed Result Card */}
      {completed && (
        <Card className="max-w-xl mx-auto p-6 text-center space-y-5 shadow-xl border-emerald-200 dark:border-emerald-900">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Award className="w-9 h-9" />
          </div>

          <div>
            <Badge variant="success" className="mb-2">Verified Assessment Result</Badge>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Assessment Completed!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Evaluated on {selectedSkill}
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Overall Accuracy:</span>
              <span className="font-extrabold text-emerald-600 text-base">{finalPercentage}%</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Verified Skill Level:</span>
              <span className="font-bold text-blue-600">
                {finalPercentage >= 66 ? "Level 4 / 5 (Advanced)" : "Level 3 / 5 (Proficient)"}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Skill Twin Status:</span>
              <span className="text-emerald-600 font-semibold">✓ Automatically Promoted</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 text-left">
            🎯 <strong>Recommended Next Step:</strong> Apply this verified skill to the Dabur India clinical trial internship or undertake the advanced Phytochemistry project.
          </div>

          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={handleStart}
              className="flex-1 text-xs"
            >
              Retake Assessment
            </Button>
            <Button
              onClick={() => setCompleted(false)}
              className="flex-1 text-xs bg-blue-600 hover:bg-blue-700"
            >
              Back to Catalog
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
