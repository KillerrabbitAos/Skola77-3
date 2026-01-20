"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NavHeadingProvider from "@/app/providers/navHeadingProvider";
import { defaultTheme } from "@/config";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/signin" || pathname === "/register") {
    return <SessionProvider><ThemeProvider defaultTheme={defaultTheme}>{children}</ThemeProvider></SessionProvider>;
  }
  return (
    <SessionProvider>
      <ThemeProvider defaultTheme={defaultTheme}>
        {" "}
        <NavHeadingProvider>{children}</NavHeadingProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
