"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  Shield,
  Building2,
  GraduationCap,
  Landmark,
  ChevronDown,
} from "lucide-react";

interface NavbarProps {
  currentRole?: string;
  userName?: string;
}

export function Navbar({ currentRole = "STUDENT", userName = "Priya Sharma" }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [roleDropdown, setRoleDropdown] = React.useState(false);

  const handleQuickSwitch = async (role: string, email: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "demo123456", role }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        setRoleDropdown(false);
        router.push(data.redirectUrl);
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "STUDENT":
        return <Badge variant="info" className="gap-1"><GraduationCap className="w-3 h-3" /> Student</Badge>;
      case "INDUSTRY":
        return <Badge variant="purple" className="gap-1"><Building2 className="w-3 h-3" /> Industry</Badge>;
      case "TPO":
        return <Badge variant="warning" className="gap-1"><Shield className="w-3 h-3" /> TPO Officer</Badge>;
      case "GOVERNMENT":
        return <Badge variant="ayush" className="gap-1"><Landmark className="w-3 h-3" /> National Ministry</Badge>;
      case "FACULTY":
        return <Badge variant="secondary" className="gap-1">Faculty</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Brand & Gov Seals */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform border border-amber-400/30">
              <Image
                src="/logo-icon.jpg"
                alt="TalentIQ Connect"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                  Talent<span className="text-blue-600 dark:text-blue-400">IQ</span> Connect
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  SIH26044
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden md:block">
                Ministry of Ayush &bull; All India Institute of Ayurveda
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Role Navigation Links if on portal */}
        <div className="hidden lg:flex items-center space-x-1">
          <Link
            href="/student"
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              pathname.startsWith("/student")
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Student Twin
          </Link>
          <Link
            href="/industry"
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              pathname.startsWith("/industry")
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Industry Hub
          </Link>
          <Link
            href="/tpo"
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              pathname.startsWith("/tpo")
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            TPO Command
          </Link>
          <Link
            href="/government"
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              pathname.startsWith("/government")
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            National Dashboard
          </Link>
          <Link
            href="/faculty"
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              pathname.startsWith("/faculty")
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Faculty & Curriculum
          </Link>
        </div>

        {/* Right Actions: Quick Switcher & User Avatar */}
        <div className="flex items-center space-x-3">
          {/* Quick Role Switcher Dropdown (Crucial for SIH 5-minute demo) */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRoleDropdown(!roleDropdown)}
              className="border-slate-200 shadow-sm flex items-center space-x-1.5 text-xs h-9 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800"
            >
              <span className="text-slate-500 hidden sm:inline">Role:</span>
              {getRoleBadge(currentRole)}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </Button>

            {roleDropdown && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  ⚡ 5-Minute Demo Quick Switch
                </div>
                <button
                  onClick={() => handleQuickSwitch("STUDENT", "student@demo.com")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">1. Student Portal</p>
                    <p className="text-[10px] text-slate-400">Priya Sharma (BAMS, AIIA)</p>
                  </div>
                  <Badge variant="info">Student</Badge>
                </button>
                <button
                  onClick={() => handleQuickSwitch("INDUSTRY", "industry@demo.com")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">2. Industry Recruiter</p>
                    <p className="text-[10px] text-slate-400">Dabur Health R&D</p>
                  </div>
                  <Badge variant="purple">Recruiter</Badge>
                </button>
                <button
                  onClick={() => handleQuickSwitch("TPO", "tpo@demo.com")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">3. TPO Officer</p>
                    <p className="text-[10px] text-slate-400">Placement Command Center</p>
                  </div>
                  <Badge variant="warning">TPO</Badge>
                </button>
                <button
                  onClick={() => handleQuickSwitch("GOVERNMENT", "government@demo.com")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">4. Ministry / Govt</p>
                    <p className="text-[10px] text-slate-400">National Ayush Intelligence</p>
                  </div>
                  <Badge variant="ayush">Ministry</Badge>
                </button>
                <button
                  onClick={() => handleQuickSwitch("FACULTY", "faculty@demo.com")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">5. Faculty Hub</p>
                    <p className="text-[10px] text-slate-400">AI Curriculum Analyzer</p>
                  </div>
                  <Badge variant="secondary">Faculty</Badge>
                </button>
              </div>
            )}
          </div>

          {/* User Name & Logout */}
          <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-800 pl-3">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 hidden sm:inline">
              {userName}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
              className="h-8 w-8 text-slate-500 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
