"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  Code2,
  Briefcase,
  Award,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { CAREER_GPS_ROADMAP, ROLES_CATALOG } from "@/lib/data-store";

export default function CareerGpsPage() {
  const [selectedRole, setSelectedRole] = useState("role_cra");
  const [roadmap, setRoadmap] = useState(CAREER_GPS_ROADMAP);

  const toggleTask = (monthNum: number, taskId: string) => {
    setRoadmap((prev) =>
      prev.map((m) => {
        if (m.month !== monthNum) return m;
        const updatedTasks = m.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const completedCount = updatedTasks.filter((t) => t.completed).length;
        const progress = Math.round((completedCount / updatedTasks.length) * 100);
        return { ...m, tasks: updatedTasks, progress };
      })
    );
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case "LEARN":
        return <Badge variant="info" className="gap-1 text-[10px]"><BookOpen className="w-2.5 h-2.5" /> Course</Badge>;
      case "BUILD":
        return <Badge variant="purple" className="gap-1 text-[10px]"><Code2 className="w-2.5 h-2.5" /> Project</Badge>;
      case "APPLY":
        return <Badge variant="success" className="gap-1 text-[10px]"><Briefcase className="w-2.5 h-2.5" /> Internship</Badge>;
      case "PREPARE":
        return <Badge variant="warning" className="gap-1 text-[10px]"><Award className="w-2.5 h-2.5" /> Assessment</Badge>;
      default:
        return <Badge className="text-[10px]">{cat}</Badge>;
    }
  };

  const currentRoleObj = ROLES_CATALOG.find((r) => r.id === selectedRole) || ROLES_CATALOG[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="success" className="gap-1">
              <Compass className="w-3 h-3" /> Autonomous Career Navigation
            </Badge>
            <span className="text-xs text-slate-500">AI Adaptive Pathway</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            AI Career GPS
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            A dynamic 5-month milestone progression mapping your current competency profile to your targeted dream role.
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
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Destination Banner */}
      <Card className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 border-0 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <span>Current: BAMS 3rd Year (AIIA)</span>
              <span>&rarr;</span>
              <span>Destination: {currentRoleObj.title}</span>
            </div>
            <h2 className="text-xl font-bold">{currentRoleObj.title}</h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              {currentRoleObj.description}
            </p>
          </div>
          <div className="flex items-center space-x-4 bg-white/10 p-3.5 rounded-xl backdrop-blur-sm shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-blue-200">Current Match</span>
              <p className="text-2xl font-black text-emerald-400">78%</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-blue-200">Target Goal</span>
              <p className="text-2xl font-black text-white">95%</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Month by Month Roadmap Timeline */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Sequential 5-Month Learning & Experience Trajectory
          </h3>
          <span className="text-xs text-slate-500">
            (Check items to dynamically recalculate progress)
          </span>
        </div>

        <div className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-4 pl-6 space-y-8">
          {roadmap.map((month) => (
            <div key={month.month} className="relative group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold transition-colors ${
                  month.progress === 100
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : month.progress > 0
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white dark:bg-slate-900 border-slate-300 text-slate-400"
                }`}
              >
                {month.month}
              </div>

              {/* Month Card */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="p-5 pb-3 bg-slate-50/70 dark:bg-slate-800/40 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        Month {month.month} Milestone
                      </span>
                      <CardTitle className="text-base font-bold mt-0.5">
                        {month.title}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        Focus: {month.focus}
                      </CardDescription>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full sm:w-44 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Completion</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {month.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            month.progress === 100
                              ? "bg-emerald-500"
                              : "bg-blue-600"
                          }`}
                          style={{ width: `${month.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Tasks Checklist */}
                <CardContent className="p-5 space-y-2.5">
                  {month.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(month.month, task.id)}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer flex items-center justify-between ${
                        task.completed
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button className="text-slate-400 hover:text-blue-600">
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </button>
                        <span
                          className={`text-xs ${
                            task.completed
                              ? "line-through text-slate-500 dark:text-slate-400"
                              : "font-medium text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {getCategoryBadge(task.category)}
                        {task.link && (
                          <a
                            href={task.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
