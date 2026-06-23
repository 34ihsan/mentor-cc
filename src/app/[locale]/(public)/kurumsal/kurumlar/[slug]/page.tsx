import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cache } from "react";
import {
    MapPin,
    Users,
    Trophy,
    GraduationCap,
    CheckCircle2,
    Clock,
    Globe,
    School,
    ArrowRight,
    Building2,
    FileText,
    Info,
    MessageCircle
} from "lucide-react";
import QuoteRequestForm from "@/components/public/QuoteRequestForm";
import { getRelatedPostsAction } from "@/app/actions/link-actions";
import { Metadata } from "next";
import MotionWrapper from "@/components/public/MotionWrapper";
import { getTranslations } from "next-intl/server";
import AIMatchingTool from "@/components/public/AIMatchingTool";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import EducationalOrgSchema from "@/components/seo/EducationalOrgSchema";

interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}

interface InstitutionMetadata {
    badges?: string[];
    heroGradient?: string | null;
    studentCount?: string | null;
    aboutText?: string;
    features?: string[];
    admissionRequirements?: string[];
    requiredDocuments?: string[];
    tuitionFees?: {
        undergraduate?: string;
        graduate?: string;
    };
    livingExpenses?: { label: string; value: string }[];
    contactInfo?: {
        email: string | null;
        website: string | null;
        phone: string | null;
    };
}

const getInstitution = cache(async (slug: string) => {
    return await prisma.institution.findUnique({
        where: { slug },
        include: {
            country: true,
            programs: true,
        },
    });
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const uni = await getInstitution(slug);
    if (!uni) return {};

    return {
        title: `${uni.name} | Mentor Career`,
        description: uni.description,
        alternates: {
            canonical: `/${locale}/kurumsal/kurumlar/${slug}`,
        },
        openGraph: {
            title: `${uni.name} | Mentor Career`,
            description: uni.description || '',
            images: uni.image ? [{ url: uni.image, width: 1200, height: 630, alt: uni.name }] : undefined,
        },
    };
}

const RequirementsList = ({ items, emptyMessage }: { items: string[]; emptyMessage: string }) => {
    if (items.length === 0) return <p className="text-zinc-500 italic text-sm">{emptyMessage}</p>;
    return (
        <ul className="grid md:grid-cols-2 gap-6">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-secondary/20 transition-colors">
                        <CheckCircle2 size={12} className="text-primary" />
                    </div>
                    <span className="text-zinc-600 text-[15px] leading-relaxed font-serif italic">{item}</span>
                </li>
            ))}
        </ul>
    );
};

export default async function InstitutionPage({ params }: PageProps) {
    const { locale, slug } = await params;
    const uni = await getInstitution(slug);
    const t_legal = await getTranslations('Legal');

    if (!uni) notFound();

    const meta = uni.metadata ? (JSON.parse(uni.metadata as string) as InstitutionMetadata) : null;
    const relatedPosts = await getRelatedPostsAction(uni.id);
    const academicPrograms = uni.programs;

    const extraDocsList = [
        { name: "Akademik Referans Mektubu (2 Adet)", icon: FileText },
        { name: "İngilizce/Almanca Yeterlilik Belgesi", icon: Globe },
        { name: "Finansal Yeterlilik Kanıtı", icon: Building2 }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
            <BreadcrumbSchema 
                items={[
                    { name: 'Anasayfa', url: `https://www.mentor-cc.com/${locale}` },
                    { name: 'Kurumlar', url: `https://www.mentor-cc.com/${locale}/kurumsal/kurumlar` },
                    { name: uni.name, url: `https://www.mentor-cc.com/${locale}/kurumsal/kurumlar/${slug}` },
                ]} 
            />
            <EducationalOrgSchema 
                name={uni.name}
                url={`https://www.mentor-cc.com/${locale}/kurumsal/kurumlar/${slug}`}
                description={uni.description || ''}
                logo={uni.image || ''}
                country={uni.country?.name}
                city={uni.city || ''}
            />
            {/* Hero Section */}
            <section className="relative h-[85vh] lg:h-[95vh] flex items-center overflow-hidden bg-zinc-950">
                <Image
                    src={uni.image || "/images/placeholders/university-hero.jpg"}
                    alt={uni.name}
                    fill
                    className="object-cover opacity-50 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-zinc-950" />
                
                <div className="container mx-auto px-6 relative z-20">
                    <MotionWrapper>
                        <div className="max-w-5xl">
                            <div className="flex items-center gap-6 mb-10">
                                <Link 
                                    href={`/${locale}/kurumsal/kurumlar`}
                                    className="px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-zinc-950 transition-all"
                                >
                                    Tüm Kurumlar
                                </Link>
                                <span className="w-12 h-px bg-secondary" />
                                <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em]">{uni.country?.name}</span>
                            </div>
                            
                            <h1 className="text-6xl lg:text-[8rem] font-serif font-bold text-white leading-[0.9] tracking-tighter mb-12">
                                {uni.name.split(' ').map((word, i) => (
                                    <span key={i} className={i % 2 === 1 ? "italic text-secondary block lg:ml-20" : "block"}>
                                        {word}
                                    </span>
                                ))}
                            </h1>

                            <div className="flex flex-wrap items-center gap-12 pt-12 border-t border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10">
                                        <MapPin className="text-secondary" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Lokasyon</p>
                                        <p className="text-white font-medium">{uni.city}, {uni.country?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10">
                                        <Users className="text-secondary" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Öğrenci</p>
                                        <p className="text-white font-medium">{meta?.studentCount || "36k+"}</p>
                                    </div>
                                </div>
                                {uni.rank && (
                                    <div className="text-white font-bold uppercase tracking-[0.3em] text-[11px] flex items-center gap-4">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        WORLD RANK #{uni.rank}
                                    </div>
                                )}
                            </div>
                            <div className="mt-12 flex flex-wrap gap-6">
                                <Link 
                                    href="#quote-form-section" 
                                    className="px-10 py-5 bg-secondary text-primary rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:scale-105 transition-all shadow-xl shadow-secondary/20"
                                >
                                    Ücretsiz Ön Değerlendirme
                                </Link>
                                <a 
                                    href={`https://wa.me/4917623360511?text=${encodeURIComponent(`${uni.name} hakkında bilgi almak istiyorum.`)}`}
                                    target="_blank"
                                    className="px-10 py-5 border border-white/20 text-white rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-zinc-900 transition-all backdrop-blur-sm"
                                >
                                    WhatsApp Destek
                                </a>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>

                {/* Sticky Mobile CTA */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-t border-zinc-100 p-4 flex gap-4 shadow-2xl">
                    <Link 
                        href="#quote-form-section" 
                        className="flex-1 bg-primary text-secondary py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] text-center"
                    >
                        Başvuru Yap
                    </Link>
                    <a 
                        href="https://wa.me/4917623360511"
                        className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg"
                    >
                        <MessageCircle size={24} />
                    </a>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative bg-white section-padding">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-24">
                        {/* Main Content */}
                        <div className="flex-1">
                            <MotionWrapper>
                                <div className="space-y-32">
                                    <div className="max-w-3xl">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-10 h-px bg-primary" />
                                            <h2 className="text-3xl font-serif font-medium italic text-zinc-900 tracking-tight">Akademik Vizyon</h2>
                                        </div>
                                        <div 
                                            className="text-2xl font-serif italic text-zinc-600 leading-relaxed first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left"
                                            dangerouslySetInnerHTML={{ __html: meta?.aboutText || uni.description || "" }}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="p-12 bg-zinc-950 rounded-[3rem] text-white space-y-10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-700">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
                                            <div className="flex items-center gap-4">
                                                <div className="p-4 rounded-2xl bg-white/10 text-secondary border border-white/10 shadow-inner">
                                                    <Trophy size={24} />
                                                </div>
                                                <h3 className="text-2xl font-serif font-medium italic tracking-tight text-secondary">Kabul Sartlari</h3>
                                            </div>
                                            <ul className="space-y-6">
                                                {(meta?.admissionRequirements || ["Global standartlarda akademik yeterlilik gereklidir."]).map((req, i) => (
                                                    <li key={i} className="flex items-center gap-4 group/item">
                                                        <div className="w-1.5 h-1.5 bg-secondary rounded-full group-hover/item:scale-150 transition-transform" />
                                                        <span className="text-zinc-300 text-sm font-medium group-hover/item:text-white transition-colors">{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="p-12 bg-zinc-50 rounded-[3rem] border border-zinc-100 shadow-sm space-y-10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-700">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                                            <div className="flex items-center gap-4">
                                                <div className="p-4 rounded-2xl bg-white border border-zinc-100 text-primary shadow-sm">
                                                    <GraduationCap size={24} />
                                                </div>
                                                <h3 className="text-2xl font-serif font-medium italic text-zinc-900 tracking-tight">Egitim Programlari</h3>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {academicPrograms.map((prog, i) => (
                                                    <div key={i} className="px-5 py-3 bg-white border border-zinc-200 rounded-2xl text-[11px] font-bold text-zinc-600 uppercase tracking-widest shadow-sm hover:border-primary hover:text-primary transition-all cursor-default">
                                                        {prog.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-10 p-12 bg-zinc-50 rounded-[3rem] border border-zinc-100 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 rounded-2xl bg-white border border-zinc-100 text-zinc-900 shadow-sm">
                                                <FileText size={24} />
                                            </div>
                                            <h3 className="text-2xl font-serif font-medium text-zinc-900 italic">Gerekli Evraklar</h3>
                                        </div>
                                        <RequirementsList 
                                            items={[...(meta?.requiredDocuments || []), ...extraDocsList.map(d => d.name)]} 
                                            emptyMessage="Geçerli Pasaport & Vizeler, Transkript & Diplomalar gereklidir."
                                        />
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>

                        <aside className="w-full md:w-[40%] lg:w-[35%]">
                            <div className="sticky top-40 space-y-12">
                                {meta?.tuitionFees && (
                                    <MotionWrapper delay={0.2}>
                                        <div className="bg-zinc-950 p-12 lg:p-16 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full blur-3xl" />
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="w-10 h-px bg-zinc-500" />
                                                <h3 className="text-2xl font-serif font-medium italic tracking-tight text-secondary">Finansal Analiz</h3>
                                            </div>
                                            <div className="space-y-12">
                                                {meta.tuitionFees.undergraduate && (
                                                    <div className="space-y-3">
                                                        <p className="text-[9px] font-bold text-secondary/70 uppercase tracking-[0.3em]">Tahmini Akademik Ücret</p>
                                                        <p className="text-3xl font-serif italic text-white">{meta.tuitionFees.undergraduate}</p>
                                                    </div>
                                                )}
                                                {meta.tuitionFees.graduate && (
                                                    <div className="pt-10 border-t border-white/10 space-y-3">
                                                        <p className="text-[9px] font-bold text-secondary/70 uppercase tracking-[0.3em]">Lisansüstü Ücret</p>
                                                        <p className="text-3xl font-serif italic text-white">{meta.tuitionFees.graduate}</p>
                                                    </div>
                                                )}
                                                {meta.livingExpenses?.map((exp: any, i: number) => (
                                                    <div key={i} className="pt-10 border-t border-white/10 flex justify-between items-center group">
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{exp.label}</span>
                                                        <span className="text-sm font-serif italic text-zinc-300 group-hover:text-white transition-colors">{exp.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </MotionWrapper>
                                )}

                                <MotionWrapper delay={0.3}>
                                    <div id="quote-form-section" className="bg-white border border-zinc-100 p-12 lg:p-16 rounded-[2.5rem] shadow-premium relative overflow-hidden">
                                        <div className="flex items-center gap-4 mb-12">
                                            <div className="w-10 h-px bg-zinc-900" />
                                            <h3 className="text-3xl font-serif font-medium italic tracking-tight relative z-10 text-zinc-950">Basvuru Stratejisi</h3>
                                        </div>
                                        <div className="relative z-10">
                                            <QuoteRequestForm
                                                institutionId={uni.id}
                                                institutionName={uni.name}
                                                programs={academicPrograms.map(p => ({
                                                    ...p,
                                                    name: (p as any).localizedName
                                                }))}
                                            />
                                        </div>
                                        <div className="mt-12 flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.4em] font-bold text-zinc-400">
                                            <div className="w-2 h-2 bg-zinc-950 rounded-full animate-pulse" />
                                            Danismanlarimiz Çevrimiçi
                                        </div>
                                    </div>
                                </MotionWrapper>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* AI Matching Tool Section */}
            <section className="bg-zinc-50 py-32">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-24 items-center">
                        <div className="order-2 md:order-1">
                            <AIMatchingTool />
                        </div>
                        <div className="order-1 md:order-2 space-y-10">
                            <div className="w-20 h-1 bg-secondary rounded-full" />
                            <h2 className="text-5xl lg:text-7xl font-serif font-bold text-zinc-900 leading-[1.1] tracking-tighter">
                                Sizin İçin En Doğru <span className="text-primary italic">Akademik Rota</span> Hangisi?
                            </h2>
                            <p className="text-zinc-500 text-xl font-serif italic leading-relaxed">
                                Gelişmiş AI algoritmalarımız, not ortalamanız, dil seviyeniz ve kariyer hedeflerinizi analiz ederek binlerce program arasından size en uygun olanları saniyeler içinde belirler.
                            </p>
                            <ul className="space-y-6">
                                {[
                                    "Kişiselleştirilmiş Başarı Analizi",
                                    "Burs İhtimali Değerlendirmesi",
                                    "Kurum Bazlı Kabul Kriteri Eşleşmesi"
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-6 text-zinc-800 font-serif font-medium italic text-lg">
                                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <MotionWrapper>
                <div className="container mx-auto px-6 py-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-zinc-50 border border-zinc-100 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                            <div className="flex-shrink-0 w-14 h-14 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                <Info size={28} />
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-xl font-serif font-bold italic text-primary tracking-tight">
                                    {t_legal('disclaimerTitle')}
                                </h3>
                                <p className="text-zinc-600 font-serif italic leading-relaxed text-sm md:text-base">
                                    {t_legal('disclaimerText')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </MotionWrapper>

        </div>
    );
}