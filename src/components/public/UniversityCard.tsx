import Image from 'next/image';
import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { MapPin, GraduationCap, Coins, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UniversityCardProps {
    name: string;
    image: string;
    country: string;
    city: string;
    rank?: string;
    tuition?: string;
    programsCount?: number;
    slug: string;
    className?: string;
}

export default function UniversityCard({
    name,
    image,
    country,
    city,
    rank,
    tuition,
    programsCount,
    slug,
    className
}: UniversityCardProps) {
    const t = useTranslations('Card');

    return (
        <div className={cn(
            "group bg-white overflow-hidden border border-zinc-100 transition-all duration-1000",
            "hover:shadow-neon hover:-translate-y-4 flex flex-col h-full asymmetric-bold",
            className
        )}>
            <div className="relative h-80 overflow-hidden">
                <Image
                    src={image || "https://images.unsplash.com/photo-1541339907198-e08759df93f3?q=80&w=800"}
                    alt={typeof name === 'object' ? (name as any)?.name : name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Neon Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-8 left-8 flex flex-col gap-3 z-10">
                    <div className="bg-secondary text-primary px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.4em] shadow-neon rounded-br-2xl">
                        {typeof country === 'object' ? (country as any)?.name : country}
                    </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    <div className="bg-primary/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-neon-sm">
                         <div className="flex items-center gap-3 mb-2">
                            <span className="w-1.5 h-1.5 bg-secondary animate-pulse rounded-full" />
                            <span className="text-secondary text-[9px] font-black uppercase tracking-[0.3em]">Institutional Grade</span>
                         </div>
                         <p className="text-white text-[10px] font-medium leading-relaxed italic opacity-90">
                            World-class academic standards and global recognition.
                         </p>
                    </div>
                </div>
            </div>

            <div className="p-12 flex flex-col flex-grow relative">
                <div className="mb-10">
                    <h3 className="text-3xl font-serif font-bold italic text-primary line-clamp-2 leading-tight group-hover:text-secondary transition-all duration-700 tracking-tight">
                        {typeof name === 'object' ? (name as any)?.name : name}
                    </h3>
                    <div className="flex items-center text-zinc-400 text-[10px] uppercase tracking-[0.4em] mt-6 font-black group-hover:text-primary transition-colors">
                        <MapPin className="w-4 h-4 mr-3 text-secondary" strokeWidth={3} />
                        {typeof city === 'object' ? (city as any)?.name : city}
                    </div>
                </div>

                <div className="flex flex-col gap-6 mb-12 flex-grow">
                    <div className="flex items-center justify-between py-4 border-b border-zinc-50 group-hover:border-secondary/20 transition-colors">
                        <div className="flex items-center gap-3">
                            <Coins size={16} className="text-secondary/60" />
                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">{t('tuition')}</span>
                        </div>
                        <span className="font-serif italic text-primary font-bold text-base block">
                            {typeof tuition === 'object' && tuition !== null
                                ? ((tuition as any).undergraduate || (tuition as any).undergrad || (tuition as any).graduate || t('notSpecified'))
                                : (tuition || t('notSpecified'))}
                        </span>
                    </div>
                    {rank && (
                        <div className="flex items-center justify-between py-4 border-b border-zinc-50 group-hover:border-secondary/20 transition-colors">
                            <div className="flex items-center gap-3">
                                <Trophy size={16} className="text-secondary/60" />
                                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">World Rank</span>
                            </div>
                            <span className="font-serif italic text-primary font-bold text-base block">#{rank}</span>
                        </div>
                    )}
                </div>

                <Link
                    href={`/kurumsal/kurumlar/${slug}`}
                    className="group/link w-full flex items-center justify-between px-10 py-6 bg-secondary text-primary hover:bg-primary hover:text-white transition-all duration-700 asymmetric-reverse shadow-neon"
                >
                    <span className="font-black text-[11px] uppercase tracking-[0.5em]">{t('viewDetails')}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-3" />
                </Link>
            </div>
        </div>
    );
}
