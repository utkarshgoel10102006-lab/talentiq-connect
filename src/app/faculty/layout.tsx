import React from "react";
import { Navbar } from "@/components/layout/Navbar";

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 dark:bg-slate-950">
      <Navbar currentRole="FACULTY" userName="Dr. Ananya Mukherjee (Faculty)" />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
