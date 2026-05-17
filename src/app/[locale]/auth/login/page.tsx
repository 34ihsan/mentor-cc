"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft } from "lucide-react";
import NextImage from "next/image";
import { loginAction } from "@/app/actions/auth-actions";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            
            const result = await loginAction(formData);

            if (result?.error) {
                console.error("Login error details:", result.error);
                setError(result.error);
                setLoading(false);
            }
            // Başarılı girişte NextAuth redirectTo üzerinden otomatik yönlendirme yapar
        } catch (error: any) {
            // Redirect hatalarını yakalamıyoruz çünkü NextAuth yönlendirmeyi "error" olarak fırlatır
            if (error.message?.includes("NEXT_REDIRECT")) {
                return;
            }
            console.error("Login unexpected error:", error);
            setError("Giriş yapılırken bir hata oluştu.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0B1751] flex font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#B4943E]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#B4943E]/5 rounded-full blur-[100px]" />

            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 z-10 w-full max-w-7xl mx-auto">
                <div className="w-full max-w-sm mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 text-sm font-bold tracking-widest uppercase">
                        <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
                    </Link>

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

                        <div className="mt-8 text-center mb-10">
                            <h2 className="text-3xl font-serif font-bold italic text-[#0B1751]">Hoş Geldiniz</h2>
                            <p className="text-gray-500 mt-2 text-sm">Hesabınıza giriş yaparak sürece devam edin.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">E-posta</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:border-[#B4943E] focus:bg-white transition-all"
                                    placeholder="ornek@email.com"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Şifre</label>
                                    <Link href="/auth/forgot-password" title="Şifremi Unuttum" className="text-[11px] text-[#0B1751] hover:text-[#B4943E] font-bold">Şifremi Unuttum</Link>
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:border-[#B4943E] focus:bg-white transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-center">
                                    <span className="text-red-500 text-sm font-medium">{error}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#0B1751] text-[#B4943E] py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#B4943E] hover:text-[#0B1751] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70"
                            >
                                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>


                    </div>

                    <div className="mt-10 text-center">
                       <p className="text-white/60 text-sm">
                           Hesabınız yok mu? <Link href="/auth/register" className="text-[#B4943E] font-bold hover:text-white transition-colors">Hemen Kayıt Olun</Link>
                       </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
