import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Robust utility to get the base site URL without trailing slashes or internal ports.
 * Prioritizes NEXT_PUBLIC_SITE_URL from environment.
 */
export function getBaseUrl() {
    if (typeof window !== 'undefined') {
        // Client side: use current location but strip port if it's 3000 in production
        const url = window.location.origin;
        if (process.env.NODE_ENV === 'production' && url.includes(':3000')) {
            return url.split(':3000')[0];
        }
        return url;
    }
    
    // Server side
    let envUrl = process.env.NEXT_PUBLIC_SITE_URL;
    
    // Hard check: never allow port 3000 to leak in production URLs
    if (envUrl && process.env.NODE_ENV === 'production' && envUrl.includes(':3000')) {
        envUrl = envUrl.split(':3000')[0];
    }
    
    if (envUrl) return envUrl.replace(/\/$/, '');
    
    return 'https://www.mentor-cc.com'; // Fallback
}

/**
 * Generates an absolute URL ensuring no internal ports leak in production.
 */
export function getAbsoluteUrl(path: string) {
    const baseUrl = getBaseUrl();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
}

/**
 * Predictive check for critical environment variables.
 * Logs a warning if essential production variables are missing.
 */
export function validateProductionEnv() {
    if (process.env.NODE_ENV !== 'production') return;
    
    const criticalVars = ['DATABASE_URL', 'AUTH_SECRET', 'NEXT_PUBLIC_SITE_URL'];
    const missing = criticalVars.filter(v => !process.env[v]);
    
    if (missing.length > 0) {
        console.error(`[CRITICAL] Missing production environment variables: ${missing.join(', ')}`);
        console.error('The application may fail or redirect incorrectly.');
    }
}
