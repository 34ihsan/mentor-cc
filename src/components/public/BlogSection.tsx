"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Calendar, User, ArrowRight, Image as ImageIcon, Clock } from "lucide-react";
import SafeHTMLContent from "./SafeHTMLContent";
import MotionWrapper from "./MotionWrapper";

export default function BlogSection() {
    const t = useTranslations('Blog');
    const locale = useLocale();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/blog/latest");
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return (
        <section className="section-padding bg-[#050505]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-[4/5] bg-zinc-900 animate-pulse rounded-[2.5rem]" />
                    ))}
                </div>
            </div>
        </section>
    );

    if (posts.length === 0) return (
        <section className="section-padding bg-[#050505]">
            <div className="container mx-auto px-6 text-center">
                <div className="inline-block p-12 lg:p-20 border border-dashed border-zinc-800 rounded-[3rem]">
                    <p className="text-zinc-500 font-serif italic text-lg">{t('empty')}</p>
                </div>
            </div>
        </section>
    );

    return (
        <section className="section-padding bg-[#050505] relative overflow-hidden">
            {/* Background Texture - Solar Flare */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,100,0,0.05)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,0,50,0.03)_0%,transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <MotionWrapper className="max-w-2xl">
                        <span className="section-label-solar">{t('label')}</span>
                        <SafeHTMLContent
                            as="h2"
                            className="text-fluid-h2 font-serif font-bold text-white leading-tight italic tracking-tight"
                            html={t.raw('title')}
                        />                    
                    </MotionWrapper>
                    
                    <MotionWrapper delay={0.2}>
                        <Link
                            href="/blog"
                            className="group flex items-center gap-6 text-white font-bold text-[11px] uppercase tracking-[0.4em] pb-3 border-b-2 border-white/5 hover:border-secondary hover:text-secondary transition-all duration-700"
                        >
                            {t('viewAll')} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-3 text-secondary" />
                        </Link>
                    </MotionWrapper>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {posts.map((post, idx) => (
                        <MotionWrapper key={post.id} delay={idx * 0.1}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col bg-zinc-900/50 border border-white/5 p-4 asymmetric-bold hover:shadow-neon hover:-translate-y-3 hover:border-secondary transition-all duration-1000 h-full relative overflow-hidden"
                            >
                                {/* Neon Corner Accent */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/10 asymmetric-reverse group-hover:bg-secondary/20 transition-colors duration-1000" />

                                <div className="aspect-[4/5] bg-zinc-800 relative overflow-hidden rounded-[2rem] mb-10 shadow-inner">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[40%] group-hover:grayscale-0"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                            <ImageIcon size={48} strokeWidth={0.5} />
                                        </div>
                                    )}
                                    <div className="absolute top-6 right-6 z-10">
                                        <span className="bg-[#050505]/95 backdrop-blur-md text-white border border-secondary/40 px-6 py-3 text-[9px] font-black uppercase tracking-[0.3em] rounded-full shadow-neon">
                                            {post.category || t('categoryDefault')}
                                        </span>
                                    </div>
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                </div>

                                <div className="flex flex-col flex-1 px-8 pb-10">
                                    <div className="flex items-center gap-10 text-[9px] font-black text-zinc-500 mb-8 uppercase tracking-[0.3em]">
                                        <div className="flex items-center gap-3">
                                            <Calendar size={14} className="text-secondary" />
                                            <span>{new Date(post.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock size={14} className="text-secondary" />
                                            <span>{Math.ceil(post.content?.length / 500) || 5} MIN</span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-3xl font-serif font-bold text-white leading-tight mb-10 group-hover:text-secondary transition-colors duration-700 italic tracking-tight">
                                        {post.title}
                                    </h3>
                                    
                                    <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] group-hover:translate-x-2 transition-transform duration-700">
                                            {t('readMore')}
                                        </span>
                                        <div className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center group-hover:bg-secondary group-hover:text-white group-hover:border-secondary group-hover:shadow-neon transition-all duration-700 group-hover:-rotate-12">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </MotionWrapper>
                    ))}
                </div>

            </div>
        </section>

    );
}
