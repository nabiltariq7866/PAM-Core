"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { complianceExceptions } from "@/data/mockData";
import { AlertTriangle, CheckCircle2, FileText } from "lucide-react";

export default function AdminCompliancePage() {
  return (
    <AppShell>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>
        Compliance Engine
      </h1>

      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-label">Total Exceptions</div>
          <div className="kpi-value">{complianceExceptions.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Open Exceptions</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>
            {complianceExceptions.filter(e => e.status === "Open").length}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">In Review</div>
          <div className="kpi-value" style={{ color: "#8b5cf6" }}>
            {complianceExceptions.filter(e => e.status === "In Review").length}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Resolved</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>
            {complianceExceptions.filter(e => e.status === "Resolved").length}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
          Compliance Exceptions
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order ID</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {complianceExceptions.map((exception) => (
                <tr key={exception.id}>
                  <td style={{ fontWeight: 600 }}>{exception.id}</td>
                  <td>{exception.orderId}</td>
                  <td>{exception.type}</td>
                  <td>
                    <span
                      className={`badge ${
                        exception.severity === "High"
                          ? "badge-red"
                          : exception.severity === "Medium"
                          ? "badge-amber"
                          : "badge-green"
                      }`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {exception.severity === "High" && <AlertTriangle size={12} />}
                      {exception.severity}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: "var(--muted)" }}>{exception.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        exception.status === "Resolved"
                          ? "badge-green"
                          : exception.status === "In Review"
                          ? "badge-amber"
                          : "badge-red"
                      }`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {exception.status === "Resolved" && <CheckCircle2 size={12} />}
                      {exception.status}
                    </span>
                  </td>
                  <td>{exception.date}</td>
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
