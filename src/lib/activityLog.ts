export type ActivityEntry = {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  type: string;
  action: string;
  detail: string;
  screen: string;
};

const STORAGE_KEY = "pam_activity_log";

export const loadActivityLog = (): ActivityEntry[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const appendActivityLog = (entry: Omit<ActivityEntry, "id" | "timestamp">) => {
  if (typeof window === "undefined") return;
  const log = loadActivityLog();
  const newEntry: ActivityEntry = {
    ...entry,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  const updated = [newEntry, ...log].slice(0, 100);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearActivityLog = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
