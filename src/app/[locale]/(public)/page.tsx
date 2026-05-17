import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import {
    ArrowRight
} from 'lucide-react';
import HeroSlider from '@/components/public/HeroSlider';
import ContactForm from '@/components/public/ContactForm';
import SuccessStoriesClient from '@/components/public/SuccessStoriesClient';
import Testimonials from '@/components/public/Testimonials';
import BlogSection from '@/components/public/BlogSection';
import PopularDestinations from '@/components/public/PopularDestinations';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';
import SmartFinder from '@/components/public/SmartFinder';
import { prisma } from '@/lib/prisma';

import { withSafePage } from '@/lib/error-handling/withSafePage';

async function LandingPageContent(props: { params: Promise<{ locale: string }> }) {
        const { locale } = await props.params;
        const t = await getTranslations();

        const [homeSetting, servicesData, siteSetting] = await Promise.all([
            prisma.settings.findUnique({ where: { key: 'home_page_config' } }),
            prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
            prisma.settings.findUnique({ where: { key: 'site_config' } })
        ]);

        const orderedSlugs = ['sinavlar', 'yurtdisi-universite', 'yurtdisi-yuksek-lisans', 'yurtdisi-lise', 'yurtdisi-yaz-okullari', 'yurtdisi-dil-okullari', 'kariyer'];
        
        const serviceImages: Record<string, string> = {
            'sinavlar': '/images/hero/exams_hero.png',
            'yurtdisi-universite': '/images/hero/university_hero.png',
            'yurtdisi-yuksek-lisans': '/images/hero/master_hero.png',
            'yurtdisi-lise': '/images/hero/highschool_hero.png',
            'yurtdisi-yaz-okullari': '/images/hero/summer_hero.png',
            'yurtdisi-dil-okullari': '/images/hero/language_hero.png',
            'kariyer': '/images/hero/career_hero.png'
        };


        const sortedServices = orderedSlugs
            .map(slug => {
                const service = servicesData.find((s: any) => s.slug === slug);
                if (service) {
                    return {
                        ...service,
                        image: serviceImages[slug] || service.image || '/images/hero/sinavlar.png'
                    };
                }
                return null;
            })
            .filter(Boolean);

        const testimonialsRaw = t.raw('SuccessStories.testimonials') || [];
        const testimonialImages = [
            "/images/testimonials/selin.png",
            "/images/testimonials/can.png",
            "/images/testimonials/merve.png",
            "/images/testimonials/arda.png",
            "/images/testimonials/zeynep.png",
            "/images/testimonials/emre.png"
        ];

        const mappedTestimonials = Array.isArray(testimonialsRaw) 
            ? testimonialsRaw.map((item: any, index: number) => ({
                ...item,
                image: testimonialImages[index % testimonialImages.length]
            }))
            : [];

        return (
            <div className="bg-background min-h-screen overflow-x-hidden">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ConsultingService",
                            "name": "Mentor Career Yurtdışı Eğitim Danışmanlığı",
                            "description": t('SEO.description'),
                            "provider": {
                                "@type": "EducationalOrganization",
                                "name": "Mentor Career",
                                "sameAs": [
                                    "https://www.instagram.com/mentorcc",
                                    "https://twitter.com/mentorcc"
                                ]
                            },
                            "serviceArea": {
                                "@type": "Country",
                                "name": "Turkey"
                            }
                        })
                    }}
                />
                <HeroSlider />

                {/* ABOUT US */}
                <section className="section-padding bg-white relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-secondary/[0.03] rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
                    <div className="container-content relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
                            <div className="lg:w-5/12 relative group animate-fadeInUp flex-shrink-0">
                                <div className="absolute -inset-4 border border-secondary/15 rounded-[2.8rem] pointer-events-none z-20" />
                                <div className="relative z-10 overflow-hidden bg-zinc-50 border border-zinc-100 rounded-[2.5rem] shadow-2xl">
                                    <Image
                                        src="/images/about/ofis.png"
                                        alt="Academic Mentorship"
                                        width={700}
                                        height={560}
                                        priority
                                        className="w-full h-auto object-cover transition-transform duration-[2500ms] group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-primary text-white px-8 py-6 shadow-2xl z-30">
                                    <span className="block text-4xl font-serif font-bold text-secondary">25+</span>
                                    <span className="text-[9px] uppercase tracking-[0.35em] font-black text-zinc-400 mt-1 block">{t('HomePage.AboutUs.stats.experience')}</span>
                                </div>
                            </div>
                            <div className="lg:w-7/12 space-y-10">
                                <div className="space-y-6">
                                    <span className="section-label">{t('HomePage.AboutUs.label')}</span>
                                    <SafeHTMLContent
                                        as="h2"
                                        className="text-fluid-h2 font-serif font-bold text-primary italic leading-[1.08]"
                                        html={t.raw('HomePage.AboutUs.title') || "Visionary Academic Guidance"}
                                    />
                                </div>
                                <p className="text-zinc-600 text-lg lg:text-xl leading-relaxed">{t('HomePage.AboutUs.desc1')}</p>
                                <div className="relative border-l-2 border-secondary/40 pl-8 py-5">
                                    <p className="text-zinc-500 italic text-lg leading-relaxed font-serif">
                                        <SafeHTMLContent as="span" html={t.raw('HomePage.AboutUs.desc2') || ""} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SMART FINDER */}
                <section className="section-padding bg-zinc-50/50 border-t border-zinc-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/pattern-gold.svg')] opacity-[0.03] pointer-events-none" />
                    <div className="container-content relative z-10">
                        <div className="text-center space-y-6 mb-20">
                            <span className="section-label mx-auto">{t('HomePage.FinderIntro.label') || "AI Search"}</span>
                            <h2 className="text-fluid-h2 font-serif font-bold text-primary italic leading-tight">
                                <SafeHTMLContent as="span" html={t.raw('HomePage.FinderIntro.title') || "Geleceğinizi Yapay Zeka ile Planlayın"} />
                            </h2>
                            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                {t('HomePage.FinderIntro.desc') || "SmartFinder algoritmamız, binlerce program arasından profilinize en uygun seçenekleri saniyeler içinde analiz eder."}
                            </p>
                        </div>
                        <SmartFinder />
                    </div>
                </section>

                {/* SERVICES */}
                <section className="section-padding bg-zinc-50 relative overflow-hidden border-y border-zinc-100">
                    <div className="container-content relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
                            <div className="space-y-5 max-w-2xl">
                                <span className="section-label">{t('HomePage.Process.label')}</span>
                                <SafeHTMLContent as="h2" className="text-fluid-h2 font-serif font-bold text-primary italic leading-[1.08]" html={t.raw('HomePage.Process.title') || "Services"} />
                            </div>
                            <p className="text-zinc-500 text-base lg:text-lg max-w-sm leading-relaxed border-l border-zinc-200 pl-8">{t('HomePage.Process.desc')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sortedServices.map((service: any, idx: number) => (
                                <Link key={service.id} href={service.slug === 'kariyer' ? '/career' : `/${service.slug}`} className="group relative h-[480px] md:h-[540px] overflow-hidden border border-zinc-200/50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                    <div className="absolute inset-0 z-0">
                                        <Image src={service.image || '/images/hero/sinavlar.png'} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-primary/10" />
                                    </div>
                                    <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-white">
                                        <div className="space-y-5">
                                            <div className="w-10 h-[2px] bg-secondary/60 transition-all duration-700 group-hover:w-20" />
                                            <h3 className="text-2xl lg:text-3xl font-serif font-bold italic leading-tight group-hover:text-secondary">{service.title}</h3>
                                            <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 text-secondary">
                                                {t('HomePage.Process.viewService')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <PopularDestinations />
                <BlogSection />
                <SuccessStoriesClient testimonials={mappedTestimonials} />
                <Testimonials />

                {/* CONTACT CTA */}
                <section className="section-padding bg-primary text-white relative overflow-hidden">
                    <div className="container-content relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                <span className="section-label !text-white border-white/10">{t('HomePage.Consultation.label')}</span>
                                <SafeHTMLContent as="h2" className="text-fluid-h1 font-serif font-bold italic leading-[1.1] tracking-tight text-white" html={t.raw('HomePage.Consultation.title') || ""} />
                                <SafeHTMLContent as="p" className="text-white text-lg md:text-xl leading-relaxed max-w-xl border-l-2 border-secondary/30 pl-8" html={t.raw('HomePage.Consultation.desc') || ""} />
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
                                <ContactForm title={t('HomePage.Consultation.formTitle')} dark />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
}

export default withSafePage(LandingPageContent);
