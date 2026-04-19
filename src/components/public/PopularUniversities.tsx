"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import UniversityCard from './UniversityCard';
import { useParams } from 'next/navigation';

export default function PopularUniversities({ featuredIds }: { featuredIds?: string[] }) {
    const t = useTranslations('Common');
    const params = useParams();
    const locale = params?.locale as string;
    
    const [universities, setUniversities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUnis = async () => {
            try {
                const baseUrl = featuredIds?.length
                    ? `/api/institutions/popular?ids=${featuredIds.join(',')}`
                    : "/api/institutions/popular";
                
                const url = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}locale=${locale}`;

                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setUniversities(data);
                }
            } catch (error) {
                console.error("Failed to fetch unis", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUnis();
    }, [featuredIds, locale]);

    if (loading) return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-2xl" />
            ))}
        </div>
    );

    if (universities.length === 0) return (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-serif italic">{t('comingSoon')}...</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {universities.map((uni, idx) => (
                <UniversityCard key={idx} {...uni} />
            ))}
        </div>
    );
}
