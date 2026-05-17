/**
 * Safe localStorage wrapper that handles SecurityError and SSR
 */
export const safeStorage = {
    getItem: (key: string): string | null => {
        if (typeof window === 'undefined') return null;
        try {
            return window.localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    },
    setItem: (key: string, value: string): void => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            // Silently fail if localStorage is blocked
        }
    },
    removeItem: (key: string): void => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.removeItem(key);
        } catch (e) {
            // Silently fail if localStorage is blocked
        }
    }
};

