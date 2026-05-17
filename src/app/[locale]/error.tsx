'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('Errors');

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);

        // Check for ChunkLoadError (common after new deployments)
        const isChunkError = error.message?.includes('Loading chunk') || 
                            error.name === 'ChunkLoadError' ||
                            error.message?.includes('ChunkLoadError');

        if (isChunkError) {
            console.warn('ChunkLoadError detected. Attempting automatic page reload...');
            window.location.reload();
        }
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-red-50 text-red-500 rounded-full">
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('somethingWentWrong') || 'Bir Şeyler Ters Gitti!'}
                </h2>
                
                <p className="text-gray-600 mb-8">
                    {t('errorDescription') || 'Uygulama çalışırken beklenmedik bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin.'}
                </p>
                
                <div className="space-y-3">
                    <button
                        onClick={() => reset()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                    >
                        {t('tryAgain') || 'Tekrar Dene'}
                    </button>
                    
                    <a
                        href="/"
                        className="block w-full text-gray-500 hover:text-gray-700 font-medium py-2 text-sm transition-colors"
                    >
                        {t('backToHome') || 'Ana Sayfaya Dön'}
                    </a>
                </div>
                
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left overflow-auto max-h-40">
                        <p className="text-xs font-mono text-gray-500 break-all">
                            {error.message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
