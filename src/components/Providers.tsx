"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "sonner";
import CookieConsent from "@/components/public/CookieConsent";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <Toaster position="top-right" richColors closeButton />
                {children}
                <CookieConsent />
            </ThemeProvider>
        </SessionProvider>
    );
}
