import type { SessionUser } from "@/data/mockData";

const SESSION_KEY = "pam_session";

export const setSessionCookies = (user: SessionUser) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const clearSessionCookies = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
};

export const getStoredRole = (): SessionUser["role"] | null => {
  const user = getStoredUser();
  return user?.role || null;
};

export const getStoredUser = (): SessionUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as SessionUser;
    if (user?.name && user?.role) return user;
    return null;
  } catch {
    clearSessionCookies();
    return null;
  }
};
