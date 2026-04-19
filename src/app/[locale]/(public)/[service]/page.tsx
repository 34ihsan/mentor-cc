
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, CheckCircle2, Globe2, GraduationCap, School, Languages, Building2, Sparkles, Compass } from "lucide-react";
import React, { Suspense } from "react";
import ContactForm from "@/components/public/ContactForm";
import ScrollToContact from "@/components/public/ScrollToContact";
import HeroSlider from "@/components/public/HeroSlider";
import { Link } from "@/i18n/routing";
import { exams as examsData } from "@/data/exams";
import { popularItems as popularItemsData } from "@/data/popular-items";
import { serviceExtras as serviceExtrasData } from "@/data/service-extras";
import { getProgramData } from "@/data/program-content";
import SafeHTMLContent from '@/components/public/SafeHTMLContent';
import { countryMap } from "@/lib/mappings";
import MotionWrapper from '@/components/public/MotionWrapper';
import RichTextLayout from "@/components/public/RichTextLayout";

interface PageProps {
    params: Promise<{ locale: string; service: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<import("next").Metadata> {
    const { locale, service } = await params;
    const item = await prisma.service.findUnique({
        where: { slug: service.toLowerCase() },
        select: { 
            title: true, title_en: true,
            seoDescription: true, seoDescription_en: true 
        }
    });

    if (!item) return { title: "Service Not Found" };

    const sdT = await getTranslations('ServiceDetail');

    const title = (locale === 'en' ? item.title_en : item.title) || item.title;
    const description = (locale === 'en' ? item.seoDescription_en : item.seoDescription) || item.seoDescription || sdT('seoDefaultDescription', { title });

    return {
        title: title,
        description: description,
    };
}

export default async function ServicePage({ params }: PageProps) {
    const p = await params;
    const locale = p.locale;
    const slug = p.service;
    
    const t = await getTranslations();
    const sdT = await getTranslations('ServiceDetail');
    const ct = await getTranslations('Common');

    const formattedSlug = slug.toLowerCase();

    const service = await prisma.service.findUnique({
        where: { slug: formattedSlug },
    });

    if (!service || !service.active) {
        const [post, page] = await Promise.all([
            prisma.post.findUnique({ where: { slug: formattedSlug }, select: { slug: true } }),
            prisma.page.findUnique({ where: { slug: formattedSlug }, select: { slug: true } })
        ]);

        if (post) redirect(`/blog/${post.slug}`);
        if (page) redirect(`/pages/${page.slug}`);

        return notFound();
    }

    const [hasSlides, availableCountries, exams, popularItems, extras] = await Promise.all([
        prisma.heroSlide.count({ where: { pageContext: formattedSlug, active: true } }).then(c => c > 0),
        prisma.countryServiceContent.findMany({
            where: { serviceId: service.id },
            include: { country: true }
        }),
        examsData || {},
        popularItemsData[formattedSlug] || [],
        serviceExtrasData[formattedSlug] || null
    ]);

    const programContent = getProgramData(formattedSlug, locale);

    let imageSettings = {
        size: 'cover',
        position: 'center',
        height: 'medium',
        textColor: 'navy',
        textPosition: 'center',
        textVerticalAlign: 'center'
    };

    try {
        if (service.imageSettings) {
            const parsed = JSON.parse(service.imageSettings as string);
            if (parsed) imageSettings = { ...imageSettings, ...parsed };
        }
    } catch (e) { }

    return (
        <div className="bg-zinc-50/50 min-h-screen pb-20 selection:bg-secondary selection:text-white">


            {/* HERO SECTION */}
            {hasSlides ? (
                <Suspense fallback={<div className="w-full h-[600px] bg-zinc-100 animate-pulse" />}>
                    <HeroSlider context={formattedSlug} />
                </Suspense>
            ) : (
                <div className={`relative flex items-center justify-center overflow-hidden bg-zinc-950 ${imageSettings.height === 'small' ? 'h-[45vh] min-h-[350px]' :
                    imageSettings.height === 'large' ? 'h-[80vh] min-h-[600px]' :
                        imageSettings.height === 'screen' ? 'h-screen' :
                            'h-[75vh] min-h-[550px]' // medium default
                    }`}>
                    {service.image ? (
                        <div className="absolute inset-0">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                priority
                                className="opacity-40 grayscale-[20%] object-cover scale-105"
                                style={{ objectPosition: imageSettings.position || 'center' }}
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent z-10" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-zinc-950" />
                    )}

                    <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
                        <MotionWrapper>
                            <div className="max-w-5xl">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-16 h-[1px] bg-secondary" />
                                    <span className="text-secondary font-black tracking-[0.5em] text-[10px] uppercase">{sdT('globalStrategy')}</span>
                                </div>

                                <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-serif font-bold text-white mb-10 tracking-tighter leading-[0.8] italic">
                                    {(locale === 'en' ? service.title_en : service.title) || service.title}
                                </h1>

                                <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl font-serif italic border-l border-secondary/30 pl-10 leading-relaxed opacity-90">
                                    {(locale === 'en' ? service.seoDescription_en : service.seoDescription) || service.seoDescription || sdT('heroFallback')}
                                </p>
                            </div>
                        </MotionWrapper>
                    </div>
                    
                    <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
                         <div className="w-24 h-24 rounded-full border border-white/5 shadow-2xl flex items-center justify-center text-white/10 animate-spin-slow">
                              <Compass size={40} strokeWidth={1} />
                         </div>
                    </div>
                </div>
            )}

            {/* CONTENT & ADVANTAGES SECTION */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 max-w-[90rem]">
                    <div className="flex flex-col gap-32">
                        {/* Main Content Flow */}
                        <div className="w-full">
                            <MotionWrapper>
                                <div className="prose-premium prose-xl md:prose-2xl max-w-none text-zinc-700 mb-32">
                                    <RichTextLayout content={programContent?.overview || service.content || ""} />
                                </div>
                            </MotionWrapper>

                            {/* Key Advantages */}
                            {programContent?.advantages && (
                                <div className="space-y-24">
                                    <MotionWrapper>
                                        <div className="flex flex-col gap-4 mb-20">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-[1px] bg-secondary/30" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Why Choose Us</span>
                                            </div>
                                            <SafeHTMLContent as="h2" className="text-5xl md:text-6xl font-serif font-bold text-primary italic tracking-tight" html={sdT.raw('advantages')} />
                                        </div>
                                    </MotionWrapper>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {programContent?.advantages.map((adv: any, i: number) => (
                                            <MotionWrapper key={i} delay={i * 0.1}>
                                                <div className="bg-zinc-50/50 border border-zinc-100 p-12 hover:shadow-premium hover:-translate-y-2 transition-all duration-1000 group rounded-[3rem] h-full flex flex-col items-start text-left">
                                                    <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-50 flex items-center justify-center text-secondary mb-10 group-hover:bg-zinc-950 group-hover:text-white transition-all duration-1000 shadow-sm group-hover:shadow-2xl">
                                                        <adv.icon size={28} strokeWidth={1.5} />
                                                    </div>
                                                    <h3 className="text-2xl font-serif font-bold text-primary mb-5 italic tracking-tight group-hover:text-secondary transition-colors duration-1000">{adv.title}</h3>
                                                    <p className="text-zinc-500 text-lg font-serif italic leading-relaxed opacity-80">{adv.desc}</p>
                                                </div>
                                            </MotionWrapper>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Strategic Process */}
                            {programContent?.process && (
                                <div className="mt-40 space-y-24">
                                    <MotionWrapper>
                                        <div className="flex flex-col gap-4 mb-20">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-[1px] bg-secondary/30" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">The Journey</span>
                                            </div>
                                            <SafeHTMLContent as="h2" className="text-5xl md:text-6xl font-serif font-bold text-primary italic tracking-tight" html={sdT.raw('process')} />
                                        </div>
                                    </MotionWrapper>

                                    <div className="space-y-6">
                                        {programContent?.process.map((step: any, i: number) => (
                                            <MotionWrapper key={i} delay={i * 0.1}>
                                                <div className="flex flex-col md:flex-row items-center md:items-start gap-12 p-12 md:p-14 border border-zinc-50 bg-zinc-50/30 hover:bg-white hover:shadow-premium hover:border-zinc-100 transition-all duration-1000 group rounded-[3rem]">
                                                    <div className="text-7xl md:text-8xl font-serif font-black text-secondary/10 group-hover:text-secondary transition-all duration-1000 shrink-0 leading-none italic tracking-tighter">
                                                        0{step.step}
                                                    </div>
                                                    <div className="space-y-4 pt-4 text-center md:text-left">
                                                        <h3 className="text-3xl font-serif font-bold text-primary italic leading-tight tracking-tight group-hover:translate-x-2 transition-transform duration-1000">{step.title}</h3>
                                                        <p className="text-zinc-500 font-serif italic text-lg leading-relaxed opacity-80 max-w-xl">{step.desc}</p>
                                                    </div>
                                                </div>
                                            </MotionWrapper>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Full Width VIP Banner: Strategic Perks */}
                        <div className="w-full">
                            <MotionWrapper>
                                <div className="bg-zinc-950 p-16 md:p-24 rounded-[4rem] border border-zinc-900 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:opacity-10 transition-opacity">
                                         <Sparkles size={300} strokeWidth={1} className="text-secondary" />
                                    </div>
                                    <div className="relative z-10 flex flex-col xl:flex-row gap-20 items-center">
                                        <div className="xl:w-1/3 text-center xl:text-left">
                                            <h3 className="text-[12px] uppercase tracking-[0.5em] font-black text-secondary mb-6">
                                                {sdT('prestige')}
                                            </h3>
                                            <p className="text-zinc-500 font-serif italic text-xl md:text-2xl leading-relaxed mb-10">Premium global standards for your academic journey.</p>
                                            <ScrollToContact className="w-full py-6 md:text-lg !bg-secondary !text-primary !rounded-2xl shadow-xl hover:shadow-secondary/20 transition-all duration-700" />
                                        </div>
                                        <div className="xl:w-2/3">
                                            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                                {[
                                                    { title: sdT('prestigeItems.visionaryTitle'), desc: sdT('prestigeItems.visionaryDesc') },
                                                    { title: sdT('prestigeItems.eliteTitle'), desc: sdT('prestigeItems.eliteDesc') },
                                                    { title: sdT('prestigeItems.holisticTitle'), desc: sdT('prestigeItems.holisticDesc') }
                                                ].map((item, i) => (
                                                    <li key={i} className="group cursor-default bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors duration-500 h-full">
                                                        <div className="flex items-center gap-5 mb-5">
                                                            <div className="w-3 h-3 rounded-full bg-secondary group-hover:scale-150 transition-all duration-700 shadow-[0_0_20px_rgba(180,148,62,0.8)]" />
                                                            <h4 className="text-[13px] font-black tracking-[0.2em] text-white uppercase">{item.title}</h4>
                                                        </div>
                                                        <p className="text-base font-serif italic text-zinc-400 leading-relaxed tracking-wide opacity-90">{item.desc}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </div>
            </section>

            {/* DESTINATIONS / COUNTRIES GRID */}
            <section className="py-40 bg-zinc-50/50 border-y border-zinc-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(180,148,62,0.03),_transparent_70%)] pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    {(() => {
                        let displayCountries = availableCountries;
                        if (formattedSlug === 'denklik') {
                            const mappedCountries = Object.entries(countryMap).map(([cSlug, c]) => ({
                                id: cSlug,
                                country: { 
                                    id: cSlug, 
                                    name: locale === 'en' ? (c.title_en || c.title) : c.title, 
                                    slug: cSlug 
                                },
                                image: c.image
                            }));
                            const existingSlugs = new Set(availableCountries.map(ac => ac.country.slug));
                            const extra = mappedCountries.filter(m => !existingSlugs.has(m.country.slug));
                            displayCountries = [...availableCountries, ...extra as any];
                        }

                        if (displayCountries.length === 0) return null;

                        return (
                            <>
                                <MotionWrapper>
                                    <div className="text-center mb-32 max-w-5xl mx-auto">
                                        <div className="flex items-center justify-center gap-4 mb-8">
                                            <div className="w-12 h-[1px] bg-secondary/30" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">{sdT('destinationsLabel')}</span>
                                            <div className="w-12 h-[1px] bg-secondary/30" />
                                        </div>
                                        <SafeHTMLContent as="h2" className="text-6xl md:text-8xl font-serif font-bold text-primary mb-10 italic tracking-tight" html={sdT.raw('destinationsTitle')} />
                                        <p className="text-zinc-400 text-xl font-serif leading-relaxed italic max-w-2xl mx-auto">
                                            {sdT('destinationsDesc')}
                                        </p>
                                    </div>
                                </MotionWrapper>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                                    {displayCountries.map((content: any, i: number) => (
                                        <MotionWrapper key={content.country.id} delay={i * 0.1}>
                                            <Link
                                                href={`/${slug}/${content.country.slug}`}
                                                className="group relative h-[600px] rounded-[3.5rem] border border-zinc-100 overflow-hidden bg-white hover:shadow-premium transition-all duration-1000"
                                            >
                                                <Image
                                                    src={content.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"}
                                                    fill
                                                    className="grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms] object-cover"
                                                    alt={content.country.name}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-1000" />

                                                <div className="absolute inset-x-0 bottom-0 p-14 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-1000 z-20">
                                                    <div className="w-12 h-[2px] bg-secondary mb-10 shadow-lg" />
                                                    <h3 className="text-5xl font-serif font-bold text-white mb-10 tracking-tighter italic">
                                                        {(locale === 'en' ? content.country.name_en : content.country.name) || content.country.name}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-secondary text-[10px] font-black uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100">
                                                        {sdT('viewDetails')} <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-3 transition-transform duration-1000" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </MotionWrapper>
                                    ))}
                                </div>
                            </>
                        );
                    })()}
                </div>
            </section>

            {/* POPULAR CHOICES / INSTITUTIONS */}
            {popularItems.length > 0 && (
                <section className="py-40 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/[0.02] -z-0 -skew-x-12 transform origin-top translate-x-40 pointer-events-none" />
                    <div className="container mx-auto px-6 relative z-10">
                        <MotionWrapper>
                            <div className="text-center mb-32 max-w-5xl mx-auto">
                                <div className="flex items-center justify-center gap-4 mb-8">
                                    <div className="w-12 h-[1px] bg-secondary/30" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">{sdT('popularLabel')}</span>
                                    <div className="w-12 h-[1px] bg-secondary/30" />
                                </div>
                                <SafeHTMLContent as="h2" className="text-6xl md:text-[5rem] font-serif font-bold text-primary mb-10 italic tracking-tight" html={sdT.raw('popularTitle')} />
                                <p className="text-zinc-400 text-xl font-serif italic max-w-2xl mx-auto">
                                    Explore highly curated academic opportunities designed for excellence.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {popularItems.map((item: any, i: number) => (
                                <MotionWrapper key={i} delay={i * 0.1}>
                                    <div className="bg-zinc-50/50 border border-zinc-100 p-8 rounded-[4rem] flex flex-col items-center group transition-all duration-1000 hover:shadow-premium hover:-translate-y-2">
                                        <div className="relative w-full h-[450px] rounded-[3.5rem] overflow-hidden mb-12 shadow-inner">
                                            <Image
                                                src={item.image || "https://images.unsplash.com/photo-1541339907198-e08759df93f3?w=800&q=80"}
                                                fill
                                                className="grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3000ms] object-cover"
                                                alt={item.name}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
                                            <div className="absolute bottom-10 left-10 z-20">
                                                 <h3 className="text-4xl font-serif font-bold text-white italic tracking-tighter mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-1000">{item.name}</h3>
                                                 <div className="w-12 h-[1px] bg-secondary shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                            </div>
                                        </div>
                                        <div className="px-6 pb-6 w-full">
                                            <p className="text-zinc-500 text-lg font-serif italic mb-10 line-clamp-3 opacity-80 leading-relaxed">
                                                {item.description}
                                            </p>
                                            <a
                                                href={item.href}
                                                className="inline-flex items-center gap-6 text-secondary font-black uppercase tracking-[0.5em] text-[10px] group/link"
                                            >
                                                {sdT('viewDetails')}
                                                <div className="w-12 h-[1.5px] bg-secondary group-hover/link:w-20 transition-all duration-1000" />
                                                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-3 duration-1000" />
                                            </a>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* PRE-FLOW CTA / CONTACT AREA */}
            <section id="contact-form" className="py-40 bg-zinc-50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <MotionWrapper>
                        <div className="bg-white rounded-[4rem] border border-zinc-100 shadow-premium overflow-hidden relative">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(180,148,62,0.03),_transparent_60%)] pointer-events-none" />

                            <Suspense fallback={<div className="h-[600px] animate-pulse bg-white flex items-center justify-center font-serif italic text-secondary/20 tracking-[0.3em] uppercase">Preparing Strategic Briefing...</div>}>
                                <ContactForm
                                    variant="horizontal"
                                    title={sdT('formTitle', { title: (locale === 'en' ? service.title_en : service.title) || service.title })}
                                    description={sdT('formDesc')}
                                />
                            </Suspense>
                        </div>
                    </MotionWrapper>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none -mb-40" />
            </section>


        </div>
    );
}

