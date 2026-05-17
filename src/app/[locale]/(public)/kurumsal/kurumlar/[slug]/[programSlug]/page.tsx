
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
    MapPin,
    Clock,
    Calendar,
    Award,
    CheckCircle2,
    Briefcase,
    GraduationCap,
    Globe,
    Zap,
    ShieldCheck,
    Banknote,
    ArrowRight
} from "lucide-react";
import ContactForm from "@/components/public/ContactForm";
import { categoryRequirements, countryServiceRequirements, serviceMap } from "@/lib/mappings";
import Link from "next/link"; // Import Link for breadcrumbs
import { Metadata } from "next";
import Image from "next/image";
import { stripHtml } from "@/utils/text";

interface ProgramPageProps {
    params: Promise<{ locale: string; slug: string; programSlug: string }>;
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
    const { programSlug } = await params;
    const program = await prisma.program.findUnique({
        where: { slug: programSlug },
        include: { institution: true }
    });

    if (!program) return { title: 'Program Bulunamadı | Mentor Career' };

    const title = `${program.name} | ${program.institution.name}`;
    const description = program.description ? stripHtml(program.description).substring(0, 160) : `${program.name} programı detayları, başvuru şartları ve ücretler.`;

    return {
        title: `${title} | Mentor Career`,
        description,
        openGraph: {
            title,
            description,
            images: program.institution.image ? [{ url: program.institution.image }] : [],
        }
    };
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
    const { locale, slug, programSlug } = await params;
    const lang = (locale === 'en' || locale === 'de') ? locale : 'tr';

    const program = (await (prisma as any).program.findFirst({
        where: { slug: programSlug },
        include: { institution: true }
    })) as any;

    if (!program) {
        return notFound();
    }

    const { institution } = program;

    return (
        <div className="bg-[#FAF9F6]">
            {/* --- HERO: Program Specific Focus --- */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-[#0B1751]">
                <div className="absolute inset-0">
                    <Image
                        src={institution.image || "https://images.unsplash.com/photo-1541339906962-d000263f6397?q=80&w=1500"}
                        alt={program.name}
                        fill
                        priority
                        className="object-cover opacity-20 grayscale"
                        sizes="100vw"
                    />
                    {/* Elegant Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1751] via-[#0B1751]/80 to-transparent z-10" />
                </div>

                <div className="container mx-auto px-6 relative z-20">
                    <div className="max-w-5xl">
                        {/* Breadcrumb / Badge */}
                        <div className="flex items-center gap-4 mb-10">
                                        <Link href={`/kurumsal/kurumlar/${institution.slug}`} className="flex items-center gap-4 text-[#D3A20B] font-bold uppercase tracking-[0.3em] text-[10px] hover:text-white transition-all duration-500">
                                {institution.name}
                            </Link>
                            <div className="w-1 h-1 rounded-full bg-[#B4943E]/40" />
                            <span className="text-white/40 font-bold uppercase tracking-[0.4em] text-[10px]">{program.category.replace('_', ' ')}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-10 italic leading-[1.1] tracking-tight">
                            {program.name}
                        </h1>

                        <p
                            className="text-lg md:text-xl text-white/60 max-w-2xl font-serif italic border-l border-[#B4943E] pl-8 mb-12 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: program.description }}
                        />

                        {/* Quick Stats in Hero */}
                        <div className="flex flex-wrap gap-8 pt-6">
                            {program.duration && (
                                <div className="flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10 group hover:border-[#B4943E]/50 transition-all duration-500">
                                    <div className="w-10 h-10 border border-[#B4943E]/30 flex items-center justify-center text-[#B4943E]">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-1">
                                            {lang === 'de' ? 'AUSBILDUNGSDAUER' : lang === 'en' ? 'PROGRAM DURATION' : 'EĞİTİM SÜRESİ'}
                                        </div>
                                        <div className="text-white font-serif italic text-lg">{program.duration}</div>
                                    </div>
                                </div>
                            )}
                            {program.price && (
                                <div className="flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10 group hover:border-[#B4943E]/50 transition-all duration-500">
                                    <div className="w-10 h-10 border border-[#B4943E]/30 flex items-center justify-center text-[#B4943E]">
                                        <Banknote size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-1">
                                            {lang === 'de' ? 'STUDIENGEBÜHR' : lang === 'en' ? 'TUITION FEE' : 'EĞİTİM ÜCRETİ'}
                                        </div>
                                        <div className="text-white font-serif italic text-lg">{program.price} {program.currency}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MAIN CONTENT --- */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        {/* Left Content (8) */}
                        <div className="lg:col-span-8 space-y-24">

                            {/* Program Overview */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-px bg-[#B4943E]" />
                                    <h2 className="text-4xl font-serif font-bold text-[#0B1751] italic">
                                        {lang === 'de' ? 'Über das' : lang === 'en' ? 'About the' : 'Program'} 
                                        <span className="text-[#B4943E] not-italic"> {lang === 'de' ? 'Programm' : lang === 'en' ? 'Program' : 'Hakkında'}</span>
                                    </h2>
                                </div>
                                <div className="space-y-8 text-lg text-[#0B1751]/70 font-serif italic leading-[1.8]">
                                    <p>
                                        <span dangerouslySetInnerHTML={{ __html: program.description }} /> 
                                        {lang === 'de' ? ` Dieses Programm wird im Rahmen von ${institution.name} von erfahrenen Akademikern durchgeführt. Es zielt darauf ab, Ihnen das theoretische Wissen und die praktischen Fähigkeiten zu vermitteln, die Sie benötigen, um Ihre globalen Karriereziele zu erreichen.` : 
                                         lang === 'en' ? ` This program is delivered by expert academics within ${institution.name}. It aims to provide you with the theoretical knowledge and practical skills needed to achieve your global career goals.` : 
                                         ` Bu program, ${institution.name} bünyesinde, alanında uzman akademisyenler tarafından verilmektedir. Global kariyer hedeflerinize ulaşmanız için gereken teorik bilgi ve pratik becerileri kazandırmayı amaçlar.`}
                                    </p>
                                    <p className="border-l-2 border-[#B4943E]/20 pl-8">
                                        {lang === 'de' ? `Als Mentor Career bieten wir individuelle akademische Beratung während Ihrer Bewerbung für ${program.name}, einschließlich Motivationsschreiben (SOP), Referenzschreiben und Interviewvorbereitung.` :
                                         lang === 'en' ? `As Mentor Career, we offer one-on-one academic counseling during your ${program.name} application process, including statement of purpose (SOP), reference letters, and interview preparation.` :
                                         `Mentor Career olarak, ${program.name} başvurularınızda niyet mektubu (sop), referans mektupları ve mülakat hazırlığı süreçlerinde birebir akademik danışmanlık desteği sunuyoruz.`}
                                    </p>
                                </div>

                                {/* Highlights Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                    <div className="p-10 bg-white border border-gray-100 hover:border-[#B4943E]/30 transition-all duration-700 group">
                                        <div className="w-12 h-12 border border-gray-100 flex items-center justify-center text-[#B4943E] mb-8 group-hover:bg-[#0B1751] transition-all duration-500">
                                            <Briefcase size={20} />
                                        </div>
                                        <h4 className="text-xl font-serif font-bold text-[#0B1751] mb-4 italic">Kariyer Fırsatları</h4>
                                        <p className="text-sm text-[#0B1751]/60 font-serif italic">Mezuniyet sonrası global şirketlerde prestijli staj ve kariyer imkanları sizi bekliyor.</p>
                                    </div>
                                    <div className="p-10 bg-white border border-gray-100 hover:border-[#B4943E]/30 transition-all duration-700 group">
                                        <div className="w-12 h-12 border border-gray-100 flex items-center justify-center text-[#B4943E] mb-8 group-hover:bg-[#0B1751] transition-all duration-500">
                                            <Globe size={20} />
                                        </div>
                                        <h4 className="text-xl font-serif font-bold text-[#0B1751] mb-4 italic">Uluslararası Network</h4>
                                        <p className="text-sm text-[#0B1751]/60 font-serif italic">Dünyanın dört bir yanından gelen seçkin bir öğrenci kitlesiyle ağınızı genişletin.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Admission Requirements */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-px bg-[#B4943E]" />
                                    <h2 className="text-4xl font-serif font-bold text-[#0B1751] italic">
                                        {lang === 'de' ? 'Bewerbungsvoraussetzungen' : lang === 'en' ? 'Admission Requirements' : 'Başvuru Şartları'}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(() => {
                                        // 1. Service Slug Bul (Category enum'dan)
                                        const serviceSlug = Object.keys(serviceMap).find(
                                            key => serviceMap[key].category === program.category
                                        );

                                        // 2. Ülke Slug Normalizasyonu (Veritabanındaki ülke adını slug'a çevir)
                                        const countrySlug = institution.country.toLowerCase()
                                            .replace("ü", "u").replace("ç", "c").replace("ş", "s")
                                            .replace("ı", "i").replace("ö", "o").replace("ğ", "g");

                                        // 3. Hiyerarşik Seçim
                                        const rawRequirements =
                                            countryServiceRequirements[serviceSlug || ""]?.[countrySlug] ||
                                            categoryRequirements[program.category] ||
                                            categoryRequirements["UNIVERSITY"];

                                        const requirements = rawRequirements[lang] || rawRequirements['tr'];

                                        return requirements.map((item, i) => (
                                            <div key={i} className="flex items-start gap-5 p-8 bg-white border border-gray-100 hover:border-[#B4943E]/20 transition-all duration-500 group">
                                                <div className="w-6 h-6 border border-[#B4943E]/30 flex items-center justify-center text-[#B4943E] flex-shrink-0 group-hover:bg-[#0B1751] transition-all">
                                                    <CheckCircle2 size={12} />
                                                </div>
                                                <span className="text-[#0B1751]/70 font-serif italic text-sm">{item}</span>
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>

                        </div>

                        {/* Right Sidebar (4) - CTA */}
                        <div className="lg:col-span-4 space-y-12">
                            <div className="sticky top-32 space-y-12">
                                <div className="relative group">
                                    <div className="bg-white p-12 relative z-10 border border-gray-100 shadow-3xl">
                                        <div className="mb-10 text-center">
                                            <div className="w-12 h-px bg-[#B4943E] mx-auto mb-6" />
                                            <h3 className="text-2xl font-serif font-bold text-[#0B1751] italic">
                                                {lang === 'de' ? 'Beratungsanfrage' : lang === 'en' ? 'Consultancy Request' : 'Danışmanlık Talebi'}
                                            </h3>
                                            <p className="text-[#0B1751]/50 text-xs font-serif italic mt-4 leading-relaxed">
                                                {lang === 'de' ? `Füllen Sie das Formular aus, um detaillierte Informationen und Unterstützung für den akademischen Bewerbungsprozess von ${program.name} zu erhalten.` :
                                                 lang === 'en' ? `Fill out the form for detailed information and guidance about the ${program.name} academic application process.` :
                                                 `${program.name} akademik başvuru süreci hakkında detaylı bilgi ve rehberlik için formu doldurun.`}
                                            </p>
                                        </div>
                                        <ContactForm title={`${program.name} - ${institution.name} Başvurusu`} />
                                    </div>
                                    {/* Decorative Frame */}
                                    <div className="absolute inset-0 border border-[#B4943E]/20 translate-x-4 translate-y-4 -z-0" />
                                </div>

                                {/* Institution Mini Card */}
                                <div className="bg-[#0B1751] p-10 relative overflow-hidden group shadow-2xl">
                                    <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                                        <div className="w-24 h-24 bg-white p-1 border border-[#B4943E]/30 relative flex items-center justify-center">
                                            <Image
                                                src={institution.logo || "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"}
                                                alt={institution.name}
                                                fill
                                                className="object-contain p-2"
                                                sizes="96px"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-serif font-bold text-white italic">{institution.name}</h4>
                                            <div className="flex items-center justify-center gap-3 text-white/40 text-[10px] uppercase tracking-widest mt-4">
                                                <MapPin className="w-3 h-3 text-[#B4943E]" /> {institution.city}, {institution.country}
                                            </div>
                                        </div>
                                        <div className="w-12 h-px bg-white/10" />
                                        <Link href={`/kurumsal/kurumlar/${institution.slug}`} className="flex items-center gap-4 text-[#D3A20B] font-bold uppercase tracking-[0.3em] text-[10px] hover:text-white transition-all duration-500">
                                            Kurum Sayfasına Git <ArrowRight size={14} />
                                        </Link>
                                    </div>

                                    {/* Decorative Motif */}
                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] pointer-events-none">
                                        <div className="w-full h-full border-l border-b border-white transform skew-x-12" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
