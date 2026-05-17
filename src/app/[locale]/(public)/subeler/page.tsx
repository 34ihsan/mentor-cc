import React from 'react';
import Image from 'next/image';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import BranchesClient from '@/components/public/BranchesClient';

export async function generateMetadata() {
    const t = await getTranslations('Branches');
    return {
        title: `${t('ofislerimiz').replace('<span>', '').replace('</span>', '')} | Mentor Career`,
        description: t('subtitle'),
    };
}

export default async function Branches({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Branches');
    
    // Get the list of branches from the translation file
    const branchesRaw = t.raw('list') as any[];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative pt-60 pb-40 bg-zinc-50 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000"
                        alt={t('ofislerimiz')}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/50 to-transparent" />
                </div>
                
                <div className="container-content relative z-10 text-center">
                    <div className="section-label !justify-center mb-10">
                        {t('label')}
                    </div>
                    <h1 className="text-fluid-h1 font-serif font-bold text-primary mb-10 italic">
                        {t.rich('ofislerimiz', {
                            span: (chunks) => <span className="text-secondary not-italic">{chunks}</span>
                        })}
                    </h1>
                    <p className="text-zinc-600 text-xl max-w-3xl mx-auto font-sans italic leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Branches Grid - Interactive Client Component */}
            <BranchesClient branches={branchesRaw} />

            {/* Global Reach Section */}
            <section className="section-padding bg-zinc-50 border-t border-secondary/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                     <Globe className="w-full h-full text-secondary" strokeWidth={0.1} />
                </div>
                <div className="container-content relative z-10 text-center">
                    <span className="section-label !justify-center mb-10">{t('onlineLabel')}</span>
                    <h2 className="text-fluid-h2 font-serif font-bold text-primary mb-10 italic">
                        {t.rich('onlineTitle', {
                            span: (chunks) => <span className="text-secondary not-italic">{chunks}</span>
                        })}
                    </h2>
                    <p className="text-zinc-600 mb-16 text-xl italic max-w-3xl mx-auto leading-relaxed">
                        {t('onlineDesc')}
                    </p>
                    <Link href={`/${locale}/iletisim`} className="btn-gold !px-16 !py-6 text-[10px] tracking-[0.5em]">
                        {t('onlineCta')}
                    </Link>
                </div>
            </section>
        </main>
    );
}
