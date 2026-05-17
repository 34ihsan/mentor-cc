
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, CheckCircle2, GraduationCap, Sparkles, Compass, Briefcase, ShieldAlert } from "lucide-react";
import React, { Suspense } from "react";
import ContactForm from "@/components/public/ContactForm";
import ScrollToContact from "@/components/public/ScrollToContact";
import HeroSlider from "@/components/public/HeroSlider";
import { Link } from "@/i18n/routing";
import { exams as examsData } from "@/data/exams";
import { popularItems as popularItemsData } from "@/data/popular-items";
import { serviceExtras as serviceExtrasData } from "@/data/service-extras";
import SafeHTMLContent from '@/components/public/SafeHTMLContent';
import { countryMap, highSchoolCategoryMap, examMap } from "@/lib/mappings";
import MotionWrapper from '@/components/public/MotionWrapper';
import RichTextLayout from "@/components/public/RichTextLayout";
import { summerSchoolServiceDetails } from "@/data/summer-school-service-details";
import { languageSchoolServiceDetails } from "@/data/language-school-service-details";
import SmartFinder from "@/components/public/SmartFinder";
import { equivalenceServiceDetails } from "@/data/equivalence-service-details";
import { universityServiceDetails } from "@/data/university-service-details";
import { careerServiceDetails } from "@/data/career-service-details";
import { examsServiceDetails } from "@/data/exams-service-details";

interface PageProps {
    params: Promise<{ locale: string; service: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<import("next").Metadata> {
    const { locale, service } = await params;
    const item = await prisma.service.findUnique({
        where: { slug: service.toLowerCase() },
        select: { 
            title: true, title_en: true, title_de: true,
            seoDescription: true, seoDescription_en: true, seoDescription_de: true 
        }
    });

    if (!item) return { title: "Service Not Found" };

    const sdT = await getTranslations('ServiceDetail');

    const title = (locale === 'de' ? item.title_de : locale === 'en' ? item.title_en : item.title) || item.title;
    const description = (locale === 'de' ? item.seoDescription_de : locale === 'en' ? item.seoDescription_en : item.seoDescription) || item.seoDescription || sdT('seoDefaultDescription', { title });

    return {
        title: title,
        description: description,
    };
}

export default async function ServicePage({ params, searchParams }: PageProps) {
    const p = await params;
    const sp = await searchParams;
    const locale = p.locale;
    const slug = p.service;
    const cat = typeof sp.cat === 'string' ? sp.cat : undefined;
    
    const t = await getTranslations();
    const sdT = await getTranslations('ServiceDetail');
    const ct = await getTranslations('Common');
    const et = await getTranslations('Exams');

    const formattedSlug = slug.toLowerCase();
    
    // Safety check for invalid slug
    if (formattedSlug.includes('undefined')) {
        console.error(`[ServicePage] Invalid slug detected: ${formattedSlug}`);
        return notFound();
    }

    const service = await prisma.service.findUnique({
        where: { slug: formattedSlug },
    });

    if (!service || !service.active) {
        console.log(`[ServicePage] Service not found or inactive: ${formattedSlug}. Checking for blog/page fallback.`);
        const [post, page] = await Promise.all([
            prisma.post.findUnique({ where: { slug: formattedSlug }, select: { slug: true } }),
            prisma.page.findUnique({ where: { slug: formattedSlug }, select: { slug: true } })
        ]);

        if (post) redirect(`/blog/${post.slug}`);
        if (page) redirect(`/pages/${page.slug}`);

        return notFound();
    }

    const [hasSlides, availableCountries] = await Promise.all([
        prisma.heroSlide.count({ where: { pageContext: formattedSlug, active: true } }).then(c => c > 0),
        prisma.countryServiceContent.findMany({
            where: { serviceId: service.id },
            include: { country: true }
        })
    ]);

    let imageSettings = {
        size: 'cover',
        position: 'center',
        height: 'medium',
        textColor: 'navy',
        textPosition: 'center',
        textVerticalAlign: 'center'
    };
    let programContent: any = null;

    try {
        if (service.imageSettings) {
            const parsed = typeof service.imageSettings === 'string' ? JSON.parse(service.imageSettings) : service.imageSettings;
            if (parsed) {
                imageSettings = { ...imageSettings, ...parsed };
                programContent = {
                    overview: (locale === 'de' ? service.content_de : locale === 'en' ? service.content_en : service.content) || service.content,
                    advantages: parsed.advantages,
                    process: parsed.process,
                    faq: parsed.faq,
                    destinations: parsed.destinations
                };
            }
        }
    } catch (e) {
        console.error(`[ServicePage] Error parsing imageSettings for ${formattedSlug}:`, e);
    }

    // For the `/yurtdisi-lise` page replace the marketing overview
    // with a detailed, data-driven overview built from `highSchoolCategoryMap`.
    // This ensures the page shows the comprehensive content regardless of DB text.
    if (formattedSlug === 'yurtdisi-lise') {
        const sections: string[] = [];
        const advantagesAgg: any[] = [];
        const processAgg: any[] = [];

        Object.entries(highSchoolCategoryMap).forEach(([key, cat]) => {
            const details: any = cat.details || {};
            const intro = locale === 'de' ? details.intro_de : locale === 'en' ? details.intro_en : details.intro || '';
            const features: string[] = details.features || [];

            // Section HTML
            const costHtmlParts: string[] = [];
            if (details.costEstimates && Array.isArray(details.costEstimates)) {
                costHtmlParts.push('<ul class="mb-4">');
                details.costEstimates.forEach((c: any) => {
                    costHtmlParts.push(`<li class="mb-1"><strong>${c.region}:</strong> ${c.local} (~$${c.usdPerYear.toLocaleString()}/yıl)</li>`);
                });
                costHtmlParts.push('</ul>');
            }

            const metaHtmlParts: string[] = [];
            if (details.ageRange) metaHtmlParts.push(`<li class="mb-1"><strong>Yaş Aralığı:</strong> ${details.ageRange}</li>`);
            if (details.acceptanceRate) metaHtmlParts.push(`<li class="mb-1"><strong>Kabul Oranı (tahmini):</strong> ${details.acceptanceRate}</li>`);
            if (details.dataSources && Array.isArray(details.dataSources)) {
                metaHtmlParts.push(`<li class="mt-2">Kaynaklar:` +
                    `<ul class="pl-6 list-disc text-sm mt-2">${details.dataSources.map((s: any) => `<li><a class=\"text-secondary underline\" href=\"${s.url}\" target=\"_blank\" rel=\"noreferrer\">${s.label}</a></li>`).join('')}</ul></li>`);
            }

            sections.push(`
                <section class="mb-10">
                    <h2 class="text-3xl font-serif font-bold text-navy mb-4 italic">${cat.title}</h2>
                    <div class="mb-6">${intro}</div>
                    <ul class="list-disc pl-8 text-zinc-900 mb-6">
                        ${features.map(f => `<li class="mb-2">${f}</li>`).join('')}
                    </ul>
                    ${costHtmlParts.length ? `<div class=\"mb-4\"><h4 class=\"font-semibold\">Maliyet Tahmini (yıllık):</h4>${costHtmlParts.join('')}</div>` : ''}
                    ${metaHtmlParts.length ? `<div class=\"mb-4\"><h4 class=\"font-semibold\">Hızlı Bilgiler:</h4><ul class=\"pl-6 list-disc text-zinc-900\">${metaHtmlParts.join('')}</ul></div>` : ''}
                </section>
            `);

            // Collect advantages
            if (details.advantages && Array.isArray(details.advantages)) {
                details.advantages.forEach((a: any) => advantagesAgg.push({ title: a.title, desc: a.desc }));
            }

            // Collect process steps (dedupe by title)
            if (details.process && Array.isArray(details.process)) {
                details.process.forEach((p: any, idx: number) => {
                    const exists = processAgg.find((x: any) => x.title === p.title);
                    if (!exists) processAgg.push({ title: p.title, desc: p.desc, step: processAgg.length + 1 });
                });
            }
        });

        const overviewHtml = `
            <div>
                <h1 class="text-5xl font-serif font-bold text-primary mb-6">Yurtdışı Lise Eğitimi — Eğitim Türleri ve Gerçekçi Rehber</h1>
                <p class="mb-6 text-lg text-zinc-900">Aşağıda dört ana yurtdışı lise modeli için detaylı, güncel ve uygulamaya yönelik bilgiler yer almaktadır: Boarding (yatılı), Private Day (özel), Exchange (devlet değişim) ve IB/AP diploma programları. Her bölümde beklentiler, maliyet aralıkları, yaş/derece gereksinimleri, başvuru adımları ve başarı oranlarına dair gerçekçi veriler sunulmuştur.</p>
                ${sections.join('\n')}
                <h2 class="text-3xl font-serif font-bold text-navy mb-4 italic">Genel Avantajlar</h2>
                <ul class="list-disc pl-8 text-zinc-900 mb-6">
                    ${advantagesAgg.map(a => `<li class="mb-2"><strong>${a.title}:</strong> ${a.desc}</li>`).join('')}
                </ul>
            </div>
        `;

        programContent = programContent || {};
        programContent.overview = overviewHtml;
        programContent.advantages = advantagesAgg.length ? advantagesAgg : null;
        programContent.process = processAgg.length ? processAgg : null;
    }

    if (formattedSlug === 'yurtdisi-yaz-okullari') {
        const globalData = summerSchoolServiceDetails.global;
        if (globalData) {
            programContent = programContent || {};
            programContent.overview = globalData.overview;
            programContent.advantages = globalData.advantages;
            programContent.process = globalData.process;
        }
    }

    if (formattedSlug === 'yurtdisi-dil-okullari') {
        const globalData = languageSchoolServiceDetails.global;
        if (globalData) {
            programContent = programContent || {};
            programContent.overview = globalData.overview;
            programContent.advantages = globalData.advantages;
            programContent.process = globalData.process;
        }
    }

    if (formattedSlug === 'sinavlar' || formattedSlug === 'denklik') {
        const et = await getTranslations('Exams');
        try {
            const globalData = et.raw('global');
            if (globalData) {
                programContent = programContent || {};
                programContent.overview = globalData.overview;
                programContent.advantages = globalData.advantages;
                programContent.process = globalData.process;
            }
        } catch (e) {
            // Fallback to static if JSON fails
            const globalData = examsServiceDetails.global;
            if (globalData) {
                programContent = programContent || {};
                programContent.overview = (locale === 'de' ? globalData.overview_de : locale === 'en' ? globalData.overview_en : globalData.overview) || globalData.overview;
                programContent.advantages = (locale === 'de' ? globalData.advantages_de : locale === 'en' ? globalData.advantages_en : globalData.advantages) || globalData.advantages;
                programContent.process = (locale === 'de' ? globalData.process_de : locale === 'en' ? globalData.process_en : globalData.process) || globalData.process;
            }
        }
    }

    if (formattedSlug === 'yurtdisi-universite') {
        const globalData = universityServiceDetails.global_university;
        if (globalData) {
            programContent = programContent || {};
            programContent.overview = (locale === 'de' ? globalData.overview_de : locale === 'en' ? globalData.overview_en : globalData.overview) || globalData.overview;
            programContent.advantages = (locale === 'de' ? globalData.advantages_de : locale === 'en' ? globalData.advantages_en : globalData.advantages) || globalData.advantages;
            programContent.process = (locale === 'de' ? globalData.process_de : locale === 'en' ? globalData.process_en : globalData.process) || globalData.process;
        }
    }

    // --- START: PRE-CALCULATE DISPLAY COUNTRIES ---
    let displayCountries = availableCountries;
    if (formattedSlug === 'denklik') {
        const mappedCountries = Object.entries(countryMap).map(([cSlug, c]) => ({
            id: cSlug,
            country: { 
                id: cSlug, 
                name: locale === 'de' ? (c.title_de || c.title) : locale === 'en' ? (c.title_en || c.title) : c.title, 
                slug: cSlug 
            },
            image: c.image
        }));
        const existingSlugs = new Set(availableCountries.map(ac => ac.country.slug));
        const extra = mappedCountries.filter(m => !existingSlugs.has(m.country.slug));
        displayCountries = [...availableCountries, ...extra as any];

    } else if (formattedSlug === 'sinavlar') {
        const examSlugs = ['toefl', 'ielts', 'sat', 'pte', 'gre', 'gmat', 'cambridge'];
        displayCountries = examSlugs.map(slug => {
            const mapping = examMap[slug as keyof typeof examMap];
            try {
                const examJson = et.raw(slug);
                return {
                    id: slug,
                    country: { 
                        id: slug, 
                        name: examJson?.title || mapping?.title || slug, 
                        slug: slug 
                    },
                    image: mapping?.image
                };
            } catch (e) {
                return {
                    id: slug,
                    country: { id: slug, name: mapping?.title || slug, slug: slug },
                    image: mapping?.image
                };
            }
        }) as any;
    } else if (formattedSlug === 'yurtdisi-yuksek-lisans') {
        const masterStaticSlugs = ['ingiltere', 'amerika', 'almanya', 'kanada', 'isvicre', 'italya', 'fransa', 'ispanya'];
        const existingSlugs = new Set(availableCountries.map(ac => ac.country.slug));
        
        const extraCountries = masterStaticSlugs
            .filter(slug => !existingSlugs.has(slug))
            .map(slug => {
                const c = countryMap[slug as keyof typeof countryMap];
                if (!c) return null;
                return {
                    id: `static-${slug}`,
                    country: {
                        id: slug,
                        name: locale === 'de' ? (c.title_de || c.title) : locale === 'en' ? (c.title_en || c.title) : c.title,
                        slug: slug
                    },
                    image: c.image
                };
            })
            .filter(Boolean);
        
        displayCountries = [...availableCountries, ...extraCountries as any];
    } else if (formattedSlug === 'yurtdisi-lise') {
        const highSchoolCategories = [
            { id: 'boarding', name: locale === 'de' ? 'Internatsschulen' : locale === 'en' ? 'Boarding Schools' : 'Yatılı Okullar', slug: 'boarding', image: highSchoolCategoryMap.boarding.image },
            { id: 'private-day', name: locale === 'de' ? 'Private Tagesschulen' : locale === 'en' ? 'Private Day Schools' : 'Özel Gündüz Okulları', slug: 'private-day', image: highSchoolCategoryMap['private-day'].image },
            { id: 'exchange', name: locale === 'de' ? 'Austauschprogramme' : locale === 'en' ? 'Exchange Programs' : 'Değişim Programları', slug: 'exchange', image: highSchoolCategoryMap.exchange.image },
            { id: 'ib-ap', name: locale === 'de' ? 'IB & AP Programme' : locale === 'en' ? 'IB & AP Schools' : 'IB & AP Okulları', slug: 'ib-ap', image: highSchoolCategoryMap['ib-ap'].image }
        ];
        displayCountries = highSchoolCategories.map(cat => ({
            id: cat.id,
            country: { id: cat.id, name: cat.name, slug: cat.slug },
            image: cat.image
        })) as any;
    } else if (formattedSlug === 'yurtdisi-yaz-okullari') {
        const summerStaticSlugs = ['ingiltere', 'amerika', 'kanada', 'almanya', 'malta', 'isvicre', 'irlanda', 'fransa', 'ispanya'];
        const existingSlugs = new Set(availableCountries.map(ac => ac.country.slug));
        
        const extraCountries = summerStaticSlugs
            .filter(slug => !existingSlugs.has(slug))
            .map(slug => {
                const c = countryMap[slug as keyof typeof countryMap];
                if (!c) return null;
                return {
                    id: `static-${slug}`,
                    country: {
                        id: slug,
                        name: locale === 'de' ? (c.title_de || c.title) : locale === 'en' ? (c.title_en || c.title) : c.title,
                        slug: slug
                    },
                    image: c.image
                };
            })
            .filter(Boolean);
        
        displayCountries = [...availableCountries, ...extraCountries as any];
    }
    // --- END: PRE-CALCULATE DISPLAY COUNTRIES ---

    if (formattedSlug === 'yurtdisi-yuksek-lisans') {
        let globalData = universityServiceDetails.global_masters;
        
        // Select specific category data if available
        if (cat === 'mba' && (universityServiceDetails as any).global_masters_mba) {
            globalData = (universityServiceDetails as any).global_masters_mba;
        } else if (cat === 'msc' && (universityServiceDetails as any).global_masters_msc) {
            globalData = (universityServiceDetails as any).global_masters_msc;
        } else if (cat === 'art' && (universityServiceDetails as any).global_masters_art) {
            globalData = (universityServiceDetails as any).global_masters_art;
        }

        if (globalData) {
            programContent = programContent || {};
            programContent.overview = (locale === 'de' ? globalData.overview_de : locale === 'en' ? globalData.overview_en : globalData.overview) || globalData.overview;
            programContent.advantages = (locale === 'de' ? globalData.advantages_de : locale === 'en' ? globalData.advantages_en : globalData.advantages) || globalData.advantages;
            programContent.process = (locale === 'de' ? globalData.process_de : locale === 'en' ? globalData.process_en : globalData.process) || globalData.process;
            // Also update FAQ if it exists in the data
            if (globalData.faq) {
                programContent.faq = (locale === 'de' ? globalData.faq_de : locale === 'en' ? globalData.faq_en : globalData.faq) || globalData.faq;
            }
        }
    }

    const [exams, popularItems, extras] = await Promise.all([
        examsData || {},
        popularItemsData[formattedSlug] || [],
        serviceExtrasData[formattedSlug] || null
    ]);

    return (
        <div className="bg-zinc-50/50 min-h-screen pb-20 selection:bg-secondary selection:text-white">
            {/* HERO SECTION */}
            {hasSlides ? (
                <Suspense fallback={<div className="w-full h-[600px] bg-zinc-100 animate-pulse" />}>
                    <HeroSlider context={formattedSlug} />
                </Suspense>
            ) : (
                <div className={`relative flex items-center justify-center overflow-hidden bg-primary ${imageSettings.height === 'small' ? 'h-[45vh] min-h-[350px]' :
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

                                <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-serif font-bold text-secondary mb-10 tracking-tighter leading-[0.8] italic">
                                    {(locale === 'de' ? service.title_de : locale === 'en' ? service.title_en : service.title) || service.title}
                                </h1>

                                <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl border-l border-secondary/30 pl-10 leading-relaxed opacity-90">
                                    {(locale === 'de' ? service.seoDescription_de : locale === 'en' ? service.seoDescription_en : service.seoDescription) || service.seoDescription || sdT('heroFallback')}
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
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-24 lg:gap-40 items-start">
                        {/* Main Content */}
                        <div className="w-full lg:w-2/3">
                            <MotionWrapper>
                                <div className={`prose-premium mb-32 ${
                                    formattedSlug === 'yurtdisi-lise' ? 'text-zinc-900' : 
                                    formattedSlug === 'denklik' ? 'text-black' : ''
                                }`}>
                                        <RichTextLayout 
                                            content={programContent?.overview || service.content || ""} 
                                            variant="light"
                                            className={formattedSlug === 'denklik' ? 'prose-p:text-black prose-li:text-black' : ''}
                                        />
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
                                                        <CheckCircle2 size={28} strokeWidth={1.5} />
                                                    </div>
                                                    <h3 className="text-2xl font-serif font-bold text-primary mb-5 italic tracking-tight group-hover:text-secondary transition-colors duration-1000">{adv.title}</h3>
                                                    <p className={`text-lg leading-relaxed ${formattedSlug === 'denklik' ? 'text-black' : 'text-zinc-700'} opacity-95`}>{adv.desc}</p>
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
                                                        <p className={`text-lg leading-relaxed ${formattedSlug === 'denklik' ? 'text-black' : 'text-zinc-700'} opacity-95 max-w-xl`}>{step.desc}</p>
                                                    </div>
                                                </div>
                                            </MotionWrapper>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Sidebar: Strategic Perks */}
                        <aside className="w-full lg:w-1/3 shrink-0">
                            <div className="sticky top-40 space-y-12">
                                <MotionWrapper>
                                    <div className="bg-primary p-14 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                             <Sparkles size={160} strokeWidth={1} className="text-secondary" />
                                        </div>
                                        <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-secondary mb-12">
                                            {sdT('prestige')}
                                        </h3>
                                        <ul className="space-y-12">
                                            {[
                                                { title: sdT('prestigeItems.visionaryTitle'), desc: sdT('prestigeItems.visionaryDesc') },
                                                { title: sdT('prestigeItems.eliteTitle'), desc: sdT('prestigeItems.eliteDesc') },
                                                { title: sdT('prestigeItems.holisticTitle'), desc: sdT('prestigeItems.holisticDesc') }
                                            ].map((item, i) => (
                                                <li key={i} className="group cursor-default">
                                                    <div className="flex items-center gap-5 mb-3">
                                                        <div className="w-2 h-2 rounded-full bg-secondary group-hover:scale-150 transition-all duration-700 shadow-[0_0_15px_rgba(180,148,62,0.5)]" />
                                                        <h4 className="text-[11px] font-black tracking-[0.3em] text-white uppercase">{item.title}</h4>
                                                    </div>
                                                    <p className="text-xs font-serif italic text-zinc-400 pl-7 leading-relaxed tracking-wider opacity-80">{item.desc}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-16 pt-12 border-t border-zinc-800">
                                            <ScrollToContact className="!w-full py-5 !bg-secondary !text-primary !rounded-2xl shadow-xl hover:shadow-secondary/20 transition-all duration-700" />
                                        </div>
                                    </div>
                                </MotionWrapper>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* SMART FINDER */}
            <section className="section-padding bg-zinc-50/50 border-t border-zinc-100 relative z-20">
                <div className="container-content">
                    <SmartFinder />
                </div>
            </section>

            {/* DESTINATIONS / COUNTRIES GRID */}
            <section className="py-40 bg-zinc-50/50 border-y border-zinc-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(180,148,62,0.03),_transparent_70%)] pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    {displayCountries.length > 0 && (
                        <>
                            <MotionWrapper>
                                <div className="text-center mb-32 max-w-5xl mx-auto">
                                    <div className="flex items-center justify-center gap-4 mb-8">
                                        <div className="w-12 h-[1px] bg-secondary/30" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">{sdT('destinationsLabel')}</span>
                                        <div className="w-12 h-[1px] bg-secondary/30" />
                                    </div>
                                    <SafeHTMLContent as="h2" className="text-6xl md:text-8xl font-serif font-bold text-primary mb-10 italic tracking-tight" html={sdT.raw('destinationsTitle')} />
                                    <p className="text-zinc-700 text-xl leading-relaxed max-w-2xl mx-auto">
                                        {sdT('destinationsDesc')}
                                    </p>
                                </div>
                            </MotionWrapper>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                                {displayCountries.map((content: any, i: number) => (
                                    <MotionWrapper key={content.country.id} delay={i * 0.1}>
                                        <Link 
                                            href={`/${formattedSlug}/${content.country.slug}`}
                                            className="group relative block h-[600px] rounded-[3.5rem] border border-zinc-100 overflow-hidden bg-white transition-all duration-1000"
                                        >
                                            <Image
                                                src={(content.country?.slug && countryMap[content.country.slug as keyof typeof countryMap]?.image) || content.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"}
                                                fill
                                                className="grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms] object-cover"
                                                alt={content.country.name}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-1000" />

                                            <div className="absolute inset-x-0 bottom-0 p-14 z-20">
                                                <div className="w-12 h-[2px] bg-secondary mb-10 shadow-lg" />
                                                <h3 className="text-5xl font-serif font-bold text-white mb-10 tracking-tighter italic">
                                                    {(locale === 'de' ? content.country.name_de : locale === 'en' ? content.country.name_en : content.country.name) || content.country.name}
                                                </h3>
                                            </div>
                                        </Link>
                                    </MotionWrapper>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* POPULAR CHOICES / INSTITUTIONS */}
            {formattedSlug !== 'yurtdisi-lise' && popularItems.length > 0 && (
                <section className="section-padding bg-white relative overflow-hidden">
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
                                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
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
                                                src={(item.href?.split('/').pop() && countryMap[item.href.split('/').pop() as keyof typeof countryMap]?.image) || item.image || "https://images.unsplash.com/photo-1541339907198-e08759df93f3?w=800&q=80"}
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
                                            <p className="text-zinc-500 text-lg mb-10 line-clamp-3 opacity-80 leading-relaxed">
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

            {/* Visible FAQ Section */}
            {programContent?.faq && programContent.faq.length > 0 && (
                <section className="py-40 bg-white border-t border-zinc-100">
                    <div className="container mx-auto px-6">
                        <MotionWrapper>
                            <div className="flex flex-col gap-4 mb-20">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-[1px] bg-secondary/30" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">{sdT('faqLabel')}</span>
                                </div>
                                <SafeHTMLContent as="h2" className="text-5xl md:text-6xl font-serif font-bold text-primary italic tracking-tight" html={sdT.raw('faqTitle')} />
                            </div>
                        </MotionWrapper>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {programContent.faq.map((item: any, i: number) => (
                                <MotionWrapper key={i} delay={i * 0.1}>
                                    <div className="p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:border-zinc-300 transition-all h-full">
                                        <h3 className="text-xl font-bold text-zinc-900 mb-4">{item.q}</h3>
                                        <p className={`leading-relaxed ${formattedSlug === 'denklik' ? 'text-black' : 'text-zinc-600'}`}>{item.a}</p>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Global Disclaimer */}
            <section className="section-padding-bottom border-t border-zinc-100 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-8 p-10 bg-zinc-50 rounded-[2.5rem] border border-zinc-100">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 border border-zinc-200">
                            <ShieldAlert className="text-zinc-400" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Yasal Sorumluluk Reddi (Disclaimer)</h4>
                            <p className="text-sm text-zinc-500 leading-relaxed italic">
                                Mentor Career Consulting uzmanlığı ile hazırlanan bu içerikler bilgilendirme amaçlıdır.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRE-FLOW CTA / CONTACT AREA */}
            <section id="contact-form" className="section-padding bg-zinc-50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <MotionWrapper>
                        <div className="bg-white rounded-[4rem] border border-zinc-100 shadow-premium overflow-hidden relative">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(180,148,62,0.03),_transparent_60%)] pointer-events-none" />

                            <Suspense fallback={<div className="h-[600px] animate-pulse bg-white flex items-center justify-center font-serif italic text-secondary/20 tracking-[0.3em] uppercase">Preparing Strategic Briefing...</div>}>
                                <ContactForm
                                    variant="horizontal"
                                    title={sdT('formTitle', { title: (locale === 'de' ? service.title_de : locale === 'en' ? service.title_en : service.title) || service.title })}
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

