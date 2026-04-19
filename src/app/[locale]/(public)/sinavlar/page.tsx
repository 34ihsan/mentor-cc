import { getTranslations } from 'next-intl/server';
import Image from "next/image";
import { Link } from '@/i18n/routing';
import { 
    BookOpen, 
    GraduationCap, 
    CheckCircle2, 
    ArrowRight,
    Search,
    Brain,
    Trophy,
    Award
} from "lucide-react";
import SafeHTMLContent from "@/components/public/SafeHTMLContent";

export default async function ExamsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Exams' });

    const categories = [
        { 
            id: 'dil', 
            icon: <BookOpen className="w-6 h-6" />,
            exams: ['ielts', 'toefl']
        },
        { 
            id: 'akademik', 
            icon: <GraduationCap className="w-6 h-6" />,
            exams: ['sat', 'gre-gmat']
        }
    ];

    return (
        <main className="min-h-screen bg-background text-navy selection:bg-gold selection:text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-[#0A192F]">
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero-study.png" 
                        alt="International Exams"
                        fill
                        priority
                        className="object-cover opacity-20 contrast-[1.1] brightness-[0.8]"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/80 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent z-10" />
                </div>

                <div className="relative z-20 container-content">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 mb-8">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary">Akademik Hazırlık</span>
                        </div>

                        <h1 className="text-fluid-h1 font-serif font-bold text-white italic leading-[1.05] tracking-tight mb-8">
                            <SafeHTMLContent as="span" html={t.raw('title')} />
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-300 font-serif italic border-l-2 border-secondary/50 pl-8 leading-relaxed mb-10">
                            {t('heroDesc')}
                        </p>

                        <div className="flex flex-wrap gap-6 mt-12">
                            {['IELTS', 'TOEFL', 'SAT', 'GRE', 'GMAT'].map((exam) => (
                                <div key={exam} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-xs font-mono tracking-widest uppercase hover:border-secondary/30 transition-colors">
                                    {exam}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="section-padding relative">
                <div className="container-content">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        {categories.map((cat, idx) => (
                            <div key={cat.id} className="space-y-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-secondary">
                                        {cat.icon}
                                        <h2 className="text-2xl font-serif font-bold italic tracking-wide uppercase">{t(`categories.${cat.id}.title`)}</h2>
                                    </div>
                                    <p className="text-zinc-500 font-serif italic text-lg leading-relaxed max-w-lg">
                                        {t(`categories.${cat.id}.desc`)}
                                    </p>
                                </div>

                                <div className="grid gap-6">
                                    {cat.exams.map((examKey) => (
                                        <div key={examKey} className="premium-card p-10 group hover:border-secondary/20 transition-all duration-700">
                                            <div className="flex justify-between items-start mb-8 text-secondary">
                                                <Trophy className="w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700" />
                                                <div className="flex gap-2">
                                                    {t.raw(`examsList.${examKey}.badges`).map((badge: string) => (
                                                        <span key={badge} className="px-2 py-1 bg-zinc-50 text-[9px] font-black uppercase tracking-wider text-primary/40 group-hover:bg-secondary group-hover:text-white transition-all">
                                                            {badge}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-serif font-bold text-primary mb-4 italic group-hover:text-secondary transition-colors">
                                                {t(`examsList.${examKey}.title`)}
                                            </h3>
                                            <p className="text-zinc-600 font-serif italic leading-relaxed mb-8 border-l border-zinc-100 pl-6 group-hover:border-secondary/30 transition-colors">
                                                {t(`examsList.${examKey}.desc`)}
                                            </p>
                                            <Link href="/iletisim" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-primary group-hover:text-secondary transition-colors">
                                                Strateji Geliştir <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Preparation Strategy Section */}
            <section className="py-24 bg-zinc-50 border-y border-zinc-100 overflow-hidden relative">
                <div className="container-content relative z-10">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1 space-y-6">
                            <div className="section-label">SINAV STRATEJİSİ</div>
                            <h2 className="text-4xl font-serif font-bold text-primary italic leading-tight">
                                Puan Odaklı Değil, <span className="text-secondary not-italic">Kabul Odaklı</span> Hazırlık
                            </h2>
                            <p className="text-zinc-600 font-serif italic leading-relaxed">
                                Star Education olarak sınavları sadece birer baraj değil, profilinizi güçlendiren stratejik varlıklar olarak görüyoruz.
                            </p>
                        </div>
                        <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
                            {[
                                { icon: <Brain size={24} />, title: "Teşhis & Analiz", desc: "Mevcut seviyeniz ve hedefleriniz arasındaki boşluğu bilimsel yöntemlerle tespit ediyoruz." },
                                { icon: <Search size={24} />, title: "Kaynak Seçimi", desc: "Binlerce kaynak arasından size en hızlı gelişim sağlayacak olanları kürate ediyoruz." },
                                { icon: <Award size={24} />, title: "Mock Sınavlar", desc: "Gerçek sınav ortamını simüle eden denemelerle stres yönetimini mükemmelleştiriyoruz." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 border border-zinc-200/50 hover:shadow-xl transition-all duration-500">
                                    <div className="text-secondary mb-6">{item.icon}</div>
                                    <h4 className="text-lg font-serif font-bold text-primary mb-4 italic">{item.title}</h4>
                                    <p className="text-[13px] text-zinc-500 font-serif italic leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-white relative overflow-hidden">
                <div className="container-content text-center space-y-12">
                     <div className="section-label justify-center">ÜCRETSİZ AKADEMİK ANALİZ</div>
                     <SafeHTMLContent as="h2" className="text-fluid-h2 font-serif font-bold text-primary italic" html={t.raw('ctaTitle')} />
                     <p className="text-fluid-p text-zinc-600 font-serif italic max-w-2xl mx-auto py-8">
                         {t('ctaDesc')}
                     </p>
                     <div className="pt-6">
                         <Link href="/iletisim" className="btn-primary px-12 py-5 gap-4">
                             {t('ctaButton')} <ArrowRight size={16} />
                         </Link>
                     </div>
                </div>
            </section>
        </main>
    );
}
