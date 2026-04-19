'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-900 font-sans">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full space-y-8">
            {/* Logo placeholder or icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-serif font-bold text-primary italic">
                Something went wrong
              </h1>
              <p className="text-zinc-500 font-medium leading-relaxed">
                We encountered an unexpected error. Our team has been notified and we are working to resolve it.
              </p>
              {error.digest && (
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => reset()}
                className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-8 py-4 bg-zinc-50 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-100 transition-all active:scale-95"
              >
                Go to Homepage
              </a>
            </div>

            <div className="pt-12">
              <p className="text-xs text-zinc-400 font-medium">
                Need immediate assistance? <br />
                <a href="mailto:info@stareducon.co.uk" className="text-secondary font-bold hover:underline">
                  info@stareducon.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
