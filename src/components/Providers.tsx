"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "sonner";
import dynamic from 'next/dynamic';
const CookieConsent = dynamic(() => import('@/components/public/CookieConsent'), { ssr: false });

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
