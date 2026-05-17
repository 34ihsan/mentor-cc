import React from 'react';
import { notFound } from 'next/navigation';
import { exams } from '@/data/exams';
import {
    CheckCircle2,
    Clock,
    Calendar,
    CreditCard,
    Info,
    ArrowRight,
    Trophy
} from 'lucide-react';
import ContactForm from '@/components/public/ContactForm';
import { Metadata } from 'next';
import Image from 'next/image';

interface Props {
    params: Promise<{ exam: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { exam: examSlug } = await params;
    const exam = exams[examSlug];

    if (!exam) return { title: 'Sınav Bulunamadı | Mentor Career' };

    return {
        title: `${exam.shortTitle} Akademik Sınav Hazırlığı | Mentor Career`,
        description: `${exam.shortTitle} sınavı formatı, süresi, geçerliliği ve hazırlık süreçleri hakkında detaylı bilgi.`,
        openGraph: {
            title: `${exam.shortTitle} Sınav Rehberi`,
            images: [{ url: exam.heroImage }],
        }
    };
}

export default async function ExamDetailPage({ params }: Props) {
    const { exam: examSlug } = await params;
    const exam = exams[examSlug];

    if (!exam) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-background text-navy selection:bg-gold selection:text-white">
            {/* Hero Section */}
            <section className="relative h-[65vh] min-h-[500px] flex items-center overflow-hidden bg-slate-50">
                <div className="absolute inset-0">
                    <Image
                        src={exam.heroImage}
                        alt={exam.title}
                        fill
                        priority
                        className="object-cover opacity-20 grayscale-[20%]"
                        sizes="100vw"
                    />
                    {/* Elegant Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-slate-50/80 to-slate-50/40 z-10" />
                </div>

                <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-20">
                    <div className="max-w-5xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-px bg-gold" />
                            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">SERTİFİKA PROGRAMLARI</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-navy mb-10 italic leading-[1.1] tracking-tight">
                            {exam.shortTitle} <span className="text-gold not-italic">Akademik Sınavı</span>
                        </h1>
                        <p
                            className="text-lg md:text-xl text-slate-600 max-w-2xl font-serif italic border-l border-gold pl-8 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: exam.description }}
                        />
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="bg-white border-y border-gold/10 py-20 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: "Sınav Süresi", value: exam.format.duration },
                            { label: "Geçerlilik", value: exam.validity },
                            { label: "Başvuru Ücreti", value: exam.cost },
                            { label: "Sınav Tarihleri", value: exam.dates }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-6 group cursor-default">
                                <div className="text-2xl lg:text-3xl font-serif font-bold text-navy group-hover:text-gold transition-colors duration-500 italic">
                                    {stat.value}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-[1px] bg-gold/30" />
                                    <div className="text-[10px] font-bold text-navy/50 uppercase tracking-[0.2em]">
                                        {stat.label}
                                    </div>
                                    <div className="w-6 h-[1px] bg-gold/30" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        {/* Left: Detail Content */}
                        <div className="lg:col-span-8 space-y-24">
                            <div className="space-y-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-px bg-gold" />
                                    <h2 className="text-4xl font-serif font-bold text-navy italic">Sınava <span className="gold-text not-italic">Genel Bakış</span></h2>
                                </div>
                                <p
                                    className="text-xl text-slate leading-[1.8] italic font-serif border-l border-gold/20 pl-8"
                                    dangerouslySetInnerHTML={{ __html: exam.overview }}
                                />
                            </div>

                            <div className="bg-white border border-gold/10 p-12 md:p-16 relative group shadow-xl">
                                <h3 className="text-3xl font-serif font-bold text-navy mb-12 italic border-b border-gray-50 pb-8">Sınav Yapısı</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {exam.format.sections.map((section, idx) => (
                                        <div key={idx} className="space-y-4">
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="text-xl font-serif font-bold text-navy">{section.name}</h4>
                                                {section.time && (
                                                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest">
                                                        {section.time}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate leading-relaxed font-serif italic">{section.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                    <div className="w-full h-full border-l border-b border-navy transform skew-x-12" />
                                </div>
                            </div>

                            <div className="space-y-12">
                                <h3 className="text-3xl font-serif font-bold text-navy italic">Neden <span className="gold-text not-italic">Tercih Edilmeli?</span></h3>
                                <div className="grid grid-cols-1 gap-8">
                                    {exam.whyTake.map((point, idx) => (
                                        <div key={idx} className="flex items-start gap-6 group">
                                            <div className="w-6 h-6 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-navy transition-all duration-500">
                                                <CheckCircle2 size={12} />
                                            </div>
                                            <p className="text-slate font-serif italic text-lg leading-relaxed">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-12 md:p-16 bg-slate-50 border border-gold/10 text-navy relative overflow-hidden group shadow-2xl">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-6 mb-8">
                                        <Trophy className="w-8 h-8 text-gold" />
                                        <h3 className="text-2xl font-serif font-bold italic">Değerlendirme Sistemi</h3>
                                    </div>
                                    <p
                                        className="text-slate-600 leading-relaxed font-serif italic text-lg"
                                        dangerouslySetInnerHTML={{ __html: exam.scoring }}
                                    />
                                </div>
                                <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none">
                                    <div className="w-full h-full border-l border-navy transform rotate-6" />
                                </div>
                            </div>
                        </div>

                        {/* Right: Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-12">
                                <div className="relative group">
                                    <div className="bg-white p-12 relative z-10 border border-gold/10 shadow-4xl">
                                        <div className="mb-10 text-center">
                                            <div className="w-12 h-px bg-gold mx-auto mb-6" />
                                            <h3 className="text-2xl font-serif font-bold text-navy italic">Bilgi Alın</h3>
                                            <p className="text-slate text-xs font-serif italic mt-4 leading-relaxed">
                                                {exam.shortTitle} sınavı hazırlık süreçleri ve yurtdışı eğitim imkanları hakkında uzman desteği alın.
                                            </p>
                                        </div>
                                        <ContactForm title={`${exam.shortTitle} Bilgi Talebi`} />
                                    </div>
                                    <div className="absolute inset-0 border border-gold/20 translate-x-4 translate-y-4 -z-0" />
                                </div>

                                <div className="bg-white p-12 lg:p-16 border border-gold/10 text-center group shadow-xl">
                                    <h4 className="text-2xl font-serif font-bold text-navy mb-6 italic">Akademik Yolculuk</h4>
                                    <p className="text-slate text-sm font-serif italic mb-10 leading-relaxed">
                                        Seviyenizi belirleyelim ve size en uygun akademik çalışma planını birlikte kurgulayalım.
                                    </p>
                                    <button className="w-full py-6 bg-navy text-white text-xs font-bold uppercase tracking-[0.4em] hover:bg-gold transition-all duration-500 shadow-xl">
                                        Hemen Başla
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
