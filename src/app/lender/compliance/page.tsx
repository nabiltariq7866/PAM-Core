"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { ShieldCheck, Download, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppProvider";

export default function CompliancePage() {
  const { showToast } = useApp();
  const [exportClicked, setExportClicked] = useState(false);

  return (
    <AppShell>
      <div className="hero-banner">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <ShieldCheck size={24} style={{ color: "var(--accent)" }} />
          <h1 className="hero-banner-title" style={{ fontSize: 24, marginBottom: 0 }}>
            Loan Production Firewall: Active
          </h1>
        </div>
        <p className="hero-banner-muted">
          Production/LO accounts restricted from manual panel assignment changes
        </p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            AIR Appraiser Rotation Visualizer
          </h3>

          <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 16, marginBottom: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                <CheckCircle2 size={16} style={{ color: "var(--accent)" }} />
                Step 1: Geographic Competency Filter
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>Filtered by ZIP 60611 → 14 appraisers found</p>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                <CheckCircle2 size={16} style={{ color: "var(--accent)" }} />
                Step 2: Capacity & License Check
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>5 available, 2 expired, 1 over capacity</p>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                <CheckCircle2 size={16} style={{ color: "var(--accent)" }} />
                Step 3: Anti-Bias Rotation Selection
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>Selected: Robert Long, Certified Res</p>
              <p style={{ fontSize: 12, color: "var(--muted)", fontStyle: "italic", marginTop: 4 }}>
                Rotation logic: weighted by recent turn time, capacity, and past performance
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            Export Immutable Audit Package
          </h3>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "var(--bg-alt)", borderRadius: 8, marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text)" }}>PAM-2026-002 Audit Log</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Encrypted • SHA-256 Verified</div>
              </div>
              <Download size={20} style={{ color: "var(--accent)" }} />
            </div>

            <button
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "none",
                background: "var(--accent)",
                color: "var(--text-on-primary)",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onClick={() => {
                setExportClicked(true);
                showToast("Compliance audit package exported successfully!");
              }}
            >
              <Download size={18} />
              Export Compliance Package (PDF/JSON)
            </button>

            {exportClicked && (
              <div style={{ marginTop: 12, padding: 12, background: "rgba(27, 212, 136, 0.1)", border: "1px solid rgba(27, 212, 136, 0.3)", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={18} style={{ color: "var(--accent)" }} />
                <span style={{ fontSize: 13, color: "var(--text)" }}>
                  Audit package exported successfully. Cryptographic hash: abc123...def456
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ChatBot />
    </AppShell>
  );
}
