"use client";

import { ThemeProvider } from "@/context/ThemeProvider";
import { AppProvider } from "@/context/AppProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
}
