"use client";

import {
    Search,
    Sparkles,
    ArrowRight,
    Globe,
    School,
    GraduationCap,
    Building2,
    Compass,
    Navigation,
    BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NewApplicationPage() {
    const { data: session } = useSession();

    const discoverySteps = [
        {
            icon: Compass,
            title: "Kurumları Keşfet",
            desc: "Global partner ağımızdaki 500+ üniversite ve dil okulunu ana sayfamızdaki keşif araçlarıyla inceleyin.",
            link: "/",
            color: "blue"
        },
        {
            icon: BookOpen,
            title: "Programını Seç",
            desc: "Hayallerinizdeki eğitimi bulmak için gelişmiş filtreleme özelliklerimizi kullanarak programları kıyaslayın.",
            link: "/programlar/universite-egitimi",
            color: "emerald"
        },
        {
            icon: Navigation,
            title: "Başvuru Başlat",
            desc: "Seçtiğiniz kurumun sayfasındaki 'Başvuruyu Başlat' formunu doldurarak profesyonel sürecinizi başlatın.",
            link: "/",
            color: "amber"
        }
    ];

    return (
        <div className="space-y-12 pb-20 max-w-6xl mx-auto">
            {/* Professional Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] p-12 lg:p-16 bg-slate-950 text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full -mr-64 -mt-64 blur-[100px] opacity-50" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-600/10 rounded-full -ml-32 -mb-32 blur-[80px] opacity-30" />

                <div className="relative z-10 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-6"
                    >
                        <Sparkles size={16} />
                        KİŞİSELLEŞTİRİLMİŞ BAŞVURU YOLCULUĞU
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-6xl font-black tracking-tightest leading-[1.1] mb-8"
                    >
                        Geleceğinizi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Şekillendirmeye</span> Buradan Başlayın.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg font-medium leading-relaxed mb-10"
                    >
                        Başvuru sürecinizi en profesyonel şekilde yönetmek için, kurum seçimini ana sitemiz üzerinden yapmanızı öneriyoruz. Seçiminizi yaptıktan sonra buradaki panelinizden tüm süreci anlık olarak takip edebileceksiniz.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-4 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                        >
                            Keşfe Hemen Başla <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Steps Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {discoverySteps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                        className="glass-card p-10 group hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden"
                    >
                        <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                            <step.icon size={28} className="text-slate-900" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 italic mb-4">{step.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                            {step.desc}
                        </p>
                        <Link
                            href={step.link}
                            className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 group/link"
                        >
                            İncele <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Categories Redirection */}
            <div className="glass-card p-12 bg-slate-50/50 border-dashed border-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Hangi Eğitimle İlgileniyorsunuz?</h2>
                        <p className="text-slate-500 font-medium">Doğrudan ilgili kategoriye giderek programları keşfedebilirsiniz.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: "Üniversite", href: "/programlar/universite-egitimi", icon: School },
                            { label: "Dil Okulu", href: "/programlar/dil-okullari", icon: Globe },
                            { label: "Yaz Okulu", href: "/programlar/yaz-okullari", icon: Sparkles },
                            { label: "Lise Değişim", href: "/programlar/lise-egitimi", icon: GraduationCap }
                        ].map((cat) => (
                            <Link
                                key={cat.label}
                                href={cat.href}
                                className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-400 hover:shadow-md transition-all text-xs font-bold text-slate-700"
                            >
                                <cat.icon size={16} className="text-slate-400" />
                                {cat.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
