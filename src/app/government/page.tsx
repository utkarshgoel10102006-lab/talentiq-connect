"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Landmark,
  ShieldCheck,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function GovernmentDashboardPage() {

  // State-wise participation data
  const stateData = [
    { state: "Uttar Pradesh", institutions: 142, students: 42000, ayushCount: 58 },
    { state: "Maharashtra", institutions: 118, students: 38000, ayushCount: 42 },
    { state: "Delhi NCR", institutions: 84, students: 29000, ayushCount: 26 },
    { state: "Kerala", institutions: 76, students: 24000, ayushCount: 38 },
    { state: "Karnataka", institutions: 92, students: 31000, ayushCount: 31 },
    { state: "Gujarat", institutions: 64, students: 19000, ayushCount: 22 },
  ];

  // Sector demand data
  const sectorDemandData = [
    { name: "AYUSH Clinical & Research", value: 34, color: "#10b981" },
    { name: "Pharma & Nutraceuticals", value: 24, color: "#3b82f6" },
    { name: "AI & Health Informatics", value: 22, color: "#6366f1" },
    { name: "Wellness & Preventative Tourism", value: 12, color: "#f59e0b" },
    { name: "Biotech & Diagnostics", value: 8, color: "#ec4899" },
  ];

  // Supply vs Demand Comparison
  const supplyDemandData = [
    { skill: "Clinical Diagnostics", supply: 88, demand: 82 },
    { skill: "Herbal Pharmacology", supply: 84, demand: 90 },
    { skill: "GCP Trial Protocol", supply: 54, demand: 86 }, // Deficit
    { skill: "Health Biostatistics", supply: 42, demand: 94 }, // Severe Deficit
    { skill: "Ayurvedic Formulation", supply: 79, demand: 72 },
    { skill: "Health Informatics", supply: 48, demand: 88 }, // Deficit
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="ayush" className="gap-1">
              <Landmark className="w-3 h-3" /> Ministry of Ayush &bull; Govt of India
            </Badge>
            <span className="text-xs text-slate-500">National Skill Mission Analytics</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            National Skill Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Macro-level policy monitoring aggregating 640+ higher education institutions, skill supply-demand dynamics, and cross-sector placement outcomes.
          </p>
        </div>

        {/* Aggregated Privacy Seal */}
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>DPDP Act 2023 Compliant (Anonymized Aggregate Data)</span>
          </div>
          <Button size="sm" variant="outline" className="text-xs gap-1">
            <Download className="w-3.5 h-3.5" /> Export Cabinet Brief
          </Button>
        </div>
      </div>

      {/* 2. National Aggregated KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Institutions Onboarded</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">642</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Across 28 States & UTs</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Enrolled Scholars</span>
          <p className="text-2xl font-black text-blue-600 mt-1">184,500</p>
          <span className="text-[10px] text-slate-500">AYUSH + Allied Sciences</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Industry Partners</span>
          <p className="text-2xl font-black text-purple-600 mt-1">1,280</p>
          <span className="text-[10px] text-slate-500">Pharma, AI, Hospitals</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900">
          <span className="text-[10px] uppercase font-bold text-slate-400">Verified Internships</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">42,910</p>
          <span className="text-[10px] text-emerald-600 font-semibold">ABC Credits Deposited</span>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900 col-span-2 lg:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">AYUSH Growth Velocity</span>
          <p className="text-2xl font-black text-teal-600 mt-1">+34.8%</p>
          <span className="text-[10px] text-slate-500">Year-on-Year Placement Lift</span>
        </Card>
      </div>

      {/* 3. National Supply vs Demand & Sector Pie Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* National Supply vs Demand Bar Chart */}
        <Card>
          <CardHeader className="p-5 pb-2">
            <CardTitle className="text-base font-bold">National Skill Supply vs. Industry Demand</CardTitle>
            <CardDescription className="text-xs">
              Direct comparison between candidate availability (Blue) and employer job vacancies (Emerald).
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={supplyDemandData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="skill" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="supply" name="Candidate Supply %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="demand" name="Industry Demand %" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg text-xs text-red-800 dark:text-red-300 mt-2 flex items-center justify-between">
              <span>🚨 Critical National Bottleneck:</span>
              <span className="font-bold">Biostatistics (52% Demand Deficit)</span>
            </div>
          </CardContent>
        </Card>

        {/* Sector-Wise Demand Pie Chart */}
        <Card>
          <CardHeader className="p-5 pb-2">
            <CardTitle className="text-base font-bold">Sectoral Opportunity Distribution</CardTitle>
            <CardDescription className="text-xs">
              Breakdown of verified corporate job openings across key national economic pillars.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorDemandData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sectorDemandData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-[11px] text-slate-600 dark:text-slate-300">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. State-Wise Adoption Table & Ministry Strategic Insights */}
      <Card className="p-6">
        <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold">State-by-State Institutional Footprint</CardTitle>
            <CardDescription className="text-xs">
              Real-time monitoring of collegiate registrations and AYUSH center accreditations.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50 dark:bg-slate-800/60 text-slate-500">
                <th className="p-3">State / Territory</th>
                <th className="p-3 text-center">Colleges Onboarded</th>
                <th className="p-3 text-center">Active Scholars</th>
                <th className="p-3 text-center">AYUSH Specialized Colleges</th>
                <th className="p-3 text-center">Placement Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {stateData.map((st, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">
                    {st.state}
                  </td>
                  <td className="p-3 text-center text-slate-700 dark:text-slate-300 font-semibold">
                    {st.institutions}
                  </td>
                  <td className="p-3 text-center text-slate-700 dark:text-slate-300">
                    {st.students.toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="ayush" className="text-[10px]">
                      {st.ayushCount} Institutions
                    </Badge>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-emerald-600 font-bold">
                      {68 + ((i * 4) % 18)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
