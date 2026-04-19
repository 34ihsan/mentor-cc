'use client';

import { useEffect, useState, ElementType } from 'react';

interface SafeHTMLContentProps {
    html: string;
    className?: string;
    as?: ElementType;
}

export default function SafeHTMLContent({ html, className, as: Tag = 'div' }: SafeHTMLContentProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Tag className={className} />;
    }

    return (
        <Tag
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
