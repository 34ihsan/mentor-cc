import { prisma } from '@/lib/prisma';
import Image from "next/image";
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import {
    Users,
    Globe,
    Award,
    Shield,
    Zap,
    Handshake,
    ArrowRight
} from "lucide-react";
import SafeHTMLContent from "@/components/public/SafeHTMLContent";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });
    
    let config: any = null;
    try {
        const settings = await prisma.settings.findUnique({
            where: { key: 'site_config' }
        });
        if (settings && settings.value) {
            config = JSON.parse(settings.value);
        }
    } catch (error) {
        console.error('Failed to fetch about config:', error);
    }

    const { aboutPage } = config || {};

    const statsData = [
        { value: aboutPage?.stats?.experience || "15+", label: t('stats.experience'), icon: <Award size={20} /> },
        { value: aboutPage?.stats?.students || "5000+", label: t('stats.students'), icon: <Users size={20} /> },
        { value: aboutPage?.stats?.partners || "350+", label: t('stats.partners'), icon: <Handshake size={20} /> },
        { value: aboutPage?.stats?.countries || "12+", label: t('stats.countries'), icon: <Globe size={20} /> },
    ];

    const values = [
        { title: t('values.transparency'), desc: t('values.transparencyDesc'), icon: <Shield size={24} /> },
        { title: t('values.careerDesign'), desc: t('values.careerDesignDesc'), icon: <Zap size={24} /> },
        { title: t('values.globalVision'), desc: t('values.globalVisionDesc'), icon: <Globe size={24} /> }
    ];

    return (
        <main className="min-h-screen bg-background text-navy selection:bg-primary selection:text-white">
            {/* Hero Section */}
            <div className="relative h-[65vh] min-h-[550px] flex items-center overflow-hidden bg-zinc-50 border-b border-zinc-100">
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero/university_hero.png"
                        alt="Kurumsal"
                        fill
                        priority
                        className="object-cover opacity-5 grayscale contrast-[1.1]"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent z-10" />
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_rgba(180,148,62,0.03),_transparent_70%)] z-10" />
                </div>

                <div className="relative z-20 container-content">
                    <div className="max-w-5xl">
                        <div className="section-label animate-fadeInUp">
                            {t('heritageLabel')}
                        </div>

                        <h1 className="text-fluid-h1 font-serif font-bold text-primary italic leading-[1.05] tracking-tight mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            Mentor <span className="text-secondary not-italic">Career Consulting</span>
                        </h1>

                        <p className="text-fluid-p text-zinc-600 max-w-2xl border-l-2 border-secondary pl-8 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                            <SafeHTMLContent as="span" html={t.raw('heroSubtitle')} />
                        </p>

                        <div className="pt-10 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                            <Link href="/iletisim" className="btn-primary gap-4">
                                {t('getCounseling')} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <section className="py-20 bg-white border-b border-zinc-100">
                <div className="container-content">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {statsData.map((stat: any, index: number) => (
                            <div key={index} className="text-center space-y-3 group">
                                <div className="text-5xl md:text-6xl font-serif font-bold text-secondary italic group-hover:scale-110 transition-transform duration-700">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em] font-sans">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-zinc-50/50">
                <div className="container-content">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        <div className="premium-card p-12 lg:p-16 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-secondary/10 transition-colors" />
                           <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary italic">{t('mission')}</h2>
                                </div>
                                <p className="text-zinc-600 text-lg lg:text-xl leading-relaxed border-l-2 border-secondary/30 pl-8">
                                    {t('missionDesc')}
                                </p>
                           </div>
                        </div>

                        <div className="premium-card p-12 lg:p-16 relative overflow-hidden group border-secondary/10">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                           <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary italic">{t('vision')}</h2>
                                </div>
                                <p className="text-zinc-600 text-lg lg:text-xl leading-relaxed border-l-2 border-secondary/30 pl-8">
                                    {t('visionDesc')}
                                </p>
                           </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding bg-white">
                <div className="container-content">
                    <div className="max-w-3xl mx-auto text-center mb-24 space-y-6">
                        <div className="section-label justify-center">
                            {t('principlesLabel')}
                        </div>
                        <SafeHTMLContent as="h2" className="text-fluid-h2 font-serif font-bold text-primary italic" html={t.raw('valuesTitle')} />
                        <p className="text-fluid-p text-zinc-600 leading-relaxed">
                            {t('valuesSubtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value: any, i: number) => (
                            <div key={i} className="premium-card p-12 group hover:border-secondary/30">
                                <div className="w-14 h-14 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-secondary mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                    {value.icon}
                                </div>
                                <h4 className="text-2xl font-serif font-bold text-primary mb-6 italic">
                                    {value.title}
                                </h4>
                                <p className="text-zinc-600 text-base leading-relaxed opacity-90">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/Founder Section */}
            <section className="section-padding bg-zinc-50/30 overflow-hidden">
                <div className="container-content">
                    <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                        <div className="order-2 lg:order-1 space-y-12">
                            <div className="section-label">
                                {t('whoWeAreLabel')}
                            </div>
                            <SafeHTMLContent as="h2" className="text-fluid-h2 font-serif font-bold text-primary italic" html={t.raw('teamTitle')} />
                            <p className="text-xl lg:text-2xl text-zinc-600 leading-relaxed border-l-2 border-secondary/20 pl-10 max-w-2xl">
                                {t('teamSummary')}
                            </p>
                            <div className="pt-6">
                                <Link href="/iletisim" className="btn-primary gap-4">
                                    {t('meetTeam')} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                             <div className="aspect-[4/5] bg-white p-6 border border-zinc-100 shadow-2xl relative group overflow-hidden">
                                <div className="w-full h-full bg-zinc-50 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-secondary/5 mix-blend-overlay group-hover:bg-secondary/10 transition-all duration-700" />
                                    <Users className="w-32 h-32 text-secondary/10 group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute bottom-10 left-10 p-4 border-l-2 border-secondary bg-white shadow-xl">
                                        <span className="block text-primary font-black tracking-[0.2em] text-[10px] mb-2 uppercase opacity-50">Global Staff</span>
                                        <span className="block text-primary font-serif italic text-2xl font-bold">The Academic Board</span>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-white border-t border-zinc-100 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]" />
                </div>
                
                <div className="container-content text-center space-y-12 relative z-10">
                    <div className="section-label justify-center">
                        {t('futureDesignLabel')}
                    </div>

                    <SafeHTMLContent as="h2" className="text-fluid-h2 md:text-7xl font-serif font-bold text-primary italic leading-none tracking-tight" html={t.raw('ctaTitle')} />
                    
                    <p className="text-fluid-p text-zinc-600 max-w-2xl mx-auto py-8 border-y border-zinc-100">
                        {t('ctaSubtitle')}
                    </p>

                    <div className="pt-6">
                        <Link href="/iletisim" className="btn-primary px-12 py-5 gap-4">
                            {t('startStrategy')} <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
