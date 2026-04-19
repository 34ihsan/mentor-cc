import React from 'react';
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InstitutionsClient from "@/components/public/InstitutionsClient";

export const metadata: Metadata = {
    title: 'Partner Kurumlarımız | Global Akademik Portföy | StarEducation',
    description: 'Dünyanın en saygın üniversiteleri ve eğitim kurumları ile kurduğumuz stratejik iş birlikleriyle geleceğinizi şekillendiriyoruz.',
};

export default async function InstitutionsPage() {
    // Server-side data fetching
    const [institutions, countries] = await Promise.all([
        prisma.institution.findMany({
            where: { active: true },
            include: { country: true }
        }),
        prisma.country.findMany()
    ]);

    return (
        <main className="min-h-screen bg-background text-navy selection:bg-gold selection:text-white">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center bg-slate-50 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-slate-50/80 to-slate-50 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(212,175,55,0.05),_transparent_70%)] z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1523050335392-4945e3518227?q=80&w=2000"
                        alt="Kurumlar"
                        fill
                        priority
                        className="object-cover opacity-10 grayscale"
                        sizes="100vw"
                    />
                </div>

                <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
                    <div className="max-w-4xl">
                        <div className="section-label mb-8">
                            GLOBAL AKADEMİK PORTFÖY
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-navy mb-8 tracking-tight leading-[0.9] italic">
                            Partner <span className="gold-text not-italic">Kurumlarımız</span>
                        </h1>

                        <p className="text-lg md:text-xl font-sans leading-relaxed border-l border-gold/30 pl-8 mb-12 opacity-80 text-slate-600">
                            Dünyanın en saygın üniversiteleri ve eğitim kurumları ile kurduğumuz stratejik iş birlikleriyle geleceğinizi şekillendiriyoruz.
                        </p>
                    </div>
                </div>
            </div>

            {/* Institutions Client Side Filtering */}
            <InstitutionsClient 
                initialInstitutions={JSON.parse(JSON.stringify(institutions))} 
                countries={JSON.parse(JSON.stringify(countries))} 
            />

            {/* CTA Section */}
            <section className="py-40 bg-slate-50 border-t border-gold/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05),_transparent_70%)]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="section-label !justify-center mb-10">BİZE DANIŞIN</span>
                    <h2 className="text-4xl md:text-8xl font-serif font-bold text-navy mb-12 leading-tight italic">
                        Hayalinizdeki Kurumu <br />
                        <span className="gold-text not-italic text-5xl md:text-9xl">Birlikte Bulalım</span>
                    </h2>
                    <p className="text-slate-600 text-2xl font-sans italic mb-16 max-w-3xl mx-auto opacity-70">
                        Hangi eğitim kurumunun sizin hedefleriniz için en uygun olduğunu belirlemek için uzman akademik kadromuzdan ücretsiz strateji seansı alabilirsiniz.
                    </p>
                    <Link href="/iletisim" className="btn-gold !px-20 !py-7 text-sm tracking-[0.5em] font-bold">
                        ÜCRETSİZ DANIŞMANLIK AL
                    </Link>
                </div>
            </section>
        </main>
    );
}
