"use client";

import { AppShell } from "@/components/AppShell";
import { DollarSign, TrendingUp, PieChart, Download, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { mockOrders, savingsComparisonData } from "@/data/mockData";
import { useApp } from "@/context/AppProvider";
import { useState } from "react";

export default function LenderSavingsPage() {
  const { showToast } = useApp();
  const [exportClicked, setExportClicked] = useState(false);

  const totalSavings = savingsComparisonData.reduce((sum, d) => sum + (d.traditional - d.pam), 0);
  const avgSavingsPerOrder = Math.round(totalSavings / 150);
  const savingsPercentage = Math.round((totalSavings / savingsComparisonData.reduce((sum, d) => sum + d.traditional, 0)) * 100);

  const orderSavings = mockOrders.map(order => ({
    id: order.id,
    borrower: order.borrower,
    address: order.address,
    estimatedSavings: order.estimatedSavings,
    traditionalFee: order.estimatedSavings + 300,
  }));

  return (
    <AppShell>
      <div className="hero-banner">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <DollarSign size={24} style={{ color: "var(--accent)" }} />
          <h1 className="hero-banner-title" style={{ fontSize: 24, marginBottom: 0 }}>
            Borrower Cost Savings
          </h1>
        </div>
        <p className="hero-banner-muted">
          Transparent fee breakdown: PAM platform vs. traditional AMC pricing
        </p>
      </div>

      <div className="grid-4">
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Total Borrower Savings</div>
            <TrendingUp size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent)" }}>
            ${totalSavings.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            YTD for 150 orders
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Avg. Savings / Order</div>
            <DollarSign size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text)" }}>
            ${avgSavingsPerOrder}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            Per appraisal
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Savings % vs. AMC</div>
            <PieChart size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text)" }}>
            {savingsPercentage}%
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            Lower cost
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Orders with Savings</div>
            <BarChart3 size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text)" }}>
            150/150
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            100% coverage
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 24 }}>
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            Savings Trend: PAM vs. Traditional AMC
          </h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted)" style={{ fontSize: 12 }} />
                <YAxis stroke="var(--muted)" style={{ fontSize: 12 }} tickFormatter={(value) => `$${(value ?? 0) / 1000}k`} />
                <Tooltip 
                  contentStyle={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8 }} 
                  formatter={(value) => [`$${(value as number).toLocaleString()}`, ""]}
                />
                <Bar dataKey="traditional" fill="#94a3b8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pam" fill="var(--accent)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
            Cumulative Savings
          </h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsComparisonData.map((d, i) => ({
                ...d,
                cumulative: savingsComparisonData.slice(0, i + 1).reduce((sum, x) => sum + (x.traditional - x.pam), 0),
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted)" style={{ fontSize: 12 }} />
                <YAxis stroke="var(--muted)" style={{ fontSize: 12 }} tickFormatter={(value) => `$${(value ?? 0) / 1000}k`} />
                <Tooltip 
                  contentStyle={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8 }} 
                  formatter={(value) => [`$${(value as number).toLocaleString()}`, "Cumulative Savings"]}
                />
                <Line type="monotone" dataKey="cumulative" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>
            Order-Level Savings Breakdown
          </h3>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg)",
              color: "var(--text)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            onClick={() => {
              setExportClicked(true);
              showToast("Savings report exported successfully!");
            }}
          >
            <Download size={16} />
            Export Report
          </button>
        </div>

        {exportClicked && (
          <div style={{ marginBottom: 16, padding: 12, background: "rgba(27, 212, 136, 0.1)", border: "1px solid rgba(27, 212, 136, 0.3)", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={18} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 13, color: "var(--text)" }}>
              Savings report exported with 150 orders, ${totalSavings.toLocaleString()} total savings
            </span>
          </div>
        )}

        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Borrower</th>
                <th>Address</th>
                <th>PAM Fee</th>
                <th>Traditional AMC</th>
                <th>Savings</th>
              </tr>
            </thead>
            <tbody>
              {orderSavings.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 700, color: "var(--text)" }}>{order.id}</td>
                  <td>{order.borrower}</td>
                  <td style={{ fontSize: 13, color: "var(--muted)" }}>{order.address}</td>
                  <td>${(order.estimatedSavings).toLocaleString()}</td>
                  <td>${order.traditionalFee.toLocaleString()}</td>
                  <td style={{ fontWeight: 700, color: "var(--accent)" }}>+${300}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}