"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  GraduationCap,
  Building2,
  Shield,
  Landmark,
  CheckCircle2,
  Award,
  Zap,
  ChevronDown,
  BookOpen,
  Sliders,
  Cpu,
  Flame,
  Activity,
  Bot,
  Mail,
  Phone,
  Headphones,
  MapPin,
  Clock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { InfiniteMarquee } from "@/components/animations/InfiniteMarquee";
import { RadarMesh } from "@/components/animations/RadarMesh";
import { ScrollReveal, StaggerContainer } from "@/components/animations/ScrollReveal";
import FloatingOrbs from "@/components/animations/FloatingOrbs";
import { FloatingHeroEcosystem } from "@/components/animations/FloatingElements";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { TiltCard } from "@/components/animations/TiltCard";
import { SkillNetworkGraph } from "@/components/animations/SkillNetworkGraph";
import { ScrollStoryline } from "@/components/animations/ScrollStoryline";
import { AIPipelineVisualizer } from "@/components/animations/AIPipelineVisualizer";

export default function LandingPage() {
  const router = useRouter();

  // Active showcase tab in the hero
  const [activeHeroTab, setActiveHeroTab] = useState<"TWIN" | "MATCH" | "COPILOT" | "HEATMAP">("TWIN");
  
  // Interactive Skill Twin simulation slider on homepage
  const [gcpBoost, setGcpBoost] = useState(3);
  const calculatedReadiness = Math.min(96, Math.round(72 + (gcpBoost * 4.4)));

  // Interactive FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 1-Click Demo Login Handler
  const [loggingInRole, setLoggingInRole] = useState<string | null>(null);

  const handleDemoLogin = async (role: string, email: string) => {
    setLoggingInRole(role);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "demo123456", role }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 },
        });
        router.push(data.redirectUrl);
      }
    } catch {
      router.push("/login");
    } finally {
      setLoggingInRole(null);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col font-sans overflow-x-hidden relative">
      {/* 0. INTERACTIVE PARTICLE CANVAS BACKGROUND + FLOATING ORBS */}
      <ParticleBackground />
      <FloatingOrbs />

      {/* 1. TOP ANNOUNCEMENT RIBBON */}
      <div className="relative z-10 bg-gradient-to-r from-blue-950/80 via-slate-950 to-indigo-950/80 border-b border-white/[0.06] text-[11px] py-2 px-4 text-center text-slate-300 flex items-center justify-center space-x-2 sm:space-x-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-bold text-[10px] shadow-sm shadow-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2" />
          SIH26044 Production MVP
        </span>
        <span className="hidden sm:inline text-slate-300 font-medium">
          Ministry of Ayush &bull; All India Institute of Ayurveda (AIIA)
        </span>
        <span className="hidden sm:inline text-slate-600">&bull;</span>
        <span className="text-sky-300 font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-sky-400 animate-spin" /> Autonomous Closed-Loop Talent OS
        </span>
      </div>

      {/* 2. LUXURY GLASS NAVIGATION */}
      <header className="border-b border-white/[0.08] bg-[#050914]/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex h-18 items-center justify-between px-4 sm:px-8 py-3.5">
          {/* Logo & Emblem with animated gradient pulse */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-400 to-rose-500 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-amber-400/30 shadow-2xl">
                <Image
                  src="/logo-icon.jpg"
                  alt="TalentIQ Connect"
                  width={44}
                  height={44}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Talent<span className="text-sky-400">IQ</span>
                </span>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-blue-400/40 text-sky-300 bg-blue-500/15">
                  CONNECT
                </Badge>
              </div>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">
                National Talent OS
              </p>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold text-slate-300">
            <a href="#showcase" className="hover:text-sky-400 transition-colors">Interactive Engine</a>
            <a href="#architecture" className="hover:text-sky-400 transition-colors">Closed-Loop Pillars</a>
            <a href="#journey" className="hover:text-sky-400 transition-colors">Student Journey</a>
            <a href="#matrix" className="hover:text-sky-400 transition-colors">Why TalentIQ Wins</a>
            <a href="#support" className="hover:text-sky-400 transition-colors text-sky-400 flex items-center gap-1.5 font-bold">
              <Headphones className="w-3.5 h-3.5 text-sky-400" />
              24/7 Support
            </a>
            <a href="#faq" className="hover:text-sky-400 transition-colors">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                Sign In
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={() => handleDemoLogin("STUDENT", "student@demo.com")}
              disabled={!!loggingInRole}
              className="text-xs font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 text-white shadow-lg shadow-blue-500/30 border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              {loggingInRole === "STUDENT" ? "Initializing Demo..." : "5-Min Live Demo →"}
            </Button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION WITH VIBRANT AURORA LIGHTS & FLOATING ECOSYSTEM */}
      <section className="relative pt-16 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full z-10">
        {/* Ambient Backlight Aurora Blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none animate-glow" />
        <div className="absolute top-32 right-8 w-[500px] h-[340px] bg-amber-500/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-44 left-6 w-[450px] h-[320px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating Ayurvedic Leaves, Sanskrit Seals & Intelligence Orbs */}
        <FloatingHeroEcosystem />

        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          <ScrollReveal direction="down" delay={0.1} duration={0.8}>
            {/* Top Floating Luxury Pill with Laser Sheen */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.14] backdrop-blur-xl shadow-inner text-xs font-medium animate-float">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-slate-200">
                Ancient Ayurveda &times; Autonomous AI &bull; <span className="text-amber-300 font-semibold">NEP 2020 &amp; ABC Protocol</span>
              </span>
            </div>
          </ScrollReveal>

          {/* Cinematic Word-by-Word Hero Headline */}
          <ScrollReveal direction="up" delay={0.25} duration={0.9} distance={80}>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-300/90 font-bold">
                Where Ancient <span className="font-serif italic text-amber-200 text-sm sm:text-base">Wisdom</span>
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
                Meets Modern <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal bg-gradient-to-r from-amber-200 via-sky-200 to-emerald-300 bg-clip-text text-transparent underline decoration-amber-400/40 underline-offset-8">
                  Opportunity.
                </span>
              </h1>
            </div>
          </ScrollReveal>

          {/* Hero Subtitle */}
          <ScrollReveal direction="up" delay={0.4} duration={0.8}>
            <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              TalentIQ Connect replaces static resume portals with living, evidence-backed{" "}
              <strong className="text-white font-semibold">Skill Digital Twins</strong>, matches healthcare &amp; tech scholars to high-impact internships with{" "}
              <strong className="text-white font-semibold">explainable AI scores</strong>, and automatically transfers verified achievements into{" "}
              <strong className="text-white font-semibold">Academic Bank of Credits (ABC)</strong>.
            </p>
          </ScrollReveal>

          {/* Hero Action Buttons with Magnetic Pull */}
          <ScrollReveal direction="up" delay={0.55} duration={0.7}>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton dataCursor="LAUNCH" strength={0.3}>
                <Button
                  size="lg"
                  onClick={() => handleDemoLogin("STUDENT", "student@demo.com")}
                  className="w-full sm:w-auto text-sm font-bold h-12 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-2xl shadow-blue-600/40 border border-blue-300/30 rounded-2xl transition-all hover:scale-105 active:scale-95"
                >
                  Launch Student Skill Twin &rarr;
                </Button>
              </MagneticButton>

              <MagneticButton dataCursor="EXPLORE" strength={0.25}>
                <a href="#showcase" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-sm font-semibold h-12 px-7 border-white/[0.16] bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 rounded-2xl backdrop-blur-xl"
                  >
                    Inspect Live Simulator Below
                  </Button>
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Quick Jury 1-Click Launchpad Row with 3D Tilt Cards */}
          <ScrollReveal direction="up" delay={0.7} duration={0.8}>
          <div className="pt-6">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center justify-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" /> Instant SIH Jury Persona Launcher (1-Click Autologin):
            </p>
            <StaggerContainer staggerDelay={0.12} direction="up" distance={40} className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <TiltCard dataCursor="LOGIN" maxTilt={10}>
                <button
                  onClick={() => handleDemoLogin("STUDENT", "student@demo.com")}
                  className="w-full p-3.5 rounded-2xl border border-blue-500/30 bg-blue-950/40 hover:bg-blue-900/60 hover:border-blue-400 transition-all text-left group shadow-lg shadow-blue-950/50"
                >
                  <div className="flex items-center justify-between text-blue-400 mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-[10px] font-bold">78% READY</span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-blue-200">1. Student</p>
                  <p className="text-[10px] text-slate-400 truncate">Priya Sharma (BAMS)</p>
                </button>
              </TiltCard>

              <TiltCard dataCursor="LOGIN" maxTilt={10}>
                <button
                  onClick={() => handleDemoLogin("INDUSTRY", "industry@demo.com")}
                  className="w-full p-3.5 rounded-2xl border border-purple-500/30 bg-purple-950/40 hover:bg-purple-900/60 hover:border-purple-400 transition-all text-left group shadow-lg shadow-purple-950/50"
                >
                  <div className="flex items-center justify-between text-purple-400 mb-1">
                    <Building2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold">RECRUITER</span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-purple-200">2. Industry Hub</p>
                  <p className="text-[10px] text-slate-400 truncate">Dr. Arvind (Dabur R&D)</p>
                </button>
              </TiltCard>

              <TiltCard dataCursor="LOGIN" maxTilt={10}>
                <button
                  onClick={() => handleDemoLogin("TPO", "tpo@demo.com")}
                  className="w-full p-3.5 rounded-2xl border border-amber-500/30 bg-amber-950/40 hover:bg-amber-900/60 hover:border-amber-400 transition-all text-left group shadow-lg shadow-amber-950/50"
                >
                  <div className="flex items-center justify-between text-amber-400 mb-1">
                    <Shield className="w-4 h-4" />
                    <span className="text-[10px] font-bold">HEATMAPS</span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-amber-200">3. TPO Command</p>
                  <p className="text-[10px] text-slate-400 truncate">Prof. Rajeshwar (AIIA)</p>
                </button>
              </TiltCard>

              <TiltCard dataCursor="LOGIN" maxTilt={10}>
                <button
                  onClick={() => handleDemoLogin("GOVERNMENT", "government@demo.com")}
                  className="w-full p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/60 hover:border-emerald-400 transition-all text-left group shadow-lg shadow-emerald-950/50"
                >
                  <div className="flex items-center justify-between text-emerald-400 mb-1">
                    <Landmark className="w-4 h-4" />
                    <span className="text-[10px] font-bold">POLICY</span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-emerald-200">4. Ministry Admin</p>
                  <p className="text-[10px] text-slate-400 truncate">Smt. Sunita, IAS</p>
                </button>
              </TiltCard>
            </StaggerContainer>
          </div>
          </ScrollReveal>
        </div>

        {/* 4. LIVE INTERACTIVE HERO SHOWCASE WIDGET (WITH RADAR SCANNER) */}
        <ScrollReveal direction="scale" delay={0.1} duration={0.9}>
        <div id="showcase" className="mt-14 relative z-20">
          <SpotlightCard
            borderBeam={true}
            spotlightColor="rgba(56, 189, 248, 0.22)"
            className="max-w-5xl mx-auto p-6 sm:p-8"
          >
            {/* Showcase Navigation Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-sm shadow-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-sm shadow-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/50" />
                <span className="text-xs font-bold text-slate-300 ml-2 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                  Live TalentIQ Neural Engine
                </span>
              </div>

              <div className="flex items-center p-1 rounded-2xl bg-slate-950/90 border border-white/[0.1] overflow-x-auto text-xs">
                <button
                  onClick={() => setActiveHeroTab("TWIN")}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeHeroTab === "TWIN"
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  🧬 Digital Skill Twin
                </button>
                <button
                  onClick={() => setActiveHeroTab("MATCH")}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeHeroTab === "MATCH"
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  ⚡ Explainable Match (92%)
                </button>
                <button
                  onClick={() => setActiveHeroTab("COPILOT")}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeHeroTab === "COPILOT"
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  🤖 Recruiter Copilot
                </button>
                <button
                  onClick={() => setActiveHeroTab("HEATMAP")}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                    activeHeroTab === "HEATMAP"
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  📊 TPO Heatmap (🟢🟡🔴)
                </button>
              </div>
            </div>

            {/* Showcase Tab 1: Live Interactive Skill Twin with 360-degree Radar Mesh */}
            {activeHeroTab === "TWIN" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="success" className="text-[10px] gap-1 bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3" /> DigiLocker Verified Profile
                    </Badge>
                    <span className="text-xs text-slate-400">APAAR: 2024-9981-4412</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Priya Sharma &bull; Clinical Research Associate
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Evolving competency graph synthesized from verified clinical rotations, university transcripts, and SWAYAM certifications. Updates live as bridge milestones are checked.
                  </p>

                  {/* Interactive Slider */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.09] space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-sky-400" />
                        Simulate Completing GCP Trial Protocol Training:
                      </span>
                      <span className="font-extrabold text-sky-400 text-sm">Level {gcpBoost} / 5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={gcpBoost}
                      onChange={(e) => setGcpBoost(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>Beginner</span>
                      <span>Advanced</span>
                      <span>Mastery (GCP Verified)</span>
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      ✓ Ayurvedic Diagnostics (L4)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      ✓ Dravyaguna Pharmacology (L4)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-sky-500/20 border border-sky-400/40 text-sky-300 animate-pulse">
                      ⚡ Good Clinical Practice (L{gcpBoost})
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-500/15 border border-red-500/30 text-red-300">
                      ⚠ Biostatistics (L2 Gap)
                    </span>
                  </div>
                </div>

                {/* Right Interactive 360-Degree Radar Scanner */}
                <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-br from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/30 text-center space-y-3 relative overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-300 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-sky-400" />
                      Live 360° Competency Radar
                    </span>
                    <span className="font-black text-emerald-400 text-sm bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {calculatedReadiness}% READINESS
                    </span>
                  </div>

                  {/* Rotating Radar Mesh Scanner */}
                  <RadarMesh />

                  <p className="text-[11px] text-slate-400">
                    Hover over glowing nodes to inspect verified credentials &amp; evidence sources.
                  </p>
                </div>
              </div>
            )}

            {/* Showcase Tab 2: Explainable Matchmaking */}
            {activeHeroTab === "MATCH" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-white/[0.1] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🌿</span>
                      <Badge variant="ayush" className="text-[10px] bg-emerald-500/20 text-emerald-300">AYUSH Clinical R&D</Badge>
                      <span className="text-xs text-slate-400">Dabur India Healthcare &amp; Formulations</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mt-1">
                      Clinical Research Associate Intern &bull; Phase-II Trial Monitoring
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      New Delhi (Hybrid) &bull; ₹25,000 / month &bull; 6 Months Duration
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-3xl sm:text-4xl font-black text-emerald-400">92% MATCH</div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Explainable AI Score</span>
                  </div>
                </div>

                {/* Mathematical Transparency Breakdown */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                  <p className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-sky-400" />
                    Jury Explainability Matrix — How 92% was Calculated:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                      <span className="text-[10px] text-slate-400 block">Required Skills (60%)</span>
                      <span className="font-bold text-emerald-400 text-base">56.4 / 60</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                      <span className="text-[10px] text-slate-400 block">Proficiency Fit (20%)</span>
                      <span className="font-bold text-sky-400 text-base">18.2 / 20</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                      <span className="text-[10px] text-slate-400 block">Course Eligibility (10%)</span>
                      <span className="font-bold text-emerald-400 text-base">10.0 / 10</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                      <span className="text-[10px] text-slate-400 block">Domain Interest (10%)</span>
                      <span className="font-bold text-sky-400 text-base">8.0 / 10</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Formula: <code className="text-sky-300">Match = 0.60×Skill + 0.20×Proficiency + 0.10×Eligibility + 0.10×Preference = 92.6%</code>
                  </p>
                </div>
              </div>
            )}

            {/* Showcase Tab 3: Recruiter Copilot */}
            {activeHeroTab === "COPILOT" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.09] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-sky-400 flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5" /> Natural Language Prompt Input
                    </span>
                    <p className="text-xs font-semibold text-white">
                      &ldquo;Need an AYUSH Clinical Research Intern with GCP protocol and trial monitoring abilities&rdquo;
                    </p>
                  </div>
                  <Badge variant="purple" className="text-[10px]">Autonomous Recruiter Copilot</Badge>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/95 border border-sky-500/30 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                    <span className="text-xs font-bold text-white">Drafted Job: Clinical Research Fellow &bull; AIIA Affiliated</span>
                    <span className="text-xs font-bold text-emerald-400">Benchmark: ₹22,000 - ₹28,000/mo</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">
                      ✓ Ayurvedic Diagnostics (L3+)
                    </span>
                    <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">
                      ✓ ICH-GCP Certification (L3+)
                    </span>
                    <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">
                      ✓ Adverse Event Reporting (L2+)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    AI identified <strong>31 candidate matches</strong> in Delhi NCR with 90%+ readiness. Instant outreach broadcast ready.
                  </p>
                  <Link href="/industry">
                    <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl">
                      Open Industry Recruiter Dashboard &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Showcase Tab 4: TPO Heatmap */}
            {activeHeroTab === "HEATMAP" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      All India Institute of Ayurveda &bull; Batch Competency Heatmap
                    </h4>
                    <p className="text-xs text-slate-400">
                      Identifies departmental talent shortages before corporate campus hiring cycles begin.
                    </p>
                  </div>
                  <Badge variant="warning" className="text-[10px]">Placement Cell Intelligence</Badge>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.08] bg-slate-950/80 text-slate-400">
                        <th className="p-3">Department</th>
                        <th className="p-3 text-center">Clinical Diag.</th>
                        <th className="p-3 text-center">Herbal Pharm.</th>
                        <th className="p-3 text-center">ICH-GCP Trials</th>
                        <th className="p-3 text-center">Biostatistics</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] bg-slate-900/60">
                      <tr>
                        <td className="p-3 font-bold text-white">Dravyaguna (BAMS)</td>
                        <td className="p-3 text-center"><span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">🟢 88%</span></td>
                        <td className="p-3 text-center"><span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">🟢 91%</span></td>
                        <td className="p-3 text-center"><span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">🟡 68%</span></td>
                        <td className="p-3 text-center"><span className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 font-bold">🔴 44%</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Roga Nidana (Clinical)</td>
                        <td className="p-3 text-center"><span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">🟢 94%</span></td>
                        <td className="p-3 text-center"><span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">🟢 82%</span></td>
                        <td className="p-3 text-center"><span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">🟡 72%</span></td>
                        <td className="p-3 text-center"><span className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 font-bold">🔴 38%</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center justify-between">
                  <span>🚨 Automated TPO Intervention Triggered:</span>
                  <span className="font-bold">Deploying 4-Week Biostatistics NPTEL Bridge Course</span>
                </div>
              </div>
            )}
          </SpotlightCard>
        </div>
        </ScrollReveal>
      </section>

      {/* 5. INFINITE PARTNER & ECOSYSTEM MARQUEE */}
      <InfiniteMarquee />

      {/* 5.5 INTERACTIVE STUDENT SKILL INTELLIGENCE NETWORK GRAPH */}
      <section id="skill-network" className="py-24 px-4 sm:px-8 bg-[#030612] border-t border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" duration={0.8}>
            <SkillNetworkGraph />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. THE CLOSED-LOOP ECOSYSTEM ARCHITECTURE (SPOTLIGHT BENTO GRID) */}
      <section id="architecture" className="py-24 px-4 sm:px-8 border-t border-white/[0.08] bg-[#050814] relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal direction="up" duration={0.8}>
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge variant="ayush" className="text-xs bg-emerald-500/20 text-emerald-300">
              Architectural Superiority
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              The 5 Pillars of the TalentIQ Closed Loop
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Unlike generic job boards where student data goes into a black box, TalentIQ closes the loop by feeding industry outcomes back into university curricula.
            </p>
          </div>
          </ScrollReveal>

          {/* Bento Grid */}
          <StaggerContainer staggerDelay={0.15} direction="up" distance={60} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 (Large - Spans 2 cols) */}
            <SpotlightCard className="md:col-span-2 p-8 space-y-4" spotlightColor="rgba(56, 189, 248, 0.2)">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                1. Continuous Skill Digital Twin
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A living multidimensional vector space representing every candidate. Synthesizes coursework, verified clinical rotations, code repositories, and SWAYAM certifications. Constantly updates as students complete bridge milestones.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                  <span className="font-bold text-white block">8-Axis Radar</span>
                  <span className="text-[11px] text-slate-400">Dynamic polygon visualization</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                  <span className="font-bold text-white block">DigiLocker Synced</span>
                  <span className="text-[11px] text-slate-400">Tamper-proof academic evidence</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                  <span className="font-bold text-white block">Readiness Velocity</span>
                  <span className="text-[11px] text-slate-400">Predictive timeline to role</span>
                </div>
              </div>
            </SpotlightCard>

            {/* Card 2 */}
            <SpotlightCard className="p-8 space-y-4" spotlightColor="rgba(16, 185, 129, 0.2)">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                2. Explainable AI Matchmaking
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Recruiters and students see the transparent formula behind every match percentage: exact weights for core skills, proficiency levels, and course requirements. Zero black-box recruiter bias.
              </p>
              <span className="inline-block text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Score = 0.6S + 0.2P + 0.1E + 0.1I
              </span>
            </SpotlightCard>

            {/* Card 3 */}
            <SpotlightCard className="p-8 space-y-4" spotlightColor="rgba(168, 85, 247, 0.2)">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                3. Academic Bank of Credits (ABC)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Seamless alignment with NEP 2020. Once an industry mentor evaluates a student rotation (e.g. 4.8 / 5.0 at Dabur), verified internship credits are automatically deposited into the student&apos;s national ABC account.
              </p>
            </SpotlightCard>

            {/* Card 4 (Spans 2 cols) */}
            <SpotlightCard className="md:col-span-2 p-8 space-y-4" spotlightColor="rgba(245, 158, 11, 0.2)">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                4. AI Curriculum Auto-Tuner &amp; Faculty Hub
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Solves academia&apos;s greatest challenge: curriculum lag. Our NLP parser digests university syllabi, compares against current corporate job requisites, and provides faculty with instant accredited bridge modules to adopt.
              </p>
              <div className="flex items-center space-x-3 text-xs text-amber-300 font-semibold">
                <span>&bull; AICTE Model Curriculum Aligned</span>
                <span>&bull; NCISM &amp; Ministry of Ayush Ready</span>
              </div>
            </SpotlightCard>
          </StaggerContainer>
        </div>
      </section>

      {/* 7. SCROLL-BASED STORYTELLING: FROM POTENTIAL TO PLACEMENT */}
      <div id="journey">
        <ScrollStoryline />
      </div>

      {/* 7.5 AUTONOMOUS AI INGESTION & MATCH PIPELINE */}
      <section id="ai-pipeline" className="py-24 px-4 sm:px-8 bg-[#040816] border-t border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" duration={0.8}>
            <AIPipelineVisualizer />
          </ScrollReveal>
        </div>
      </section>

      {/* 8. TRADITIONAL PORTALS VS TALENTIQ COMPARISON MATRIX */}
      <section id="matrix" className="py-24 px-4 sm:px-8 bg-[#050916] border-t border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal direction="up" duration={0.8}>
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge variant="purple" className="text-xs">
              Jury Differentiator Benchmark
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Why TalentIQ Wins Over Generic Portals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Comparing commercial job sites, conventional government internship boards, and TalentIQ Connect.
            </p>
          </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} duration={0.9} distance={70}>
          <div className="overflow-x-auto rounded-3xl border border-white/[0.1] bg-slate-950/70 backdrop-blur-2xl shadow-2xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-slate-900/90 text-slate-400">
                  <th className="p-5 font-bold text-sm text-white">Capability / Architecture</th>
                  <th className="p-5 text-center">Commercial Boards (LinkedIn/Naukri)</th>
                  <th className="p-5 text-center">Standard Gov Portals (AICTE/NATS)</th>
                  <th className="p-5 text-center bg-blue-600/25 text-sky-200 font-extrabold border-x border-blue-500/30">
                    TalentIQ Connect (SIH26044)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-5 font-semibold text-white">Student Competency Representation</td>
                  <td className="p-5 text-center text-slate-400">Static Text / PDF Resume</td>
                  <td className="p-5 text-center text-slate-400">Self-Declared Form Fields</td>
                  <td className="p-5 text-center font-bold text-emerald-400 bg-blue-600/10 border-x border-blue-500/20">
                    Living 8-Axis Skill Digital Twin
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-5 font-semibold text-white">Matchmaking Algorithm</td>
                  <td className="p-5 text-center text-slate-400">Black-Box Keyword Index</td>
                  <td className="p-5 text-center text-slate-400">No Automated Matching</td>
                  <td className="p-5 text-center font-bold text-emerald-400 bg-blue-600/10 border-x border-blue-500/20">
                    Explainable AI Formula (Weights Visible)
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-5 font-semibold text-white">NEP 2020 Academic Bank of Credits</td>
                  <td className="p-5 text-center text-red-400 font-medium">✕ Not Supported</td>
                  <td className="p-5 text-center text-amber-400 font-medium">⚠ Manual Paper Log</td>
                  <td className="p-5 text-center font-bold text-emerald-400 bg-blue-600/10 border-x border-blue-500/20">
                    ✓ Native ABC Credit Deposit
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-5 font-semibold text-white">Curriculum Feedback Loop</td>
                  <td className="p-5 text-center text-red-400 font-medium">✕ Zero Feedback</td>
                  <td className="p-5 text-center text-red-400 font-medium">✕ Zero Feedback</td>
                  <td className="p-5 text-center font-bold text-emerald-400 bg-blue-600/10 border-x border-blue-500/20">
                    ✓ AI Curriculum Gap Analyzer
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-5 font-semibold text-white">AI Mock Interview Simulator</td>
                  <td className="p-5 text-center text-red-400 font-medium">✕ None</td>
                  <td className="p-5 text-center text-red-400 font-medium">✕ None</td>
                  <td className="p-5 text-center font-bold text-emerald-400 bg-blue-600/10 border-x border-blue-500/20">
                    ✓ Real-Time Voice &amp; Rigor Scoring
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-5 font-semibold text-white">Macro-Level National Policy View</td>
                  <td className="p-5 text-center text-red-400 font-medium">✕ Proprietary Silo</td>
                  <td className="p-5 text-center text-slate-400">Basic Counts</td>
                  <td className="p-5 text-center font-bold text-emerald-400 bg-blue-600/10 border-x border-blue-500/20">
                    ✓ State-Wide Supply/Demand Deficit Map
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. 24/7 NATIONAL ACADEMIC & INDUSTRY SUPPORT SYSTEM */}
      <section id="support" className="py-24 px-4 sm:px-8 bg-[#040815] border-t border-white/[0.08] relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal direction="up" duration={0.8}>
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <Badge variant="ayush" className="text-xs bg-emerald-500/20 text-emerald-300">
                24/7 Technical &amp; Academic Helpdesk
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                National Support &amp; Grievance Redressal
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Multi-channel escalation desk for candidates, healthcare recruiters, and university faculties. Fast-track resolution for APAAR sync, ABC credit transfers, and internship grievances.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Direct Nodal Officer */}
            <SpotlightCard className="p-8 space-y-5" spotlightColor="rgba(56, 189, 248, 0.25)">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                  Priority Nodal Desk
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Direct Email Support
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Monitored directly by Chief Nodal Administrator for immediate technical &amp; verification escalations.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
                <span className="text-[10px] text-slate-400 block font-semibold">Official Contact Inbox:</span>
                <a
                  href="mailto:utkarshgoel10102006@gmail.com?subject=TalentIQ%20Support%20Escalation"
                  className="text-sm font-mono text-sky-300 font-bold hover:underline block truncate"
                >
                  utkarshgoel10102006@gmail.com
                </a>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SLA: Guaranteed response under 2 hours
                </span>
              </div>
            </SpotlightCard>

            {/* Card 2: National Helplines */}
            <SpotlightCard className="p-8 space-y-5" spotlightColor="rgba(16, 185, 129, 0.25)">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Interactive Telephony
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  National Phone Helpline
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Dedicated telephone lines for student credit transfer verification and recruiter onboarding assistance.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Direct Landline</span>
                    <a
                      href="tel:+9101129994400"
                      className="text-xs font-mono font-bold text-emerald-300 hover:underline"
                    >
                      +91 (011) 2999-4400
                    </a>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Live
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Student Toll-Free</span>
                    <a
                      href="tel:18008912006"
                      className="text-xs font-mono font-bold text-sky-300 hover:underline"
                    >
                      1800-891-2006
                    </a>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                    Toll-Free
                  </span>
                </div>
              </div>
            </SpotlightCard>

            {/* Card 3: Secretariat & SLA Protocol */}
            <SpotlightCard className="p-8 space-y-5" spotlightColor="rgba(168, 85, 247, 0.25)">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/20">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                  Central Secretariat
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Institutional Hub &amp; SLA
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Headquartered at All India Institute of Ayurveda (AIIA) with Ministry of Ayush administrative alignment.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2 text-[11px]">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>AIIA Campus, Mathura Road, Gautampuri, Sarita Vihar, New Delhi - 110076</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-amber-300">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Mon – Sat: 09:00 AM – 07:00 PM IST</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* 10. JURY INTERACTIVE FAQ SECTION */}
      <section id="faq" className="py-24 px-4 sm:px-8 bg-[#040711] border-t border-white/[0.08] relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <ScrollReveal direction="up" duration={0.8}>
          <div className="text-center space-y-3">
            <Badge variant="info" className="text-xs">
              Technical &amp; Architecture Defense
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Frequently Asked Technical Questions
            </h2>
          </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.12} direction="left" distance={40} className="space-y-3">
            {[
              {
                q: "How does TalentIQ prevent AI hallucination in skill evaluation?",
                a: "Every skill in the Digital Twin is bound to verifiable cryptographic evidence (e.g. DigiLocker marksheets, university clinical logs, or proctored adaptive assessments). Self-declared skills remain unverified and carry zero weight in the primary matching algorithm until certified.",
              },
              {
                q: "How does the system ensure compliance with NEP 2020 & Academic Bank of Credits (ABC)?",
                a: "Upon completion of verified industry rotations with mentor sign-off (e.g. 45 OPD shifts or 120 laboratory trial hours), the system issues verifiable micro-credentials compliant with the National Credit Framework (NCrF) that automatically sync with the student's APAAR/ABC ID.",
              },
              {
                q: "Is candidate data private and compliant with India's DPDP Act 2023?",
                a: "Yes. In the Government and TPO dashboards, macro analytics are aggregated and k-anonymized. Student contact details are never disclosed to recruiters until an explicit match consent or application is submitted by the student.",
              },
              {
                q: "Why is this not just another internship job portal?",
                a: "Standard portals end at job postings. TalentIQ connects 5 separate stakeholders into a closed-loop system: students discover gaps, industry gets AI-ranked talent with explainable scores, faculty adjust curricula based on live demand data, and ministries monitor regional skill bottlenecks.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.09] bg-slate-900/50 backdrop-blur-xl overflow-hidden transition-all hover:border-white/20"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-white hover:text-sky-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180 text-sky-400" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/[0.06] pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 10. CINEMATIC JURY LAUNCHPAD CTA */}
      <section className="py-24 px-4 sm:px-8 bg-gradient-to-b from-[#060b18] to-[#020409] border-t border-white/[0.08] text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <ScrollReveal direction="scale" duration={0.9}>
          <Badge variant="ayush" className="text-xs bg-emerald-500/20 text-emerald-300">
            Ready for Hackathon Jury Evaluation
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Experience TalentIQ Connect Live
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Select any persona below to launch a fully initialized session with instant celebratory confetti. No manual sign-up required.
          </p>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.12} direction="up" distance={30} className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Button
              onClick={() => handleDemoLogin("STUDENT", "student@demo.com")}
              className="text-xs font-bold px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 rounded-xl"
            >
              🎓 Student Portal (Priya)
            </Button>
            <Button
              onClick={() => handleDemoLogin("INDUSTRY", "industry@demo.com")}
              className="text-xs font-bold px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-600/30 rounded-xl"
            >
              🏢 Industry Hub (Dabur)
            </Button>
            <Button
              onClick={() => handleDemoLogin("TPO", "tpo@demo.com")}
              className="text-xs font-bold px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white shadow-xl shadow-amber-600/30 rounded-xl"
            >
              🛡️ TPO Command (AIIA)
            </Button>
            <Button
              onClick={() => handleDemoLogin("GOVERNMENT", "government@demo.com")}
              className="text-xs font-bold px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 rounded-xl"
            >
              🏛️ Ministry Dashboard (Govt)
            </Button>
          </StaggerContainer>
        </div>
      </section>

      {/* 11. INSTITUTIONAL FOOTER */}
      <ScrollReveal direction="up" duration={0.7} distance={30}>
      <footer className="border-t border-white/[0.08] bg-[#020408] py-12 px-4 sm:px-8 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/[0.06]">
            {/* Col 1: Platform Brand */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white font-black text-base">
                <Image
                  src="/logo-icon.jpg"
                  alt="TalentIQ Connect"
                  width={32}
                  height={32}
                  className="rounded-lg border border-amber-400/20"
                />
                <span>Talent<span className="text-sky-400">IQ</span> Connect</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                  SIH26044
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                National Autonomous Academia–Industry Collaboration &amp; Closed-Loop Skill Mapping OS.
              </p>
              <div className="text-[10px] text-slate-500">
                Ministry of Ayush &bull; All India Institute of Ayurveda
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">Navigation</h5>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li><a href="#showcase" className="hover:text-sky-300">Competency Radar</a></li>
                <li><a href="#architecture" className="hover:text-sky-300">5 Closed-Loop Pillars</a></li>
                <li><a href="#journey" className="hover:text-sky-300">Student 5-Stage Journey</a></li>
                <li><a href="#matrix" className="hover:text-sky-300">Jury Benchmark Matrix</a></li>
                <li><a href="#faq" className="hover:text-sky-300">Technical Defense</a></li>
              </ul>
            </div>

            {/* Col 3: Support Contact */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-sky-400" />
                24/7 Support Desk
              </h5>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-3 h-3 text-sky-400 shrink-0" />
                  <a href="mailto:utkarshgoel10102006@gmail.com" className="hover:underline font-mono text-sky-300">
                    utkarshgoel10102006@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                  <a href="tel:+9101129994400" className="hover:underline font-mono">
                    +91 (011) 2999-4400
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1 py-0.5 rounded">
                    Toll-Free
                  </span>
                  <a href="tel:18008912006" className="hover:underline font-mono text-emerald-300">
                    1800-891-2006
                  </a>
                </div>
              </div>
            </div>

            {/* Col 4: Secretariat Location */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                Central Secretariat
              </h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                All India Institute of Ayurveda (AIIA), Mathura Road, Gautampuri, Sarita Vihar, New Delhi - 110076.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-amber-300">
                <Clock className="w-3 h-3" />
                <span>Mon – Sat: 09:00 AM – 07:00 PM IST</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
            <div>
              &copy; {new Date().getFullYear()} TalentIQ Connect. Smart India Hackathon (SIH26044). All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span>DPDP Act 2023 Compliant</span>
              <span>&bull;</span>
              <span>NEP 2020 Aligned</span>
              <span>&bull;</span>
              <span>DigiLocker APAAR NCrF Protocol</span>
            </div>
          </div>
        </div>
      </footer>
      </ScrollReveal>
    </div>
  );
}
