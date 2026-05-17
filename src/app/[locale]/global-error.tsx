'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);

    // Check for ChunkLoadError (common after new deployments)
    const isChunkError = error.message?.includes('Loading chunk') || 
                        error.name === 'ChunkLoadError' ||
                        error.message?.includes('ChunkLoadError');

    if (isChunkError) {
      console.warn('ChunkLoadError detected in GlobalError. Attempting automatic page reload...');
      window.location.reload();
    }
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Bir şeyler yanlış gitti!</h2>
        <p className="text-gray-600 mb-8">
          Sistemsel bir hata oluştu. Teknik ekibimiz bilgilendirildi.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          Tekrar Dene
        </button>
      </body>
    </html>
  );
}
