import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { 
    MapPin, 
    Building2, 
    Globe2, 
    GraduationCap, 
    Clock, 
    Coins, 
    CheckCircle2, 
    ArrowLeft,
    ArrowRight,
    Target,
    ShieldCheck,
    Zap,
    Info
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';
import MotionWrapper from '@/components/public/MotionWrapper';

import { withSafePage } from '@/lib/error-handling/withSafePage';

type Props = { params: Promise<{ locale: string; slug: string }> };

async function getProgramData(slug: string) {
    const program = await prisma.program.findUnique({
        where: { slug },
        include: {
            institution: {
                include: { country: true }
            }
        }
    });
    return program;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    
    // Catch errors in metadata generation so it doesn't crash the page rendering cycle
    try {
        const program = await getProgramData(slug);
        const t = await getTranslations({ locale, namespace: 'ProgramDetail' });
        
        if (!program) return { title: 'Program Not Found' };

        const title = `${program.name} | ${program.institution.name} | Mentor Career`;
        const description = program.description || "";

        return {
            title,
            description,
        };
    } catch (error) {
        return { title: 'Mentor Career' };
    }
}

async function ProgramDetailContent({ params }: Props) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'ProgramDetail' });
    const program = await getProgramData(slug);

    if (!program) notFound();

    const stats = program.institution.stats as any;

    return (
        <main className="min-h-screen bg-zinc-50/50 pb-32 pt-24">
            {/* Minimal Navigation Bar */}
            <div className="container mx-auto px-6 mb-12">
                <Link 
                    href="/program-bulucu" 
                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-primary transition-all group"
                >
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-2" />
                    {t('backToSearch')}
                </Link>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left Column: Visuals & Core Info */}
                    <div className="lg:col-span-7 space-y-12">
                        <MotionWrapper>
                            <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-premium group">
                                <Image
                                    src={program.institution.image || 'https://images.unsplash.com/photo-1541339907198-e08759df93f3?q=80&w=1200'}
                                    alt={program.name}
                                    fill
                                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
                                
                                <div className="absolute bottom-12 left-12 right-12 z-20">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="px-5 py-2 rounded-full bg-secondary/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.3em] shadow-xl">
                                            {program.category}
                                        </div>
                                        <div className="px-5 py-2 rounded-full bg-white/90 backdrop-blur-md text-navy text-[9px] font-black uppercase tracking-[0.3em] shadow-xl">
                                            {program.institution.country?.name}
                                        </div>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[0.9] tracking-tighter italic">
                                        {program.name}
                                    </h1>
                                </div>
                            </div>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <div className="bg-white p-12 rounded-[3rem] border border-zinc-100 space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-[1px] bg-secondary/30" />
                                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-secondary">{t('description')}</span>
                                </div>
                                <div className="prose prose-zinc prose-lg max-w-none">
                                    <SafeHTMLContent html={program.content || program.description || ""} />
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* Program Stats/Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <MotionWrapper delay={0.3}>
                                <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-secondary shrink-0">
                                        <Target size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-black text-xs uppercase tracking-widest text-primary">{t('requirements')}</h3>
                                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                                            {program.templateData ? JSON.parse(program.templateData).requirements : 'B2 Seviyesi Dil, %75 Başarı Ortalaması.'}
                                        </p>
                                    </div>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.4}>
                                <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-secondary shrink-0">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-black text-xs uppercase tracking-widest text-primary">{t('features')}</h3>
                                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                                            Global Akreditasyon, Kariyer Desteği, Modern Kampüs Olanakları.
                                        </p>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>

                    {/* Right Column: Sidebar Actions & Details */}
                    <div className="lg:col-span-5 space-y-10">
                        <MotionWrapper delay={0.1}>
                            <div className="sticky top-32 space-y-8">
                                {/* Action Card */}
                                <div className="bg-navy p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                                    
                                    <div className="relative z-10 space-y-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center text-secondary border border-white/10 group-hover:bg-secondary group-hover:text-white transition-all duration-700">
                                                <GraduationCap size={40} strokeWidth={1} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">{t('institution')}</p>
                                                <h2 className="text-2xl font-serif font-bold italic leading-tight">{program.institution.name}</h2>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/5">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3 text-secondary">
                                                    <Clock size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{t('duration')}</span>
                                                </div>
                                                <p className="font-serif italic text-xl">{program.duration || '2 Yıl'}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3 text-secondary">
                                                    <Coins size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{t('price')}</span>
                                                </div>
                                                <p className="font-serif italic text-xl">
                                                    {program.price ? `${program.price.toLocaleString()} ${program.currency}` : 'Bize Danışın'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 text-zinc-400">
                                                <MapPin size={16} />
                                                <span className="text-sm font-medium">{program.institution.city}, {program.institution.country?.name}</span>
                                            </div>
                                            <Link 
                                                href={`/iletisim?program=${program.slug}`}
                                                className="flex items-center justify-between w-full p-8 rounded-3xl bg-secondary hover:bg-white text-white hover:text-navy font-black text-xs uppercase tracking-[0.4em] transition-all duration-700 shadow-2xl group/btn"
                                            >
                                                {t('applyNow')}
                                                <ArrowRight className="transition-transform group-hover/btn:translate-x-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Institution Mini Card */}
                                <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 flex flex-col gap-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">{t('stats')}</h3>
                                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-300">
                                            <Info size={18} />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between py-4 border-b border-zinc-50">
                                            <span className="text-xs font-bold text-zinc-400">Okul Sıralaması</span>
                                            <span className="font-serif font-bold italic text-secondary">#{program.institution.rank || '150'}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-4 border-b border-zinc-50">
                                            <span className="text-xs font-bold text-zinc-400">Öğrenci Memnuniyeti</span>
                                            <span className="font-serif font-bold italic text-secondary">%94</span>
                                        </div>
                                        <div className="flex items-center justify-between py-4">
                                            <span className="text-xs font-bold text-zinc-400">Mezun İşe Alım</span>
                                            <span className="font-serif font-bold italic text-secondary">%88</span>
                                        </div>
                                    </div>

                                    <Link 
                                        href={`/kurumsal/kurumlar/${program.institution.slug}`}
                                        className="text-center py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-primary transition-all border-t border-zinc-50 mt-2"
                                    >
                                        Kurum Sayfasını İncele
                                    </Link>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default withSafePage(ProgramDetailContent);
