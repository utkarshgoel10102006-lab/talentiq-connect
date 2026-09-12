"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  X,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  MapPin,
  Sparkles,
  LifeBuoy,
  FileText,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "ticket" | "contact">("chat");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quick AI Chat simulator state
  const [messages, setMessages] = useState<
    Array<{ sender: "bot" | "user"; text: string; time: string }>
  >([
    {
      sender: "bot",
      text: "Namaste! Welcome to TalentIQ National Support. How can we assist you with internships, Academic Bank of Credits (ABC), or recruiter verification today?",
      time: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Ticket Form state
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    role: "STUDENT",
    category: "CREDIT_TRANSFER",
    message: "",
  });
  const [ticketSubmitted, setTicketSubmitted] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const officialEmail = "utkarshgoel10102006@gmail.com";
  const officialPhone = "+91 (011) 2999-4400";
  const tollFree = "1800-891-2006";

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, time: "Just now" },
    ]);
    setInputMessage("");

    setTimeout(() => {
      let botResponse =
        "Thank you for contacting TalentIQ Support. Our team has logged your inquiry. For urgent escalations, please email utkarshgoel10102006@gmail.com or call +91 (011) 2999-4400.";

      const lower = userText.toLowerCase();
      if (lower.includes("credit") || lower.includes("abc") || lower.includes("apaar")) {
        botResponse =
          "Under NEP 2020 guidelines, your mentor logs 45 OPD shifts or 120 laboratory trial hours to trigger automatic transfer into your APAAR/ABC account within 24 hours.";
      } else if (lower.includes("internship") || lower.includes("apply") || lower.includes("stipend")) {
        botResponse =
          "Internships feature 100% verified stipends (₹20,000–₹35,000/mo) deposited directly via DBT. You can check application statuses in your Student Dashboard.";
      } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("email")) {
        botResponse = `You can directly reach our Support Officer at ${officialEmail} or dial our national desk at ${officialPhone} (Toll-Free: ${tollFree}).`;
      } else if (lower.includes("ticket") || lower.includes("issue") || lower.includes("grievance")) {
        botResponse =
          "You can lodge a formal grievance under our 'Submit Ticket' tab. It generates a verified tracking ID and forwards immediately to the nodal coordinator.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse, time: "Just now" },
      ]);
    }, 600);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `TIQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketSubmitted(ticketId);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 800);
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white shadow-2xl shadow-blue-500/40 border border-white/20 backdrop-blur-xl"
          aria-label="Open Support Desk"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <Headphones className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs font-bold tracking-wide hidden sm:inline">
            24/7 Support Desk
          </span>
        </motion.button>
      </div>

      {/* SUPPORT MODAL / DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-[#070d1e] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
            >
              {/* MODAL HEADER */}
              <div className="p-5 border-b border-white/10 bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-sky-400 shadow-md shadow-blue-500/20">
                    <LifeBuoy className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      TalentIQ Support &amp; Helpdesk
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold">
                        Online
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      National Academic &bull; Industry Coordination Desk
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex border-b border-white/10 bg-slate-950/60 p-1.5 gap-1 text-xs font-bold">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === "chat"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Concierge
                </button>

                <button
                  onClick={() => setActiveTab("ticket")}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === "ticket"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Submit Ticket
                </button>

                <button
                  onClick={() => setActiveTab("contact")}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === "contact"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Direct Desk
                </button>
              </div>

              {/* TAB 1: AI CONCIERGE CHAT */}
              {activeTab === "chat" && (
                <div className="flex flex-col flex-1 overflow-hidden">
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-80 text-xs">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${
                          m.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                            m.sender === "user"
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
                              : "bg-white/[0.07] border border-white/[0.1] text-slate-200 rounded-bl-none shadow-sm"
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1 px-1">
                          {m.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quick suggested chips */}
                  <div className="px-4 py-2 bg-slate-950/40 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[10px]">
                    <button
                      onClick={() => handleQuickPrompt("How do ABC credits transfer?")}
                      className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-sky-300 border border-white/10 transition-colors"
                    >
                      🎓 ABC Credit Transfer
                    </button>
                    <button
                      onClick={() => handleQuickPrompt("Support contact info")}
                      className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-sky-300 border border-white/10 transition-colors"
                    >
                      📞 Direct Helpline
                    </button>
                    <button
                      onClick={() => handleQuickPrompt("Internship stipend details")}
                      className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-sky-300 border border-white/10 transition-colors"
                    >
                      💰 Stipend Query
                    </button>
                  </div>

                  {/* Chat Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="p-3 border-t border-white/10 bg-slate-950/80 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask anything or request assistance..."
                      className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
                    />
                    <button
                      type="submit"
                      className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: SUBMIT TICKET FORM */}
              {activeTab === "ticket" && (
                <div className="p-5 flex-1 overflow-y-auto space-y-4">
                  {ticketSubmitted ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/30">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="font-extrabold text-base text-white">
                        Grievance Ticket Registered!
                      </h4>
                      <p className="text-xs text-slate-300 max-w-xs mx-auto">
                        Your inquiry has been assigned Tracking ID:
                      </p>
                      <div className="inline-block px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400/40 text-sky-300 font-mono font-black text-sm">
                        {ticketSubmitted}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Dispatched to coordinator at{" "}
                        <strong className="text-white">{officialEmail}</strong>. Expected turnaround: &lt; 2 business hours.
                      </p>
                      <button
                        onClick={() => {
                          setTicketSubmitted(null);
                          setTicketData({
                            name: "",
                            email: "",
                            role: "STUDENT",
                            category: "CREDIT_TRANSFER",
                            message: "",
                          });
                        }}
                        className="text-xs text-sky-400 font-bold hover:underline pt-2 block mx-auto"
                      >
                        Submit another ticket &rarr;
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} className="space-y-3.5 text-xs">
                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={ticketData.name}
                          onChange={(e) =>
                            setTicketData({ ...ticketData, name: e.target.value })
                          }
                          placeholder="e.g. Priya Sharma / Dr. Arvind"
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-slate-300 block mb-1">
                            Your Email *
                          </label>
                          <input
                            required
                            type="email"
                            value={ticketData.email}
                            onChange={(e) =>
                              setTicketData({ ...ticketData, email: e.target.value })
                            }
                            placeholder="user@domain.com"
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-300 block mb-1">
                            Your Role
                          </label>
                          <select
                            value={ticketData.role}
                            onChange={(e) =>
                              setTicketData({ ...ticketData, role: e.target.value })
                            }
                            className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                          >
                            <option value="STUDENT">Student Candidate</option>
                            <option value="INDUSTRY">Industry Recruiter / Partner</option>
                            <option value="TPO">University Faculty / TPO</option>
                            <option value="GOVERNMENT">Ministry Administrator</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Issue Category
                        </label>
                        <select
                          value={ticketData.category}
                          onChange={(e) =>
                            setTicketData({ ...ticketData, category: e.target.value })
                          }
                          className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                        >
                          <option value="CREDIT_TRANSFER">
                            Academic Bank of Credits (ABC) Transfer
                          </option>
                          <option value="INTERNSHIP_DISPUTE">
                            Internship Application / Stipend Disbursement
                          </option>
                          <option value="VERIFICATION">
                            DigiLocker / APAAR Credential Sync
                          </option>
                          <option value="CURRICULUM">
                            Faculty Curriculum Bridge Course Query
                          </option>
                          <option value="TECHNICAL">
                            Portal Bug / Technical Inconsistency
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 block mb-1">
                          Detailed Description *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={ticketData.message}
                          onChange={(e) =>
                            setTicketData({ ...ticketData, message: e.target.value })
                          }
                          placeholder="Please provide details of your issue, candidate APAAR ID, or internship ID..."
                          className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Dispatching to Support Officer...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Register Official Grievance Ticket
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 3: DIRECT CONTACT DESK */}
              {activeTab === "contact" && (
                <div className="p-5 flex-1 overflow-y-auto space-y-3.5 text-xs">
                  {/* Officer Email Card */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                        Official Nodal Support Email
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                        Priority Inbox
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-white/10">
                      <a
                        href={`mailto:${officialEmail}?subject=TalentIQ%20Support%20Request`}
                        className="font-mono text-sky-300 font-bold hover:underline truncate mr-2"
                      >
                        {officialEmail}
                      </a>
                      <button
                        onClick={() => handleCopy(officialEmail, "email")}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                        title="Copy Email"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Monitored 24/7 by Utkarsh Goel (Chief Nodal Administrator). Response time &lt; 2 hours.
                    </p>
                  </div>

                  {/* Phone & Toll-Free Desk */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        National Grievance Helpline
                      </span>
                      <span className="text-[10px] text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded-full border border-sky-500/30 font-bold">
                        Toll-Free Available
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-500 block">Direct Landline</span>
                          <a
                            href={`tel:${officialPhone.replace(/\s+/g, "")}`}
                            className="font-mono text-emerald-300 font-bold hover:underline text-xs"
                          >
                            {officialPhone}
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopy(officialPhone, "phone")}
                          className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300"
                        >
                          {copiedPhone ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-500 block">National Toll-Free</span>
                          <a
                            href={`tel:${tollFree.replace(/-/g, "")}`}
                            className="font-mono text-sky-300 font-bold hover:underline text-xs"
                          >
                            {tollFree}
                          </a>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                          Free
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hours & Physical Hub */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Operational: Monday – Saturday (09:00 AM – 07:00 PM IST)</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        Central Coordination Secretariat &bull; All India Institute of Ayurveda (AIIA), Mathura Road, Gautampuri, Sarita Vihar, New Delhi - 110076
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* FOOTER */}
              <div className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-sky-400" />
                  DPDP Act 2023 &amp; NEP 2020 Protected
                </span>
                <span>SIH26044 Coordination Cell</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
