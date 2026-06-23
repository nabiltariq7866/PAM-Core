"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { mockOrders, orderPipelineData } from "@/data/mockData";
import { AlertTriangle, Brain, TrendingUp, Zap } from "lucide-react";
import { useApp } from "@/context/AppProvider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function OrdersPage() {
  const { showToast } = useApp();
  const orderWithMissingData = mockOrders.find((o) => o.id === "PAM-2026-001")!;
  const orderInQc = mockOrders.find((o) => o.id === "PAM-2026-002")!;

  return (
    <AppShell>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>
        AI-Powered Intake & QC Review Engine
      </h1>

      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-label">AI Risk Alerts</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>2</div>
          <div className="kpi-trend">Review Required</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Turn Time</div>
          <div className="kpi-value">6.2 days</div>
          <div className="kpi-trend up">-1.2 days</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Orders</div>
          <div className="kpi-value">{mockOrders.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">QC Pass Rate</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>92%</div>
          <div className="kpi-trend up">+3% this month</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>
            Live Order Pipeline
          </h3>
          <span className="badge badge-green" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Zap size={12} />
            AI-Powered Assignment
          </span>
        </div>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderPipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--muted)" 
                tick={{ fontSize: 11 }} 
              />
              <YAxis stroke="var(--muted)" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  background: "var(--card)", 
                  border: "1px solid var(--border)", 
                  borderRadius: 8 
                }} 
              />
              <Bar dataKey="orders" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            Incoming LOS / Encompass Stream
          </h3>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, color: "var(--text)" }}>{orderWithMissingData.id}</span>
              <span className="badge badge-amber">{orderWithMissingData.status}</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
              {orderWithMissingData.borrower} • {orderWithMissingData.address}
            </p>

            <div style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: "var(--amber-500)", fontWeight: 700 }}>
                <Brain size={18} />
                AI Delay Probability: 87%
              </div>
              <ul style={{ marginLeft: 20, fontSize: 13, color: "var(--text)" }}>
                {orderWithMissingData.missingData?.map((item, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>• {item}</li>
                ))}
              </ul>
            </div>

            <button
              style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--border)",
                color: "var(--muted)",
                fontWeight: 600,
                cursor: "not-allowed",
                fontSize: 13,
              }}
              disabled
            >
              Assignment Blocked - Fix Missing Data
            </button>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            AI QC Report Review
          </h3>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, color: "var(--text)" }}>{orderInQc.id}</span>
              <span className="badge badge-amber">{orderInQc.status}</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
              {orderInQc.borrower} • {orderInQc.appraiserName}
            </p>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>AI Valuation Risk Score</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--red-500)" }}>84/100</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>High Risk - Purchase price above local trends</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 600 }}>Automated Findings</div>
              <ul style={{ marginLeft: 20, fontSize: 13, color: "var(--text)" }}>
                <li style={{ marginBottom: 4, color: "var(--red-500)" }}>• Flagged: 2 Missing required property photos</li>
                <li style={{ color: "var(--amber-500)" }}>• Flagged: Comparable comps distance exceeds 5 miles</li>
              </ul>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>
                Suggested Revision Language
              </label>
              <textarea
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: 13,
                  minHeight: 80,
                  fontFamily: "inherit",
                }}
                defaultValue="Please add the missing exterior photos of the rear of the property and garage. Also, please provide additional comparable sales within 3 miles of the subject property to support the valuation."
              />
            </div>

            <button
              onClick={() => showToast("Revision request sent to appraiser successfully!")}
              style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                background: "var(--accent)",
                color: "var(--text-on-primary)",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Send Revision Request
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: "16px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
          All Orders
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Borrower</th>
                <th>Property</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Savings</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.id}</td>
                  <td>{order.borrower}</td>
                  <td>{order.address}</td>
                  <td>
                    <span className={`badge ${
                      order.status === "New" ? "badge-amber" :
                      order.status === "QC Review" ? "badge-amber" :
                      order.status === "Revision Requested" ? "badge-red" :
                      "badge-green"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      order.turnTimeRisk === "High" ? "badge-red" :
                      order.turnTimeRisk === "Medium" ? "badge-amber" :
                      "badge-green"
                    }`}>
                      {order.turnTimeRisk} Risk
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--accent)" }}>
                    ${order.estimatedSavings.toLocaleString()}
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
