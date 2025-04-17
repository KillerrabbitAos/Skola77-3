"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NavHeadingProvider from "@/app/providers/navHeadingProvider";
import { defaultTheme } from "@/config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider defaultTheme={defaultTheme}>
          {" "}
          <NavHeadingProvider>{children}</NavHeadingProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
