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
    Info
} from "lucide-react";
import QuoteRequestForm from "@/components/public/QuoteRequestForm";
import { getRelatedPostsAction } from "@/app/actions/link-actions";
import { Metadata } from "next";
import MotionWrapper from "@/components/public/MotionWrapper";
import { getTranslations } from "next-intl/server";

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
    return prisma.institution.findUnique({
        where: { slug, active: true },
        include: {
            programs: true,
            country: true
        }
    });
});

const getLocalizedDbField = (
    obj: any,
    field: string,
    locale: string
): string => {
    if (!obj) return "";
    return obj[`${field}_${locale}`] || obj[field] || "";
};

const ProgramCard = ({ prog, locale }: { prog: any, locale: string }) => (
    <div className="p-10 bg-white border border-zinc-100 flex flex-col gap-8 group hover:border-secondary/30 transition-all duration-700 shadow-sm hover:shadow-premium-hover relative overflow-hidden rounded-[2.5rem]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors" />
        <div className="relative z-10 flex flex-col gap-8 flex-1">
            <h4 className="font-serif font-bold text-primary text-2xl italic group-hover:text-secondary transition-colors block leading-tight pr-12">
                {prog.localizedName || getLocalizedDbField(prog, "name", locale)}
            </h4>
            <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-6">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">Departman</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                        {prog.category?.replace('_', ' ')}
                    </span>
                </div>
                <div className="w-12 h-12 bg-primary text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-all duration-500 shadow-lg rounded-xl">
                    <ArrowRight size={20} />
                </div>
            </div>
        </div>
    </div>
);

const StatsBar = ({ stats }: { stats: any[] }) => (
    <div className="bg-zinc-50 border-y border-zinc-100 py-20 relative z-30">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                {stats.map((stat, i) => (
                    <MotionWrapper key={i} delay={i * 0.1}>
                        <div className="flex flex-col items-center lg:items-start group">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-zinc-400 group-hover:text-primary transition-colors">{stat.icon}</span>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">{stat.label}</span>
                            </div>
                            <div className="text-5xl font-serif font-medium text-primary tracking-tighter italic">{stat.val}</div>
                        </div>
                    </MotionWrapper>
                ))}
            </div>
        </div>
    </div>
);

const RequirementsList = ({ items, emptyMessage }: { items: string[], emptyMessage: string }) => (
    <ul className="space-y-6">
        {items.length > 0 ? (
            items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-base font-serif italic text-zinc-600 leading-relaxed group">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-primary transition-colors mt-2.5 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
            ))
        ) : (
            <li className="text-zinc-400 font-serif italic">{emptyMessage}</li>
        )}
    </ul>
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const uni = await getInstitution(slug);
    if (!uni) return { title: "StarEducation" };
    const name = uni.name;
    const description = getLocalizedDbField(uni, "description", locale);
    return {
        title: `${name} | StarEducation`,
        description: description?.substring(0, 160) || `${name} hakkında detaylı bilgi.`,
        openGraph: {
            images: uni.image ? [{ url: uni.image }] : [],
        }
    };
}

export default async function UniversityPage({ params }: PageProps) {
    const { locale, slug } = await params;
    const uniRaw = await getInstitution(slug);
    const t_legal = await getTranslations('Legal');

    if (!uniRaw || !uniRaw.active) notFound();

    const uni = {
        ...uniRaw,
        description: getLocalizedDbField(uniRaw, "description", locale),
        content: getLocalizedDbField(uniRaw, "content", locale),
        country: uniRaw.country ? {
            ...uniRaw.country,
            name: getLocalizedDbField(uniRaw.country, "name", locale)
        } : null,
        programs: uniRaw.programs.map((p) => ({
            ...p,
            localizedName: getLocalizedDbField(p, "name", locale),
            description: getLocalizedDbField(p, "description", locale),
            duration: getLocalizedDbField(p, "duration", locale),
        }))
    };

    const { posts: relatedPosts = [] } = await getRelatedPostsAction(uni.id);

    let meta: InstitutionMetadata | null = null;
    if (uni.metadata) {
        try {
            meta = JSON.parse(uni.metadata);
        } catch (e) {
            console.error("Metadata error", e);
        }
    }

    const accommodationKeywords = ['homestay', 'rezidans', 'residence', 'konaklama', 'yurt', 'apart'];
    const requirementKeywords = ['diploma', 'transkript', 'transcript', 'gpa', 'sat', 'act', 'ielts', 'toefl', 'ibt', 'portfolyo', 'portfolio', 'motivasyon', 'motivation', 'referans', 'reference', 'cv', 'pasaport', 'passport', 'vize', 'visa', 'skor', 'score', 'sart', 'kabul'];
    const docKeywords = ['diploma', 'transkript', 'transcript', 'portfolyo', 'portfolio', 'cv', 'pasaport', 'passport', 'vize', 'visa'];

    const checkKeywords = (name: string, keywords: string[]) => {
        const lowerName = name.toLowerCase();
        return keywords.some(key => lowerName.includes(key));
    };

    const extraReqsFromProgs = uni.programs.filter(p =>
        checkKeywords(p.name, requirementKeywords) && !checkKeywords(p.name, accommodationKeywords)
    );

    const academicPrograms = uni.programs.filter(p =>
        !checkKeywords(p.name, accommodationKeywords) && !checkKeywords(p.name, requirementKeywords)
    );

    const extraDocsList = extraReqsFromProgs.filter(p => checkKeywords(p.name, docKeywords));
    const extraReqsList = extraReqsFromProgs.filter(p => !checkKeywords(p.name, docKeywords));

    const mainCategory = uni.programs[0]?.category || 'UNIVERSITY';

    const getStats = () => {
        if (mainCategory === 'LANGUAGE_SCHOOL' || mainCategory === 'SUMMER_SCHOOL') {
            return [
                { icon: <Users size={20} />, val: "10-15", label: "Mevcut", color: "from-blue-400 to-indigo-600" },
                { icon: <Globe size={20} />, val: "20+", label: "Millet", color: "from-purple-400 to-pink-600" },
                { icon: <Clock size={20} />, val: "16+", label: "Min Yas", color: "from-emerald-400 to-teal-600" },
                { icon: <CheckCircle2 size={20} />, val: "Akredite", label: "Egitim", color: "from-amber-400 to-orange-600" }
            ];
        }
        return [
            { icon: <Trophy size={20} />, val: uni.rank || "#1", label: "Siralama", color: "from-amber-400 to-orange-600" },
            { icon: <Users size={20} />, val: meta?.studentCount || "36k+", label: "Ögrenci", color: "from-blue-400 to-indigo-600" },
            { icon: <School size={20} />, val: uni.rating || "4.8", label: "Puan", color: "from-emerald-400 to-teal-600" },
            { icon: <Globe size={20} />, val: "Aktif", label: "Denklik", color: "from-purple-400 to-pink-600" }
        ];
    };

    return (
        <div className="bg-white min-h-screen text-zinc-950 selection:bg-zinc-950 selection:text-white">


            <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-zinc-950">
                <div className="absolute inset-0">
                    {uni.image ? (
                        <Image src={uni.image} alt={uni.name} fill priority className="object-cover opacity-60 scale-105" sizes="100vw" />
                    ) : (
                        <div className="w-full h-full bg-zinc-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/40 to-zinc-950 z-10" />
                </div>

                <div className="relative container mx-auto px-6 z-20 h-full flex flex-col justify-end pb-24">
                    <MotionWrapper>
                        <div className="max-w-6xl">
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-12 h-px bg-zinc-500" />
                                <span className="text-zinc-400 font-bold uppercase tracking-[0.5em] text-[10px]">
                                    {uni.country?.name?.toUpperCase()} GLOBAL ACADEMY
                                </span>
                            </div>
                            <h1 className="text-[min(12vw,120px)] font-serif font-medium text-white mb-12 tracking-tight leading-[0.85] italic">
                                {uni.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-12 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-4 text-zinc-400 font-bold uppercase tracking-[0.3em] text-[11px]">
                                    <MapPin className="w-4 h-4 text-white" />
                                    {uni.city}, {uni.country?.name}
                                </div>
                                {uni.rank && (
                                    <div className="text-white font-bold uppercase tracking-[0.3em] text-[11px] flex items-center gap-4">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        WORLD RANK #{uni.rank}
                                    </div>
                                )}
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </section>

            <StatsBar stats={getStats()} />

            <section className="py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-24">
                        <div className="w-full lg:w-[65%] space-y-40">
                            <MotionWrapper>
                                <div className="flex flex-col gap-12">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-px bg-zinc-900" />
                                        <h2 className="text-4xl font-serif font-medium text-zinc-900 italic tracking-tight">Akademik Vizyon</h2>
                                    </div>
                                    <div className="p-12 md:p-20 bg-zinc-50 rounded-[3rem] border border-zinc-100/60 shadow-xl overflow-hidden relative group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 -mr-32 -mt-32 rounded-full blur-3xl" />
                                        <div
                                            className="prose-premium lg:prose-xl italic text-zinc-600 leading-[1.8] font-serif relative z-10"
                                            dangerouslySetInnerHTML={{ __html: meta?.aboutText || uni.description || "" }}
                                        />
                                    </div>
                                </div>
                            </MotionWrapper>

                            <MotionWrapper>
                                <div className="flex flex-col gap-16">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-px bg-zinc-900" />
                                        <h2 className="text-4xl font-serif font-medium text-zinc-900 italic tracking-tight">Egitim Programlari</h2>
                                    </div>
                                    {academicPrograms.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {academicPrograms.map((prog) => (
                                                <ProgramCard key={prog.id} prog={prog} locale={locale} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-16 rounded-[3rem] bg-zinc-900 text-white flex flex-col items-center text-center gap-10">
                                            <GraduationCap size={64} strokeWidth={1} className="opacity-20" />
                                            <div className="max-w-xl">
                                                <h3 className="text-3xl font-serif italic mb-6">Program Analizi Hazirlaniyor</h3>
                                                <p className="text-zinc-400 text-lg leading-relaxed font-serif italic">Bu kurumun sundugu tüm fakülteler ve akademik dönemler hakkinda stratejik bilgi almak için egitim danismanlarimizla iletisime geçebilirsiniz.</p>
                                            </div>
                                            <Link href="#quote-form-section" className="px-12 py-5 rounded-full border border-white/20 hover:bg-white hover:text-zinc-900 transition-all font-bold uppercase tracking-[0.3em] text-[10px]">REHBERLIK AL</Link>
                                        </div>
                                    )}
                                </div>
                            </MotionWrapper>

                            <MotionWrapper>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="flex flex-col gap-10 p-12 bg-zinc-50 rounded-[3rem] border border-zinc-100 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 rounded-2xl bg-white border border-zinc-100 text-zinc-900 shadow-sm">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <h3 className="text-2xl font-serif font-medium text-zinc-900 italic">Kabul Sartlari</h3>
                                        </div>
                                        <RequirementsList 
                                            items={[...(meta?.admissionRequirements || []), ...extraReqsList.map(r => r.name)]} 
                                            emptyMessage="Global standartlarda akademik yeterlilik gereklidir."
                                        />
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

                        <aside className="w-full lg:w-[35%]">
                            <div className="sticky top-40 space-y-12">
                                {meta?.tuitionFees && (
                                    <MotionWrapper delay={0.2}>
                                        <div className="bg-zinc-950 p-12 lg:p-16 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full blur-3xl" />
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="w-10 h-px bg-zinc-500" />
                                                <h3 className="text-2xl font-serif font-medium italic tracking-tight">Finansal Analiz</h3>
                                            </div>
                                            <div className="space-y-12">
                                                {meta.tuitionFees.undergraduate && (
                                                    <div className="space-y-3">
                                                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Tahmini Akademik Ücret</p>
                                                        <p className="text-3xl font-serif italic text-white">{meta.tuitionFees.undergraduate}</p>
                                                    </div>
                                                )}
                                                {meta.tuitionFees.graduate && (
                                                    <div className="pt-10 border-t border-white/10 space-y-3">
                                                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Lisansüstü Ücret</p>
                                                        <p className="text-3xl font-serif italic text-white">{meta.tuitionFees.graduate}</p>
                                                    </div>
                                                )}
                                                {meta.livingExpenses?.map((exp: any, i: number) => (
                                                    <div key={i} className="pt-10 border-t border-white/10 flex justify-between items-center group">
                                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{exp.label}</span>
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

            <MotionWrapper>
                <div className="container mx-auto px-6 pb-24">
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