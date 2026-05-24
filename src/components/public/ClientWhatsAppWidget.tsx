'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const WhatsAppWidget = dynamic(() => import('./WhatsAppWidget'), { ssr: false });

export default function ClientWhatsAppWidget() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Defer load by 4 seconds to let the main thread fully hydrate and clear TBT
        const timer = setTimeout(() => {
            setMounted(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;
    return <WhatsAppWidget />;
}
