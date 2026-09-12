"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  MapPin,
  Calendar,
  IndianRupee,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { OPPORTUNITIES, PRIMARY_STUDENT_PROFILE } from "@/lib/data-store";
import { Opportunity, MatchResult } from "@/types";
import { aiService } from "@/lib/ai/ai-service";
import confetti from "canvas-confetti";

type OpportunityWithMatch = Opportunity & { match: MatchResult };

export default function OpportunitiesPage() {
  const student = PRIMARY_STUDENT_PROFILE;
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [matchModalData, setMatchModalData] = useState<{ opp: Opportunity; result: MatchResult } | null>(null);
  const [appliedOpps, setAppliedOpps] = useState<Record<string, boolean>>({
    opp_1: true, // Dabur already shortlisted in demo
    opp_4: true, // AIIA OPD already selected in demo
  });
  const [applySuccessOpp, setApplySuccessOpp] = useState<OpportunityWithMatch | null>(null);

  // Compute matches for all opportunities
  const opportunitiesWithMatches = OPPORTUNITIES.map((opp) => {
    const match = aiService.calculateMatch(student, opp);
    return { ...opp, match };
  }).sort((a, b) => b.match.matchScore - a.match.matchScore);

  const filteredOpps =
    selectedType === "ALL"
      ? opportunitiesWithMatches
      : opportunitiesWithMatches.filter((o) => o.type === selectedType);

  const handleApply = (opp: OpportunityWithMatch) => {
    setAppliedOpps((prev) => ({ ...prev, [opp.id]: true }));
    setApplySuccessOpp(opp);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const categories = [
    { id: "ALL", label: "All Opportunities" },
    { id: "INTERNSHIP", label: "Internships" },
    { id: "RESEARCH_PROJECT", label: "Research Projects" },
    { id: "LIVE_PROJECT", label: "Live Projects" },
    { id: "JOB", label: "Full-Time Jobs" },
    { id: "HACKATHON", label: "Hackathons" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="info" className="gap-1">
              <Sparkles className="w-3 h-3" /> Explainable Opportunity Marketplace
            </Badge>
            <span className="text-xs text-slate-500">Industry-Academia Match Matrix</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Matched Opportunities
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Each opportunity is matched against your continuously evolving Skill Digital Twin using transparent, explainable weights.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedType(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedType === cat.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Opportunities Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredOpps.map((opp) => {
          const match = opp.match;
          const isApplied = !!appliedOpps[opp.id];

          return (
            <Card
              key={opp.id}
              className={`border transition-all hover:shadow-md ${
                match.matchScore >= 85
                  ? "border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-r from-white via-white to-emerald-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                  {/* Left Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xl">{opp.companyLogo}</span>
                      <Badge variant="secondary" className="text-[10px] font-bold">
                        {opp.type.replace("_", " ")}
                      </Badge>
                      {opp.isAyushSpecific && (
                        <Badge variant="ayush" className="text-[10px]">
                          🌿 AYUSH Recognized
                        </Badge>
                      )}
                      <span className="text-xs text-slate-500 font-medium">
                        {opp.company}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {opp.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {opp.description}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{opp.location} {opp.isRemote && "(Remote Eligible)"}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{opp.stipend}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Deadline: {opp.deadline}</span>
                      </div>
                    </div>

                    {/* Skills Required pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      <span className="text-[11px] font-semibold text-slate-400">Required:</span>
                      {opp.requiredSkills.map((req, idx) => {
                        const hasSkill = match.matchedSkills.includes(req.name);
                        const partial = match.partialSkills.includes(req.name);
                        return (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                              hasSkill
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : partial
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {hasSkill ? "✓ " : partial ? "⚠ " : "✕ "}
                            {req.name} (L{req.minLevel})
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Match Score & Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 w-full lg:w-48 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-3 lg:pt-0 lg:pl-5">
                    <div className="text-center lg:text-right">
                      <div className="flex items-center justify-center lg:justify-end space-x-1">
                        <span
                          className={`text-2xl font-black ${
                            match.matchScore >= 85
                              ? "text-emerald-600"
                              : match.matchScore >= 70
                              ? "text-blue-600"
                              : "text-amber-600"
                          }`}
                        >
                          {match.matchScore}%
                        </span>
                        <span className="text-xs font-bold text-slate-500">MATCH</span>
                      </div>
                      <button
                        onClick={() => setMatchModalData({ opp, result: match })}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center justify-center lg:justify-end gap-1 mt-0.5"
                      >
                        <HelpCircle className="w-3 h-3" />
                        Why {match.matchScore}%?
                      </button>
                    </div>

                    <div className="w-full space-y-1.5">
                      {isApplied ? (
                        <Button
                          disabled
                          className="w-full text-xs h-9 bg-emerald-600 text-white opacity-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Applied
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleApply(opp)}
                          className="w-full text-xs h-9 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Apply with Skill Twin <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Why Match Dialog */}
      {matchModalData && (
        <Dialog open={!!matchModalData} onOpenChange={() => setMatchModalData(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Why {matchModalData.result.matchScore}% Match Score?
              </DialogTitle>
              <DialogDescription className="text-xs">
                Formula-backed explanation for <strong>{matchModalData.opp.title}</strong> at {matchModalData.opp.company}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 text-xs">
              {/* Formula */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-[11px] font-mono text-blue-900 dark:text-blue-200">
                {matchModalData.result.formula}
              </div>

              {/* Factors Breakdown */}
              <div className="space-y-1.5">
                <p className="font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider">
                  Evaluation Factors:
                </p>
                {matchModalData.result.explanation.map((exp, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded ${
                      exp.startsWith("✓")
                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
                        : exp.startsWith("⚠")
                        ? "bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300"
                        : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300"
                    }`}
                  >
                    {exp}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                🔍 <strong>Recruiter Preference:</strong> Candidate meets all primary qualification criteria. Closing the secondary Biostatistics gap will maximize selection probability to 98%.
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMatchModalData(null)}
                className="text-xs"
              >
                Close Explanation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Apply Success Dialog */}
      {applySuccessOpp && (
        <Dialog open={!!applySuccessOpp} onOpenChange={() => setApplySuccessOpp(null)}>
          <DialogContent className="max-w-md text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <DialogTitle className="text-lg font-bold">
              Application Submitted Successfully!
            </DialogTitle>
            <DialogDescription className="text-xs mt-1">
              Your verified Skill Twin profile has been securely transmitted to <strong>{applySuccessOpp.company}</strong>.
            </DialogDescription>
            <div className="my-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-left text-xs space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Application ID:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">TIQ-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Transmitted Profile:</span>
                <span className="text-emerald-600 font-semibold">DigiLocker & APAAR Verified</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Explainable Fit:</span>
                <span className="font-bold text-blue-600">{applySuccessOpp.match.matchScore}% Match Score</span>
              </div>
            </div>
            <DialogFooter className="sm:justify-center">
              <Button
                size="sm"
                onClick={() => setApplySuccessOpp(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-xs px-6"
              >
                Go to Applications Tracker
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
