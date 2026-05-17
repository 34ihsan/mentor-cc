"use client";

import React from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingContact() {
    const [isOpen, setIsOpen] = React.useState(false);

    const whatsappNumber = "905000000000"; // Placeholder, should be configurable
    const whatsappMessage = encodeURIComponent("Merhaba, yurtdışı eğitim danışmanlığı hakkında bilgi almak istiyorum.");

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white border border-zinc-100 shadow-premium-hover rounded-[2rem] p-6 mb-2 w-72"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-serif font-bold italic text-primary">Uzman Desteği</h3>
                            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-950 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <a 
                                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <MessageCircle size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">WhatsApp</span>
                                    <span className="text-sm font-serif italic text-zinc-900 group-hover:text-primary transition-colors">Mesaj Gönder</span>
                                </div>
                            </a>
                            <a 
                                href="tel:+905000000000"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary text-secondary flex items-center justify-center shadow-lg">
                                    <Phone size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Hızlı Arama</span>
                                    <span className="text-sm font-serif italic text-zinc-900 group-hover:text-primary transition-colors">Hemen Ara</span>
                                </div>
                            </a>
                        </div>
                        <p className="mt-6 text-[9px] uppercase tracking-[0.3em] font-bold text-center text-zinc-400 animate-pulse">
                            Çevrimiçi Uzmanlar
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-primary text-secondary rounded-full flex items-center justify-center shadow-premium-hover hover:scale-110 active:scale-95 transition-all duration-300 relative group"
            >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 group-hover:opacity-30" />
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
}
