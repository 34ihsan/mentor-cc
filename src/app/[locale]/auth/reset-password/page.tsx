"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle2, Lock } from "lucide-react";
import { resetPasswordAction } from "@/app/actions/auth-actions";
import NextImage from "next/image";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams ? searchParams.get("token") : null;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    useEffect(() => {
        if (!token) {
            setError("Geçersiz veya eksik sıfırlama kodu.");
            setStatus("error");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Şifreler eşleşmiyor.");
            return;
        }

        if (password.length < 6) {
            setError("Şifre en az 6 karakter olmalıdır.");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        const result = await resetPasswordAction(token as string, password);

        setLoading(false);
        if (result.error) {
            setError(result.error);
            setStatus("error");
        } else {
            setMessage(result.message || "");
            setStatus("success");
            // 3 saniye sonra giriş sayfasına yönlendir
            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
        }
    };

    return (
        <main className="min-h-screen bg-[#0B1751] flex font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#B4943E]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#B4943E]/5 rounded-full blur-[100px]" />

            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 z-10 w-full max-w-7xl mx-auto">
                <div className="w-full max-w-sm mx-auto">
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
                            <h2 className="text-3xl font-serif font-bold italic text-[#0B1751]">Yeni Şifre</h2>
                            <p className="text-gray-500 mt-2 text-sm">Lütfen yeni ve güvenli bir şifre belirleyin.</p>
                        </div>

                        {status === "success" ? (
                            <div className="text-center space-y-6">
                                <div className="flex justify-center">
                                    <div className="bg-green-100 p-4 rounded-full">
                                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                                    </div>
                                </div>
                                <p className="text-gray-600 font-medium">{message}</p>
                                <p className="text-xs text-gray-400 italic">Yönlendiriliyorsunuz...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Yeni Şifre</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:border-[#B4943E] focus:bg-white transition-all pl-10"
                                            placeholder="••••••••"
                                        />
                                        <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Şifre Onayı</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 text-slate-900 px-4 py-3 rounded-xl focus:outline-none focus:border-[#B4943E] focus:bg-white transition-all pl-10"
                                            placeholder="••••••••"
                                        />
                                        <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-center">
                                        <span className="text-red-500 text-sm font-medium">{error}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || !token}
                                    className="w-full bg-[#0B1751] text-[#B4943E] py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#B4943E] hover:text-[#0B1751] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70"
                                >
                                    {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                                    {!loading && <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
