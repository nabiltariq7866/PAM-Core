"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { type SessionUser } from "@/data/mockData";
import { appendActivityLog, clearActivityLog, loadActivityLog, type ActivityEntry } from "@/lib/activityLog";
import { getStoredUser, setSessionCookies, clearSessionCookies } from "@/lib/session";

type LogInput = Omit<ActivityEntry, "id" | "timestamp" | "userName" | "userRole"> & {
  userName?: string;
  userRole?: string;
};

type AppContextValue = {
  showToast: (message: string, log?: boolean | LogInput) => void;
  logActivity: (entry: LogInput) => void;
  activityEntries: ActivityEntry[];
  refreshActivityLog: () => void;
  clearActivityLogStorage: () => void;
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
  logout: () => void;
  isLoading: boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      role="status"
      onClick={onClose}
      className="toast-geo"
      style={{
        position: "fixed",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        padding: "12px 22px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "var(--shadow-panel)",
        cursor: "pointer",
        maxWidth: "90vw",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const [activityEntries, setActivityEntries] = useState<ActivityEntry[]>([]);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshActivityLog = useCallback(() => {
    setActivityEntries(loadActivityLog());
  }, []);

  useEffect(() => {
    refreshActivityLog();
    const storedUser = getStoredUser();
    setUser(storedUser);
    setIsLoading(false);
  }, [refreshActivityLog]);

  const logActivity = useCallback(
    (entry: LogInput) => {
      const actor = user || getStoredUser();
      appendActivityLog({
        userName: entry.userName ?? actor?.name ?? "Anonymous User",
        userRole: entry.userRole ?? actor?.role ?? "guest",
        type: entry.type,
        action: entry.action,
        detail: entry.detail,
        screen: entry.screen,
      });
      refreshActivityLog();
    },
    [user, refreshActivityLog]
  );

  const clearActivityLogStorage = useCallback(() => {
    clearActivityLog();
    refreshActivityLog();
  }, [refreshActivityLog]);

  const showToast = useCallback(
    (message: string, log?: boolean | LogInput) => {
      if (log !== false) {
        const actor = user || getStoredUser();
        const meta = typeof log === "object" && log !== null ? log : null;
        appendActivityLog({
          userName: actor?.name ?? "Anonymous User",
          userRole: actor?.role ?? "guest",
          type: meta?.type ?? "updated",
          action: meta?.action ?? "Performed action",
          detail: meta?.detail ?? message,
          screen: meta?.screen ?? "unknown",
        });
        refreshActivityLog();
      }
      setToast(message);
      setTimeout(() => setToast(null), 3000);
    },
    [user, refreshActivityLog]
  );

  const logout = useCallback(() => {
    setUser(null);
    clearSessionCookies();
  }, []);

  return (
    <AppContext.Provider
      value={{
        showToast,
        logActivity,
        activityEntries,
        refreshActivityLog,
        clearActivityLogStorage,
        user,
        setUser,
        logout,
        isLoading,
      }}
    >
      {children}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
