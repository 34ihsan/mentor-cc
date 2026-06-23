import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { 
    MapPin, 
    ArrowRight, 
    Building2, 
    Globe2, 
    GraduationCap, 
    School, 
    Languages,
    Download,
    Sparkles,
    Compass
} from 'lucide-react';
import RichTextLayout from '@/components/public/RichTextLayout';
import { countryMap } from '@/lib/mappings/countries';
import { getTranslations } from 'next-intl/server';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';
import MotionWrapper from '@/components/public/MotionWrapper';
import UniversityCard from '@/components/public/UniversityCard';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

type Props = { params: Promise<{ locale: string; slug: string }> };

async function getCountryData(slug: string) {
    const country = await prisma.country.findUnique({
        where: { slug },
        include: {
            serviceContents: {
                include: { service: true }
            },
            institutions: {
                where: { active: true },
                include: { service: true }
            },
            resources: true
        }
    });
    return country;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const country = await getCountryData(slug);
    const t = await getTranslations({ locale, namespace: 'CountryDetail' });
    
    if (!country) return { title: 'Country Not Found' };

    const title = `${country.name} | ${t('guideLabel')} | Mentor Career`;
    const description = t('description', { country: country.name });

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/rotalar/${slug}`,
        },
        openGraph: {
            title,
            description,
            images: country.image ? [{ url: country.image, width: 1200, height: 630, alt: title }] : undefined,
        },
    };
}

export default async function CountryHubPage({ params }: Props) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'CountryDetail' });
    const commonT = await getTranslations({ locale, namespace: 'ServiceDetail' });
    const country = await getCountryData(slug);

    if (!country) notFound();

    const featuredInstitutions = country.institutions.filter((i: any) => i.isFeatured);

    return (
        <div className="min-h-screen bg-zinc-50/50 selection:bg-secondary selection:text-white pb-20">
            <BreadcrumbSchema 
                items={[
                    { name: 'Anasayfa', url: `https://www.mentor-cc.com/${locale}` },
                    { name: 'Rotalar', url: `https://www.mentor-cc.com/${locale}/rotalar` },
                    { name: country.name, url: `https://www.mentor-cc.com/${locale}/rotalar/${slug}` },
                ]} 
            />
            {/* Cinematic Hero Section */}
            <section className="relative h-[90vh] flex items-center overflow-hidden bg-zinc-950">
                <div className="absolute inset-0">
                    <Image
                        src={countryMap[slug as keyof typeof countryMap]?.image || country.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000'}
                        alt={country.name}
                        fill
                        className="object-cover opacity-40 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
                </div>

                <div className="relative container mx-auto px-6 z-20">
                    <MotionWrapper>
                        <div className="max-w-5xl">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-16 h-[1px] bg-secondary" />
                                <span className="text-secondary font-black tracking-[0.5em] text-[10px] uppercase">{t('guideLabel')}</span>
                            </div>
                            <h1 className="text-8xl md:text-[12rem] font-serif font-bold text-secondary mb-10 tracking-tighter leading-[0.8] italic">
                                {country.name}
                            </h1>
                            <p className="text-2xl md:text-3xl text-zinc-300 font-serif italic max-w-3xl leading-snug mb-16">
                                {t('heroSub', { country: country.name })}
                            </p>
                            
                            <div className="flex flex-wrap gap-12 md:gap-20">
                                <div className="flex flex-col gap-2">
                                    <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">{t('capital')}</span>
                                    <span className="text-white font-serif italic text-2xl tracking-tight">{country.capital || '---'}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">{t('language')}</span>
                                    <span className="text-white font-serif italic text-2xl tracking-tight">{country.language || '---'}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">{t('currency')}</span>
                                    <span className="text-white font-serif italic text-2xl tracking-tight">{country.currency || '---'}</span>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
                
                <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
                     <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center text-white/20 animate-spin-slow">
                         <Compass size={40} strokeWidth={1} />
                     </div>
                </div>
            </section>

            {/* Service Selection Grid */}
            <section className="py-24 container mx-auto px-6 relative z-30 -mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {country.serviceContents.map((sc: any, i: number) => (
                        <MotionWrapper key={sc.service.id} delay={i * 0.1}>
                            <Link 
                                href={`/${sc.service.slug}/${country.slug}`}
                                className="bg-white/80 backdrop-blur-3xl border border-zinc-100 p-12 hover:shadow-premium transition-all duration-1000 group relative overflow-hidden flex flex-col justify-between h-96 rounded-[3rem]"
                            >
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-secondary mb-10 group-hover:bg-zinc-950 group-hover:text-white transition-all duration-1000 shadow-sm group-hover:shadow-2xl">
                                        {sc.service.slug === 'yurtdisi-universite' && <GraduationCap size={32} strokeWidth={1.5} />}
                                        {sc.service.slug === 'yurtdisi-lise' && <School size={32} strokeWidth={1.5} />}
                                        {sc.service.slug === 'dil-okullari' && <Languages size={32} strokeWidth={1.5} />}
                                        {(!['yurtdisi-universite', 'yurtdisi-lise', 'dil-okullari'].includes(sc.service.slug)) && <Globe2 size={32} strokeWidth={1.5} />}
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-primary italic group-hover:text-secondary transition-all duration-1000 tracking-tight leading-tight">{sc.service.title}</h3>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 group-hover:text-primary transition-all duration-1000 relative z-10">
                                    {commonT('viewDetails')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                                </div>
                                <div className="absolute -right-6 -bottom-6 text-zinc-50 opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-150 group-hover:scale-100">
                                    <Building2 size={160} strokeWidth={0.5} />
                                </div>
                            </Link>
                        </MotionWrapper>
                    ))}
                </div>
            </section>

            {/* Depth Content Section */}
            <section className="py-40 bg-white">
                <div className="container mx-auto px-6">
                    <MotionWrapper>
                        <div className="max-w-6xl mx-auto">
                            <div className="flex flex-col items-center text-center mb-24">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-[1px] bg-secondary/30" />
                                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-secondary">{t('whyLabel', { country: country.name.toUpperCase() })}</span>
                                    <div className="w-12 h-[1px] bg-secondary/30" />
                                </div>
                                <SafeHTMLContent as="h2" className="text-5xl md:text-7xl font-serif font-bold text-primary italic tracking-tight" html={t.raw('lifeAndEducation').replace('{country}', country.name)} />
                            </div>
                            
                            <RichTextLayout content={country.content || ""} />
                        </div>
                    </MotionWrapper>
                </div>
            </section>

            {/* Elite Academic Institutions */}
            {featuredInstitutions.length > 0 && (
                <section className="py-40 bg-zinc-50/50 relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <MotionWrapper>
                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
                                <div className="max-w-3xl">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-[1px] bg-secondary/30" />
                                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">{t('featuredLabel')}</span>
                                    </div>
                                    <SafeHTMLContent as="h2" className="text-5xl md:text-7xl font-serif font-bold text-primary italic tracking-tight leading-tight" html={t.raw('prestigiousSchools').replace('{country}', country.name)} />
                                </div>
                                <Link href={`/kurumsal/kurumlar?country=${country.name}`} className="btn-primary !px-12 !py-6 text-[10px] tracking-[0.4em] gap-4">
                                    {t('viewAll')} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </MotionWrapper>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {featuredInstitutions.map((inst, idx) => (
                                <MotionWrapper key={inst.id} delay={idx * 0.1}>
                                    <UniversityCard
                                        name={inst.name}
                                        slug={inst.slug}
                                        image={inst.image ?? ''}
                                        rank={inst.rank ?? undefined}
                                        city={inst.city || "Global"}
                                        country={country.name}
                                    />
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Premium Resources */}
            {country.resources.length > 0 && (
                <section className="py-40 bg-white">
                    <div className="container mx-auto px-6">
                        <MotionWrapper>
                            <div className="max-w-4xl mx-auto text-center mb-24">
                                <div className="w-20 h-20 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex items-center justify-center mx-auto mb-10 text-secondary shadow-lg">
                                    <Sparkles size={32} strokeWidth={1.5} />
                                </div>
                                <SafeHTMLContent as="h2" className="text-5xl font-serif font-bold text-primary italic mb-6 tracking-tight" html={t.raw('freeResources')} />
                                <p className="text-zinc-400 font-serif italic text-xl">{t('resourceSubtitle', { country: country.name })}</p>
                            </div>
                        </MotionWrapper>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {country.resources.map((res: any, i: number) => (
                                <MotionWrapper key={res.id} delay={i * 0.1}>
                                    <div className="bg-zinc-50 p-12 rounded-[3rem] border border-zinc-100 flex flex-col items-center text-center gap-8 hover:shadow-premium hover:-translate-y-2 transition-all duration-1000 group">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm group-hover:bg-secondary group-hover:text-white transition-all duration-1000 border border-zinc-50">
                                            <Download size={28} />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-serif font-bold text-primary italic leading-tight group-hover:text-secondary transition-all duration-1000">{res.title}</h3>
                                            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em]">{t('fileInfo')}</p>
                                        </div>
                                        <a 
                                            href={res.url} 
                                            target="_blank" 
                                            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b-2 border-secondary/20 hover:border-secondary pb-1 transition-all duration-700"
                                        >
                                            {t('downloadNow')} <ArrowRight size={12} />
                                        </a>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}
