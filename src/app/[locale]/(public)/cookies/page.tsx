'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Settings, Lock, Info, AlertCircle, Cookie } from 'lucide-react';

export default function CookiePolicy() {
    return (
        <main className="min-h-screen bg-background text-navy">
             {/* Simple Hero */}
             <div className="relative pt-48 pb-20 bg-slate-50 border-b border-gold/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-label !justify-center mb-8"
                    >
                        Transparency Notice
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-7xl font-serif font-bold text-navy mb-8 italic"
                    >
                        Çerez <span className="gold-text not-italic">Politikası</span>
                    </motion.h1>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto italic leading-relaxed">
                        StarEducation platformunda dijital deneyiminizi optimize etmek ve size özel akademik içerikler 
                        sunmak adına kullandığımız çerez teknolojileri hakkında şeffaf bilgilendirme.
                    </p>
                </div>
            </div>

            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-20">
                        {/* Intro */}
                        <div className="prose prose-slate prose-gold lg:prose-xl max-w-none">
                            <h2 className="text-3xl font-serif font-bold text-navy italic mb-6">1. Çerez Nedir?</h2>
                            <p className="text-slate-500 italic leading-relaxed">
                                Çerezler (Cookies), bir web sitesini ziyaret ettiğinizde cihazınıza (bilgisayar, akıllı telefon, tablet) depolanan küçük metin dosyalarıdır. 
                                Bu dosyalar, siteyi daha verimli kullanmanıza yardımcı olur, tercihlerinizi hatırlar ve bize kullanıcı davranışları hakkında anonim veriler sağlar.
                            </p>
                        </div>

                        {/* Cookie Categories */}
                        <div className="space-y-12">
                            <h2 className="text-3xl font-serif font-bold text-navy italic">2. Çerez Kategorilerimiz</h2>
                            
                            <div className="grid gap-8">
                                <div className="p-10 border border-gold/10 bg-slate-50/50 group hover:bg-white hover:shadow-2xl transition-all duration-700">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-slate-50 border border-gold/20 text-gold flex items-center justify-center shrink-0 shadow-lg group-hover:bg-gold group-hover:text-white transition-all duration-500">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-serif font-bold text-navy mb-3 italic">Zorunlu Çerezler (Necessary)</h4>
                                            <p className="text-sm text-slate-500 italic leading-relaxed">
                                                Web sitemizin temel fonksiyonlarının çalışması için elzemdir. Güvenlik, oturum yönetimi ve ağ yönetimi gibi kritik süreçleri yönetir. Bu çerezler olmadan sitemiz düzgün çalışamaz.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 border border-gold/10 bg-slate-50/50 group hover:bg-white hover:shadow-2xl transition-all duration-700">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-navy text-gold flex items-center justify-center shrink-0 shadow-lg">
                                            <Settings size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-serif font-bold text-navy mb-3 italic">Performans ve Analitik Çerezler</h4>
                                            <p className="text-sm text-slate-500 italic leading-relaxed">
                                                Sitemizin nasıl kullanıldığını anlamamıza yardımcı olur. Ziyaretçi sayıları, en çok tıklanan sayfalar ve hata mesajları gibi verileri anonim olarak toplayarak sitemizin performansını artırmamızı sağlar.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 border border-gold/10 bg-slate-50/50 group hover:bg-white hover:shadow-2xl transition-all duration-700">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-navy text-gold flex items-center justify-center shrink-0 shadow-lg">
                                            <Cookie size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-serif font-bold text-navy mb-3 italic">Pazarlama ve Hedefleme Çerezleri</h4>
                                            <p className="text-sm text-slate-500 italic leading-relaxed">
                                                Size daha ilgi çekici ve kişiselleştirilmiş içerikler sunmak için kullanılır. İlgi alanlarınıza yönelik akademik program duyuruları ve kampanyaları optimize etmemize olanak tanır.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Management */}
                        <div className="p-12 bg-slate-50 border border-gold/10 text-navy relative overflow-hidden group shadow-xl">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <Lock size={120} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-6 italic text-navy">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-8 italic">
                                Tarayıcınızın ayarlarını değiştirerek çerezleri kabul edebilir, engelleyebilir veya silebilirsiniz. Ancak, zorunlu çerezlerin kapatılması durumunda sitemizdeki bazı özelliklerin tam performanslı çalışmayabileceğini unutmayınız.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="https://support.google.com/chrome/answer/95647" target="_blank" className="text-[10px] uppercase tracking-widest font-bold text-gold border border-gold/20 px-4 py-2 hover:bg-gold hover:text-white transition-all">Chrome</a>
                                <a href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac" target="_blank" className="text-[10px] uppercase tracking-widest font-bold text-gold border border-gold/20 px-4 py-2 hover:bg-gold hover:text-white transition-all">Safari</a>
                                <a href="https://support.microsoft.com/tr-tr/windows/tanımlama-bilgilerini-silme-ve-yönetme-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" className="text-[10px] uppercase tracking-widest font-bold text-gold border border-gold/20 px-4 py-2 hover:bg-gold hover:text-white transition-all">Microsoft Edge</a>
                            </div>
                        </div>

                        {/* Legal Note */}
                        <div className="flex items-center gap-6 p-10 bg-gold/5 border border-gold/10">
                            <AlertCircle className="text-gold shrink-0" size={24} />
                            <p className="text-xs text-slate-500 italic leading-relaxed">
                                Çerez politikamız, değişen teknoloji ve yasal mevzuatlara (KVKK/GDPR) uyum sağlamak amacıyla periyodik olarak güncellenmektedir. En güncel sürüm her zaman bu sayfada yer alacaktır.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
