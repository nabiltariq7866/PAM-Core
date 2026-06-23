"use client";

import { Sparkles, X, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickQuestion = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: answer },
    ]);
  };

  const quickQuestions = [
    {
      question: "Which orders are at risk today?",
      answer: "AI Analysis: You have 12 at-risk orders today. Highest priority is PAM-2026-003 in 'Revision Requested' status - the appraiser is behind on the 24-hour SLA for revisions.",
    },
    {
      question: "Why is order PAM-2026-003 delayed?",
      answer: "AI Analysis: Order PAM-2026-003 is currently delayed in 'Revision Requested' state. The appraiser (David Vance) hasn't updated the unsupported adjustments narrative within the 24-hour SLA framework. The borrower has initiated an ROV dispute.",
    },
    {
      question: "Show total borrower savings metric breakdown.",
      answer: "Total borrower savings to date: $142,500\n\nBreakdown:\n• 150 orders processed\n• Average savings per order: $950\n• Savings range: $280 - $520 per order\n• Comparison: 25-40% reduction from traditional AMC markup",
    },
  ];

  return (
    <div className="presenter-dock">
      {isOpen && (
        <div className="presenter-panel" style={{ width: 380, maxHeight: 480 }}>
          <div style={{ padding: 16, borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--gradient-brand)", color: "var(--text-on-primary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={20} />
              <span style={{ fontWeight: 700, fontSize: 15 }}>AI Appraisal Desk Copilot</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 4 }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ padding: 16, height: 340, overflowY: "auto" }}>
            {messages.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Ask me anything about your appraisal operations...</p>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q.question, q.answer)}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      color: "var(--text)",
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "var(--highlight)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "var(--bg)";
                    }}
                  >
                    {q.question}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                      padding: "10px 14px",
                      borderRadius: 12,
                      background: msg.role === "user" ? "var(--accent)" : "var(--bg-alt)",
                      color: msg.role === "user" ? "var(--text-on-primary)" : "var(--text)",
                      fontSize: 13,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div style={{ padding: 12, borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="Ask the AI Copilot..."
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: 13,
                  outline: "none",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleQuickQuestion(e.currentTarget.value, "I'm analyzing your question... For now, try one of the quick questions!");
                    e.currentTarget.value = "";
                  }
                }}
              />
              <button style={{ padding: "0 16px", borderRadius: 8, border: "none", background: "var(--accent)", color: "var(--text-on-primary)", cursor: "pointer" }}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="presenter-trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <Sparkles size={20} />
        <span>AI Copilot</span>
      </button>
    </div>
  );
}
