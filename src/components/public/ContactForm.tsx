'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { Send, CheckCircle2, Loader2, ArrowRight, Shield } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { getNavServices } from '@/app/actions/nav-actions';
import { serviceMap } from '@/lib/mappings';
import AuthModal from './AuthModal';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
    title?: string;
    description?: string;
    showServiceSelect?: boolean;
    variant?: 'standard' | 'horizontal';
}

export default function ContactForm({
    title,
    description,
    showServiceSelect = true,
    variant = 'standard'
}: ContactFormProps) {
    const { data: session } = useSession();
    const t = useTranslations('Contact');
    const locale = useLocale();
    const commonT = useTranslations('Common');
    const serviceT = useTranslations('HomePage.Services');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [shouldSubmitAfterAuth, setShouldSubmitAfterAuth] = useState(false);
    const [services, setServices] = useState<any[]>([]);
    const [isLoadingServices, setIsLoadingServices] = useState(true);

    const displayTitle = title || t('title');
    const displayDescription = description || t('description');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const dynamicServices = await getNavServices();
                const dynamicMap = new Map();
                dynamicServices.forEach((service: any) => {
                    const sTitle = serviceT(service.slug, { defaultValue: service.title });
                    dynamicMap.set(service.slug, { id: service.id || service.slug, slug: service.slug, title: sTitle });
                });
                Object.entries(serviceMap).forEach(([slug, s]) => {
                    if (!dynamicMap.has(slug)) {
                        const sTitle = serviceT(slug, { defaultValue: s.title });
                        dynamicMap.set(slug, { id: slug, slug: slug, title: sTitle });
                    }
                });
                const orderedSlugs = ['yurtdisi-yuksek-lisans', 'yurtdisi-lise', 'yurtdisi-universite', 'yurtdisi-yaz-okullari', 'yurtdisi-dil-okullari', 'sinavlar'];
                setServices(orderedSlugs.map(slug => dynamicMap.get(slug)).filter(Boolean));
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setIsLoadingServices(false);
            }
        };
        fetchServices();
    }, [serviceT]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!session) {
            setShouldSubmitAfterAuth(true);
            setIsAuthModalOpen(true);
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/public/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) setSubmitted(true);
            else alert(commonT('error'));
        } catch (error) {
            alert(commonT('error'));
        } finally {
            setIsSubmitting(false);
            setShouldSubmitAfterAuth(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (submitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
            >
                <div className="w-24 h-24 bg-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-secondary/20 -rotate-6">
                    <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-4xl font-serif font-bold text-primary mb-6 italic">{t('successTitle')}</h3>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-sm mx-auto mb-10">
                    {t('successDesc')}
                </p>
                <Link href="/dashboard/applications" className="btn-primary px-10 py-4 text-xs tracking-[0.2em]">
                    {t('trackRequests')} <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
            </motion.div>
        );
    }

    const PolicyLink = ({ children }: { children: React.ReactNode }) => (
        <span className="text-secondary font-bold cursor-pointer hover:text-primary transition-all border-b border-secondary/30">
            {children}
        </span>
    );

    return (
        <div className="relative group">
            <div className="mb-14">
                <div className="flex items-center gap-4 mb-6">
                    <span className="section-label !mb-0">{t('label')}</span>
                </div>
                <h3 className="text-4xl font-serif font-bold text-primary tracking-tight leading-tight italic">{displayTitle}</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1">{t('formData.name')}</label>
                        <input
                            type="text" name="name" value={formData.name} onChange={handleChange} required
                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-medium"
                            placeholder={t('formData.placeholders.name')}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1">{t('formData.email')}</label>
                        <input
                            type="email" name="email" value={formData.email} onChange={handleChange} required
                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-medium"
                            placeholder={t('formData.placeholders.email')}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1">{t('formData.phone')}</label>
                        <input
                            type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                            className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-medium"
                            placeholder={t('formData.placeholders.phone')}
                        />
                    </div>

                    {showServiceSelect && (
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1">{t('formData.service')}</label>
                            <div className="relative">
                                <select
                                    name="service" value={formData.service} onChange={handleChange} required
                                    className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-medium appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>{isLoadingServices ? commonT('loading') : t('formData.placeholders.service')}</option>
                                    {services.map((service) => <option key={service.id} value={service.slug}>{service.title}</option>)}
                                </select>
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                                    <Send size={14} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400 ml-1">{t('formData.message')}</label>
                    <textarea
                        name="message" value={formData.message} onChange={handleChange} rows={4}
                        className="w-full px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-medium resize-none"
                        placeholder={t('formData.placeholders.message')}
                    />
                </div>

                <div className="flex flex-col items-center gap-10 py-4">
                    <div className="opacity-70 hover:opacity-100 transition-opacity transform scale-90">
                        <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={(val) => setCaptchaVerified(!!val)} hl={locale} />
                    </div>

                    <button
                        type="submit" disabled={isSubmitting || !captchaVerified || !policyAccepted}
                        className="btn-primary w-full py-6 text-xs tracking-[0.4em] gap-4 disabled:opacity-20 shadow-2xl group/sub"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                {t('submit')} <ArrowRight className="w-4 h-4 transition-transform group-hover/sub:translate-x-2" />
                            </>
                        )}
                    </button>

                    <div className="flex items-start gap-4 px-2 group cursor-pointer" onClick={() => setPolicyAccepted(!policyAccepted)}>
                        <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${policyAccepted ? 'bg-secondary border-secondary' : 'border-zinc-200 bg-zinc-50'}`}>
                            {policyAccepted && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest font-bold">
                            {t.rich('policyNote', { policyLink: (chunks) => <PolicyLink>{chunks}</PolicyLink> })}
                        </p>
                    </div>
                </div>
            </form>

            <AnimatePresence>
                {isAuthModalOpen && (
                    <AuthModal
                        isOpen={isAuthModalOpen}
                        onClose={() => { setIsAuthModalOpen(false); setShouldSubmitAfterAuth(false); }}
                        onSuccess={() => { setIsAuthModalOpen(false); if (shouldSubmitAfterAuth) setTimeout(() => handleSubmit(), 500); }}
                        initialMode="register"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
