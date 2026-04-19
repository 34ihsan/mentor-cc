import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import {
    ArrowRight,
    MapPin,
    Search,
    CheckCircle2,
    ShieldCheck,
    Star,
    Sparkles,
} from 'lucide-react';
import HeroSlider from '@/components/public/HeroSlider';
import MotionWrapper from '@/components/public/MotionWrapper';
import ContactForm from '@/components/public/ContactForm';
import Testimonials from '@/components/public/Testimonials';
import BlogSection from '@/components/public/BlogSection';
import PopularUniversities from '@/components/public/PopularUniversities';
import PopularDestinations from '@/components/public/PopularDestinations';
import SmartFinder from '@/components/public/SmartFinder';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';
import ProcessTrackerPublic from '@/components/public/ProcessTrackerPublic';
import StatsSection from '@/components/public/StatsSection';
import ServicesSection from '@/components/public/ServicesSection';
import { prisma } from '@/lib/prisma';

const IconMap: any = {
    Search: Search,
    CheckCircle2: CheckCircle2,
    ShieldCheck: ShieldCheck,
    Star: Star,
    Sparkles: Sparkles
};

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations();

    const [homeSetting, servicesData, siteSetting] = await Promise.all([
        prisma.settings.findUnique({ where: { key: 'home_page_config' } }),
        prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
        prisma.settings.findUnique({ where: { key: 'site_config' } })
    ]);

    let destinationConfig = null;
    let featuredConfig = null;
    if (homeSetting?.value) {
        const parsed = JSON.parse(homeSetting.value);
        destinationConfig = parsed.popularDestinations;
        featuredConfig = parsed.featuredInstitutions;
    }

    const siteConfig = siteSetting?.value ? JSON.parse(siteSetting.value) : null;
    
    const orderedSlugs = ['denklik', 'yurtdisi-universite', 'yurtdisi-yuksek-lisans', 'yurtdisi-lise', 'yurtdisi-yaz-okullari', 'yurtdisi-dil-okullari', 'egitim-koclugu', 'kariyer'];
    
    // Premium Image Mapping for Services
    const serviceImages: Record<string, string> = {
        'denklik': '/images/hero/denklik.png',
        'yurtdisi-universite': '/images/hero/universite.png',
        'yurtdisi-yuksek-lisans': '/images/hero/yuksek-lisans.png',
        'yurtdisi-lise': '/images/hero/lise.png',
        'yurtdisi-yaz-okullari': '/images/hero/yaz-okul.png',
        'yurtdisi-dil-okullari': '/images/hero/dil-egitim.png',
        'egitim-koclugu': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
        'kariyer': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
    };

    const sortedServices = orderedSlugs
        .map(slug => {
            const service = servicesData.find((s: any) => s.slug === slug);
            if (service) {
                return {
                    ...service,
                    image: serviceImages[slug] || service.image
                };
            }
            return null;
        })
        .filter(Boolean);

    return (
        <div className="bg-background min-h-screen selection:bg-secondary/30 selection:text-primary overflow-x-hidden">
            {/* 1. HERO SLIDER */}
            <HeroSlider />

            {/* 2. STATS (Solar Flare Obsidian Section) */}
            <StatsSection 
                stats={[
                    { value: '25+', label: t('HomePage.AboutUs.stats.experience') },
                    { value: '1500+', label: t('HomePage.AboutUs.stats.partners') },
                    { value: '%98', label: 'Success Rate' },
                    { value: '50+', label: 'Countries' },
                ]} 
            />

            {/* 3. ABOUT US (Identity Section - Premium Light) */}
            <section className="section-padding bg-zinc-50 relative overflow-hidden group border-b border-zinc-100">
                <div className="container-content">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="lg:w-1/2 relative">
                            <MotionWrapper 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative z-10 p-4 bg-white border border-zinc-100 asymmetric-bold shadow-xl overflow-hidden group/image"
                            >
                                <Image 
                                    src="/images/about/ofis.png"
                                    alt="Academic Mentorship - StarEducation Office"
                                    width={700}
                                    height={500}
                                    priority
                                    className="w-full h-auto object-cover asymmetric-bold transition-transform duration-[2000ms] group-hover/image:scale-105"
                                />
                            </MotionWrapper>
                            
                            {/* Floating Accent Card */}
                            <MotionWrapper 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="absolute -bottom-10 -right-10 z-20 bg-secondary text-white p-8 asymmetric-bold shadow-premium hidden md:block"
                            >
                                <div className="text-4xl font-black italic mb-2 tracking-tighter">EST. 1999</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">Proven Excellence</div>
                            </MotionWrapper>
                        </div>

                        <div className="lg:w-1/2 space-y-10">
                            <div className="space-y-6">
                                <MotionWrapper 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="section-label">
                                        {t('HomePage.AboutUs.label')}
                                    </span>
                                </MotionWrapper>
                                <MotionWrapper
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <SafeHTMLContent
                                        as="h2"
                                        className="text-fluid-h2 font-black text-primary leading-[0.9] uppercase tracking-tighter italic"
                                        html={t.raw('HomePage.AboutUs.title') || "Visionary Academic Guidance"}
                                    />
                                </MotionWrapper>
                            </div>
                            
                            <MotionWrapper 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <SafeHTMLContent 
                                    as="p"
                                    className="text-zinc-400 text-xl leading-relaxed font-bold italic border-l-4 border-secondary/20 pl-8"
                                    html={t.raw('HomePage.AboutUs.desc1')}
                                />
                            </MotionWrapper>
                            
                            <MotionWrapper 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="p-8 bg-white border border-zinc-100 italic text-zinc-400 group-hover:bg-zinc-50 transition-colors"
                            >
                                <SafeHTMLContent as="span" html={t.raw('HomePage.AboutUs.desc2') || "Building a world-class future together."} />
                            </MotionWrapper>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SERVICES (Enterprise Obsidian Section) */}
            <ServicesSection 
                services={sortedServices.filter((s): s is any => s !== null)}
                translations={{
                    label: t('HomePage.Process.label'),
                    title: t.raw('HomePage.Process.title') || "Academic Services",
                    desc: t.raw('HomePage.Process.desc') || "",
                    viewService: t('HomePage.Process.viewService'),
                    serviceLabels: orderedSlugs.reduce((acc, slug) => ({
                        ...acc,
                        [slug]: t(`HomePage.Services.${slug}`, { defaultValue: slug })
                    }), {})
                }}
            />
            
            {/* 5. PROGRAM FINDER (Light Contrast Section) */}
            <section className="section-padding bg-zinc-50 relative overflow-hidden border-b border-zinc-100">
                <div className="container-content relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-20 space-y-6 animate-fadeInUp">
                        <span className="section-label justify-center">
                            <Sparkles size={16} className="text-secondary/60 mr-2" /> {t('HomePage.SmartFinder.label')}
                        </span>
                        <SafeHTMLContent
                            as="h2"
                            className="text-fluid-h2 font-serif font-bold text-primary italic"
                            html={t.raw('HomePage.SmartFinder.title') || "Discover the Best Program for You"}
                        />
                    </div>
                    
                    <div className="glass-card !bg-white/80 !backdrop-blur-2xl p-4 lg:p-6 shadow-2xl animate-fadeInUp asymmetric-bold" style={{ animationDelay: '0.2s' }}>
                        <SmartFinder />
                    </div>
                </div>
            </section>

            {/* 5. METHODOLOGY */}
            <section className="section-padding bg-zinc-50 relative overflow-hidden">
                <div className="container-content">
                    <div className="text-center max-w-4xl mx-auto mb-20 animate-fadeInUp">
                        <span className="section-label justify-center !text-primary bg-zinc-50 border-zinc-100">{t('HomePage.Methodology.label')}</span>
                        <SafeHTMLContent
                            as="h2"
                            className="text-fluid-h2 font-serif font-bold text-primary mb-10 italic"
                            html={t.raw('HomePage.Methodology.title') || "A Strategic Journey to Your Dreams"}
                        />
                        <div className="w-24 h-[1px] bg-secondary/30 mx-auto mb-10" />
                        <SafeHTMLContent
                            as="p"
                            className="text-zinc-500 text-xl font-serif italic max-w-2xl mx-auto py-4"
                            html={t.raw('HomePage.Methodology.desc') || "Redesigning your future with global vision."}
                        />
                    </div>

                    <ProcessTrackerPublic />
                </div>
            </section>

            {/* 6. POPULAR DESTINATIONS (Akademik Rotalar - Light Section) */}
            <section className="section-padding bg-zinc-50 relative overflow-hidden border-y border-zinc-100">
                <div className="container-content relative z-10 mb-20 text-center">
                    <span className="section-label justify-center">Global Horizons</span>
                    <h2 className="text-fluid-h2 font-serif font-bold text-primary italic mt-6">Premium Academic Destinations</h2>
                </div>
                <PopularDestinations />
            </section>

            {/* 7. BLOG SECTION (Light Contrast) */}
            <section className="section-padding bg-white overflow-hidden">
                <BlogSection />
            </section>

            {/* 9. CONSULTATION CTA (Premium Light Final Move) */}
            <section className="section-padding bg-white relative overflow-hidden border-t border-zinc-100">
                <div className="container-content relative z-10 flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
                    <div className="w-full lg:w-1/2 space-y-12">
                        <MotionWrapper 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <span className="section-label">
                                {t('HomePage.Consultation.label')}
                            </span>
                        </MotionWrapper>
                        <MotionWrapper
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <SafeHTMLContent
                                as="h2"
                                className="text-fluid-h1 font-black text-primary leading-[0.85] uppercase tracking-tighter italic"
                                html={t.raw('HomePage.Consultation.title') || "Build Your Future with Strategy"}
                            />
                        </MotionWrapper>
                        
                        <div className="space-y-6">
                            <MotionWrapper 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <SafeHTMLContent 
                                    as="p"
                                    className="text-zinc-500 text-xl font-bold italic"
                                    html={t.raw('HomePage.Consultation.desc') || "Academic strategy session starts here."}
                                />
                            </MotionWrapper>
                        </div>

                        <MotionWrapper 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-10 asymmetric-bold bg-zinc-50 border border-zinc-100 shadow-xl flex items-start gap-8 group hover:bg-zinc-100 transition-all duration-700"
                        >
                            <div className="w-20 h-20 bg-secondary text-white flex items-center justify-center asymmetric-bold shadow-premium shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                                <ShieldCheck size={36} strokeWidth={2.5} />
                            </div>
                            <SafeHTMLContent
                                as="p"
                                className="text-xl text-zinc-400 font-bold leading-tight italic pt-2"
                                html={t.raw('HomePage.Consultation.starberatungText') || "Star Education Consulting is with you every step of the way."}
                            />
                        </MotionWrapper>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <MotionWrapper 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="asymmetric-bold !p-12 md:!p-16 lg:!p-20 relative bg-white lg:-mr-20 shadow-[0_0_80px_rgba(255,71,0,0.1)] group"
                        >
                            {/* Decorative Flare in Form */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-flare opacity-10 group-hover:opacity-20 transition-opacity rounded-bl-full" />
                            <ContactForm title={t('HomePage.Consultation.formTitle')} />
                        </MotionWrapper>
                    </div>
                </div>
                
                {/* Global Background Flare */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/images/grid.svg')] opacity-[0.03] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] pointer-events-none" />
            </section>
        </div>
    );
}
