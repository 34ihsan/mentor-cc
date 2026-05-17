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
            "group bg-white overflow-hidden border border-zinc-50 transition-all duration-1000",
            "hover:shadow-premium hover:-translate-y-3 flex flex-col h-full rounded-[2.5rem]",
            className
        )}>
            <div className="relative h-72 overflow-hidden">
                <Image
                    src={image || "https://images.unsplash.com/photo-1541339907198-e08759df93f3?q=80&w=800"}
                    alt={typeof name === 'object' ? (name as any)?.name : name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                    <div className="bg-white/90 backdrop-blur-md text-zinc-900 border border-white/50 px-5 py-2 text-[9px] font-black uppercase tracking-[0.3em] shadow-xl rounded-full">
                        {typeof country === 'object' ? (country as any)?.name : country}
                    </div>
                    {rank && (
                        <div className="bg-secondary/90 backdrop-blur-md text-white px-5 py-2 text-[9px] font-black uppercase tracking-[0.3em] shadow-xl rounded-full flex items-center gap-2">
                            <Trophy size={10} /> Rank #{rank}
                        </div>
                    )}
                </div>

                <div className="absolute bottom-6 left-6 right-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-100">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl">
                         <p className="text-white text-[10px] font-medium leading-relaxed italic opacity-90">
                            Explore world-class academic opportunities and career pathways at this premier institution.
                         </p>
                    </div>
                </div>
            </div>

            <div className="p-10 flex flex-col flex-grow relative">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-[1px] bg-secondary/30" />
                        <span className="text-[9px] font-black text-secondary uppercase tracking-[0.3em]">Institutional Profile</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold italic text-primary line-clamp-2 leading-tight group-hover:text-secondary transition-all duration-700 tracking-tight">
                        {typeof name === 'object' ? (name as any)?.name : name}
                    </h3>
                    <div className="flex items-center text-zinc-400 text-[10px] uppercase tracking-[0.3em] mt-5 font-black">
                        <MapPin className="w-3.5 h-3.5 mr-2.5 text-secondary/60" strokeWidth={3} />
                        {typeof city === 'object' ? (city as any)?.name : city}
                    </div>
                </div>

                <div className="flex flex-col gap-5 mb-10 flex-grow">
                    <div className="flex items-center justify-between py-3.5 border-b border-zinc-50 group-hover:border-zinc-100 transition-colors">
                        <div className="flex items-center gap-3">
                            <Coins size={14} className="text-zinc-300" />
                            <span className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-black">{t('tuition')}</span>
                        </div>
                        <span className="font-serif italic text-primary font-bold text-sm block">
                            {typeof tuition === 'object' && tuition !== null
                                ? ((tuition as any).undergraduate || (tuition as any).undergrad || (tuition as any).graduate || t('notSpecified'))
                                : (tuition || t('notSpecified'))}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-3.5 border-b border-zinc-50 group-hover:border-zinc-100 transition-colors">
                        <div className="flex items-center gap-3">
                            <GraduationCap size={14} className="text-zinc-300" />
                            <span className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-black">{t('programs')}</span>
                        </div>
                        <span className="font-serif italic text-primary font-bold text-sm block">{programsCount || '12'}+ Available</span>
                    </div>
                </div>

                <Link
                    href={`/kurumsal/kurumlar/${slug}`}
                    className="group/link w-full flex items-center justify-between px-8 py-5 bg-zinc-50 hover:bg-zinc-950 text-zinc-400 hover:text-white rounded-2xl transition-all duration-700"
                >
                    <span className="font-black text-[10px] uppercase tracking-[0.4em]">{t('viewDetails')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                </Link>
            </div>
        </div>
    );
}
