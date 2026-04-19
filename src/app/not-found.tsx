'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to default locale if someone hits a non-existent root path
    router.replace('/tr');
  }, [router]);

  return (
    <html>
      <body className="flex items-center justify-center min-h-screen font-sans bg-zinc-50">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-primary italic">Redirecting...</h1>
          <p className="text-zinc-500 italic">Please wait while we take you to the homepage.</p>
        </div>
      </body>
    </html>
  );
}
