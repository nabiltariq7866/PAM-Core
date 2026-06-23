"use client";

import { LoginScreen } from "@/components/LoginScreen";
import { setSessionCookies } from "@/lib/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { type SessionUser } from "@/data/mockData";
import { useApp } from "@/context/AppProvider";

export default function HomePage() {
  const router = useRouter();
  const { setUser, user, isLoading } = useApp();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(`/${user.role}/dashboard`);
    }
  }, [router, user, isLoading]);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "var(--bg)" 
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            border: "3px solid var(--border)", 
            borderTopColor: "var(--accent)", 
            borderRadius: "50%", 
            animation: "spin 1s linear infinite" 
          }} />
          <div style={{ fontSize: 14, color: "var(--muted)" }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <LoginScreen
      onLogin={(user: SessionUser) => {
        setSessionCookies(user);
        setUser(user);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        router.push(user.redirectTo);
      }}
    />
  );
}
