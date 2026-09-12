"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Building2,
  TrendingUp,
  Star,
} from "lucide-react";
import { INITIAL_APPLICATIONS } from "@/lib/data-store";
import { Application, ApplicationStatus } from "@/types";

const STAGES: { status: ApplicationStatus; label: string }[] = [
  { status: "APPLIED", label: "Applied" },
  { status: "SHORTLISTED", label: "Shortlisted" },
  { status: "INTERVIEW", label: "Interview" },
  { status: "SELECTED", label: "Selected" },
  { status: "ONGOING", label: "Ongoing Milestones" },
  { status: "COMPLETED", label: "Verified Credit" },
];

export default function ApplicationsPage() {
  const [applications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<Application>(INITIAL_APPLICATIONS[0]);

  const getStageIndex = (status: ApplicationStatus) => {
    switch (status) {
      case "APPLIED":
        return 0;
      case "SHORTLISTED":
        return 1;
      case "INTERVIEW":
        return 2;
      case "SELECTED":
        return 3;
      case "ONGOING":
        return 4;
      case "COMPLETED":
        return 5;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="w-3 h-3" /> Closed-Loop Lifecycle Tracking
            </Badge>
            <span className="text-xs text-slate-500">From Application to Skill Profile Upgrade</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Internship & Application Lifecycle
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Track milestones, mentor reviews, Academic Bank of Credits (ABC) issuance, and automatic skill level promotions upon completion.
          </p>
        </div>
      </div>

      {/* 2. Closed-Loop Banner */}
      <Card className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-6 border-0 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span>Closed-Loop Skill Promotion Verification</span>
            </div>
            <h2 className="text-lg font-bold">
              Completed Rotation: AYUSH Tele-Health Clinical Navigator
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              All India Institute of Ayurveda &bull; 45 OPD triages logged &bull; Rating: 4.8 / 5.0
            </p>
          </div>
          <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-emerald-300">Automatic Profile Upgrade</span>
            <p className="text-sm font-black text-white mt-0.5">
              Clinical Knowledge +1 &bull; Communication +1
            </p>
            <span className="text-[10px] text-emerald-300">Transferred to ABC Bank ✓</span>
          </div>
        </div>
      </Card>

      {/* 3. Applications List & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Active Applications ({applications.length})
          </h3>
          {applications.map((app) => {
            const isSelected = selectedApp.id === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 shadow-sm"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {app.opportunityTitle}
                    </span>
                    <p className="text-[11px] text-slate-500">{app.companyName}</p>
                    <p className="text-[10px] text-slate-400">Applied: {app.appliedDate}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        app.status === "SELECTED"
                          ? "success"
                          : app.status === "SHORTLISTED"
                          ? "info"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {app.status}
                    </Badge>
                    <p className="text-[10px] font-bold text-blue-600 mt-1">
                      {app.matchScore}% Match
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Application Detailed Lifecycle View */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="p-5 pb-3 bg-slate-50/70 dark:bg-slate-800/40 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {selectedApp.companyName}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold mt-1">
                    {selectedApp.opportunityTitle}
                  </CardTitle>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500">Current Status</span>
                  <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                    {selectedApp.status}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Visual Pipeline Bar */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Lifecycle Timeline
                </p>
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-700 z-0" />
                  {STAGES.map((stg, idx) => {
                    const activeIdx = getStageIndex(selectedApp.status);
                    const isPassed = idx <= activeIdx;
                    const isCurrent = idx === activeIdx;

                    return (
                      <div key={stg.status} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            isCurrent
                              ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900"
                              : isPassed
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                          }`}
                        >
                          {isPassed ? "✓" : idx + 1}
                        </div>
                        <span
                          className={`text-[10px] mt-1.5 font-semibold text-center whitespace-nowrap hidden sm:block ${
                            isCurrent
                              ? "text-blue-600 dark:text-blue-400 font-bold"
                              : isPassed
                              ? "text-slate-700 dark:text-slate-300"
                              : "text-slate-400"
                          }`}
                        >
                          {stg.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Milestones Section if available */}
              {selectedApp.milestones && selectedApp.milestones.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Verified Work Milestones & Mentor Sign-Off
                  </h4>

                  <div className="space-y-2">
                    {selectedApp.milestones.map((m) => (
                      <div
                        key={m.id}
                        className={`p-3 rounded-lg border text-xs space-y-1 ${
                          m.completed
                            ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {m.title}
                          </span>
                          <span
                            className={`text-[10px] font-bold ${
                              m.completed ? "text-emerald-600" : "text-slate-400"
                            }`}
                          >
                            {m.completed ? "✓ Signed Off" : "In Progress"}
                          </span>
                        </div>
                        {m.feedback && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                            &ldquo;{m.feedback}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Feedback & Skill Growth Award if Completed / Selected */}
              {selectedApp.finalFeedback && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        Employer Performance Rating: {selectedApp.finalFeedback.rating} / 5.0
                      </span>
                    </div>
                    {selectedApp.finalFeedback.certificateIssued && (
                      <Badge variant="success" className="text-[10px]">
                        ✓ DigiLocker Verified Certificate Issued
                      </Badge>
                    )}
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 italic">
                    &ldquo;{selectedApp.finalFeedback.comments}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center gap-3">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">
                      Closed-Loop Skill Growth:
                    </span>
                    {selectedApp.finalFeedback.skillsImproved.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-md font-semibold border border-emerald-200 text-xs shadow-xs"
                      >
                        +{s.increase} to {s.skillName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
