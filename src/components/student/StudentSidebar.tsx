"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Compass,
  Briefcase,
  Layers,
  FileText,
  CheckCircle2,
  Mic,
  Award,
  BarChart3,
  Flame,
} from "lucide-react";

const NAV_ITEMS = [
  {
    title: "Dashboard Overview",
    href: "/student",
    icon: BarChart3,
  },
  {
    title: "My Skill Twin",
    href: "/student/skill-twin",
    icon: Sparkles,
    badge: "Differentiator",
  },
  {
    title: "AI Career GPS",
    href: "/student/career-gps",
    icon: Compass,
    badge: "Roadmap",
  },
  {
    title: "Skill Gap Analyzer",
    href: "/student/skill-gap",
    icon: Layers,
  },
  {
    title: "Opportunity Market",
    href: "/student/opportunities",
    icon: Briefcase,
    badge: "92% Match",
  },
  {
    title: "Applications & Lifecycle",
    href: "/student/applications",
    icon: CheckCircle2,
  },
  {
    title: "AI Resume Analyzer",
    href: "/student/resume-analyzer",
    icon: FileText,
  },
  {
    title: "Adaptive Assessments",
    href: "/student/assessments",
    icon: Flame,
  },
  {
    title: "AI Mock Interview",
    href: "/student/interview",
    icon: Mic,
    badge: "AI",
  },
  {
    title: "Verified Portfolio",
    href: "/student/portfolio",
    icon: Award,
  },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-slate-50/70 dark:bg-slate-900/40 p-4 hidden md:flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="space-y-4">
        {/* Readiness Snapshot Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-blue-200 font-medium">Career Readiness</span>
            <span className="font-bold text-emerald-400">78%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-teal-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: "78%" }}
            />
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            Target: Clinical Research Associate
          </p>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isActive
                        ? "bg-blue-800 text-blue-100"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Verified Badges & Trust Footer */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>DigiLocker Linked</span>
          <span className="text-emerald-600 font-bold">✓ Active</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>ABC Credits Bank</span>
          <span className="text-blue-600 font-bold">4 Credits</span>
        </div>
        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[10px] text-emerald-800 dark:text-emerald-300">
          🌿 <strong>Ministry of Ayush Nodal Hub</strong>: Verified Institutional Candidate
        </div>
      </div>
    </aside>
  );
}
