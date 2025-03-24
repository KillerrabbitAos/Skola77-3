"use client";

import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "next-themes";
import NavHeadingProvider from "@/app/providers/navHeadingProvider";

export function Providers({children}: { children: React.ReactNode }) {
    return <SessionProvider><ThemeProvider attribute={"class"} defaultTheme="light"><NavHeadingProvider>{children}</NavHeadingProvider></ThemeProvider></SessionProvider>;
}
