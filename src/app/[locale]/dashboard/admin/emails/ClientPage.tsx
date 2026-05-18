"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { sendCustomEmailAction } from "@/app/actions/email-actions";

export default function ClientPage() {
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsPending(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const result = await sendCustomEmailAction(formData);

        if (result.success) {
            setMessage({ type: "success", text: "E-posta başarıyla gönderildi!" });
            (e.target as HTMLFormElement).reset(); // Clear form on success
        } else {
            setMessage({ type: "error", text: result.error || "Gönderim sırasında bir hata oluştu." });
        }

        setIsPending(false);
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                        <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-primary">E-posta Yönetimi</h1>
                        <p className="text-sm text-zinc-500">info@mentor-cc.com üzerinden manuel e-posta gönderin.</p>
                    </div>
                </div>
            </motion.div>

            {/* Main Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden"
            >
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {message && (
                            <div className={`p-4 rounded-xl flex items-start gap-3 ${
                                message.type === 'success' 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                    : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                                {message.type === 'success' ? (
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                )}
                                <p className="text-sm font-medium">{message.text}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="to" className="block text-sm font-semibold text-zinc-700 mb-1">
                                    Alıcı E-posta Adresi
                                </label>
                                <input
                                    type="email"
                                    id="to"
                                    name="to"
                                    required
                                    placeholder="ornek@kullanici.com"
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-zinc-700 mb-1">
                                    Konu
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    placeholder="E-posta konusunu giriniz..."
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="html" className="block text-sm font-semibold text-zinc-700 mb-1">
                                    Mesaj İçeriği
                                </label>
                                <textarea
                                    id="html"
                                    name="html"
                                    required
                                    rows={8}
                                    placeholder="Mesajınızı buraya yazabilirsiniz. Satır atlamaları karşı tarafa yansıyacaktır."
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-y"
                                ></textarea>
                                <p className="text-xs text-zinc-400 mt-2">
                                    Not: E-postanız kurumsal <strong>Mentor Career</strong> şablonu içine gömülerek gönderilecektir. Alt kısımda otomatik imza yer alır.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        <span>Gönderiliyor...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>E-postayı Gönder</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
