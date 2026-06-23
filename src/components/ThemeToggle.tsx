"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export function ThemeToggle({ showLabel = false }: { showLabel?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {showLabel && (
        <span className="theme-toggle-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {theme === "light" ? <Sun size={14} /> : <Moon size={14} />}
          {theme === "light" ? "Light" : "Dark"}
        </span>
      )}
      <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" />
    </div>
  );
}
