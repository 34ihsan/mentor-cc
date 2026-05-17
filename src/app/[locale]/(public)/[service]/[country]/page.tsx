import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { 
    CheckCircle2, 
    ArrowRight, 
    Sparkles, 
    Compass, 
    HelpCircle,
    Info,
    BookOpen,
    GraduationCap,
    Award,
    Clock,
    Calendar,
    Globe
} from 'lucide-react';
import Link from 'next/link';
import SafeHTMLContent from '@/components/public/SafeHTMLContent';
import MotionWrapper from '@/components/public/MotionWrapper';
import { countryMap, serviceMap } from '@/lib/mappings';
import { examMap } from '@/lib/mappings/exams';
import { masterServiceDetails } from '@/data/master-service-details';
import { equivalenceServiceDetails } from '@/data/equivalence-service-details';

import { highSchoolCategoryMap } from '@/lib/mappings/highschool';
import { universityServiceDetails } from '@/data/university-service-details';
import { careerServiceDetails } from '@/data/career-service-details';
import { summerSchoolServiceDetails } from '@/data/summer-school-service-details';
import { languageSchoolServiceDetails } from '@/data/language-school-service-details';
import { examsServiceDetails } from '@/data/exams-service-details';
import { prisma } from '@/lib/prisma';

interface PageProps {
    params: Promise<{ locale: string; service: string; country: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale, service, country } = await params;
    const countryKey = country.toLowerCase();
    const serviceKey = service.toLowerCase();
    
    // Check countryMap, highSchoolCategoryMap, examMap and career categories
    const countryData = countryMap[countryKey as keyof typeof countryMap] || 
                       (serviceKey === 'yurtdisi-lise' ? highSchoolCategoryMap[countryKey] : null) ||
                       (serviceKey === 'sinavlar' ? examMap[countryKey as keyof typeof examMap] : null) ||
                       (serviceKey === 'kariyer' ? serviceMap['kariyer']?.categories?.find(c => c.slug === countryKey) : null);
    
    const serviceInfo = serviceMap[serviceKey];
    
    // Attempt to get from DB, but fallback to static map
    const serviceItem = await prisma.service.findUnique({
        where: { slug: serviceKey },
        select: { title: true, title_en: true, title_de: true }
    });

    if (!countryData) return { title: 'Not Found' };

    const serviceTitle = (locale === 'de' ? (serviceItem?.title_de || serviceInfo?.title_de) : 
                          locale === 'en' ? (serviceItem?.title_en || serviceInfo?.title_en) : 
                          (serviceItem?.title || serviceInfo?.title)) || serviceKey.toUpperCase();
                          
    const countryName = countryData.title;

    return {
        title: `${serviceTitle} - ${countryName} | Mentor Career`,
        description: `${countryName} için ${serviceTitle} hizmetimiz hakkında detaylı bilgi alın.`,
    };
}

export default async function ServiceCountryPage({ params }: PageProps) {
    const { locale, service, country } = await params;
    const t = await getTranslations('ServiceDetail');
    const ct = await getTranslations('CountryDetail');

    const countryKey = country.toLowerCase();
    const serviceKey = service.toLowerCase();
    const isDenklik = serviceKey === 'denklik';
    const isExams = serviceKey === 'sinavlar';

    // 1. Get fundamental mappings first
    const countryInfo = countryMap[countryKey as keyof typeof countryMap] || 
                        (serviceKey === 'yurtdisi-lise' ? highSchoolCategoryMap[countryKey] : null) ||
                        (serviceKey === 'sinavlar' ? examMap[countryKey as keyof typeof examMap] : null) ||
                        (serviceKey === 'kariyer' ? serviceMap['kariyer']?.categories?.find(c => c.slug === countryKey) : null);
    const serviceInfo = serviceMap[serviceKey];

    // 2. Define data map for static content
    const serviceDataMap: Record<string, any> = {
        'denklik': equivalenceServiceDetails,
        'yurtdisi-yuksek-lisans': masterServiceDetails,

        'yurtdisi-lise': highSchoolCategoryMap,
        'yurtdisi-universite': universityServiceDetails,
        'kariyer': careerServiceDetails,
        'yurtdisi-yaz-okullari': summerSchoolServiceDetails,
        'yurtdisi-dil-okullari': languageSchoolServiceDetails,
        'sinavlar': examsServiceDetails,
    };

    const serviceEntry = serviceDataMap[serviceKey]?.[countryKey];
    const et = await getTranslations('Exams');

    // Improved selection logic for localized data (handles both high school and university patterns)
    const serviceData = (() => {
        // Handle Exams specifically with new i18n JSON structure
        if (isExams) {
            try {
                // Check if the countryKey (exam slug) exists in the JSON
                const examData = et.raw(countryKey);
                if (examData && examData.serviceDetails) {
                    const d = examData.serviceDetails;
                    return {
                        overview: d.overview,
                        advantages: d.advantages || [],
                        process: d.process || [],
                        faq: d.faq || [],
                        structure: d.structure || null,
                        scoring: d.scoring || null,
                        universities: []
                    };
                }
            } catch (e) {
                console.warn(`Translation key for exam ${countryKey} not found, falling back to static data.`);
            }
        }

        // If we have a static service entry for this country, use it.
        if (serviceEntry) {
            // Handle exams specifically (Legacy Fallback)
            if (isExams) {
                return {
                    overview: (locale === 'de' ? serviceEntry.overview_de : locale === 'en' ? serviceEntry.overview_en : serviceEntry.overview) || serviceEntry.overview,
                    advantages: (locale === 'de' ? serviceEntry.advantages_de : locale === 'en' ? serviceEntry.advantages_en : serviceEntry.advantages) || [],
                    process: (locale === 'de' ? serviceEntry.process_de : locale === 'en' ? serviceEntry.process_en : serviceEntry.process) || [],
                    faq: (locale === 'de' ? serviceEntry.faq_de : locale === 'en' ? serviceEntry.faq_en : serviceEntry.faq) || [],
                    structure: (locale === 'de' ? serviceEntry.structure_de : locale === 'en' ? serviceEntry.structure_en : serviceEntry.structure) || null,
                    scoring: (locale === 'de' ? serviceEntry.scoring_de : locale === 'en' ? serviceEntry.scoring_en : serviceEntry.scoring) || null,
                    universities: []
                };
            }

            // If it's high school, data is in 'details'
            if (serviceKey === 'yurtdisi-lise') {
                const d = serviceEntry.details;
                return {
                    overview: (locale === 'de' ? d?.intro_de : locale === 'en' ? d?.intro_en : d?.intro) || serviceEntry.desc,
                    advantages: (locale === 'de' ? d?.advantages_de : locale === 'en' ? d?.advantages_en : d?.advantages) || [],
                    process: (locale === 'de' ? d?.process_de : locale === 'en' ? d?.process_en : d?.process) || [],
                    faq: (locale === 'de' ? d?.faq_de : locale === 'en' ? d?.faq_en : d?.faq) || []
                };
            }

            // If it's university or has root-level localized fields
            return {
                overview: (locale === 'de' ? serviceEntry.overview_de : locale === 'en' ? serviceEntry.overview_en : serviceEntry.overview) || serviceEntry.overview,
                advantages: (locale === 'de' ? serviceEntry.advantages_de : locale === 'en' ? serviceEntry.advantages_en : serviceEntry.advantages) || [],
                process: (locale === 'de' ? serviceEntry.process_de : locale === 'en' ? serviceEntry.process_en : serviceEntry.process) || [],
                faq: (locale === 'de' ? serviceEntry.faq_de : locale === 'en' ? serviceEntry.faq_en : serviceEntry.faq) || [],
                universities: serviceEntry.universities || []
            };
        }

        // No static entry — generate a helpful default content for this service+country.
        const countryName = countryInfo?.title || countryKey;
        const serviceTitle = (locale === 'de' ? serviceInfo?.title_de : locale === 'en' ? serviceInfo?.title_en : serviceInfo?.title) || serviceKey;

        const isSummerSchool = serviceKey === 'yurtdisi-yaz-okullari';
        const isDilOkulu = serviceKey === 'yurtdisi-dil-okullari';
        const isAcademic = !isSummerSchool && !isDilOkulu;

        const genOverview = `
            <h2 class="text-3xl font-serif font-bold text-navy mb-6 italic">${countryName} — ${serviceTitle}</h2>
            <p class="mb-6 text-lg text-zinc-700">${countryName} için ${serviceTitle} alanında Mentor Career'ın uzman rehberliği ile hayallerinize bir adım daha yaklaşın. Her öğrencinin hedeflerine özel, şeffaf ve sonuç odaklı bir süreç yönetimi sunuyoruz.</p>
            <p class="mb-4"><strong>Neden Biz?</strong> Yerel piyasa hakimiyeti, geniş partner ağımız ve kişiselleştirilmiş danışmanlık yaklaşımımızla fark yaratıyoruz.</p>
        `;

        const genAdvantages = [
            { title: 'Uzman Danışmanlık', desc: `${countryName} için en güncel ve doğru bilgi akışını sağlıyoruz.` },
            { title: 'Kişiselleştirilmiş Plan', desc: 'Hedeflerinize, bütçenize ve yeteneklerinize en uygun opsiyonları sunuyoruz.' },
            { title: 'Uçtan Uca Destek', desc: 'Başvuru aşamasından yerleşime kadar her adımda yanınızdayız.' }
        ];

        const genProcess = isSummerSchool || isDilOkulu ? [
            { title: 'İhtiyaç Analizi', desc: 'Öğrencinin seviyesine ve beklentilerine en uygun programın seçilmesi.' },
            { title: 'Kayıt ve Kabul', desc: 'Okul başvurularının yapılması ve kabul belgelerinin alınması.' },
            { title: 'Kayıt ve Lojistik', desc: 'Okul kaydı, konaklama ve uçuş planlamasının yapılması.' },
            { title: 'Eğitim ve Destek', desc: 'Eğitim süresince her türlü ihtiyaçta yanınızda olmaya devam ediyoruz.' }
        ] : [
            { title: 'Program Seçimi', desc: `${countryName} için uygun program seviyesinin belirlenmesi.` },
            { title: 'Başvuru Hazırlığı', desc: 'Gerekli evrakların toplanması ve güçlü bir dosya hazırlanması.' },
            { title: 'Burs ve Finansman', desc: 'Mevcut destek ve finansal opsiyonların değerlendirilmesi.' },
            { title: 'Kabul & Yerleşim', desc: 'Kabul sonrası kayıt ve yerleşim süreçlerinin yönetilmesi.' }
        ];

        const genFaq = isSummerSchool ? [
            { q: 'Yaz okulları için yaş sınırı nedir?', a: 'Genellikle 8-17 yaş arası programlar sunulur; ancak yetişkinler için de özel yaz kursları mevcuttur.' },
            { q: 'Güvenlik nasıl sağlanıyor?', a: 'Tüm programlarımız 24 saat gözetim altındadır; grup liderleri ve okul personeli güvenliği en üst seviyede tutar.' },
            { q: 'Aktiviteler neleri kapsıyor?', a: 'Dil derslerinin yanı sıra spor, sanat, şehir gezileri ve akşam eğlenceleri programın parçasıdır.' }
        ] : isDilOkulu ? [
            { q: 'Dil eğitimi için belirli bir yaş sınırı var mı?', a: 'Hayır, yetişkin programları genellikle 16-18 yaşından başlar ve her yaştan öğrenciye açıktır.' },
            { q: 'Hangi konaklama seçenekleri sunuluyor?', a: 'Aile yanı, öğrenci rezidansları ve paylaşımlı daire seçenekleri mevcuttur.' },
            { q: 'Kayıt süreci ne kadar sürer?', a: 'Ülkeye göre değişmekle birlikte genellikle 4-8 hafta arasında sonuçlanmaktadır.' }
        ] : [
            { q: 'Başvuru şartları nelerdir?', a: 'Seçilen programa göre dil yeterliliği ve akademik geçmiş gibi farklı kriterler aranmaktadır.' },
            { q: 'Süreç ne kadar sürer?', a: 'Başvurulan ülkeye ve program türüne göre 2-6 ay arasında bir hazırlık süreci öngörülmektedir.' },
            { q: 'Maliyet aralıkları nasıldır?', a: 'Ücretler; program türü, süresi ve seçilen lokasyona göre değişiklik gösterir; danışmanlarımız size en uygun teklifi sunacaktır.' }
        ];

        return {
            overview: genOverview,
            advantages: genAdvantages,
            process: genProcess,
            faq: genFaq,
            universities: []
        };
    })();

    if (!serviceData || !countryInfo) {
        return notFound();
    }

    const { overview, advantages, process, faq, universities, structure, scoring } = serviceData;
    const localizedServiceTitle = (locale === 'de' ? serviceInfo?.title_de : locale === 'en' ? serviceInfo?.title_en : serviceInfo?.title) || service.replace(/-/g, ' ').toUpperCase();

    return (
        <div className={`bg-zinc-50/50 min-h-screen pb-20 selection:bg-secondary selection:text-white ${isDenklik ? 'text-black' : ''}`}>
            
            {/* PREMIUM HERO SECTION */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-zinc-950">
                <div className="absolute inset-0">
                    <Image
                        src={countryMap[country.toLowerCase() as keyof typeof countryMap]?.image || countryInfo.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000'}
                        alt={countryInfo.title}
                        fill
                        className="object-cover opacity-40 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
                </div>

                <div className="relative container mx-auto px-6 z-20 text-center">
                    <MotionWrapper>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-[1px] bg-secondary" />
                                <span className="text-secondary font-black tracking-[0.5em] text-[10px] uppercase">{countryInfo.title}</span>
                                <div className="w-12 h-[1px] bg-secondary" />
                            </div>
                            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tighter italic leading-tight uppercase">
                                {localizedServiceTitle}
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-300 font-serif italic max-w-3xl leading-relaxed">
                                {countryInfo.title} için uzman danışmanlık ve profesyonel süreç yönetimi.
                            </p>
                        </div>
                    </MotionWrapper>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-secondary" />
                </div>
            </section>

            {/* OVERVIEW SECTION */}
            <section className="py-24 bg-white relative z-30">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <MotionWrapper>
                            <div className="flex gap-16 flex-col lg:flex-row">
                                <div className="lg:w-2/3">
                                    <div className="flex items-center gap-3 text-secondary mb-6">
                                        <Info size={20} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('overview')}</span>
                                    </div>
                                    <div className={`prose prose-lg max-w-none prose-headings:font-serif prose-headings:italic prose-headings:text-primary ${isDenklik ? 'prose-p:text-black prose-li:text-black prose-strong:text-black' : 'prose-zinc'}`}> 
                                        <SafeHTMLContent html={overview} />
                                    </div>
                                </div>
                                <div className="lg:w-1/3">
                                    <div className="sticky top-32 p-10 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] shadow-sm">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary mb-8 shadow-sm">
                                            <Compass size={24} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-primary italic mb-4">{t('needHelp')}</h3>
                                        <p className={`${isDenklik ? 'text-black' : 'text-zinc-500'} mb-8 text-sm leading-relaxed`}>{t('contactPrompt')}</p>
                                        <button className="w-full btn-primary !py-4 rounded-2xl flex items-center justify-center gap-3 group">
                                            {t('getFreeConsultation')}
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>
            </section>

            {/* ADVANTAGES GRID */}
            {advantages && advantages.length > 0 && (
                <section className="py-24 bg-zinc-50/50">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center text-center mb-16">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-[1px] bg-secondary/30" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">{t('whyChooseUs')}</span>
                                <div className="w-12 h-[1px] bg-secondary/30" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary italic tracking-tight">{t('ourDifference')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {advantages.map((adv: any, i: number) => (
                                <MotionWrapper key={i} delay={i * 0.1}>
                                    <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 h-full hover:shadow-premium transition-all duration-700 group">
                                        <div className="w-12 h-12 rounded-xl bg-zinc-50 text-secondary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <h4 className="text-xl font-serif font-bold text-primary italic mb-4 group-hover:text-secondary transition-colors duration-700">{adv.title}</h4>
                                        <p className={`${isDenklik ? 'text-black' : 'text-zinc-500'} text-sm leading-relaxed`}>{adv.desc}</p>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* EXAM STRUCTURE & SCORING (For Exams Only) */}
            {isExams && (structure || scoring) && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {structure && (
                                <MotionWrapper>
                                    <div className="bg-zinc-50 p-12 rounded-[3rem] border border-zinc-100 h-full">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-secondary shadow-sm">
                                                <BookOpen size={24} strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-3xl font-serif font-bold text-primary italic">Sınav Yapısı</h3>
                                        </div>
                                        <div className="prose prose-zinc prose-p:text-zinc-600 prose-li:text-zinc-600">
                                            <SafeHTMLContent html={structure} />
                                        </div>
                                    </div>
                                </MotionWrapper>
                            )}
                            {scoring && (
                                <MotionWrapper delay={0.2}>
                                    <div className="bg-zinc-950 p-12 rounded-[3rem] text-white h-full relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <Award size={120} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-secondary">
                                                    <GraduationCap size={24} strokeWidth={1.5} />
                                                </div>
                                                <h3 className="text-3xl font-serif font-bold italic text-white">Puanlama ve Değerlendirme</h3>
                                            </div>
                                            <div className="prose prose-invert prose-p:text-zinc-400 prose-li:text-zinc-400 max-w-none">
                                                <SafeHTMLContent html={scoring} />
                                            </div>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* UNIVERSITIES LIST SECTION */}
            {universities && universities.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center text-center mb-16">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-[1px] bg-secondary/30" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Akademik Seçenekler</span>
                                <div className="w-12 h-[1px] bg-secondary/30" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary italic tracking-tight">Öne Çıkan Üniversiteler</h2>
                            <p className="mt-4 text-zinc-500 font-serif italic max-w-2xl">Hayalinizdeki kariyer için {countryInfo.title}&apos;daki en prestijli eğitim kurumlarını inceleyin.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {universities.map((uni: any, i: number) => {
                                const CardContent = (
                                    <div className="group relative bg-zinc-50 rounded-[2.5rem] border border-zinc-100 p-8 hover:bg-white hover:shadow-premium transition-all duration-500 overflow-hidden h-full flex flex-col">
                                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Sparkles size={80} />
                                        </div>
                                        
                                        <div className="mb-6">
                                            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest mb-4">
                                                {uni.ranking}
                                            </span>
                                            <h3 className="text-2xl font-serif font-bold text-primary italic leading-tight group-hover:text-secondary transition-colors">
                                                {uni.name}
                                            </h3>
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <div className="mb-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Öne Çıkanlar</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {uni.highlights.map((h: string, j: number) => (
                                                        <span key={j} className="text-xs bg-white border border-zinc-100 px-3 py-1 rounded-lg text-zinc-600 italic">
                                                            {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Popüler Bölümler</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {uni.departments.map((d: string, j: number) => (
                                                        <span key={j} className="text-xs text-zinc-500 flex items-center gap-1.5">
                                                            <div className="w-1 h-1 rounded-full bg-secondary" />
                                                            {d}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-8 pt-6 border-t border-zinc-200/50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            <span className="text-xs font-bold text-primary italic">Detaylı Bilgi Al</span>
                                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                );

                                return (
                                    <MotionWrapper key={i} delay={i * 0.05}>
                                        {uni.slug ? (
                                            <Link href={`/${locale}/${service}/${country}/${uni.slug}`}>
                                                {CardContent}
                                            </Link>
                                        ) : CardContent}
                                    </MotionWrapper>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* PROCESS SECTION */}
            {process && process.length > 0 && (
                <section className="py-32 bg-white overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-20 items-center">
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-[1px] bg-secondary/30" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">{t('howItWorks')}</span>
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary italic mb-10 tracking-tight leading-tight">{t('stepByStep')}</h2>
                                    <p className={`${isDenklik ? 'text-black' : 'text-zinc-500'} text-lg font-serif italic mb-12`}>Süreci sizin için şeffaf, hızlı ve sonuç odaklı yönetiyoruz.</p>
                                    <div className="w-20 h-20 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex items-center justify-center text-secondary animate-pulse">
                                        <Sparkles size={32} strokeWidth={1.5} />
                                    </div>
                                </div>
                                <div className="space-y-12 relative">
                                    <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-zinc-100" />
                                    {process.map((step: any, i: number) => (
                                        <MotionWrapper key={i} delay={i * 0.1}>
                                            <div className="flex gap-10 relative">
                                                <div className="w-12 h-12 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-secondary font-serif font-bold text-xl z-10 shadow-sm group-hover:border-secondary transition-all">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <h4 className="text-2xl font-serif font-bold text-primary italic mb-3">{step.title}</h4>
                                                    <p className={`${isDenklik ? 'text-black' : 'text-zinc-500'} leading-relaxed`}>{step.desc}</p>
                                                </div>
                                            </div>
                                        </MotionWrapper>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ SECTION */}
            {faq && faq.length > 0 && (
                <section className="py-32 bg-zinc-50/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-col items-center text-center mb-16">
                                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-secondary mb-8 shadow-sm">
                                    <HelpCircle size={32} strokeWidth={1.5} />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary italic tracking-tight mb-4">{t('faq')}</h2>
                                <p className="text-zinc-400 font-serif italic">{countryInfo.title} {service.replace(/-/g, ' ')} süreci hakkında merak edilenler.</p>
                            </div>
                            <div className="space-y-6">
                                {faq.map((item: any, i: number) => (
                                    <MotionWrapper key={i} delay={i * 0.1}>
                                        <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                                            <h4 className="text-xl font-serif font-bold text-primary italic mb-4 flex items-start gap-4">
                                                <span className="text-secondary mt-1">Q.</span>
                                                {item.q}
                                            </h4>
                                            <div className={`${isDenklik ? 'text-black' : 'text-zinc-500'} leading-relaxed pl-9 flex items-start gap-4`}>
                                                <span className="text-zinc-300 mt-1 italic">A.</span>
                                                {item.a}
                                            </div>
                                        </div>
                                    </MotionWrapper>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}
