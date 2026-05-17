'use client';

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, CheckCircle2, Loader2, ArrowRight, Shield, Sparkles, 
    GraduationCap, Phone, Mail, User, MessageSquare, FileText,
    Star, Trophy, Globe
} from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import AuthModal from './AuthModal';

interface InstitutionApplicationFormProps {
    institutionName: string;
    serviceName: string;        // e.g. "Yurtdışı Yaz Okulları"
    serviceSlug: string;        // e.g. "yurtdisi-yaz-okullari"
    countryName: string;        // e.g. "Amerika"
    locale: string;
    variant?: 'sidebar' | 'full';
}

type FormStep = 'contact' | 'details' | 'done';

export default function InstitutionApplicationForm({
    institutionName,
    serviceName,
    serviceSlug,
    countryName,
    locale,
    variant = 'full',
}: InstitutionApplicationFormProps) {
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState<FormStep>('contact');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const recaptchaRef = useRef<any>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interestType: 'apply',   // 'apply' | 'quote'
        message: '',
        captchaToken: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!session) {
            setIsAuthModalOpen(true);
            return;
        }

        if (!captchaVerified || !policyAccepted) return;

        setIsSubmitting(true);
        try {
            const userNote = formData.message.trim();
            const prefix = formData.interestType === 'apply'
                ? `BAŞVURU TALEBİ — ${institutionName} (${countryName})`
                : `TEKLİF TALEBİ — ${institutionName} (${countryName})`;
            // Always guarantee >= 10 chars even if the user left the textarea blank
            const message = userNote
                ? `${prefix}\n\n${userNote}`
                : `${prefix} — bilgi almak istiyorum.`;

            const res = await fetch('/api/public/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: serviceSlug,
                    message,
                    captchaToken: formData.captchaToken,
                }),
            });

            if (res.ok) {
                setCurrentStep('done');
            } else {
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } catch {
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // SUCCESS STATE
    if (currentStep === 'done') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-8"
            >
                <div className="relative inline-block mb-10">
                    <div className="w-28 h-28 bg-gradient-to-br from-secondary to-secondary/70 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-secondary/30 -rotate-6 mx-auto">
                        <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2} />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
                        <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary italic mb-4">
                    Talebiniz Alındı!
                </h3>
                <p className="text-zinc-500 text-base leading-relaxed max-w-sm mx-auto mb-3">
                    <strong className="text-primary">{institutionName}</strong> için başvuru/teklif talebiniz ekibimize iletildi.
                </p>
                <p className="text-zinc-400 text-sm italic mb-10">
                    En geç 24 saat içinde uzman danışmanımız sizi arayacak.
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <Shield size={14} className="text-secondary" /> Güvenli & Şifreli İletişim
                </div>
            </motion.div>
        );
    }

    const isSidebar = variant === 'sidebar';

    return (
        <>
            <form onSubmit={handleSubmit} className={isSidebar ? 'space-y-6' : 'space-y-8'}>
                {/* Interest Type Toggle */}
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1 block">
                        Talep Türü
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'apply', label: 'Başvuru Yap', icon: <GraduationCap size={16} /> },
                            { id: 'quote', label: 'Teklif Al', icon: <FileText size={16} /> },
                        ].map(opt => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, interestType: opt.id }))}
                                className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl border-2 text-sm font-bold transition-all duration-300 ${
                                    formData.interestType === opt.id
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                        : 'bg-zinc-50 text-zinc-500 border-zinc-100 hover:border-zinc-200'
                                }`}
                            >
                                {opt.icon}
                                <span className="text-[11px] font-black uppercase tracking-wider">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Name */}
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1 block">
                        Ad Soyad
                    </label>
                    <div className="relative">
                        <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-medium text-sm"
                            placeholder="Adınız Soyadınız"
                        />
                    </div>
                </div>

                {/* Email + Phone */}
                <div className={`grid ${isSidebar ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-5`}>
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1 block">
                            E-posta
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-medium text-sm"
                                placeholder="örnek@mail.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1 block">
                            Telefon
                        </label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-medium text-sm"
                                placeholder="+90 555 000 00 00"
                            />
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1 block">
                        Mesajınız (Opsiyonel)
                    </label>
                    <div className="relative">
                        <MessageSquare size={16} className="absolute left-5 top-5 text-zinc-300" />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={isSidebar ? 3 : 4}
                            className="w-full pl-12 pr-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-medium text-sm resize-none"
                            placeholder={`${institutionName} hakkında merak ettiklerinizi yazabilirsiniz...`}
                        />
                    </div>
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center opacity-80 hover:opacity-100 transition-opacity">
                    <div className="transform scale-[0.85] origin-left">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                            onChange={(val) => {
                                setCaptchaVerified(!!val);
                                setFormData(prev => ({ ...prev, captchaToken: val || '' }));
                            }}
                            hl={locale}
                        />
                    </div>
                </div>

                {/* Policy checkbox */}
                <div
                    className="flex items-start gap-3 cursor-pointer group"
                    onClick={() => setPolicyAccepted(!policyAccepted)}
                >
                    <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${
                        policyAccepted ? 'bg-secondary border-secondary' : 'border-zinc-200 bg-zinc-50 group-hover:border-zinc-300'
                    }`}>
                        {policyAccepted && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-relaxed uppercase tracking-widest font-bold">
                        Kişisel verilerimin işlenmesine ilişkin{' '}
                        <span className="text-secondary border-b border-secondary/30">Gizlilik Politikası</span>'nı
                        okudum ve onaylıyorum.
                    </p>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting || !captchaVerified || !policyAccepted}
                    className="w-full relative overflow-hidden group bg-primary hover:bg-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.3em] text-[11px] py-5 rounded-2xl transition-all duration-700 shadow-2xl shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center gap-4"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {formData.interestType === 'apply' ? 'Başvuru Gönder' : 'Teklif İste'}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </>
                    )}
                </button>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-6 pt-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-300">
                        <Shield size={11} className="text-secondary" /> SSL Güvenli
                    </div>
                    <div className="w-1 h-1 bg-zinc-200 rounded-full" />
                    <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-300">
                        <Globe size={11} className="text-secondary" /> KVKK Uyumlu
                    </div>
                    <div className="w-1 h-1 bg-zinc-200 rounded-full" />
                    <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-300">
                        <Trophy size={11} className="text-secondary" /> %99 Başarı
                    </div>
                </div>
            </form>

            <AnimatePresence>
                {isAuthModalOpen && (
                    <AuthModal
                        isOpen={isAuthModalOpen}
                        onClose={() => setIsAuthModalOpen(false)}
                        onSuccess={() => {
                            setIsAuthModalOpen(false);
                            setTimeout(() => handleSubmit(), 500);
                        }}
                        initialMode="register"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
