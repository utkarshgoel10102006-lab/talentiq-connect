"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  ShieldCheck,
  FileCheck,
  Download,
  Share2,
} from "lucide-react";
import { PRIMARY_STUDENT_PROFILE } from "@/lib/data-store";

export default function PortfolioPage() {
  const student = PRIMARY_STUDENT_PROFILE;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="success" className="gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Tamper-Proof Portfolio
            </Badge>
            <span className="text-xs text-slate-500">DigiLocker &bull; APAAR &bull; ABC Protocol</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Verified Digital Portfolio
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            A shareable, cryptographically signed academic and clinical dossier designed to build complete recruiter trust.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <Share2 className="w-3.5 h-3.5" /> Share Verified Link
          </Button>
          <Button size="sm" className="text-xs gap-1.5 bg-blue-600 hover:bg-blue-700">
            <Download className="w-3.5 h-3.5" /> Export PDF Dossier
          </Button>
        </div>
      </div>

      {/* 2. Candidate Header Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-inner border-2 border-white/20">
              PS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black">{student.name}</h2>
                <Badge variant="ayush" className="text-[10px]">BAMS Scholar</Badge>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {student.college}
              </p>
              <div className="flex items-center space-x-3 text-xs text-blue-200 mt-1">
                <span>APAAR ID: {student.apaarId}</span>
                <span>&bull;</span>
                <span className="text-emerald-400 font-semibold">✓ DigiLocker Verified</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white/10 p-3 rounded-xl border border-white/10 shrink-0">
            <div className="text-center px-2">
              <span className="text-[10px] text-blue-200 uppercase font-bold">Academic CGPA</span>
              <p className="text-xl font-black text-emerald-400">{student.cgpa}</p>
            </div>
            <div className="border-l border-white/20 pl-4 text-center">
              <span className="text-[10px] text-blue-200 uppercase font-bold">ABC Bank</span>
              <p className="text-xl font-black text-white">4 Credits</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Credentials & Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DigiLocker Official Documents */}
        <Card>
          <CardHeader className="p-5 pb-3 border-b bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <CardTitle className="text-sm font-bold">DigiLocker Authenticated Documents</CardTitle>
              </div>
              <Badge variant="success" className="text-[10px]">3 Documents Verified</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-3 text-xs">
            <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  BAMS Enrollment & Sem 1-4 Cumulative Transcript
                </p>
                <p className="text-[11px] text-slate-500">
                  Issued by All India Institute of Ayurveda &bull; Verified 2025-11-20
                </p>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950">
                ✓ Authenticated
              </span>
            </div>

            <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  National Ayush Pharmacognosy & Botanical Proficiency Cert
                </p>
                <p className="text-[11px] text-slate-500">
                  Issued by CCRAS / NPTEL SWAYAM &bull; Score: 85%
                </p>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950">
                ✓ Authenticated
              </span>
            </div>

            <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  ICH-GCP Good Clinical Practice Clinical Trial Certificate
                </p>
                <p className="text-[11px] text-slate-500">
                  Issued by NIDA Clinical Trials Network &bull; Valid through 2028
                </p>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950">
                ✓ Authenticated
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Academic Bank of Credits (ABC) Log */}
        <Card>
          <CardHeader className="p-5 pb-3 border-b bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-blue-600" />
                <CardTitle className="text-sm font-bold">Academic Bank of Credits (ABC)</CardTitle>
              </div>
              <Badge variant="info" className="text-[10px]">NEP 2020 Aligned</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-3 text-xs">
            <div className="p-3 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/20 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  AYUSH Tele-Health Clinical Rotation (3 Months)
                </p>
                <p className="text-[11px] text-slate-500">
                  All India Institute of Ayurveda &bull; 45 Patients Triaged &bull; 4.8 Rating
                </p>
              </div>
              <div className="text-right">
                <span className="font-bold text-blue-600 text-sm">+2 Credits</span>
                <p className="text-[10px] text-slate-400">Deposited</p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/20 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  Phytochemistry & Botanical Chromatography Lab Course
                </p>
                <p className="text-[11px] text-slate-500">
                  SWAYAM NPTEL Accredited Course &bull; Grade: A+
                </p>
              </div>
              <div className="text-right">
                <span className="font-bold text-blue-600 text-sm">+2 Credits</span>
                <p className="text-[10px] text-slate-400">Deposited</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-600 dark:text-slate-300">
              ⚡ <strong>Automatic Transfer:</strong> When you complete your upcoming Dabur internship, 4 additional credits will automatically post to your national APAAR credit ledger.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
