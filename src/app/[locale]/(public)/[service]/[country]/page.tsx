
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, CheckCircle2, ArrowRight, Building2, Globe2, Trophy, ArrowUpRight, Sparkles } from 'lucide-react';
import RichTextLayout from '@/components/public/RichTextLayout';
import { DENKLIK_DATA, UNIVERSITY_DATA, getProgramData, getUniversityCountryData, getDenklikCountryData } from '@/data/program-content';
import { highSchoolCategoryMap } from '@/lib/mappings';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import CourseSchema from '@/components/seo/CourseSchema';
import { getTranslations } from 'next-intl/server';
import MotionWrapper from '@/components/public/MotionWrapper';
import ScrollToContact from '@/components/public/ScrollToContact';

type Props = { params: Promise<{ service: string; country: string; locale: string }> };

async function getData(serviceSlug: string, countrySlug: string, locale: string) {
    const service = await prisma.service.findUnique({
        where: { slug: serviceSlug },
        include: {
            countryContents: {
                where: { country: { slug: countrySlug } },
                include: { country: true }
            }
        }
    });

    if (!service) return null;

    // 1. Handle Denklik Static Data
    const denklikData = getDenklikCountryData(countrySlug, locale);
    if (serviceSlug === 'denklik' && denklikData) {
        const countryData = denklikData;
        const country = await prisma.country.findUnique({ where: { slug: countrySlug } }) || { name: countryData.title.split(' ')[0], slug: countrySlug };

        return {
            service,
            country,
            content: {
                content: countryData.overview,
                seoTitle: countryData.title + " | StarEducation",
                seoDesc: countryData.overview.replace(/<[^>]*>?/gm, '').substring(0, 160),
                image: countryData.heroImage || service.image
            },
            staticContent: countryData,
            institutions: [],
            groupedData: countryData.destinations ? countryData.destinations.map((d: any) => ({
                name: d.name,
                overview: { content: d.desc },
                schools: d.items.map((item: any, idx: number) => ({
                    id: `static-${idx}`,
                    name: item.name,
                    description: item.subDesc,
                    slug: item.slug
                }))
            })) : []
        };
    }

    // 2. Handle High School Category Static Data
    const isHighSchoolCategory = (serviceSlug === 'yurtdisi-lise' || serviceSlug === 'lise-egitimi') && highSchoolCategoryMap[countrySlug];

    if (isHighSchoolCategory) {
        const categoryData = highSchoolCategoryMap[countrySlug] as any;
        const institutions = await prisma.institution.findMany({
            where: {
                serviceId: service.id,
                programs: {
                    some: {
                        name: { contains: categoryData.matchKeyword || categoryData.title }
                    }
                }
            },
            include: { programs: true }
        });

        const cities = [...new Set(institutions.map(i => i.city).filter(Boolean) as string[])].sort();
        const groupedData = cities.map(cityName => ({
            name: cityName,
            overview: null,
            schools: institutions.filter(inst => inst.city === cityName)
        }));

        return {
            service,
            country: { name: categoryData.title, slug: countrySlug, image: categoryData.image },
            content: {
                content: categoryData.details?.intro || categoryData.desc,
                seoTitle: categoryData.title + " | StarEducation",
                seoDesc: categoryData.desc,
                image: categoryData.details?.heroImage || categoryData.image
            },
            institutions,
            groupedData,
            isCategory: true
        };
    }

    // 3. Handle University & Postgraduate Static Data
    const universityRelatedServices = [
        'yurtdisi-universite', 'universite-egitimi', 'yurtdisi-yuksek-lisans', 
        'yuksek-lisans', 'master-egitimi', 'doktora-egitimi', 'lisans-egitimi',
        'universite', 'master', 'doktora', 'hazirlik-egitimi'
    ];
    const universityData = getUniversityCountryData(countrySlug, locale);
    const isUniversityRelated = universityRelatedServices.includes(serviceSlug) && universityData;

    if (isUniversityRelated) {
        const countryData = universityData;
        const countryFromDb = await prisma.country.findUnique({ where: { slug: countrySlug } });
        const country = countryFromDb || { 
            name: countryData.title.split(' ')[0], 
            slug: countrySlug,
            image: countryData.heroImage 
        };

        const institutions = await prisma.institution.findMany({
            where: {
                serviceId: service.id,
                countryId: countryFromDb?.id,
                active: true
            },
            include: { programs: true, country: true },
            orderBy: { name: 'asc' }
        });

        const cities = [...new Set(institutions.map(i => i.city).filter(Boolean) as string[])].sort();
        const groupedData = cities.map(cityName => ({
            name: cityName,
            overview: null,
            schools: institutions.filter(inst => inst.city === cityName)
        }));

        return {
            service,
            country,
            content: {
                content: countryData.overview,
                seoTitle: countryData.title + " | StarEducation",
                seoDesc: countryData.overview.replace(/<[^>]*>?/gm, '').substring(0, 160),
                image: countryData.heroImage || service.image
            },
            staticContent: countryData,
            institutions,
            groupedData
        };
    }

    const country = await prisma.country.findUnique({
        where: { slug: countrySlug }
    });

    if (!country) return null;

    const content = service.countryContents[0];

    // 4. Generic Destination Fallback from Static Program Data
    let staticContent = null;
    if (!content) {
        const programData = getProgramData(serviceSlug, locale);
        if (programData?.destinations) {
            // Find destination matching country slug or name
            const destination = programData.destinations.find(d => 
                d.name.toLowerCase().includes(country.name.toLowerCase()) || 
                d.name.toLowerCase().includes(country.slug.toLowerCase())
            );

            if (destination) {
                staticContent = {
                    overview: destination.desc,
                    title: `${country.name} - ${service.title}`,
                    heroImage: destination.image,
                    destinations: [destination]
                };
            }
        }
    }

    const institutions = await prisma.institution.findMany({
        where: {
            serviceId: service.id,
            countryId: country.id,
            active: true
        },
        include: { 
            programs: true,
            country: true
        },
        orderBy: { name: 'asc' }
    });

    const cityOverviews = await prisma.institution.findMany({
        where: {
            serviceId: service.id,
            countryId: country.id,
            active: false
        }
    });

    const cities = [...new Set(institutions.map(i => i.city).filter(Boolean) as string[])].sort();
    const groupedData = cities.map(cityName => ({
        name: cityName,
        overview: cityOverviews.find(co => co.city === cityName),
        schools: institutions.filter(inst => inst.city === cityName)
    }));

    return { 
        service, 
        country, 
        content, 
        groupedData, 
        institutions,
        staticContent: staticContent || undefined
    };
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://72.62.94.83';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { service: serviceSlug, country: countrySlug, locale } = await params;
    const data = await getData(serviceSlug, countrySlug, locale);
    const t = await getTranslations({ locale, namespace: 'CountryServiceDetail' });
    if (!data) return { title: t('seoDefaultTitle', { country: countrySlug, service: serviceSlug }) };

    const { service, country, content } = data;
    const title = content?.seoTitle || t('seoDefaultTitle', { country: country.name, service: service.title });
    const description = content?.seoDesc || t('seoDefaultDescription', { country: country.name, service: service.title.toLowerCase() });
    const canonical = `${BASE_URL}/${locale}/${serviceSlug}/${countrySlug}`;

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            type: 'website',
            url: canonical,
            title,
            description,
            siteName: 'StarEducation',
            images: content?.image ? [{ url: content.image, width: 1200, height: 630 }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: content?.image ? [content.image] : [],
        },
    };
}

export default async function CountryServicePage({ params }: Props) {
    const { service: serviceSlug, country: countrySlug, locale } = await params;
    const data = await getData(serviceSlug, countrySlug, locale);
    const t = await getTranslations('CountryServiceDetail');
    const ct = await getTranslations('Common');
    const nt = await getTranslations('Navbar');

    if (!data) {
        notFound();
    }

    const { service, country, content, institutions, groupedData = [], staticContent } = data as any;
    let meta: any = null;
    try {
        if (content?.metadata) meta = JSON.parse(content.metadata);
    } catch (e) {
        console.error('Metadata parse error:', e);
    }

    const heroImage = content?.image || country.image || service.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000';
    const canonical = `${BASE_URL}/${locale}/${serviceSlug}/${countrySlug}`;
    const faqs = meta?.faqs || staticContent?.faqs || [];

    return (
        <div className="min-h-screen bg-white text-zinc-950 selection:bg-zinc-900 selection:text-white">
            {/* JSON-LD Structured Data */}
            <BreadcrumbSchema items={[
                { name: nt('home'), url: `${BASE_URL}/${locale}` },
                { name: service.title, url: `${BASE_URL}/${locale}/${serviceSlug}` },
                { name: country.name, url: canonical },
            ]} />
            {faqs.length > 0 && <FAQSchema faqs={faqs} />}
            <CourseSchema
                name={`${country.name} ${service.title}`}
                description={content?.seoDesc || t('courseDefaultDescription', { country: country.name, service: service.title })}
                provider="StarEducation"
                url={canonical}
                country={country.name}
                courseMode="onsite"
            />

            {/* Cinematic Hero Section */}
            <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden bg-zinc-950">
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt={`${country.name} ${service.title}`}
                        fill
                        className="object-cover opacity-50 scale-105"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950 z-10" />
                </div>

                <div className="relative container mx-auto px-6 z-20 h-full flex flex-col justify-end pb-32">
                    <MotionWrapper className="max-w-6xl">
                        <div className="flex items-center gap-4 mb-8 text-zinc-100/60 uppercase tracking-[0.4em] text-[10px] font-bold">
                            <span className="w-8 h-px bg-zinc-100/30" />
                            {country.name} {t('guideLabel')}
                        </div>

                        <h1 className="text-[min(14vw,140px)] font-serif font-medium text-white mb-10 tracking-tight leading-[0.85]">
                            {country.name} <br/>
                            <span className="text-zinc-400 italic">
                                {service.title}
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-serif italic border-l-2 border-zinc-100/20 pl-8 leading-relaxed">
                            {t('heroSub', { country: country.name })}
                        </p>
                    </MotionWrapper>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <div className="w-px h-12 bg-gradient-to-b from-transparent to-zinc-400/50" />
                </div>
            </section>

            {/* Main Content & Sidebar Grid */}
            <section className="py-24 md:py-32 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-32">
                        
                        {/* Left Column: Rich Content */}
                        <div className="lg:col-span-8">
                            <MotionWrapper className="space-y-24 md:space-y-32">
                                {/* Intro Text */}
                                <div className="space-y-12">
                                    <h2 className="text-4xl md:text-6xl font-serif text-zinc-900 leading-tight italic" dangerouslySetInnerHTML={{ __html: t.raw('comprehensiveGuide') }} />
                                    
                                    {content?.content || staticContent?.overview ? (
                                        <div className="prose-premium prose-zinc lg:prose-xl italic text-zinc-600 leading-[1.8]">
                                            <RichTextLayout content={content?.content || staticContent?.overview} />
                                        </div>
                                    ) : (
                                        <div className="bg-zinc-50 border border-zinc-100 rounded-[3rem] p-12 md:p-20 text-center max-w-4xl mx-auto shadow-sm">
                                            <div className="w-20 h-20 bg-white rounded-2xl border border-zinc-100 flex items-center justify-center mx-auto mb-10 shadow-sm text-secondary text-gold">
                                                <Sparkles size={32} strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6 italic tracking-tight">
                                                {t('preparingGuide')}
                                            </h3>
                                            <p className="text-zinc-500 text-lg font-serif italic leading-relaxed mb-12 max-w-2xl mx-auto opacity-80">
                                                {t('contactForDetails')}
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                                <ScrollToContact 
                                                    text={t('contactForDetails').includes('experts') ? 'CONTACT US' : 'BİZE ULAŞIN'}
                                                    className="!px-12 !py-5 !bg-zinc-900 !text-white !rounded-2xl shadow-xl hover:shadow-zinc-200 transition-all duration-700 font-bold uppercase tracking-[0.3em] text-[10px]" 
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Advantages Section */}
                                {(staticContent?.advantages || meta?.advantages) && (
                                    <div className="space-y-16 pt-16 border-t border-zinc-100">
                                        <h2 className="text-3xl md:text-5xl font-serif text-zinc-900 italic" dangerouslySetInnerHTML={{ __html: t.raw('advantages') }} />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {(staticContent?.advantages || meta?.advantages)?.map((adv: any, i: number) => (
                                                <div key={i} className="group p-10 rounded-[2.5rem] bg-zinc-50 hover:bg-zinc-950 transition-all duration-700">
                                                    <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 mb-8 group-hover:scale-110 group-hover:bg-zinc-100 group-hover:text-zinc-900 transition-all duration-500">
                                                        <Trophy size={20} />
                                                    </div>
                                                    <h3 className="text-xl font-serif font-bold text-zinc-900 mb-4 italic group-hover:text-white transition-colors">{adv.title}</h3>
                                                    <p className="text-zinc-500 text-[15px] font-sans italic leading-relaxed group-hover:text-zinc-400 transition-colors">{adv.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Process Section */}
                                {(staticContent?.process || meta?.process) && (
                                    <div className="space-y-16 pt-16 border-t border-zinc-100">
                                        <h2 className="text-3xl md:text-5xl font-serif text-zinc-900 italic" dangerouslySetInnerHTML={{ __html: t.raw('process') }} />
                                        <div className="space-y-6">
                                            {(staticContent?.process || meta?.process)?.map((step: any, i: number) => (
                                                <div key={i} className="flex items-start gap-10 p-10 rounded-[3rem] bg-white border border-zinc-100 hover:border-zinc-300 transition-all group">
                                                    <div className="text-6xl font-serif font-medium text-zinc-100 group-hover:text-zinc-200 transition-colors">
                                                        0{step.step || i + 1}
                                                    </div>
                                                    <div className="space-y-4 pt-4">
                                                        <h3 className="text-2xl font-serif font-bold text-zinc-900 italic">{step.title}</h3>
                                                        <p className="text-zinc-500 font-sans italic leading-relaxed">{step.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Institutions Listing */}
                                {groupedData.length > 0 && (
                                    <div className="space-y-24 pt-16 border-t border-zinc-100">
                                        <div className="space-y-8">
                                            <h2 className="text-3xl md:text-5xl font-serif text-zinc-900 italic" dangerouslySetInnerHTML={{ __html: t.raw('institutionsByCity') }} />
                                            <p className="text-zinc-500 font-sans italic text-lg max-w-2xl opacity-70">
                                                {t('institutionsDesc', { country: country.name })}
                                            </p>
                                        </div>

                                        <div className="space-y-32">
                                            {groupedData.map((cityGroup: any) => (
                                                <div key={cityGroup.name} className="space-y-12">
                                                    <div className="flex items-center gap-6 pb-6 border-b border-zinc-100">
                                                        <MapPin className="text-zinc-900 w-5 h-5" />
                                                        <h3 className="text-4xl font-serif font-medium text-zinc-900 tracking-tight">{cityGroup.name}</h3>
                                                        <span className="ml-auto px-4 py-1 rounded-full bg-zinc-50 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                                            {cityGroup.schools.length} {ct('institutionsCount')}
                                                        </span>
                                                    </div>

                                                    {cityGroup.overview && (
                                                        <div className="p-10 rounded-[3rem] bg-zinc-50 text-zinc-600 font-serif italic text-lg leading-relaxed">
                                                            <RichTextLayout content={cityGroup.overview.content || ""} />
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-1 gap-12">
                                                        {cityGroup.schools.map((inst: any) => (
                                                            <div key={inst.id} className="group relative bg-white border border-zinc-100 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:border-zinc-200 transition-all duration-1000">
                                                                <div className="grid md:grid-cols-12 h-full">
                                                                    <div className="md:col-span-5 relative h-80 md:h-auto overflow-hidden">
                                                                        <Image
                                                                            src={inst.image || 'https://images.unsplash.com/photo-1541339907198-e08759df93f3?w=800&q=80'}
                                                                            alt={inst.name}
                                                                            fill
                                                                            className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent opacity-40" />
                                                                    </div>
                                                                    <div className="md:col-span-7 p-12 flex flex-col justify-between">
                                                                        <div className="space-y-6">
                                                                            <div className="flex items-center gap-3">
                                                                                <Building2 className="w-4 h-4 text-zinc-900" />
                                                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Elite Institution</span>
                                                                            </div>
                                                                            <h3 className="text-3xl font-serif font-medium text-zinc-900 italic leading-tight group-hover:text-zinc-600 transition-colors">
                                                                                {inst.name}
                                                                            </h3>
                                                                            <p className="text-zinc-500 font-sans italic line-clamp-3 leading-relaxed">
                                                                                {inst.description}
                                                                            </p>
                                                                        </div>

                                                                        <div className="mt-10 pt-8 border-t border-zinc-100 flex items-center justify-between">
                                                                            <Link 
                                                                                href={`/${locale}/kurumsal/kurumlar/${inst.slug}`}
                                                                                className="flex items-center gap-2 text-zinc-900 font-bold text-[10px] uppercase tracking-widest group/btn"
                                                                            >
                                                                                {t('explore')}
                                                                                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                                            </Link>
                                                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                                                                {inst.city}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </MotionWrapper>
                        </div>

                        {/* Right Column: Sticky Sidebar */}
                        <div className="lg:col-span-4">
                            <aside className="sticky top-40 space-y-12">
                                {/* Highlights Card */}
                                <MotionWrapper delay={0.2} className="p-12 md:p-16 rounded-[3rem] bg-zinc-950 text-white relative overflow-hidden shadow-2xl">
                                    <div className="relative z-10 space-y-12">
                                        <div className="flex items-center gap-4">
                                            <span className="w-8 h-px bg-white/20" />
                                            <h3 className="text-2xl font-serif italic text-white/90">
                                                {t('whyCountry', { country: country.name })}
                                            </h3>
                                        </div>
                                        <ul className="space-y-8">
                                            {(meta?.advantages && meta.advantages.length > 0
                                                ? meta.advantages.slice(0, 6).map((item: any) => typeof item === 'string' ? item : item.title || item.desc)
                                                : t.raw('defaultWhyItems')
                                            ).map((item: string, i: number) => (
                                                <li key={i} className="flex items-start gap-4">
                                                    <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-1">
                                                        <CheckCircle2 size={10} className="text-zinc-400" />
                                                    </div>
                                                    <span className="text-sm text-zinc-400 font-sans italic leading-relaxed opacity-80">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Decorative UI element */}
                                    <div className="absolute -bottom-20 -right-20 w-64 h-64 border border-white/5 rounded-full" />
                                </MotionWrapper>

                                {/* Conversion Card */}
                                <MotionWrapper delay={0.4} className="p-12 md:p-16 rounded-[3rem] bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center shadow-xl">
                                    <div className="p-6 rounded-full bg-white border border-zinc-100 mb-8 shadow-sm">
                                        <Globe2 size={32} className="text-zinc-900" />
                                    </div>
                                    <h3 className="text-3xl font-serif font-medium text-zinc-900 mb-6 italic">{t('academicStrategy')}</h3>
                                    <p className="text-zinc-500 text-[15px] mb-10 leading-relaxed font-sans italic">
                                        {t('academicStrategyDesc', { country: country.name })}
                                    </p>
                                    <Link
                                        href={`/${locale}/iletisim`}
                                        className="w-full py-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-colors shadow-lg"
                                    >
                                        {t('startStrategySession')}
                                    </Link>
                                    <div className="mt-8 flex items-center gap-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        {t('consultantsOnline')}
                                    </div>
                                </MotionWrapper>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function isValidIcon(obj: any) {
    return typeof obj === 'function' || (typeof obj === 'object' && obj !== null && '$$typeof' in obj);
}
