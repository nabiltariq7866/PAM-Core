"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { 
  mockOrders, 
  appraiserPerformanceData 
} from "@/data/mockData";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend 
} from "recharts";

export default function AppraiserWorkspacePage() {
  const appraiserOrders = mockOrders.filter((o) => o.appraiserName);
  const myPerformance = appraiserPerformanceData[0];

  return (
    <AppShell>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>
        Appraiser Workspace
      </h1>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">My Active Orders</div>
          <div className="kpi-value">{appraiserOrders.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Due This Week</div>
          <div className="kpi-value">3</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Rating</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>4.8⭐</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: "24px" }}>
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            My Performance Scorecard
          </h3>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={[
                { subject: "Turn Time", A: 100 - (myPerformance.turnTime * 5), fullMark: 100 },
                { subject: "Acceptance", A: myPerformance.acceptance, fullMark: 100 },
                { subject: "Low Revisions", A: 100 - (myPerformance.revision * 10), fullMark: 100 },
              ]}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  stroke="var(--muted)" 
                  tick={{ fontSize: 12 }} 
                />
                <PolarRadiusAxis 
                  stroke="var(--muted)" 
                  tick={{ fontSize: 11 }} 
                  domain={[0, 100]} 
                />
                <Radar 
                  name="Score" 
                  dataKey="A" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3} 
                />
                <Tooltip 
                  contentStyle={{ 
                    background: "var(--card)", 
                    border: "1px solid var(--border)", 
                    borderRadius: 8 
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            Performance vs Peers
          </h3>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appraiserPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--muted)" 
                  tick={{ fontSize: 10 }} 
                />
                <YAxis 
                  yAxisId="left" 
                  stroke="var(--accent)" 
                  tick={{ fontSize: 11 }} 
                  domain={[4, 8]} 
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#f59e0b" 
                  tick={{ fontSize: 11 }} 
                  domain={[0, 100]} 
                />
                <Tooltip 
                  contentStyle={{ 
                    background: "var(--card)", 
                    border: "1px solid var(--border)", 
                    borderRadius: 8 
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar 
                  yAxisId="left" 
                  dataKey="turnTime" 
                  name="Turn Time (days)" 
                  fill="var(--accent)" 
                  radius={[8, 8, 0, 0]} 
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="acceptance" 
                  name="Acceptance Rate" 
                  fill="#f59e0b" 
                  radius={[8, 8, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: "16px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
          My Assignments
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Property</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {appraiserOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.id}</td>
                  <td>{order.address}</td>
                  <td>
                    <span className={`badge ${
                      order.status === "QC Review" ? "badge-amber" :
                      order.status === "Revision Requested" ? "badge-red" :
                      "badge-green"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === "Revision Requested" ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--red-500)" }}>
                        <AlertTriangle size={14} /> Today
                      </span>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text)" }}>
                        <Clock size={14} /> In 3 days
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
