import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { 
    GraduationCap, 
    Globe, 
    Wallet, 
    MapPin, 
    ArrowLeft,
    Sparkles,
    CheckCircle2,
    Calendar,
    Users,
    Send,
    FileText
} from 'lucide-react';
import Link from 'next/link';
import MotionWrapper from '@/components/public/MotionWrapper';
import RichTextLayout from '@/components/public/RichTextLayout';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';
import { masterServiceDetails } from '@/data/master-service-details';
import { universityServiceDetails } from '@/data/university-service-details';
import { summerSchoolServiceDetails } from '@/data/summer-school-service-details';
import { languageSchoolServiceDetails } from '@/data/language-school-service-details';
import { countryMap } from '@/lib/mappings';
import InstitutionApplicationForm from '@/components/public/InstitutionApplicationForm';

const serviceDataMap: Record<string, any> = {
    'yurtdisi-yuksek-lisans': masterServiceDetails,
    'yurtdisi-universite': universityServiceDetails,
    'yurtdisi-yaz-okullari': summerSchoolServiceDetails,
    'yurtdisi-dil-okullari': languageSchoolServiceDetails,
};

const serviceNameMap: Record<string, Record<string, string>> = {
    'yurtdisi-yuksek-lisans': { tr: 'Yurtdışı Yüksek Lisans', en: 'Study Abroad Master', de: 'Auslandsstudium Master' },
    'yurtdisi-universite':    { tr: 'Yurtdışı Üniversite',    en: 'Study Abroad University', de: 'Auslandsstudium Universität' },
    'yurtdisi-yaz-okullari':  { tr: 'Yurtdışı Yaz Okulları', en: 'Summer Schools Abroad',  de: 'Sommerschulen im Ausland' },
    'yurtdisi-dil-okullari':  { tr: 'Yurtdışı Dil Okulları', en: 'Language Schools Abroad', de: 'Sprachschulen im Ausland' },
};

interface UniversityPageProps {
    params: Promise<{ locale: string; service: string; country: string; university: string }>;
}

export async function generateMetadata({ params }: UniversityPageProps) {
    const { service, country, university } = await params;
    const countryKey = country.toLowerCase();
    const serviceKey = service.toLowerCase();
    const universitySlug = university.toLowerCase();
    
    const countryData = serviceDataMap[serviceKey]?.[countryKey];
    const uni = countryData?.universities?.find((u: any) => u.slug === universitySlug);

    if (!uni) return { title: 'University Not Found' };

    return {
        title: `${uni.name} - ${uni.ranking} | Mentor Career`,
        description: `${uni.name} hakkında dünya sıralaması, eğitim ücretleri ve bölümler gibi detaylı bilgiler.`,
    };
}

export default async function UniversityDetailPage({ params }: UniversityPageProps) {
    const { locale, service, country, university } = await params;
    
    const countryKey = country.toLowerCase();
    const serviceKey = service.toLowerCase();
    const universitySlug = university.toLowerCase();
    
    const countryData = serviceDataMap[serviceKey]?.[countryKey];
    const uni = countryData?.universities?.find((u: any) => u.slug === universitySlug);

    if (!uni) return notFound();

    const countryInfo = countryMap[countryKey as keyof typeof countryMap];
    const serviceName = serviceNameMap[serviceKey]?.[locale] || serviceNameMap[serviceKey]?.['tr'] || service;

    return (
        <div className="bg-zinc-50/50 min-h-screen pb-20">
            {/* HERO SECTION */}
            <section className="relative h-[60vh] min-h-[450px] flex items-center bg-zinc-950 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={countryMap[country.toLowerCase() as keyof typeof countryMap]?.image || countryInfo?.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000'}
                        alt={uni.name}
                        fill
                        className="object-cover opacity-30 scale-105"
                        priority
                    />
                    <div className="absolute inset-10 border border-white/10 pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                </div>

                <div className="relative container mx-auto px-6 z-20">
                    <Link 
                        href={`/${locale}/${service}/${country}`}
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">{countryInfo?.title} Genel Bakış</span>
                    </Link>

                    <MotionWrapper>
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 rounded-full bg-gold/20 text-gold text-[10px] font-black uppercase tracking-[0.2em] border border-gold/30">
                                    {uni.ranking}
                                </span>
                                {uni.worldRanking && (
                                    <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                                        {uni.worldRanking}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 italic tracking-tight leading-[1.1]">
                                {uni.name}
                            </h1>
                            <div className="flex flex-wrap gap-8 text-zinc-300">
                                <div className="flex items-center gap-3 italic">
                                    <Globe size={18} className="text-gold" />
                                    <span>{countryInfo?.title}</span>
                                </div>
                                <div className="flex items-center gap-3 italic">
                                    <GraduationCap size={18} className="text-gold" />
                                    <span>{uni.departments.length}+ Bölüm Seçeneği</span>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </section>

            {/* KEY STATS GRID */}
            <section className="relative z-30 -mt-16 mb-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MotionWrapper delay={0.1}>
                            <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-premium flex items-start gap-6 group hover:-translate-y-1 transition-transform duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    <Globe size={28} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Dünya Sıralaması</p>
                                    <h4 className="text-2xl font-serif font-bold text-primary italic">{uni.worldRanking || 'Global Tier 1'}</h4>
                                </div>
                            </div>
                        </MotionWrapper>

                        <MotionWrapper delay={0.2}>
                            <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-premium flex items-start gap-6 group hover:-translate-y-1 transition-transform duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-500">
                                    <Wallet size={28} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Yıllık Ücret</p>
                                    <h4 className="text-2xl font-serif font-bold text-primary italic">{uni.annualTuition || 'Değişken'}</h4>
                                </div>
                            </div>
                        </MotionWrapper>

                        <MotionWrapper delay={0.3}>
                            <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-premium flex items-start gap-6 group hover:-translate-y-1 transition-transform duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-500">
                                    <MapPin size={28} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Lokasyon</p>
                                    <h4 className="text-2xl font-serif font-bold text-primary italic">{countryInfo?.title}</h4>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="py-10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* LEFT: DETAILED CONTENT */}
                        <div className="lg:w-2/3">
                            <MotionWrapper>
                                <div className="mb-16">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-[1px] bg-gold/30" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Kurumsal Profil</span>
                                    </div>
                                    <div className="prose-container">
                                        <RichTextLayout 
                                            content={uni.detailedDescription || `<p>${uni.name}, ${countryInfo?.title} eğitim sisteminin en köklü ve prestijli kurumlarından biridir. Uluslararası standartlarda sunduğu eğitim kalitesi ve mezunlarının küresel iş piyasasındaki başarısı ile tanınmaktadır.</p>`} 
                                        />
                                    </div>
                                </div>

                                {/* DEPARTMENTS GRID */}
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-[1px] bg-secondary/30" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Popüler Bölümler</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {uni.departments.map((dept: string, i: number) => (
                                            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-zinc-100 hover:border-secondary/30 hover:shadow-sm transition-all group">
                                                <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                                <span className="font-serif italic text-primary group-hover:text-secondary transition-colors">{dept}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>

                        {/* RIGHT: SIDEBAR */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-32 space-y-8">
                                {/* SIDEBAR FORM CARD */}
                                <MotionWrapper delay={0.2}>
                                    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-zinc-100 shadow-premium">
                                        {/* Card header */}
                                        <div className="relative bg-navy px-10 pt-10 pb-12 overflow-hidden">
                                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />
                                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gold/10 rounded-full blur-xl" />
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                                                        <Send size={18} className="text-secondary" />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Hızlı Başvuru</span>
                                                </div>
                                                <h3 className="text-2xl font-serif font-bold italic text-white leading-tight">
                                                    {uni.name}'e Başvur veya Teklif Al
                                                </h3>
                                                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                                                    24 saat içinde uzman danışmanımız sizi arayacak.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Form */}
                                        <div className="px-10 py-10 -mt-4 bg-white rounded-t-[2.5rem] relative z-10">
                                            <InstitutionApplicationForm
                                                institutionName={uni.name}
                                                serviceName={serviceName}
                                                serviceSlug={serviceKey}
                                                countryName={countryInfo?.title || country}
                                                locale={locale}
                                                variant="sidebar"
                                            />
                                        </div>
                                    </div>
                                </MotionWrapper>

                                {/* QUICK INFO CARD */}
                                <div className="p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
                                    <h4 className="text-xl font-serif font-bold text-primary italic mb-6">Hızlı Bilgiler</h4>
                                    <ul className="space-y-6">
                                        <li className="flex gap-4">
                                            <Calendar size={20} className="text-secondary shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Başvuru Dönemi</p>
                                                <p className="text-sm font-serif italic text-zinc-600">Güz ve Bahar Dönemleri</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <Globe size={20} className="text-secondary shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Eğitim Dili</p>
                                                <p className="text-sm font-serif italic text-zinc-600">İngilizce / Yerel Dil</p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <Users size={20} className="text-secondary shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Uluslararası Öğrenci</p>
                                                <p className="text-sm font-serif italic text-zinc-600">Yüksek Oranlı Entegrasyon</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FULL-WIDTH APPLICATION SECTION */}
            <section className="py-24 mt-10 relative overflow-hidden bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-gold/5" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Section Header */}
                        <MotionWrapper>
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-3 bg-secondary/10 px-6 py-2.5 rounded-full mb-8 border border-secondary/20">
                                    <Sparkles size={14} className="text-secondary" />
                                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">Resmi Süreç</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary italic tracking-tight leading-[1.1] mb-6">
                                    {uni.name} İçin{' '}
                                    <span className="gold-text not-italic">Hemen Başlayın</span>
                                </h2>
                                <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                    Başvuru talebi veya fiyat teklifi alın — uzman akademik danışmanımız 24 saat içinde sizinle iletişime geçecek.
                                </p>
                            </div>
                        </MotionWrapper>

                        {/* Two-column form layout */}
                        <MotionWrapper delay={0.2}>
                            <div className="relative">
                                {/* Decorative border */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-secondary/20 to-gold/20 rounded-[3rem] blur-xl opacity-60" />
                                <div className="relative bg-white rounded-[2.5rem] border border-zinc-100 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
                                    <div className="grid md:grid-cols-5">
                                        {/* Left info panel */}
                                        <div className="md:col-span-2 bg-navy p-12 md:p-14 relative overflow-hidden flex flex-col justify-between">
                                            <div className="absolute -top-16 -right-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full blur-2xl" />
                                            
                                            <div className="relative z-10">
                                                <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/30">
                                                    <FileText size={28} className="text-secondary" />
                                                </div>
                                                <h3 className="text-3xl font-serif font-bold italic text-white leading-tight mb-6">
                                                    Neden Mentor Career?
                                                </h3>
                                                <div className="space-y-6">
                                                    {[
                                                        { icon: '🎯', text: 'Kişiye özel akademik strateji' },
                                                        { icon: '📋', text: 'Tam dosya hazırlama desteği' },
                                                        { icon: '🛡️', text: 'Vize süreç garantisi' },
                                                        { icon: '🌍', text: 'Konaklama organizasyonu' },
                                                        { icon: '📞', text: 'Mesai saatlerinde danışman erişimi' },
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-4">
                                                            <span className="text-2xl">{item.icon}</span>
                                                            <span className="text-zinc-300 text-sm font-serif italic">{item.text}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                                                <div className="grid grid-cols-3 gap-4 text-center">
                                                    {[
                                                        { val: '15+', label: 'Yıl' },
                                                        { val: '%99', label: 'Başarı' },
                                                        { val: '500+', label: 'Kurum' },
                                                    ].map((stat, i) => (
                                                        <div key={i}>
                                                            <p className="text-2xl font-serif font-bold text-gold italic">{stat.val}</p>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mt-1">{stat.label}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right form panel */}
                                        <div className="md:col-span-3 p-12 md:p-14">
                                            <div className="mb-8">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                                                        {serviceName} — {countryInfo?.title}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-serif font-bold italic text-primary">
                                                    {uni.name}
                                                </h3>
                                            </div>
                                            <InstitutionApplicationForm
                                                institutionName={uni.name}
                                                serviceName={serviceName}
                                                serviceSlug={serviceKey}
                                                countryName={countryInfo?.title || country}
                                                locale={locale}
                                                variant="full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>
            </section>
        </div>
    );
}
