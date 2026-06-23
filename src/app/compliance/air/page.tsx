"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { airComplianceEvents } from "@/data/mockData";
import { ShieldCheck, AlertTriangle, XCircle } from "lucide-react";

export default function ComplianceAirPage() {
  return (
    <AppShell>
      <div className="hero-banner">
        <h1 className="hero-banner-title" style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          AIR Compliance
        </h1>
        <p className="hero-banner-muted">
          Appraiser Independence Requirements monitoring and enforcement
        </p>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-label">Compliance Score</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>98%</div>
          <div className="kpi-trend up">+2% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">AIR Rotations</div>
          <div className="kpi-value">
            {airComplianceEvents.filter(e => e.type === "Rotation").length}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Firewall Blocks</div>
          <div className="kpi-value">
            {airComplianceEvents.filter(e => e.type === "Firewall").length}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Warnings</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>
            {airComplianceEvents.filter(e => e.status === "Warning").length}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
          Recent AIR Events
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {airComplianceEvents.map((event) => (
                <tr key={event.id}>
                  <td style={{ fontWeight: 600 }}>{event.id}</td>
                  <td>{event.type}</td>
                  <td>{event.description}</td>
                  <td>{event.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        event.status === "Compliant"
                          ? "badge-green"
                          : event.status === "Warning"
                          ? "badge-amber"
                          : "badge-red"
                      }`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {event.status === "Compliant" && <ShieldCheck size={12} />}
                      {event.status === "Warning" && <AlertTriangle size={12} />}
                      {event.status === "Exception" && <XCircle size={12} />}
                      {event.status}
                    </span>
                  </td>
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
