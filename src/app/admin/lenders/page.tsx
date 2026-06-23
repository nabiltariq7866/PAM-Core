"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";
import { Building2, CheckCircle2, AlertTriangle } from "lucide-react";

const lenders = [
  { id: 1, name: "Northwood Bank", status: "Active", orders: 45, savings: "$32,000" },
  { id: 2, name: "Riverside Mortgage", status: "Active", orders: 38, savings: "$28,500" },
  { id: 3, name: "Sunset Financial", status: "Onboarding", orders: 12, savings: "$6,500" },
];

export default function AdminLendersPage() {
  return (
    <AppShell>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>
        Lender Clients
      </h1>

      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Lender</th>
                <th>Status</th>
                <th>Orders</th>
                <th>Total Savings</th>
              </tr>
            </thead>
            <tbody>
              {lenders.map((lender) => (
                <tr key={lender.id}>
                  <td style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                    <Building2 size={16} />
                    {lender.name}
                  </td>
                  <td>
                    <span className={`badge ${lender.status === "Active" ? "badge-green" : "badge-amber"}`}>
                      {lender.status}
                    </span>
                  </td>
                  <td>{lender.orders}</td>
                  <td style={{ color: "var(--accent)", fontWeight: 600 }}>{lender.savings}</td>
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
