'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
    name?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * An ErrorBoundary specifically tailored for Client Components in the public UI.
 * Wraps individual interactive components to prevent a single failure
 * from taking down the entire page.
 */
export default class SafeComponent extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`[SafeComponent Error] in component: ${this.props.name || 'Unknown'}`, error, errorInfo);
        // Optionally, log this to an external service like Sentry
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            const isDev = process.env.NODE_ENV === 'development';

            return (
                <div className="w-full p-6 bg-zinc-50 border border-zinc-100 rounded-2xl flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondary mb-4 shadow-sm border border-zinc-100">
                        <AlertTriangle size={24} strokeWidth={1.5} />
                    </div>
                    <p className="text-zinc-600 font-medium mb-2">
                        Bu bileşen yüklenirken bir sorun oluştu.
                    </p>
                    <button
                        onClick={this.handleReset}
                        className="text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary flex items-center gap-2 transition-colors mt-2"
                    >
                        <RefreshCcw size={14} /> Tekrar Dene
                    </button>
                    {isDev && this.state.error && (
                        <p className="text-[10px] text-red-500 font-mono mt-4 max-w-full truncate px-4">
                            {this.state.error.message}
                        </p>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
