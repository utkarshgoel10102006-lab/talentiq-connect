"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lock,
  Mail,
  ShieldCheck,
  GraduationCap,
  Building2,
  Shield,
  Landmark,
} from "lucide-react";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [email, setEmail] = useState("student@demo.com");
  const [password, setPassword] = useState("demo123456");
  const [selectedRole, setSelectedRole] = useState("STUDENT");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: selectedRole }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Login failed. Check credentials.");
        return;
      }

      router.push(callbackUrl || data.redirectUrl || "/student");
      router.refresh();
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoAccount = (role: string, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    setPassword("demo123456");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link href="/" className="inline-flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-amber-400/30">
            <Image
              src="/logo-icon.jpg"
              alt="TalentIQ Connect"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">
            Talent<span className="text-blue-400">IQ</span> Connect
          </span>
        </Link>
        <p className="text-xs text-slate-400">
          Academia–Industry Talent Intelligence Operating System
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="border-slate-800 bg-slate-900/90 backdrop-blur shadow-2xl">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-lg font-bold text-white text-center">
              Role-Based Sign In
            </CardTitle>
            <CardDescription className="text-xs text-slate-400 text-center">
              Select a demo profile or enter your institutional credentials.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-0 space-y-4">
            {/* Quick Demo Role Buttons */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block text-center">
                ⚡ 1-Click Demo Profiles:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDemoAccount("STUDENT", "student@demo.com")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center space-x-2 ${
                    selectedRole === "STUDENT"
                      ? "border-blue-500 bg-blue-950/60 text-white"
                      : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="font-bold text-[11px]">Student</p>
                    <p className="text-[9px] text-slate-400">Priya (BAMS)</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDemoAccount("INDUSTRY", "industry@demo.com")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center space-x-2 ${
                    selectedRole === "INDUSTRY"
                      ? "border-purple-500 bg-purple-950/60 text-white"
                      : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <div>
                    <p className="font-bold text-[11px]">Industry</p>
                    <p className="text-[9px] text-slate-400">Dabur R&D</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDemoAccount("TPO", "tpo@demo.com")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center space-x-2 ${
                    selectedRole === "TPO"
                      ? "border-amber-500 bg-amber-950/60 text-white"
                      : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"
                  }`}
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="font-bold text-[11px]">TPO Officer</p>
                    <p className="text-[9px] text-slate-400">Placement Cell</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDemoAccount("GOVERNMENT", "government@demo.com")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center space-x-2 ${
                    selectedRole === "GOVERNMENT"
                      ? "border-emerald-500 bg-emerald-950/60 text-white"
                      : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"
                  }`}
                >
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="font-bold text-[11px]">Ministry</p>
                    <p className="text-[9px] text-slate-400">Ayush Govt</p>
                  </div>
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <div className="relative mt-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9 text-xs bg-slate-950 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Demo Password</label>
                <div className="relative mt-1">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-9 text-xs bg-slate-950 border-slate-700 text-white"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Default Demo Password: <code className="text-blue-400">demo123456</code>
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs mt-2"
              >
                {isLoading ? "Authenticating Session..." : `Sign In as ${selectedRole} &rarr;`}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="p-6 pt-0 border-t border-slate-800/80 mt-2">
            <div className="w-full text-center text-xs text-slate-500 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Secured by JWT &bull; APAAR / DigiLocker Protocol</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400 text-sm">Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
