"use client";

import React from "react";

const PARTNERS = [
  { name: "Ministry of Ayush", badge: "Governing Body", icon: "🏛️" },
  { name: "All India Institute of Ayurveda", badge: "Lead Institution", icon: "🌿" },
  { name: "Dabur Healthcare & R&D", badge: "Clinical Partner", icon: "💊" },
  { name: "IIT Delhi", badge: "AICTE Academic Partner", icon: "🎓" },
  { name: "Cipla Research Labs", badge: "Pharma Sponsor", icon: "🔬" },
  { name: "DigiLocker & APAAR", badge: "Identity Protocol", icon: "🛡️" },
  { name: "Academic Bank of Credits", badge: "NEP 2020", icon: "🏦" },
  { name: "SWAYAM NPTEL", badge: "Bridge Courses", icon: "📖" },
  { name: "Biocon Biologics", badge: "Industry Hiring", icon: "🧬" },
  { name: "Patanjali Research Foundation", badge: "Botanical R&D", icon: "🌱" },
];

export function InfiniteMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/[0.06] bg-slate-950/40 backdrop-blur-xl">
      {/* Side gradient mask for seamless fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060913] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060913] to-transparent z-10" />

      <div className="flex w-max animate-[marquee_28s_linear_infinite] space-x-6 hover:[animation-play-state:paused]">
        {[...PARTNERS, ...PARTNERS].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 transition-colors shrink-0"
          >
            <span className="text-lg">{item.icon}</span>
            <div>
              <span className="text-xs font-bold text-slate-200 block">{item.name}</span>
              <span className="text-[9px] font-semibold text-sky-400 uppercase tracking-wider">
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
