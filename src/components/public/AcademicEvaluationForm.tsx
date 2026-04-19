'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { 
    GraduationCap, 
    Globe2, 
    BookOpen, 
    Calendar, 
    ArrowRight, 
    ArrowLeft, 
    CheckCircle2, 
    Loader2, 
    ChevronRight,
    Star,
    Layers,
    Clock,
    Target
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import AuthModal from './AuthModal';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from '@/i18n/routing';

const steps = [
    { id: 'goal', icon: Target },
    { id: 'background', icon: BookOpen },
    { id: 'preferences', icon: Globe2 },
    { id: 'personal', icon: Star }
];

export default function AcademicEvaluationForm() {
    const t = useTranslations('EvaluationForm');
    const commonT = useTranslations('Common');
    const locale = useLocale();
    const { data: session } = useSession();
    
    const [currentStep, setCurrentStep] = useState(0);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [policyAccepted, setPolicyAccepted] = useState(false);

    const [formData, setFormData] = useState({
        // Goal
        service: '',
        targetDegree: '',
        
        // Background
        currentGpa: '',
        languageLevel: '',
        examScores: '',
        
        // Preferences
        targetCountries: [] as string[],
        startDate: '',
        budgetRange: '',

        // Personal
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const handleSelect = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleMultiSelect = (field: 'targetCountries', value: string) => {
        setFormData(prev => {
            const current = (prev[field] as string[]);
            if (current.includes(value)) {
                return { ...prev, [field]: current.filter(v => v !== value) };
            }
            return { ...prev, [field]: [...current, value] };
        });
    };

    const handleSubmit = async () => {
        if (!session) {
            setIsAuthModalOpen(true);
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        try {
            const res = await fetch('/api/public/evaluation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) setSubmitted(true);
            else alert(commonT('error'));
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto p-12 bg-white rounded-[3rem] shadow-2xl border border-zinc-100 text-center"
            >
                <div className="w-24 h-24 bg-secondary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-secondary/30 -rotate-6">
                    <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-4xl font-serif font-bold text-navy mb-6 italic">Talep Alındı!</h3>
                <p className="text-zinc-500 text-lg leading-relaxed mb-10">
                    Akademik profiliniz uzmanlarımıza iletildi. 24 saat içerisinde size özel bir yol haritası ile dönüş yapacağız.
                </p>
                <Link href="/dashboard/applications" className="btn-primary px-12 py-5 text-[10px] tracking-[0.3em]">
                    BAŞVURULARIMI TAKİP ET <ChevronRight className="ml-4 w-4 h-4" />
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Stepper */}
            <div className="flex items-center justify-between mb-16 relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-100 -translate-y-1/2 z-0 rounded-full" />
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-secondary to-secondary/60 -translate-y-1/2 z-0 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
                
                {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx <= currentStep;
                    const isCurrent = idx === currentStep;
                    
                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center">
                            <motion.div 
                                animate={{ 
                                    scale: isCurrent ? 1.2 : 1,
                                    backgroundColor: isActive ? '#D4AF37' : '#F4F4F5'
                                }}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${isActive ? 'text-white' : 'text-zinc-400'}`}
                            >
                                <Icon className="w-6 h-6" />
                            </motion.div>
                            <span className={`absolute -bottom-10 text-[9px] uppercase tracking-[0.2em] font-black whitespace-nowrap ${isCurrent ? 'text-navy' : 'text-zinc-400'}`}>
                                {t(`steps.${step.id}`)}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-[3rem] shadow-2xl border border-zinc-100 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="p-10 md:p-16"
                    >
                        {/* STEP 0: GOAL */}
                        {currentStep === 0 && (
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-serif font-bold text-navy italic">Hangi programla ilgileniyorsunuz?</h2>
                                    <p className="text-zinc-500">Size en uygun akademik rotayı belirlememiz için ilk adımı atın.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'yurtdisi-universite', title: 'Üniversite (Bachelor)', icon: GraduationCap },
                                        { id: 'yurtdisi-yuksek-lisans', title: 'Yüksek Lisans (Master)', icon: Layers },
                                        { id: 'yurtdisi-lise', title: 'Lise Değişim Programları', icon: BookOpen },
                                        { id: 'yurtdisi-dil-okullari', title: 'Dil Okulları', icon: Globe2 },
                                        { id: 'egitim-koclugu', title: 'Üst Düzey Eğitim Koçluğu', icon: Target }
                                    ].map((opt) => {
                                        const OptIcon = opt.icon;
                                        const isSelected = formData.service === opt.id;
                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => handleSelect('service', opt.id)}
                                                className={`flex items-center gap-6 p-6 rounded-2xl border-2 transition-all text-left ${
                                                    isSelected ? 'border-secondary bg-secondary/5 ring-4 ring-secondary/5' : 'border-zinc-100 hover:border-zinc-200 bg-zinc-50/50'
                                                }`}
                                            >
                                                <div className={`p-4 rounded-xl ${isSelected ? 'bg-secondary text-white' : 'bg-white text-zinc-400'}`}>
                                                    <OptIcon className="w-6 h-6" />
                                                </div>
                                                <span className={`font-serif font-bold text-lg ${isSelected ? 'text-navy' : 'text-zinc-600'}`}>{opt.title}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* STEP 1: BACKGROUND */}
                        {currentStep === 1 && (
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-serif font-bold text-navy italic">Akademik Öz Geçmişiniz</h2>
                                    <p className="text-zinc-500">Mevcut başarılarınız, kabul şansınızı analiz etmemize yardımcı olur.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Güncel Not Ortalaması (GPA)</label>
                                        <input 
                                            type="text" 
                                            placeholder="Örn: 3.50 / 400"
                                            value={formData.currentGpa}
                                            onChange={(e) => handleSelect('currentGpa', e.target.value)}
                                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">İngilizce Seviyesi</label>
                                        <select 
                                            value={formData.languageLevel}
                                            onChange={(e) => handleSelect('languageLevel', e.target.value)}
                                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Seçiniz</option>
                                            <option value="A1-A2">Başlangıç (A1-A2)</option>
                                            <option value="B1-B2">Orta (B1-B2)</option>
                                            <option value="C1-C2">İleri (C1-C2)</option>
                                            <option value="IELTS/TOEFL">Sertifikam Var (IELTS/TOEFL)</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Varsa Sınav Skorlarınız (SAT, GRE, GMAT vb.)</label>
                                        <textarea 
                                            rows={2}
                                            value={formData.examScores}
                                            onChange={(e) => handleSelect('examScores', e.target.value)}
                                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: PREFERENCES */}
                        {currentStep === 2 && (
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-serif font-bold text-navy italic">Hedefleriniz & Tercihleriniz</h2>
                                    <p className="text-zinc-500">Hayalinizdeki eğitimi nerede ve ne zaman almak istiyorsunuz?</p>
                                </div>
                                <div className="space-y-6">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Hedef Ülkeler (Birden fazla seçebilirsiniz)</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['ingiltere', 'amerika', 'kanada', 'almanya', 'irlanda', 'birlesik-arap-emirlikleri', 'isvicre', 'italya'].map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => handleMultiSelect('targetCountries', c)}
                                                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                                                    formData.targetCountries.includes(c) ? 'bg-navy text-white border-navy shadow-lg' : 'bg-zinc-50 text-zinc-500 border-zinc-100 hover:border-zinc-200'
                                                }`}
                                            >
                                                {c.toUpperCase().replace(/-/g, ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Planlanan Başlangıç Tarihi</label>
                                        <input 
                                            type="month"
                                            value={formData.startDate}
                                            onChange={(e) => handleSelect('startDate', e.target.value)}
                                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Yıllık Eğitim Bütçesi</label>
                                        <select 
                                            value={formData.budgetRange}
                                            onChange={(e) => handleSelect('budgetRange', e.target.value)}
                                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="">Seçiniz</option>
                                            <option value="0-10k">0 - 10,000 GBP/USD</option>
                                            <option value="10-25k">10,000 - 25,000 GBP/USD</option>
                                            <option value="25-50k">25,000 - 50,000 GBP/USD</option>
                                            <option value="50k+">50,000+ GBP/USD</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PERSONAL */}
                        {currentStep === 3 && (
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-serif font-bold text-navy italic">Son Adım: İletişim Bilgileri</h2>
                                    <p className="text-zinc-500">Değerlendirme sonucunu size ulaştırmamız için bilgilerinizi doğrulayın.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Ad Soyad</label>
                                        <input 
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleSelect('name', e.target.value)}
                                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">E-Posta Adresi</label>
                                        <input 
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleSelect('email', e.target.value)}
                                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Telefon Numarası</label>
                                        <input 
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleSelect('phone', e.target.value)}
                                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2 py-4 flex flex-col items-center gap-6">
                                        <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={(val) => setCaptchaVerified(!!val)} hl={locale} />
                                        <div className="flex items-start gap-4 px-2 group cursor-pointer" onClick={() => setPolicyAccepted(!policyAccepted)}>
                                            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${policyAccepted ? 'bg-secondary border-secondary' : 'border-zinc-200 bg-zinc-50'}`}>
                                                {policyAccepted && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                                            </div>
                                            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest font-bold">
                                                KVKK AYDINLATMA METNİNİ VE GİZLİLİK POLİTİKASINI OKUDUM, KABUL EDİYORUM.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-16 flex items-center justify-between pt-10 border-t border-zinc-100">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 0 || isSubmitting}
                                className={`flex items-center gap-3 text-[10px] tracking-[0.3em] font-black uppercase transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-navy hover:text-secondary'}`}
                            >
                                <ArrowLeft className="w-4 h-4" /> geri
                            </button>

                            {currentStep < steps.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!formData.service && currentStep === 0}
                                    className="btn-primary px-12 py-5 text-[10px] tracking-[0.3em] disabled:opacity-30"
                                >
                                    SONRAKİ ADIM <ArrowRight className="ml-4 w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !captchaVerified || !policyAccepted || !formData.name || !formData.email}
                                    className="btn-secondary px-16 py-5 text-[10px] tracking-[0.3em] disabled:opacity-30 shadow-3xl shadow-secondary/20"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'DEĞERLENDİRMEYİ TAMAMLA'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isAuthModalOpen && (
                    <AuthModal
                        isOpen={isAuthModalOpen}
                        onClose={() => setIsAuthModalOpen(false)}
                        onSuccess={() => { setIsAuthModalOpen(false); setTimeout(() => handleSubmit(), 500); }}
                        initialMode="register"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
