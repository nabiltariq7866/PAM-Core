"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { revenueData } from "@/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function AdminRevenuePage() {
  return (
    <AppShell>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>
        Revenue Analytics
      </h1>

      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-label">Monthly Revenue</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>$85,400</div>
          <div className="kpi-trend up">+12.5%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Order Value</div>
          <div className="kpi-value">$569</div>
          <div className="kpi-trend up">+3.2%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Orders (YTD)</div>
          <div className="kpi-value">{revenueData.reduce((sum, d) => sum + d.orders, 0)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Lenders</div>
          <div className="kpi-value">{revenueData[revenueData.length - 1].lenders}</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            Monthly Revenue Trend
          </h3>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="month"
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
                    borderRadius: 8,
                  }}
                  formatter={(value) => [`$${(value ?? 0).toLocaleString()}`, "Revenue"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--accent)"
                  strokeWidth={3}
                  dot={{ fill: "var(--accent)", r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            Monthly Orders
          </h3>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted)"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="var(--muted)"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <ChatBot />
    </AppShell>
  );
}
