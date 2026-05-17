"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Phone,
    ArrowRight,
    Briefcase,
    GraduationCap,
    Loader2,
    CheckCircle2,
    ChevronLeft,
    ShieldCheck,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";

type Role = "STUDENT" | "AGENCY_MANAGER";

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<Role>("STUDENT");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Şifreler eşleşmiyor.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    phone: formData.phone,
                    companyName: role === "AGENCY_MANAGER" ? formData.companyName : undefined,
                    role: role,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Kayıt sırasında bir hata oluştu.");
            }

            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                router.push("/auth/login?registered=true");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <main className="min-h-screen bg-[#0B1751] flex font-sans relative overflow-hidden py-20 px-4">
            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#B4943E]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#B4943E]/5 rounded-full blur-[100px]" />

            <div className="container mx-auto max-w-5xl z-10">
                <div className="flex flex-col items-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 text-sm font-bold tracking-widest uppercase">
                        <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
                    </Link>

                    <div className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-black/50 border border-white/10 overflow-hidden grid lg:grid-cols-[0.4fr_0.6fr]">
                        
                        {/* Summary Side */}
                        <div className="bg-[#0B1751] p-12 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1751] via-[#0B1751] to-[#003366] opacity-90" />
                            
                            <div className="relative z-10">
                                <Link href="/" className="inline-flex items-center gap-4 mb-20">
                                    <div className="w-12 h-12 bg-[#B4943E] rounded-2xl flex items-center justify-center text-[#0B1751] shadow-lg">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <span className="text-2xl font-serif font-bold italic tracking-tighter">Mentor Career</span>
                                </Link>

                                <div className="space-y-8">
                                    <h1 className="text-4xl font-serif italic leading-tight">
                                        Geleceğiniz <br /> <span className="text-[#B4943E] font-black not-italic">Globale</span> <br /> Taşınsın.
                                    </h1>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                                        Dünyanın en prestijli eğitim kurumları ile aranızdaki en güçlü bağ. Danışmanlık platformuna bugün katılın.
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 pt-20">
                                <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-black/50 border border-white/10 relative">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl border border-gray-100 shadow-xl">
                                        <NextImage 
                                            src="/images/MentorCareer.png" 
                                            alt="Logo" 
                                            width={64} 
                                            height={64} 
                                            priority
                                            className="w-16 h-16 object-contain" 
                                            style={{ width: "auto", height: "auto" }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 mt-8">
                                        <div className="w-10 h-10 bg-[#B4943E]/20 rounded-xl flex items-center justify-center text-[#B4943E]">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#0B1751]">Resmi Partnerlik</div>
                                            <div className="text-[10px] text-gray-400">500+ Küresel Üniversite</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="p-12 lg:p-16 bg-white overflow-hidden flex flex-col">
                            <div className="mb-12 flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-serif font-bold text-[#0B1751] italic">Kayıt Ol</h2>
                                    <p className="text-gray-400 mt-2 text-sm">Hangi rol ile kayıt olmak istersiniz?</p>
                                </div>
                                <Link href="/auth/login" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0B1751] transition-all flex items-center gap-2">
                                    Giriş Yap <ArrowRight size={14} className="text-[#B4943E]" />
                                </Link>
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        {...fadeInUp}
                                        className="space-y-8 flex-grow flex flex-col justify-center"
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <button
                                                onClick={() => setRole("STUDENT")}
                                                className={`p-8 rounded-3xl border-2 transition-all text-left flex flex-col gap-6 group ${role === "STUDENT" ? 'border-[#B4943E] bg-[#B4943E]/5 shadow-xl shadow-[#B4943E]/5' : 'border-gray-50 hover:border-gray-100'}`}
                                            >
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${role === "STUDENT" ? 'bg-[#B4943E] text-[#0B1751]' : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100'}`}>
                                                    <GraduationCap size={28} />
                                                </div>
                                                <div>
                                                    <h3 className={`font-black uppercase tracking-widest text-[10px] mb-2 ${role === "STUDENT" ? 'text-[#0B1751]' : 'text-gray-400'}`}>Öğrenci Kaydı</h3>
                                                    <p className="text-[#0B1751]/70 text-[11px] leading-relaxed">Başvurularını yönet, teklif al.</p>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => setRole("AGENCY_MANAGER")}
                                                className={`p-8 rounded-3xl border-2 transition-all text-left flex flex-col gap-6 group ${role === "AGENCY_MANAGER" ? 'border-[#0B1751] bg-[#0B1751]/5 shadow-xl shadow-[#0B1751]/5' : 'border-gray-50 hover:border-gray-100'}`}
                                            >
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${role === "AGENCY_MANAGER" ? 'bg-[#0B1751] text-white' : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100'}`}>
                                                    <Briefcase size={28} />
                                                </div>
                                                <div>
                                                    <h3 className={`font-black uppercase tracking-widest text-[10px] mb-2 ${role === "AGENCY_MANAGER" ? 'text-[#0B1751]' : 'text-gray-400'}`}>Acente Kaydı</h3>
                                                    <p className="text-[#0B1751]/70 text-[11px] leading-relaxed">Öğrenci portfolyosu yönet.</p>
                                                </div>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setStep(2)}
                                            className="w-full py-5 bg-[#0B1751] text-[#B4943E] font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-[#B4943E] hover:text-[#0B1751] transition-all shadow-xl flex items-center justify-center gap-3 group mt-4"
                                        >
                                            Bilgileri Doldur <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        {...fadeInUp}
                                        className="space-y-6 flex-grow"
                                    >
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0B1751] transition-all flex items-center gap-2 mb-6"
                                        >
                                            <ChevronLeft size={14} className="text-[#B4943E]" /> Seçime Dön
                                        </button>

                                        {error && (
                                            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[11px] font-bold border border-red-100 text-center">
                                                {error}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Ad Soyad</label>
                                                    <div className="relative">
                                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                        <input
                                                            type="text" required
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            className="w-full pl-14 pr-6 py-4 rounded-xl border border-gray-100 focus:border-[#B4943E] transition-all outline-none bg-gray-50 text-[13px] font-bold"
                                                            placeholder="Ad Soyad"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">E-posta</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                        <input
                                                            type="email" required
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            className="w-full pl-14 pr-6 py-4 rounded-xl border border-gray-100 focus:border-[#B4943E] transition-all outline-none bg-gray-50 text-[13px] font-bold"
                                                            placeholder="email@adres.com"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Telefon</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                        <input
                                                            type="tel"
                                                            value={formData.phone}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full pl-14 pr-6 py-4 rounded-xl border border-gray-100 focus:border-[#B4943E] transition-all outline-none bg-gray-50 text-[13px] font-bold"
                                                            placeholder="05xx..."
                                                        />
                                                    </div>
                                                </div>
                                                {role === "AGENCY_MANAGER" && (
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Şirket Adı</label>
                                                    <div className="relative">
                                                        <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                        <input
                                                            type="text" required
                                                            value={formData.companyName}
                                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                            className="w-full pl-14 pr-6 py-4 rounded-xl border border-gray-100 focus:border-[#B4943E] transition-all outline-none bg-gray-50 text-[13px] font-bold"
                                                            placeholder="Acente Adı"
                                                        />
                                                    </div>
                                                </div>
                                                )}
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Şifre</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                        <input
                                                            type="password" required
                                                            value={formData.password}
                                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                            className="w-full pl-14 pr-6 py-4 rounded-xl border border-gray-100 focus:border-[#B4943E] transition-all outline-none bg-gray-50 text-[13px] font-bold"
                                                            placeholder="••••••••"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1">Şifre Onayı</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                        <input
                                                            type="password" required
                                                            value={formData.confirmPassword}
                                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                            className="w-full pl-14 pr-6 py-4 rounded-xl border border-gray-100 focus:border-[#B4943E] transition-all outline-none bg-gray-50 text-[13px] font-bold"
                                                            placeholder="••••••••"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full py-5 bg-[#0B1751] text-[#B4943E] font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-[#B4943E] hover:text-[#0B1751] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 mt-6"
                                            >
                                                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                                    <>Kayıt İşlemini Tamamla <ArrowRight size={16} /></>
                                                )}
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-auto pt-12 text-center">
                                <p className="text-[9px] text-gray-300 leading-relaxed uppercase tracking-widest">
                                    Mentor Career &copy; {new Date().getFullYear()} - Elit Eğitim Partneriniz
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
