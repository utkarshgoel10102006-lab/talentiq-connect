"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Sparkles,
  X,
  Send,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { CopilotMessage } from "@/lib/ai/ai-service";

export function FloatingCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "init_1",
      sender: "copilot",
      content:
        "Namaste Priya! I am your **TalentIQ Career Copilot**, connected to the National Skill Intelligence Graph (Ministry of Ayush & AICTE).\n\nYour current **Career Readiness is 78%** for *Clinical Research Associate*. What would you like to explore today?",
      timestamp: "Just now",
      citations: ["CCRAS Clinical Practice Protocol", "NEP 2020 Skill Matrix"],
      suggestedActions: [
        { label: "Why is my score 78%?", action: "why_score" },
        { label: "How to close Biostatistics gap?", action: "biostat_gap" },
        { label: "Check Dabur Internship Match", action: "dabur_match" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: CopilotMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      content: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (data.response) {
        setMessages((prev) => [...prev, data.response]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 p-3.5 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <div className="relative">
            <Bot className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-left pr-2 hidden sm:block">
            <p className="text-xs font-bold leading-none">TalentIQ Copilot</p>
            <p className="text-[10px] text-blue-100 font-medium">AI Career Assistant</p>
          </div>
        </button>
      ) : (
        <Card className="w-[360px] sm:w-[420px] h-[580px] flex flex-col shadow-2xl border-slate-200 dark:border-slate-800 overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs font-bold">TalentIQ Career Copilot</h4>
                  <Badge variant="ayush" className="text-[9px] py-0 px-1.5">RAG v2.4</Badge>
                </div>
                <p className="text-[10px] text-slate-300">
                  Grounding: Ministry of Ayush & AICTE Knowledge Base
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-xl p-3 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60"
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.content}
                  </div>

                  {/* Citations if available (zero hallucination proof) */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 dark:text-slate-400 space-y-1">
                      <div className="flex items-center space-x-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Government Citations:</span>
                      </div>
                      {msg.citations.map((c, i) => (
                        <p key={i} className="truncate pl-3 border-l-2 border-emerald-500/40">
                          {c}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Suggested Quick Actions */}
                  {msg.suggestedActions && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(act.label)}
                          className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900 dark:text-blue-300 font-medium px-2 py-1 rounded-md border border-blue-200 dark:border-blue-800 transition-colors flex items-center space-x-1"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg w-fit">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span>Consulting National Skill Graph & Knowledge Base...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-1 overflow-x-auto text-[10px] text-slate-600 dark:text-slate-400 scrollbar-none">
            <span className="font-semibold text-slate-400 shrink-0">Ask:</span>
            <button
              onClick={() => handleSend("What skills do I need for an Ayurvedic research career?")}
              className="shrink-0 px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100"
            >
              🌿 Ayush Research Career
            </button>
            <button
              onClick={() => handleSend("Why is my score 78%?")}
              className="shrink-0 px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100"
            >
              📊 Explain 78% Score
            </button>
            <button
              onClick={() => handleSend("How can I prepare for interviews?")}
              className="shrink-0 px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100"
            >
              🎯 Interview Prep
            </button>
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t bg-white dark:bg-slate-900 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask anything about skills, gaps, or AYUSH careers..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              size="sm"
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="h-8 px-3 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
