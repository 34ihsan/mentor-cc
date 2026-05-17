"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Calendar, ArrowRight, Image as ImageIcon, Clock, ArrowUpRight } from "lucide-react";
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
        <section className="section-padding bg-zinc-50">
            <div className="container-content">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-[480px] bg-zinc-100 animate-pulse rounded-[1.5rem]" />
                    ))}
                </div>
            </div>
        </section>
    );

    if (posts.length === 0) return (
        <section className="section-padding bg-zinc-50">
            <div className="container-content text-center">
                <div className="inline-block p-12 lg:p-20 border border-dashed border-zinc-200 rounded-[2rem]">
                    <p className="text-zinc-400 font-serif italic text-lg">{t('empty')}</p>
                </div>
            </div>
        </section>
    );

    const featured = posts[0];
    const rest = posts.slice(1);

    return (
        <section className="section-padding bg-zinc-50 border-y border-zinc-100">
            <div className="container-content space-y-20">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                    <MotionWrapper className="max-w-2xl space-y-5">
                        <span className="section-label">{t('label')}</span>
                        <SafeHTMLContent
                            as="h2"
                            className="text-fluid-h2 font-serif font-bold text-primary leading-tight italic"
                            html={t.raw('title')}
                        />
                    </MotionWrapper>

                    <MotionWrapper delay={0.2}>
                        <Link
                            href="/blog"
                            className="group flex items-center gap-4 text-primary font-bold text-[11px] uppercase tracking-[0.4em] pb-3 border-b border-zinc-300 hover:border-secondary hover:text-secondary transition-all duration-500 whitespace-nowrap"
                        >
                            {t('viewAll')}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </MotionWrapper>
                </div>

                {/* Editorial Grid — Featured + List */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Featured Card (large) */}
                    {featured && (
                        <MotionWrapper className="lg:col-span-7">
                            <Link
                                href={`/blog/${featured.slug}`}
                                className="group relative flex flex-col h-full bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-700 hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-72 lg:h-96 overflow-hidden bg-zinc-100">
                                    {featured.image ? (
                                        <Image
                                            src={featured.image}
                                            alt={featured.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                            sizes="(max-width: 1024px) 100vw, 58vw"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-200">
                                            <ImageIcon size={48} strokeWidth={0.5} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                                    {/* Category Badge */}
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-secondary text-white px-5 py-2 text-[9px] font-black uppercase tracking-[0.3em]">
                                            {featured.category || t('categoryDefault')}
                                        </span>
                                    </div>

                                    {/* Read more arrow */}
                                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <ArrowUpRight className="text-white w-5 h-5" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 lg:p-10 flex flex-col flex-1">
                                    <div className="flex items-center gap-6 text-[9px] font-bold text-zinc-400 mb-5 uppercase tracking-[0.25em]">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={11} className="text-secondary/60" />
                                            <span>{new Date(featured.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={11} className="text-secondary/60" />
                                            <span>{Math.ceil(featured.content?.length / 500) || 5} MIN</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary leading-snug mb-4 italic group-hover:text-zinc-700 transition-colors duration-500 flex-1">
                                        {featured.title}
                                    </h3>

                                    <div className="flex items-center gap-3 text-[10px] font-black text-secondary uppercase tracking-[0.3em] mt-4 pt-4 border-t border-zinc-50">
                                        {t('readMore')}
                                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                                    </div>
                                </div>
                            </Link>
                        </MotionWrapper>
                    )}

                    {/* Secondary Cards Column */}
                    {rest.length > 0 && (
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {rest.slice(0, 3).map((post, idx) => (
                                <MotionWrapper key={post.id} delay={0.1 * (idx + 1)}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="group flex items-start gap-6 bg-white border border-zinc-100 rounded-2xl p-5 hover:shadow-lg hover:border-zinc-200 transition-all duration-500 hover:-translate-y-0.5"
                                    >
                                        {/* Thumbnail */}
                                        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100">
                                            {post.image ? (
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                                                    sizes="96px"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-200">
                                                    <ImageIcon size={24} strokeWidth={0.5} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0 space-y-2">
                                            <div className="flex items-center gap-3 text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                                <Calendar size={10} className="text-secondary/50 flex-shrink-0" />
                                                <span>{new Date(post.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
                                            </div>
                                            <h3 className="text-base font-serif font-bold text-primary italic leading-snug group-hover:text-zinc-600 transition-colors duration-500 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-[9px] font-black text-secondary uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                {t('readMore')} <ArrowRight size={10} />
                                            </div>
                                        </div>

                                        {/* Arrow icon */}
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-300 group-hover:text-secondary group-hover:border-secondary/30 transition-all duration-500">
                                            <ArrowRight size={12} />
                                        </div>
                                    </Link>
                                </MotionWrapper>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
