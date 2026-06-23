"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { auditLogEntries } from "@/data/mockData";
import { Download, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { useApp } from "@/context/AppProvider";

export default function ComplianceAuditPage() {
  const { showToast } = useApp();

  return (
    <AppShell>
      <div className="hero-banner">
        <h1 className="hero-banner-title" style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          Audit Trail Hub
        </h1>
        <p className="hero-banner-muted">
          Immutable audit logs for all appraisal activities
        </p>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-label">Total Audit Entries</div>
          <div className="kpi-value">{auditLogEntries.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Successful Actions</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>
            {auditLogEntries.filter(e => e.status === "Success").length}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Warnings</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>
            {auditLogEntries.filter(e => e.status === "Warning").length}
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>
            Recent Audit Logs
          </h3>
          <button
            onClick={() => showToast("Audit package export initiated!")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg-alt)",
              color: "var(--text)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            <Download size={14} />
            Export Package
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Entry ID</th>
                <th>Order ID</th>
                <th>Action</th>
                <th>User</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogEntries.map((entry) => (
                <tr key={entry.id}>
                  <td style={{ fontWeight: 600 }}>{entry.id}</td>
                  <td>{entry.orderId}</td>
                  <td>{entry.action}</td>
                  <td>{entry.user}</td>
                  <td>{entry.timestamp}</td>
                  <td>
                    <span
                      className={`badge ${
                        entry.status === "Success"
                          ? "badge-green"
                          : entry.status === "Warning"
                          ? "badge-amber"
                          : "badge-red"
                      }`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {entry.status === "Success" && <CheckCircle2 size={12} />}
                      {entry.status === "Warning" && <AlertTriangle size={12} />}
                      {entry.status === "Error" && <XCircle size={12} />}
                      {entry.status}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: "var(--muted)" }}>{entry.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ChatBot />
    </AppShell>
  );
}
