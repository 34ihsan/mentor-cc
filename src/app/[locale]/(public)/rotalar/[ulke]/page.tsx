import { Metadata } from 'next';
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowRight,
    MapPin,
    Globe,
    ShieldCheck,
    Clock,
    GraduationCap,
    Zap
} from "lucide-react";
import ContactForm from "@/components/public/ContactForm";
import HeroSlider from "@/components/public/HeroSlider";
import Image from "next/image";
import { stripHtml } from "@/utils/text";
import { getTranslations } from "next-intl/server";
import SafeHTMLContent from "@/components/public/SafeHTMLContent";

interface DestinationPageProps {
    params: Promise<{ locale: string; ulke: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stareducon.co.uk';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; ulke: string }> }): Promise<import("next").Metadata> {
    const { locale, ulke } = await params;
    const country = await prisma.country.findFirst({
        where: { slug: ulke.toLowerCase() },
    });
    const t = await getTranslations({ locale, namespace: 'RouteDetail' });

    const title = (locale === 'en' ? (country as any)?.name_en : country?.name) || country?.name || ulke.charAt(0).toUpperCase() + ulke.slice(1);
    const content = (locale === 'en' ? (country as any)?.content_en : country?.content) || country?.content;
    
    const description = content 
        ? stripHtml(content).substring(0, 160)
        : t('description', { country: title });

    return {
        title: `${title} ${t('guideLabel')} | StarEducation`,
        description,
        openGraph: {
            title: `${title}'da Eğitim | StarEducation`,
            description,
            images: country?.image ? [{ url: country.image }] : [],
        },
    };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
    const { locale, ulke } = await params;
    const t = await getTranslations({ locale, namespace: 'RouteDetail' });
    const countryT = await getTranslations({ locale, namespace: 'CountryDetail' });
    const formattedSlug = ulke.toLowerCase();

    // Fetch Country Data
    const country = await prisma.country.findFirst({
        where: { slug: formattedSlug },
    });

    if (!country) {
        return notFound();
    }

    // Localize Country
    const localizedCountry = {
        ...country,
        name: (locale === 'en' ? (country as any).name_en : country.name) || country.name,
        content: (locale === 'en' ? (country as any).content_en : country.content) || country.content,
        capital: (locale === 'en' ? (country as any).capital_en : country.capital) || country.capital,
        currency: (locale === 'en' ? (country as any).currency_en : country.currency) || country.currency,
        language: (locale === 'en' ? (country as any).language_en : country.language) || country.language,
    };

    // Check for slides in this context
    const hasSlides = await prisma.heroSlide.count({
        where: { pageContext: formattedSlug, active: true }
    }) > 0;

    const institutionsRaw = await prisma.institution.findMany({
        where: {
            OR: [
                { countryId: country.id },
                { country: { slug: formattedSlug } }
            ]
        },
        include: {
            programs: true
        }
    });

    const institutions = institutionsRaw.map(inst => ({
        ...inst,
        name: (locale === 'en' ? (inst as any).name_en : inst.name) || inst.name,
        description: (locale === 'en' ? (inst as any).description_en : inst.description) || inst.description,
        city: (locale === 'en' ? (inst as any).city_en : inst.city) || inst.city,
    }));

    const title = localizedCountry.name;
    const heroDesc = t('heroSub');

    // Parse settings
    let imageSettings = {
        size: 'cover',
        position: 'center',
        height: 'large',
        textColor: 'white',
        textPosition: 'center',
        textVerticalAlign: 'center'
    };
    try {
        if (country?.imageSettings) {
            const parsed = JSON.parse(country.imageSettings as string);
            if (parsed) imageSettings = { ...imageSettings, ...parsed };
        }
    } catch (e) { }

    return (
        <main className="min-h-screen bg-background text-navy selection:bg-gold selection:text-white">
            {/* --- HERO --- */}
            {hasSlides ? (
                <HeroSlider context={formattedSlug} />
            ) : (
                <section className={`relative flex items-center overflow-hidden bg-slate-50 ${imageSettings.height === 'small' ? 'h-[45vh] min-h-[400px]' :
                    imageSettings.height === 'medium' ? 'h-[65vh] min-h-[550px]' :
                        imageSettings.height === 'screen' ? 'h-screen' :
                            'h-[75vh] min-h-[650px]'
                    }`}>
                    <div className="absolute inset-0">
                        {country?.image && (
                            <Image
                                src={country.image!}
                                alt={title}
                                fill
                                priority
                                className={`object-${imageSettings.size} object-${imageSettings.position} opacity-30 grayscale-[20%]`}
                                sizes="100vw"
                            />
                        )}
                        {/* Elegant Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-slate-50/40 z-10" />
                    </div>

                    <div className="relative container mx-auto px-6 z-20 h-full flex flex-col justify-end pb-24">
                        <div className="max-w-5xl space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-px bg-gold" />
                                <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">{t('prestigiousDestination')}: {title}</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-navy italic leading-[1.1] tracking-tight">
                                {title}'da <br />
                                <span className="gold-text not-italic">{t('globalFuture')}</span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-600 max-w-2xl font-serif italic border-l border-gold pl-8 leading-relaxed opacity-90">
                                {localizedCountry.content ? t('heroSub') : heroDesc}
                            </p>

                            <div className="flex gap-12 pt-6">
                                <div className="space-y-2">
                                    <div className="text-4xl font-serif font-bold text-gold italic">{institutions.length}+</div>
                                    <div className="text-slate-400 text-[9px] uppercase font-bold tracking-[0.3em]">{t('academicPartner')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* --- MAIN CONTENT --- */}
            <section className="py-32 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        <div className="lg:col-span-8 space-y-24">

                            {/* Expert Insight / Dynamic Content */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-px bg-gold" />
                                    <SafeHTMLContent as="h2" className="text-4xl font-serif font-bold text-navy italic" html={t.raw('strategicAnalysis')} />
                                </div>

                                <div className="bg-white p-12 md:p-16 border border-gold/10 relative group overflow-hidden shadow-xl">
                                    {localizedCountry.content ? (
                                        <div className="prose-premium font-serif italic text-navy/70 text-lg leading-[1.8]"
                                            dangerouslySetInnerHTML={{ __html: localizedCountry.content! }}
                                        />
                                    ) : (
                                        <div className="space-y-10">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-700">
                                                    <Zap size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="text-2xl font-serif font-bold text-navy italic">{t('academicEvaluation')}</h4>
                                                    <p className="text-navy/40 text-[9px] uppercase font-bold tracking-[0.3em]">{countryT('whyLabel', { country: title.toUpperCase() })}</p>
                                                </div>
                                            </div>
                                            <p className="text-slate text-lg leading-relaxed font-serif italic border-l border-gold/20 pl-8">
                                                Kültürel derinlik ve akademik mükemmeliyetin buluştuğu {title}, kariyer yolculuğunuzda vizyonunuzu genişletecek eşsiz bir ekosistem sunmaktadır.
                                            </p>
                                        </div>
                                    )}
                                    {/* Decorative Motif */}
                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.02] pointer-events-none">
                                        <div className="w-full h-full border-l border-b border-navy transform skew-x-12" />
                                    </div>
                                </div>
                            </div>

                            {/* Institutions Listing */}
                            <div className="space-y-16">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-gold/10">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-px bg-gold" />
                                            <SafeHTMLContent as="h2" className="text-4xl font-serif font-bold text-navy italic" html={t.raw('partnersTitle')} />
                                        </div>
                                        <p className="text-slate font-serif italic max-w-xl">
                                            {t('partnersDesc', { country: title })}
                                        </p>
                                    </div>
                                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy/40 bg-white border border-gold/10 px-6 py-3 italic shadow-sm">
                                        {institutions.length} {t('resultsLabel')}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-12">
                                    {institutions.map((inst) => (
                                        <div key={inst.id} className="group bg-white border border-gold/10 hover:border-gold/30 transition-all duration-1000 flex flex-col md:row overflow-hidden relative shadow-xl hover:shadow-2xl">
                                            <div className="grid md:grid-cols-12">
                                                <div className="md:col-span-5 relative h-80 overflow-hidden">
                                                    <Image
                                                        src={inst.image || "https://images.unsplash.com/photo-1541339906962-d000263f6397?q=80&w=800"}
                                                        fill
                                                        className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                                        alt={inst.name}
                                                        sizes="(max-width: 768px) 100vw, 40vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                                                        <div className="bg-gold text-navy px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 shadow-2xl">
                                                            <MapPin className="w-3 h-3" />
                                                            {inst.city}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="md:col-span-7 p-10 md:p-12 flex flex-col">
                                                    <h3 className="text-3xl font-serif font-bold text-navy mb-6 tracking-tight italic group-hover:text-gold transition-colors duration-500">
                                                        {inst.name}
                                                    </h3>
                                                    <p className="text-slate line-clamp-3 mb-8 text-base leading-relaxed font-serif italic">
                                                        {inst.description || "Kurumun akademik portföyü ve kabul şartları hakkında detaylı bilgi için uzmanlarımıza danışın."}
                                                    </p>

                                                    <div className="flex items-center justify-between pt-10 border-t border-gray-50 mt-auto">
                                                        <div className="flex items-center gap-4">
                                                            {inst.programs.length > 0 && (
                                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
                                                                    {inst.programs.length} PROGRAM
                                                                </span>
                                                            )}
                                                            {inst.rating && (
                                                                <div className="flex items-center gap-1 text-gold">
                                                                    <span className="text-xs">★</span>
                                                                    <span className="text-[10px] font-bold tracking-widest">{inst.rating}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <Link
                                                            href={`/kurumsal/kurumlar/${inst.slug}`}
                                                            className="flex items-center gap-4 text-navy font-bold text-[10px] uppercase tracking-[0.4em] group/btn"
                                                        >
                                                            <span className="hidden md:block">{t('explore')}</span>
                                                            <div className="w-12 h-12 border border-gold/10 flex items-center justify-center group-hover/btn:bg-gold group-hover/btn:text-navy transition-all duration-500 shadow-md">
                                                                <ArrowRight className="w-4 h-4" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-12">
                                {country && (
                                    <div className="bg-white p-12 border border-gold/10 group shadow-xl">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-px bg-gold" />
                                            <h4 className="text-2xl font-serif font-bold text-navy italic">{t('countryGuide')}</h4>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            {[
                                                { label: countryT("capital"), value: localizedCountry.capital },
                                                { label: t("officialLanguage"), value: localizedCountry.language },
                                                { label: countryT("currency"), value: localizedCountry.currency },
                                                { label: t("population"), value: localizedCountry.population }
                                            ].map((stat, i) => stat.value && (
                                                <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                                                    <span className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">{stat.label}</span>
                                                    <span className="text-sm font-serif font-bold text-navy italic">{stat.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white border border-gold/10 p-12 space-y-12 shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-px bg-gold" />
                                        <h4 className="text-2xl font-serif font-bold text-navy italic">{t('processSupport')}</h4>
                                    </div>
                                    <div className="space-y-8">
                                        {[
                                            { icon: <GraduationCap size={18} />, title: t("consultancy") },
                                            { icon: <ShieldCheck size={18} />, title: t("visaManagement") },
                                            { icon: <Globe size={18} />, title: t("accommodation") },
                                            { icon: <Clock size={18} />, title: t("orientation") }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-5 items-center group/list cursor-default">
                                                <div className="w-10 h-10 border border-gold/10 flex items-center justify-center text-navy group-hover:bg-gold group-hover:text-navy transition-all duration-500 shadow-sm">
                                                    {item.icon}
                                                </div>
                                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy/60 group-hover:text-navy transition-colors">{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BOTTOM CONTACT FORM --- */}
            <section id="contact-form" className="py-24 bg-background border-y border-gold/10">
                <div className="container mx-auto px-6">
                    <div className="shadow-4xl border border-gold/5 bg-white">
                        <ContactForm
                            variant="horizontal"
                            title={t('formTitle', { title: title })}
                            description={t('formDesc', { title: title })}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
