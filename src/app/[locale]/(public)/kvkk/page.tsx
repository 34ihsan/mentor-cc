'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Globe, Scale, BookOpen, AlertCircle, FileText, Fingerprint } from 'lucide-react';

const complianceSections = [
    {
        id: "kvkk",
        title: "KVKK (Türkiye)",
        icon: <ShieldCheck className="w-5 h-5" />,
        content: `
            <div class="space-y-12">
                <div>
                    <h3 class="text-3xl font-serif font-bold text-navy mb-8 italic">6698 Sayılı KVKK ve Stratejik Tasarruf İlkeleri</h3>
                    <p class="text-lg opacity-80 leading-relaxed italic border-l-4 border-gold pl-8">
                        Mentor Career, akademik danışmanlık süreçlerinde toplanan her bir veri parçasını, "Stratejik Şeffaflık" ilkesi gereği sadece kanuni bir zorunluluk olarak değil, bir güven emaneti olarak görür. 
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-10">
                    <div class="space-y-4">
                        <h4 class="text-navy font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs">01</span>
                            Veri Sorumlusu Kimliği
                        </h4>
                        <p class="text-sm text-slate-500 leading-relaxed italic opacity-80">
                            Mentor Career Yurtdışı Eğitim Danışmanlığı, veri sorumlusu sıfatıyla, kurumsal kimliğimiz altında işlenen tüm verilerin güvenliğini uluslararası siber güvenlik protokolleri çerçevesinde temin eder.
                        </p>
                    </div>
                    <div class="space-y-4">
                        <h4 class="text-navy font-bold flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs">02</span>
                            İşleme Metotları
                        </h4>
                        <p class="text-sm text-slate-500 leading-relaxed italic opacity-80">
                            Verileriniz; sadece başvuru ve vize süreçlerinin kusursuz yönetimi, kurumsal stratejik analizler ve size özel akademik kariyer planlaması amacıyla "veri minimizasyonu" prensibiyle işlenir.
                        </p>
                    </div>
                </div>

                <div class="p-10 bg-slate-50 border border-gold/10 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-5"><Scale size={120} /></div>
                    <h4 class="text-xl font-serif font-bold text-navy mb-6 italic">Veri Sahibi Hakları (Madde 11)</h4>
                    <p class="text-sm text-slate-500 mb-8 italic">Kanun uyarınca sahip olduğunuz geniş haklar şunlardır:</p>
                    <ul class="grid md:grid-cols-2 gap-4 text-xs font-bold text-navy/70 uppercase tracking-widest list-none p-0">
                        <li class="flex items-center gap-3"><div class="w-1.5 h-1.5 bg-gold rounded-full"></div> Bilgi Talep Etme</li>
                        <li class="flex items-center gap-3"><div class="w-1.5 h-1.5 bg-gold rounded-full"></div> İşleme Amacını Denetleme</li>
                        <li class="flex items-center gap-3"><div class="w-1.5 h-1.5 bg-gold rounded-full"></div> Düzeltme & Güncelleme</li>
                        <li class="flex items-center gap-3"><div class="w-1.5 h-1.5 bg-gold rounded-full"></div> Silme & Yok Etme</li>
                    </ul>
                </div>

                <div class="p-10 border-l-4 border-navy bg-slate-50">
                    <h4 class="text-xl font-serif font-bold text-navy mb-4 italic">Algoritmik Şeffaflık</h4>
                    <p class="text-sm text-slate-500 italic leading-relaxed">
                        Üniversite eşleştirme ve kabul olasılığı analizlerinde kullanılan <strong>Yapay Zeka (AI) algoritmalarımız</strong>, tamamen veri güvenliği protokollerine tabidir. Bu sistemler, adayların profillerini objektif kriterlerle analiz ederek karar destek mekanizması olarak çalışır; son karar daima uzman danışmanlarımızın denetimindedir.
                    </p>
                </div>
            </div>
        `
    },
    {
        id: "gdpr",
        title: "GDPR / DSGVO (EU & Germany)",
        icon: <Globe className="w-5 h-5" />,
        content: `
            <div class="space-y-12">
                <div>
                    <h3 class="text-3xl font-serif font-bold text-navy mb-8 italic">Global Standards: GDPR & DSGVO Compliance</h3>
                    <p class="text-lg opacity-80 leading-relaxed italic border-l-4 border-gold pl-8">
                        Operating at the intersection of global education, Mentor Career strictly integrates European Council standards into every data touchpoint for our EU-based students and partner institutions.
                    </p>
                </div>

                <div class="space-y-8">
                    <div class="border-b border-gold/10 pb-8">
                        <h4 class="font-bold text-navy mb-4 flex items-center gap-3 uppercase tracking-widest text-xs">
                             <FileText size={16} class="text-gold" />
                             Art. 6 - Lawfulness of Processing
                        </h4>
                        <p class="text-sm text-slate-500 italic leading-relaxed">
                            Our primary legal basis for data handling in Germany and the EU is the **performance of a contract (Art. 6(1)(b))**. We only collect datasets essential for securing university admissions and managing international student mobility.
                        </p>
                    </div>

                    <div class="border-b border-gold/10 pb-8">
                        <h4 class="font-bold text-navy mb-4 flex items-center gap-3 uppercase tracking-widest text-xs">
                             <Globe size={16} class="text-gold" />
                             Cross-Border Data Flows (SCCs)
                        </h4>
                        <p class="text-sm text-slate-500 italic leading-relaxed">
                            Transferring data to universities in Non-EU countries (e.g., USA, UK, Canada) is governed by <strong>Standard Contractual Clauses (SCCs)</strong> issued by the European Commission, ensuring your personal identity remains under EU-equivalent protection everywhere.
                        </p>
                    </div>

                    <div class="border-b border-gold/10 pb-8">
                        <h4 class="font-bold text-navy mb-4 flex items-center gap-3 uppercase tracking-widest text-xs">
                             <Fingerprint size={16} class="text-gold" />
                             Right to be Forgotten
                        </h4>
                        <p class="text-sm text-slate-500 italic leading-relaxed">
                            Under Art. 17 GDPR, any data subject can request the immediate and irreversible deletion of their private records once the consulting lifecycle reaches its conclusion, provided no legal retention periods (e.g., German HGB/AO) apply.
                        </p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: "privacy",
        title: "Veri Güvenliği Standartları",
        icon: <Lock className="w-5 h-5" />,
        content: `
            <div class="space-y-12">
                <div>
                    <h3 class="text-3xl font-serif font-bold text-navy mb-8 italic">Mükemmeliyetçi Veri Koruma Protokolleri</h3>
                    <p class="text-lg opacity-80 leading-relaxed italic border-l-4 border-gold pl-8">
                        Akademik verileriniz, Mentor Career siber savunma mimarisinin en kalbinde, en yüksek şifreleme katmanlarıyla korunur. Güvenlik, bizim için dijital bir dekordan öte, operasyonel bir varlık sebebidir.
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    <div class="p-8 border border-gold/5 bg-slate-50 group hover:bg-gold/10 transition-all duration-700">
                        <h5 class="text-xs font-bold uppercase tracking-widest text-gold mb-6">Teknik Savunma</h5>
                        <p class="text-[13px] leading-relaxed italic opacity-80 text-navy">256-bit AES şifreleme, çift faktörlü yetkilendirme (2FA) ve her çeyrek dönemde gerçekleştirilen profesyonel sızma testleri.</p>
                    </div>
                    <div class="p-8 border border-gold/5 bg-slate-50 group hover:bg-gold/10 transition-all duration-700">
                        <h5 class="text-xs font-bold uppercase tracking-widest text-gold mb-6">İdari Tedbirler</h5>
                        <p class="text-[13px] leading-relaxed italic opacity-80 text-navy">Tüm personelimiz periyodik veri güvenliği akademilerinden geçer ve veriye erişim "sadece bilmesi gereken" hiyerarşisiyle sınırlanır.</p>
                    </div>
                </div>

                <div class="p-10 border-l-4 border-gold bg-slate-50">
                    <h4 class="text-xl font-serif font-bold text-navy mb-4 italic">Veri İhlal Yönetimi</h4>
                    <p class="text-sm text-slate-500 italic leading-relaxed">
                        Olası bir güvenlik açığı durumunda, Mentor Career "72 Saat Kuralı"nı uygulayarak hem ilgili makamlara hem de size anında stratejik bildirim yapmayı taahhüt eder.
                    </p>
                </div>
            </div>
        `
    },
    {
        id: "cookies",
        title: "Çerez Politikası",
        icon: <Eye className="w-5 h-5" />,
        content: `
            <div class="space-y-12">
                <div>
                    <h3 class="text-3xl font-serif font-bold text-navy mb-8 italic">Deneyim Tasarımı ve Çerez Yönetimi</h3>
                    <p class="text-lg opacity-80 leading-relaxed italic border-l-4 border-gold pl-8">
                        Dijital platformumuzu kullanırken size en akıcı ve kişiselleştirilmiş deneyimi sunabilmek için minimal düzeyde çerez teknolojileri kullanıyoruz.
                    </p>
                </div>

                <div class="overflow-hidden border border-gold/10">
                    <table class="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr class="bg-slate-50 text-navy border-b border-gold/10 uppercase tracking-widest text-[10px]">
                                <th class="py-6 px-8 font-bold">Kategori</th>
                                <th class="py-6 px-8 font-bold">Fonksiyonel Amaç</th>
                                <th class="py-6 px-8 font-bold">Geçerlilik</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-500 italic italic">
                            <tr class="border-b border-gold/5 bg-white">
                                <td class="py-6 px-8 font-bold text-navy">Zorunlu</td>
                                <td class="py-6 px-8">Oturum güvenliği ve dil tercihleri gibi temel site dinamikleri.</td>
                                <td class="py-6 px-8 text-xs">Oturum Boyu</td>
                            </tr>
                            <tr class="border-b border-gold/5 bg-slate-50/50">
                                <td class="py-6 px-8 font-bold text-navy">Analitik</td>
                                <td class="py-6 px-8">Kullanıcı davranış modellerinin anonimleştirilerek analiz edilmesi.</td>
                                <td class="py-6 px-8 text-xs">2 Yıl</td>
                            </tr>
                            <tr class="bg-white">
                                <td class="py-6 px-8 font-bold text-navy">Stratejik</td>
                                <td class="py-6 px-8">Size özel akademik içerik ve hizmet önerilerinin sunulması.</td>
                                <td class="py-6 px-8 text-xs">6 Ay</td>
                            </tr>
                            <tr class="border-t border-gold/5 bg-slate-50/30">
                                <td class="py-6 px-8 font-bold text-navy">Yapay Zeka</td>
                                <td class="py-6 px-8">SmartFinder ve AI eşleştirme algoritmalarının optimizasyonu ve analitiği.</td>
                                <td class="py-6 px-8 text-xs">1 Yıl</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <p class="text-xs text-slate-400 italic text-center uppercase tracking-widest">
                    Tarayıcı ayarlarınız üzerinden çerez tercihlerinizi dilediğiniz zaman revize edebilirsiniz.
                </p>
            </div>
        `
    }
];

export default function KVKK() {
    const [activeTab, setActiveTab] = React.useState("kvkk");

    return (
        <main className="min-h-screen bg-background text-navy">
            {/* Dynamic Hero */}
            <div className="relative pt-48 pb-20 bg-slate-50 border-b border-gold/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 rounded-full blur-[100px] -ml-24 -mb-24" />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-label !justify-center mb-8"
                    >
                        Global Compliance Framework
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-8xl font-serif font-bold text-navy mb-8 italic leading-[0.9]"
                    >
                        Veri <span className="gold-text not-italic">Egemenliği</span> <br /> & Global Uyum
                    </motion.h1>
                    <p className="text-slate-400 text-xl max-w-4xl mx-auto italic leading-relaxed mt-10">
                        Mentor Career; Türkiye (KVKK), Avrupa Birliği (GDPR) ve Almanya (DSGVO/BDSG) prensipleri ekseninde,
                        kurumsal verinizi dijital bir kalede koruyan en disiplinli hukuk ve güvenlik ekosistemlerinden birine sahiptir.
                    </p>
                </div>
            </div>

            <section className="py-40 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-[350px_1fr] gap-20 lg:gap-32 items-start">
                            {/* Navigation Sidebar */}
                            <div className="space-y-6 lg:sticky lg:top-32">
                                <div className="mb-12">
                                    <h5 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-4">Navigasyon</h5>
                                    <div className="w-12 h-1 bg-gold"></div>
                                </div>

                                {complianceSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveTab(section.id)}
                                        className={`w-full p-8 text-left border transition-all duration-700 flex items-center justify-between group relative overflow-hidden shadow-sm hover:shadow-xl ${activeTab === section.id
                                                ? "bg-slate-50 text-navy border-gold/30"
                                                : "bg-white text-slate-400 border-gold/10 hover:border-gold/30 hover:-translate-y-1"
                                            }`}
                                    >
                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className={`${activeTab === section.id ? "text-gold" : "text-slate-300 group-hover:text-gold"} transition-colors`}>
                                                {section.icon}
                                            </div>
                                            <span className="text-[11px] uppercase tracking-[0.2em] font-black">{section.title}</span>
                                        </div>
                                        {activeTab === section.id && (
                                            <motion.div layoutId="arrow">
                                                <Scale size={16} className="text-gold opacity-30" />
                                            </motion.div>
                                        )}
                                        {activeTab === section.id && (
                                            <motion.div
                                                layoutId="sidebar-accent"
                                                className="absolute inset-y-0 left-0 w-1.5 bg-gold"
                                            />
                                        )}
                                    </button>
                                ))}

                                <div className="mt-20 p-10 bg-white border border-gold/15 relative group overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Scale size={100} />
                                    </div>
                                    <div className="w-14 h-14 bg-slate-50 border border-gold/20 text-gold flex items-center justify-center mb-8 shadow-2xl">
                                        <Lock size={24} />
                                    </div>
                                    <h4 className="font-serif font-bold text-navy mb-4 italic text-2xl">Global Legal Office</h4>
                                    <p className="text-[10px] text-slate-400 leading-relaxed mb-10 uppercase tracking-[0.2em] font-black italic">Hukuki Danışmanlık ve Veri Hakları</p>
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <span className="text-[9px] uppercase tracking-widest text-gold font-black">Legal Department</span>
                                            <a href="mailto:info@mentor-cc.com" className="text-sm font-bold text-navy hover:text-gold transition-colors block border-b border-gold/10 pb-2">info@mentor-cc.com</a>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] uppercase tracking-widest text-gold font-black">Data Protection</span>
                                            <a href="mailto:info@mentor-cc.com" className="text-sm font-bold text-navy hover:text-gold transition-colors block border-b border-gold/10 pb-2">info@mentor-cc.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Display Area */}
                            <div className="relative">
                                {/* Artistic Background Elements */}
                                <div className="absolute -top-20 -right-20 text-gold/5 pointer-events-none select-none">
                                    <ShieldCheck size={400} strokeWidth={0.2} />
                                </div>
                                <div className="absolute bottom-40 -left-10 text-navy/5 pointer-events-none select-none">
                                    <Scale size={250} strokeWidth={0.2} />
                                </div>

                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="bg-white p-12 md:p-24 border border-gold/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative z-10 min-h-[800px]"
                                >
                                    <div
                                        className="prose prose-slate prose-gold max-w-none prose-h3:mt-0 prose-h3:text-navy prose-h3:italic prose-h3:font-serif prose-h4:font-serif prose-h4:text-navy prose-p:italic prose-p:text-slate-500 prose-p:leading-relaxed prose-strong:text-navy prose-strong:not-italic"
                                        dangerouslySetInnerHTML={{ __html: complianceSections.find(s => s.id === activeTab)?.content || "" }}
                                    />

                                    <div className="mt-32 p-10 bg-slate-50 border border-gold/10 relative group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white flex items-center justify-center text-gold shadow-lg border border-gold/5">
                                                <AlertCircle size={22} />
                                            </div>
                                            <div>
                                                <h5 className="text-xs font-black uppercase tracking-[0.2em] text-navy mb-2">Hukuki Bildirim</h5>
                                                <p className="text-[12px] text-slate-400 italic leading-relaxed">
                                                    Bu platformdaki metinler genel rehber niteliğindedir. Mentor Career, dinamik yasal süreçler kapsamında içeriği önceden bildirmeksizin revize etme hakkını saklı tutar.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="mt-16 text-center">
                                    <p className="text-[10px] text-slate-300 uppercase tracking-[0.5em] font-black italic">
                                        - Mentor Career Academic Excellence & Security Office -
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
