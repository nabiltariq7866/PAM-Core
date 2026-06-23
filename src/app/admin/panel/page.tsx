"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { appraiserNetwork } from "@/data/mockData";
import { CheckCircle2, AlertTriangle, Clock, UserPlus } from "lucide-react";
import { useApp } from "@/context/AppProvider";

export default function AdminPanelPage() {
  const { showToast } = useApp();

  return (
    <AppShell>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>
        Appraiser Network
      </h1>

      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-label">Total Appraisers</div>
          <div className="kpi-value">{appraiserNetwork.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Appraisers</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>
            {appraiserNetwork.filter(a => a.status === "Active").length}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Onboarding</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>
            {appraiserNetwork.filter(a => a.status === "Onboarding").length}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Performance Score</div>
          <div className="kpi-value">
            {Math.round(appraiserNetwork.reduce((sum, a) => sum + a.performance, 0) / appraiserNetwork.length)}%
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>
            All Appraisers
          </h3>
          <button
            onClick={() => showToast("New appraiser onboarding initiated!")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background: "var(--accent)",
              color: "var(--text-on-primary)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            <UserPlus size={14} />
            Add Appraiser
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>License</th>
                <th>Counties</th>
                <th>Performance</th>
                <th>Status</th>
                <th>Orders</th>
                <th>Avg Turn Time</th>
              </tr>
            </thead>
            <tbody>
              {appraiserNetwork.map((appraiser) => (
                <tr key={appraiser.id}>
                  <td style={{ fontWeight: 600 }}>{appraiser.id}</td>
                  <td style={{ fontWeight: 600 }}>{appraiser.name}</td>
                  <td style={{ fontSize: 13, color: "var(--muted)" }}>{appraiser.license}</td>
                  <td style={{ fontSize: 13, color: "var(--muted)" }}>
                    {appraiser.counties.join(", ")}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          width: 100,
                          height: 8,
                          background: "var(--bg-alt)",
                          borderRadius: 4,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${appraiser.performance}%`,
                            height: "100%",
                            background: appraiser.performance >= 90
                              ? "var(--accent)"
                              : appraiser.performance >= 80
                              ? "#f59e0b"
                              : "#ef4444",
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 600 }}>{appraiser.performance}%</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        appraiser.status === "Active"
                          ? "badge-green"
                          : appraiser.status === "Onboarding"
                          ? "badge-amber"
                          : "badge-red"
                      }`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {appraiser.status === "Active" && <CheckCircle2 size={12} />}
                      {appraiser.status === "Onboarding" && <Clock size={12} />}
                      {appraiser.status === "Inactive" && <AlertTriangle size={12} />}
                      {appraiser.status}
                    </span>
                  </td>
                  <td>{appraiser.orders}</td>
                  <td>{appraiser.avgTurnTime} days</td>
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
