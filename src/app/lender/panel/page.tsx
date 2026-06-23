"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { lenderPanelAppraisers } from "@/data/mockData";
import { MapPin, CheckCircle2 } from "lucide-react";

export default function PanelPage() {
  return (
    <AppShell>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>
        Panel Management & Recruiting Map
      </h1>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Appraisers</div>
          <div className="kpi-value">
            {lenderPanelAppraisers.filter(a => a.status === "Active").length}
          </div>
          <div className="kpi-trend up">+6 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Counties Covered</div>
          <div className="kpi-value">82</div>
          <div className="kpi-trend">3 limited coverage</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Performance</div>
          <div className="kpi-value">
            {Math.round(lenderPanelAppraisers.reduce((sum, a) => sum + a.performance, 0) / lenderPanelAppraisers.length)}%
          </div>
          <div className="kpi-trend up">+2%</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
          Appraiser Roster
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Appraiser</th>
                <th>License</th>
                <th>Coverage</th>
                <th>Status</th>
                <th>Performance</th>
                <th>Last Order</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {lenderPanelAppraisers.map((appraiser) => (
                <tr key={appraiser.id}>
                  <td style={{ fontWeight: 600 }}>{appraiser.name}</td>
                  <td style={{ fontSize: 13, color: "var(--muted)" }}>{appraiser.license}</td>
                  <td style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                    <MapPin size={14} /> {appraiser.counties.join(", ")}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        appraiser.status === "Active" ? "badge-green" : "badge-amber"
                      }`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {appraiser.status === "Active" && <CheckCircle2 size={12} />}
                      {appraiser.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 80, height: 8, background: "var(--bg-alt)", borderRadius: 4, overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${appraiser.performance}%`,
                            height: "100%",
                            background: appraiser.performance >= 90
                              ? "var(--accent)"
                              : appraiser.performance >= 80
                              ? "#f59e0b"
                              : "#ef4444",
                            borderRadius: 4,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{appraiser.performance}%</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: "var(--muted)" }}>{appraiser.lastOrder}</td>
                  <td>{appraiser.orders}</td>
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
