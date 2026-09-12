import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import { FloatingCopilot } from "@/components/copilot/FloatingCopilot";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 dark:bg-slate-950">
      <Navbar currentRole="STUDENT" userName="Priya Sharma (BAMS)" />
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        <StudentSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <FloatingCopilot />
    </div>
  );
}
