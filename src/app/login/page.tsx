"use client";

import { LoginScreen } from "@/components/LoginScreen";
import { setSessionCookies } from "@/lib/session";
import { useRouter } from "next/navigation";
import { type SessionUser } from "@/data/mockData";
import { useApp } from "@/context/AppProvider";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useApp();
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
