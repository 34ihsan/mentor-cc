"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'login' }: AuthModalProps) {
    const t = useTranslations('Auth');
    const locale = useLocale();
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        captchaToken: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (mode === 'register') {
                const res = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || t('errors.register'));
            }

            // Client-side signIn ile giriş yap (redirect:false) — sayfa yönlendirmesi olmaz
            // Bu sayede modal akışı kesilmez ve onSuccess() çalışır
            const result = await signIn("credentials", {
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error(result.error === "CredentialsSignin" ? t('errors.login') : result.error);
            }

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>

                    <div className="p-8 md:p-12">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-serif font-black italic text-primary mb-2">
                                {mode === 'login' ? t('loginTitle') : t('registerTitle')}
                            </h2>
                            <p className="text-slate-900/60 text-sm font-bold">
                                {mode === 'login' ? t('loginSubtitle') : t('registerSubtitle')}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 animate-shake">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                             {mode === 'register' && (
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">{t('fullName')}</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 focus:border-secondary transition-all outline-none bg-slate-50/50 text-sm font-black text-slate-900"
                                            placeholder={t('fullNamePlaceholder')}
                                        />
                                    </div>
                                </div>
                            )}

                             <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">{t('email')}</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 focus:border-secondary transition-all outline-none bg-slate-50/50 text-sm font-black text-slate-900"
                                        placeholder={t('emailPlaceholder')}
                                    />
                                </div>
                            </div>

                             <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">{t('password')}</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 focus:border-secondary transition-all outline-none bg-slate-50/50 text-sm font-black text-slate-900"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {mode === 'register' && (
                                <div className="flex justify-center py-2 opacity-80 hover:opacity-100 transition-opacity">
                                    <ReCAPTCHA 
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} 
                                        onChange={(val) => {
                                            setCaptchaVerified(!!val);
                                            setFormData(prev => ({ ...prev, captchaToken: val || '' }));
                                        }}
                                        hl={locale}
                                    />
                                </div>
                            )}

                             <button
                                type="submit"
                                disabled={isLoading || (mode === 'register' && !captchaVerified)}
                                className="w-full bg-primary text-secondary font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50 mt-4 group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        {mode === 'login' ? t('loginButton') : t('registerButton')}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                className="text-xs font-black text-slate-900/40 hover:text-primary transition-colors uppercase tracking-widest"
                            >
                                {mode === 'login'
                                    ? t('switch.noAccount')
                                    : t('switch.haveAccount')}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
