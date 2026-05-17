import { Metadata } from 'next';
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Globe, GraduationCap } from 'lucide-react';
import Hero from '@/components/public/Hero';

interface UlkelerPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: UlkelerPageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Navbar' });
    const commonT = await getTranslations({ locale, namespace: 'Common' });

    // Try to get "ulkeler" or fallback to "destinations"
    let title = t('destinations');
    try {
        title = (t as any)('ulkeler');
    } catch (e) {}

    return {
        title: `${title} | Mentor Career`,
        description: commonT('description'),
    };
}
import { countryMap } from "@/lib/mappings/countries";

export default async function UlkelerPage({ params }: UlkelerPageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'HomePage.Destinations' });
    const navT = await getTranslations({ locale, namespace: 'Navbar' });
    const commonT = await getTranslations({ locale, namespace: 'Common' });
    
    const countries = await prisma.country.findMany({
        where: { active: true },
        orderBy: { name: 'asc' }
    });

    // Try to get "ulkeler" or fallback
    let pageTitle = navT('destinations');
    try {
        pageTitle = (navT as any)('ulkeler') || navT('destinations');
    } catch (e) {}

    return (
        <main className="min-h-screen bg-white">
            <Hero 
                title={pageTitle}
                subtitle={t('desc')}
                backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
                height="lg"
            />

            <section className="section-padding">
                <div className="container-content">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {countries.map((country, idx) => (
                            <Link
                                key={country.id}
                                href={`/rotalar/${country.slug}`}
                                className="group relative h-[450px] overflow-hidden rounded-[2.5rem] border border-zinc-200/50 shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0 bg-primary">
                                    <Image
                                        src={countryMap[country.slug as keyof typeof countryMap]?.image || country.image || "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200"}
                                        alt={country.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-70"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-white">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-[1px] bg-secondary transition-all duration-700 group-hover:w-16" />
                                            <span className="text-[10px] font-black text-secondary tracking-[0.2em] uppercase">
                                                {pageTitle.toUpperCase()}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-serif font-bold italic leading-tight group-hover:text-secondary transition-colors duration-500">
                                            {locale === 'en' ? (country as any).name_en || country.name : 
                                             locale === 'de' ? (country as any).name_de || country.name : 
                                             country.name}
                                        </h3>
                                        
                                        <div className="flex flex-wrap gap-4 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                                            {country.capital && (
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                                                    <MapPin size={12} className="text-secondary" />
                                                    {country.capital}
                                                </div>
                                            )}
                                            {country.language && (
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                                                    <Globe size={12} className="text-secondary" />
                                                    {country.language}
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-4 flex items-center gap-3 text-[11px] font-black tracking-[0.3em] uppercase text-secondary">
                                            {commonT('viewDetails')} <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
