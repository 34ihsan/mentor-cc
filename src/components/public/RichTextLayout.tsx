"use client";

import React, { useEffect, useState } from 'react';
import { ChevronDown, List, HelpCircle, ArrowRight, BookOpen, MessageSquareQuote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface RichTextLayoutProps {
    content: string;
}

export default function RichTextLayout({ content }: RichTextLayoutProps) {
    const t = useTranslations('RichTextLayout');
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // Extract ToC on mount
    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const headings = Array.from(doc.querySelectorAll('h2'));
        const tocItems = headings.map(h => ({
            id: h.id || h.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
            text: h.textContent || ''
        }));
        setToc(tocItems);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0% -80% 0%' }
        );

        document.querySelectorAll('h2[id]').forEach((h) => observer.observe(h));
        return () => observer.disconnect();
    }, [content]);

    // Handle FAQ rendering (special case)
    const renderFAQ = (html: string) => {
        if (!html.includes('faq-section')) return null;

        const faqMatch = html.match(/<div class="faq-section[\s\S]*?>([\s\S]*?)<\/div>/);
        if (!faqMatch) return null;

        const itemsMatch = faqMatch[1].matchAll(/<div class="faq-item[\s\S]*?"><strong>([\s\S]*?)<\/strong><p>([\s\S]*?)<\/p><\/div>/g);
        const items = Array.from(itemsMatch).map(m => ({ q: m[1], a: m[2] }));

        return (
            <div className="space-y-6 mt-24 pb-32">
                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-[1px] bg-secondary/30" />
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">{t('expertGuidance')}</span>
                    </div>
                    <h2 id="faq" className="text-4xl md:text-5xl font-serif font-bold text-primary italic tracking-tight flex items-center gap-4">
                        <HelpCircle className="w-8 h-8 text-secondary/40 shrink-0" strokeWidth={1} /> {t('faqTitle')}
                    </h2>
                </div>
                <div className="grid gap-4">
                    {items.map((item, i) => (
                        <FAQItem key={i} question={item.q} answer={item.a} index={i} />
                    ))}
                </div>
            </div>
        );
    };

    // Strip FAQ from main content to render it separately at bottom
    const mainContent = content.split('<div class="faq-section')[0];

    return (
        <div className="flex flex-col lg:flex-row gap-20 relative">
            {/* Table of Contents - Desktop Sticky */}
            {toc.length > 0 && (
                <aside className="hidden lg:block w-80 shrink-0">
                    <div className="sticky top-32 p-10 bg-zinc-50/50 backdrop-blur-xl rounded-[3rem] border border-zinc-100 shadow-premium">
                        <div className="flex items-center gap-3 mb-10">
                            <BookOpen className="w-4 h-4 text-secondary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{t('onThisPage')}</span>
                        </div>
                        <nav className="space-y-2">
                            {toc.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`group flex items-center gap-3 py-2 text-[13px] transition-all duration-700 font-serif italic ${activeId === item.id
                                        ? 'text-secondary translate-x-4'
                                        : 'text-zinc-400 hover:text-primary hover:translate-x-2'
                                        }`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${activeId === item.id ? 'bg-secondary scale-125' : 'bg-zinc-200 group-hover:bg-zinc-300'}`} />
                                    {item.text}
                                </a>
                            ))}
                            {content.includes('faq-section') && (
                                <a
                                    href="#faq"
                                    className={`group flex items-center gap-3 py-2 text-[13px] transition-all duration-700 font-serif italic ${activeId === 'faq'
                                        ? 'text-secondary translate-x-4'
                                        : 'text-zinc-400 hover:text-primary hover:translate-x-2'
                                        }`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${activeId === 'faq' ? 'bg-secondary scale-125' : 'bg-zinc-200 group-hover:bg-zinc-300'}`} />
                                    {t('faqLabel')}
                                </a>
                            )}
                        </nav>
                        <div className="mt-12 pt-10 border-t border-zinc-100">
                            <Link href="/iletisim" className="btn-primary !w-full !py-5 text-[10px] tracking-[0.3em] gap-3 shadow-2xl">
                                {t('contactSupport')} <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </aside>
            )}

            {/* Main Content Area */}
            <div className="flex-grow max-w-4xl">
                <article
                    className="prose-premium"
                    dangerouslySetInnerHTML={{ __html: mainContent }}
                />

                {renderFAQ(content)}
                
                <div className="mt-20 p-12 bg-zinc-950 rounded-[3rem] border border-zinc-900 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                         <MessageSquareQuote size={120} strokeWidth={1} className="text-secondary" />
                    </div>
                    <div className="relative z-10 max-w-lg">
                        <h3 className="text-2xl font-serif font-bold text-white mb-4 italic italic tracking-tight">{t('ctaTitle')}</h3>
                        <p className="text-zinc-400 text-sm italic font-serif leading-relaxed mb-8">{t('ctaDesc')}</p>
                        <Link href="/iletisim" className="text-secondary font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-3 group/link">
                            {t('ctaButton')} <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-2" />
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-secondary/5 blur-[150px] pointer-events-none -z-10" />
        </div>
    );
}

function FAQItem({ question, answer, index }: { question: string, answer: string, index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.65, 0, 0.35, 1] }}
            className="bg-white border border-zinc-50 rounded-[2rem] overflow-hidden shadow-premium group transition-all duration-700 hover:border-zinc-100"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-8 md:p-10 text-left flex items-center justify-between group"
            >
                <div className="flex items-center gap-6">
                    <div className={`w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center text-[10px] font-black tracking-tighter transition-all duration-700 ${isOpen ? 'bg-secondary text-primary border-secondary shadow-lg' : 'bg-zinc-50 text-zinc-300'}`}>
                        {index + 1}
                    </div>
                    <span
                        className="text-lg md:text-xl font-serif font-bold text-primary group-hover:text-secondary transition-all duration-700 leading-snug italic tracking-tight"
                        dangerouslySetInnerHTML={{ __html: question }}
                    />
                </div>
                <div className={`w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center transition-all duration-700 ${isOpen ? 'rotate-180 bg-secondary/10' : 'group-hover:bg-zinc-100'}`}>
                    <ChevronDown className={`w-5 h-5 text-zinc-300 transition-colors duration-700 ${isOpen ? 'text-secondary' : 'group-hover:text-zinc-500'}`} strokeWidth={3} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                    >
                        <div
                            className="px-10 md:px-24 pb-12 text-zinc-500 text-lg font-serif italic leading-relaxed border-t border-zinc-50 pt-8"
                            dangerouslySetInnerHTML={{ __html: answer }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
