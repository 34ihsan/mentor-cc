"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { X, Megaphone, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
    const locale = useLocale();
    const [announcement, setAnnouncement] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const res = await fetch('/api/public/announcements?type=GLOBAL_HEADER');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setAnnouncement(data[0]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch header announcement:", error);
            }
        };

        fetchAnnouncement();
    }, []);

    const t = useTranslations('Common');

    if (!announcement || !isVisible) return null;

    const style = typeof announcement.styleSettings === 'string' 
        ? JSON.parse(announcement.styleSettings) 
        : announcement.styleSettings;

    // Determine localized content based on locale
    const localizedContent = locale === 'en' 
        ? (announcement.content_en || announcement.content)
        : announcement.content;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                className="relative z-[70] bg-zinc-950 border-b border-zinc-800 overflow-hidden"
            >
                {/* Visual Accent */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                <div className="container mx-auto px-6 py-3 flex items-center justify-center gap-6 md:gap-10 text-center relative z-10">
                    <div className="hidden md:flex items-center gap-3">
                         <div className="w-6 h-[1px] bg-secondary/30" />
                         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-secondary flex items-center gap-2">
                             <Sparkles size={10} className="animate-pulse" /> {t('announcement')}
                         </span>
                    </div>
                    
                    <div 
                        className="text-[11px] md:text-xs font-serif font-medium italic text-zinc-300 tracking-wide prose-premium announcement-content line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: localizedContent }}
                    />

                    <div className="flex items-center gap-6">
                        {announcement.link && (
                            <Link 
                                href={announcement.link}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-secondary transition-colors whitespace-nowrap group"
                            >
                                {t('details')} <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        )}

                        <button 
                            onClick={() => setIsVisible(false)}
                            className="p-1 hover:bg-zinc-800 rounded-full transition-all duration-500 text-zinc-500 hover:text-white"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
