"use client";

import { AppShell } from "@/components/AppShell";
import { ChatBot } from "@/components/copilot/ChatBot";

export default function AdminCopilotPage() {
  return (
    <AppShell>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "var(--text)" }}>
        AI Copilot
      </h1>
      <ChatBot />
    </AppShell>
  );
}
