"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { forgotPasswordAction } from "@/app/actions/auth-actions";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const result = await forgotPasswordAction(email);

            if (!result) {
                setError("Sunucu ile iletişim kurulamadı. Lütfen ağı kontrol edin.");
                setStatus("error");
            } else if (result.error) {
                setError(result.error);
                setStatus("error");
            } else {
                setMessage(result.message || "");
                setStatus("success");
            }
        } catch (err) {
            console.error("Client Error:", err);
            setError("Beklenmedik bir hata oluştu.");
            setStatus("error");
        } finally {
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
                    <Link href="/auth/login" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 text-sm font-bold tracking-widest uppercase">
                        <ArrowLeft className="w-4 h-4" /> Giriş Sayfasına Dön
                    </Link>

                    <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-black/50 border border-white/10 relative">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl border border-gray-100 shadow-xl">
                            <img src="/images/stareducon-logo.svg" alt="Logo" className="w-16 h-16 object-contain" />
                        </div>

                        <div className="mt-8 text-center mb-10">
                            <h2 className="text-3xl font-serif font-bold italic text-[#0B1751]">Şifre Sıfırlama</h2>
                            <p className="text-gray-500 mt-2 text-sm">E-posta adresinizi girin, size bir sıfırlama linki gönderelim.</p>
                        </div>

                        {status === "success" ? (
                            <div className="text-center space-y-6">
                                <div className="flex justify-center">
                                    <div className="bg-green-100 p-4 rounded-full">
                                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                                    </div>
                                </div>
                                <p className="text-gray-600 font-medium">{message}</p>
                                <Link 
                                    href="/auth/login"
                                    className="block w-full bg-[#0B1751] text-[#B4943E] py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#B4943E] hover:text-[#0B1751] transition-all duration-300"
                                >
                                    Giriş Sayfasına Dön
                                </Link>
                            </div>
                        ) : (
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
                                    {loading ? 'Gönderiliyor...' : 'Sıfırlama Linki Gönder'}
                                    {!loading && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
