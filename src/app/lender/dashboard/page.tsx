"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { 
  mockOrders, 
  mockKpis, 
  orderPipelineData, 
  turnTimeTrendData, 
  savingsComparisonData 
} from "@/data/mockData";
import { ShieldCheck, AlertTriangle, TrendingDown, Activity } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from "recharts";

export default function LenderDashboardPage() {
  return (
    <AppShell>
      <div className="hero-banner">
        <h1 className="hero-banner-title" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          Lender Operations Command Center
        </h1>
        <p className="hero-banner-muted">
          AI-powered, AIR-compliant appraisal management with <span className="hero-banner-accent">real-time visibility</span>
        </p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Orders</div>
          <div className="kpi-value">{mockKpis.activeOrders}</div>
          <div className="kpi-trend up">+12 this week</div>
        </div>
        <div className="kpi-card" style={{ borderLeft: "4px solid var(--amber-500)" }}>
          <div className="kpi-label">At-Risk Orders</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>{mockKpis.atRiskOrders}</div>
          <div className="kpi-trend down">Requires attention</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Revision-Heavy Files</div>
          <div className="kpi-value">{mockKpis.revisionHeavyFiles}</div>
          <div className="kpi-trend">QC priority</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Borrower Savings</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>${mockKpis.totalBorrowerSavings.toLocaleString()}</div>
          <div className="kpi-trend up">25-40% AMC markup saved</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Turn Time</div>
          <div className="kpi-value">{mockKpis.avgTurnTimeDays} days</div>
          <div className="kpi-trend up">-1.2 days vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">AIR Compliance Score</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>{mockKpis.airComplianceScore}%</div>
          <div className="kpi-trend up">Perfect score</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: "24px" }}>
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            Live Order Workflow Pipeline
          </h3>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderPipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--muted)" 
                  tick={{ fontSize: 12 }} 
                />
                <YAxis stroke="var(--muted)" tick={{ fontSize: 12 }} />
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

        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            Turn Time Trend (6 Months)
          </h3>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnTimeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--muted)" 
                  tick={{ fontSize: 12 }} 
                />
                <YAxis 
                  stroke="var(--muted)" 
                  tick={{ fontSize: 12 }} 
                  domain={[5, 9]} 
                />
                <Tooltip 
                  contentStyle={{ 
                    background: "var(--card)", 
                    border: "1px solid var(--border)", 
                    borderRadius: 8 
                  }} 
                  formatter={(value) => [`${value ?? 0} days`, "Avg Turn Time"]} 
                />
                <Line 
                  type="monotone" 
                  dataKey="avgDays" 
                  stroke="var(--accent)" 
                  strokeWidth={3} 
                  dot={{ fill: "var(--accent)", r: 5 }} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: "16px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
          Borrower Cost Savings (PAM vs Traditional AMC)
        </h3>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--muted)" 
                tick={{ fontSize: 12 }} 
              />
              <YAxis 
                stroke="var(--muted)" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `$${((value ?? 0) / 1000).toFixed(0)}k`} 
              />
              <Tooltip 
                contentStyle={{ 
                  background: "var(--card)", 
                  border: "1px solid var(--border)", 
                  borderRadius: 8 
                }} 
                formatter={(value) => [`$${(value ?? 0).toLocaleString()}`, ""]} 
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar 
                dataKey="pam" 
                name="PAM Platform" 
                fill="var(--accent)" 
                radius={[8, 8, 0, 0]} 
              />
              <Bar 
                dataKey="traditional" 
                name="Traditional AMC" 
                fill="#94a3b8" 
                radius={[8, 8, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ marginTop: "16px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
          Exception Queue
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Borrower</th>
                <th>Status</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.slice(0, 4).map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.id}</td>
                  <td>{order.borrower}</td>
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
                    {order.turnTimeRisk === "High" ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--red-500)" }}>
                        <AlertTriangle size={14} /> High
                      </span>
                    ) : order.turnTimeRisk === "Medium" ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--amber-500)" }}>
                        <Activity size={14} /> Medium
                      </span>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--accent)" }}>
                        <ShieldCheck size={14} /> Low
                      </span>
                    )}
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
