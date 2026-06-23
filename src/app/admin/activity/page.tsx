"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { activityLogEntries } from "@/data/mockData";
import { Clock, FileText, Users, Settings, ShieldCheck } from "lucide-react";

export default function AdminActivityPage() {
  const getIconForType = (type: string) => {
    switch (type) {
      case "Order":
        return <FileText size={14} />;
      case "User":
        return <Users size={14} />;
      case "System":
        return <Settings size={14} />;
      case "Compliance":
        return <ShieldCheck size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <AppShell>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>
        Activity & Audit Log
      </h1>

      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-label">Total Activity</div>
          <div className="kpi-value">{activityLogEntries.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Order Activity</div>
          <div className="kpi-value">
            {activityLogEntries.filter(e => e.type === "Order").length}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">User Activity</div>
          <div className="kpi-value">
            {activityLogEntries.filter(e => e.type === "User").length}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Compliance Activity</div>
          <div className="kpi-value">
            {activityLogEntries.filter(e => e.type === "Compliance").length}
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {activityLogEntries.map((entry) => (
            <div
              key={entry.id}
              style={{
                padding: "12px 16px",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                background: "var(--card)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text)" }}>
                    {getIconForType(entry.type)}
                    <span style={{ fontWeight: 700 }}>{entry.user}</span>
                  </span>
                  <span
                    className={`badge ${
                      entry.type === "Compliance"
                        ? "badge-green"
                        : entry.type === "System"
                        ? "badge-amber"
                        : "badge-green"
                    }`}
                    style={{ fontSize: "10px" }}
                  >
                    {entry.type}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--muted)", fontSize: "12px" }}>
                  <Clock size={12} />
                  {entry.timestamp}
                </div>
              </div>
              <div style={{ fontSize: "13px", color: "var(--text)" }}>{entry.action}</div>
            </div>
          ))}
        </div>
      </div>

      <ChatBot />
    </AppShell>
  );
}
