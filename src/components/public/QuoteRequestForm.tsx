
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Send, Loader2, Sparkles, Building2, Calendar, FileText, CheckCircle2, GraduationCap, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AuthModal from './AuthModal';

interface QuoteRequestFormProps {
    institutionId: string;
    institutionName: string;
    programs: any[];
}

export default function QuoteRequestForm({ institutionId, institutionName, programs }: QuoteRequestFormProps) {
    const t = useTranslations('Quote');
    const { data: session } = useSession();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [shouldSubmitAfterAuth, setShouldSubmitAfterAuth] = useState(false);

    // If no programs in DB, provide common university faculties as fallback
    const fallbackUniversityPrograms: any[] = [];

    const effectivePrograms = programs.length > 0 ? programs : fallbackUniversityPrograms;
    const hasPrograms = effectivePrograms.length > 0;

    const [formData, setFormData] = useState<any>({
        programId: '',
        programText: '',   // Free-text fallback when no programs in DB
        startDate: '',
        duration: '',
        notes: '',
        accommodation: false,
        examScores: '',
        gradeLevel: '',
        age: '',
    });

    const selectedProgram = hasPrograms ? effectivePrograms.find(p => p.id === formData.programId) : null;
    const category = selectedProgram?.category ?? (programs[0]?.category || 'UNIVERSITY');

    const getProgramLabel = () => {
        if (!hasPrograms) return t('fallbackProgram');
        const cat = effectivePrograms[0]?.category;
        if (cat === 'UNIVERSITY' || cat === 'MASTER') return t('programSelect');
        if (cat === 'LANGUAGE_SCHOOL') return t('courseSelect');
        if (cat === 'HIGH_SCHOOL') return t('highSchoolSelect');
        return t('generalSelect');
    };

    const getDurationLabel = () => {
        if (category === 'UNIVERSITY' || category === 'MASTER') return t('targetStart');
        if (category === 'HIGH_SCHOOL') return t('currentGrade');
        if (category === 'SUMMER_SCHOOL') return t('age');
        return t('duration');
    };

    const getDurationPlaceholder = () => {
        if (category === 'LANGUAGE_SCHOOL') return t('durationPlaceholderLanguage');
        if (category === 'UNIVERSITY' || category === 'MASTER') return t('durationPlaceholderUni');
        if (category === 'HIGH_SCHOOL') return t('durationPlaceholderHighSchool');
        if (category === 'SUMMER_SCHOOL') return t('durationPlaceholderSummer');
        return t('durationPlaceholderDefault');
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!session) {
            setShouldSubmitAfterAuth(true);
            setIsAuthModalOpen(true);
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/quotes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    institutionId,
                    ...formData,
                    category, // Pass category for backend processing
                }),
            });

            if (!res.ok) throw new Error('Request failed');

            setSubmitted(true);
        } catch (error) {
            console.error(error);
            // In a real app we might want to localize this error alert too, 
            // but for now keeping it simple or using a toast.
            alert(error instanceof Error ? error.message : 'Error');
        } finally {
            setIsSubmitting(false);
            setShouldSubmitAfterAuth(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-10">
                <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 rotate-6 shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-black text-navy italic mb-4">{session ? t('successTitleAuth') : t('successTitleNoAuth')}</h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-8">
                    {session ? t('successDescAuth') : t('successDescNoAuth')}
                </p>
                <Link
                    href="/dashboard/applications"
                    className="inline-flex items-center gap-2 text-emerald-400 font-black uppercase tracking-widest text-[10px] group border-b-2 border-emerald-400/20 pb-1"
                >
                    {t('goToDashboard')} <Calendar className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        );
    }

    return (
        <div className="relative">
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-black text-navy/40 ml-1">
                        {getProgramLabel()}
                    </label>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/20" />
                        {hasPrograms ? (
                            <select
                                required
                                value={formData.programId}
                                onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:border-secondary transition-all outline-none bg-slate-50 text-navy text-xs font-bold appearance-none cursor-pointer"
                            >
                                <option value="" disabled className="bg-white">{t('selectPlaceholder')}</option>
                                {effectivePrograms.map(p => (
                                    <option key={p.id} value={p.id} className="bg-white text-navy">{p.name}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                required
                                value={formData.programText}
                                onChange={(e) => setFormData({ ...formData, programText: e.target.value })}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:border-secondary transition-all outline-none bg-slate-50 text-navy text-xs font-bold placeholder:text-navy/30"
                                placeholder={t('programPlaceholder')}
                            />
                        )}
                    </div>
                </div>

                {/* Category Based Dynamic Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-widest font-black text-navy/40 ml-1">
                            {getDurationLabel()}
                        </label>
                        <div className="relative">
                            {category === 'SUMMER_SCHOOL' ? (
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/20" />
                            ) : (
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/20" />
                            )}
                            <input
                                type="text"
                                required
                                value={category === 'HIGH_SCHOOL' ? formData.gradeLevel :
                                    category === 'SUMMER_SCHOOL' ? formData.age : formData.duration}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (category === 'HIGH_SCHOOL') setFormData({ ...formData, gradeLevel: val });
                                    else if (category === 'SUMMER_SCHOOL') setFormData({ ...formData, age: val });
                                    else setFormData({ ...formData, duration: val });
                                }}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:border-secondary transition-all outline-none bg-slate-50 text-navy text-xs font-bold"
                                placeholder={getDurationPlaceholder()}
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-widest font-black text-navy/40 ml-1">
                            {category === 'UNIVERSITY' || category === 'MASTER' ? t('academicYear') : t('startDate')}
                        </label>
                        <input
                            type="date"
                            required
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-secondary transition-all outline-none bg-slate-50 text-navy text-xs font-bold"
                        />
                    </div>
                </div>

                {/* Extra Fields based on Category */}
                {category === 'LANGUAGE_SCHOOL' && (
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <input
                            type="checkbox"
                            id="accommodation"
                            checked={formData.accommodation}
                            onChange={(e) => setFormData({ ...formData, accommodation: e.target.checked })}
                            className="w-4 h-4 rounded border-slate-300 bg-white text-secondary focus:ring-secondary"
                        />
                        <label htmlFor="accommodation" className="text-xs font-bold text-navy/80 cursor-pointer">
                            {t('accommodation')}
                        </label>
                    </div>
                )}

                    <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-widest font-black text-navy/40 ml-1">{t('exams')}</label>
                        <div className="relative">
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/20" />
                            <input
                                type="text"
                                value={formData.examScores}
                                onChange={(e) => setFormData({ ...formData, examScores: e.target.value })}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:border-secondary transition-all outline-none bg-slate-50 text-navy text-xs font-bold"
                                placeholder={t('examsPlaceholder')}
                            />
                        </div>
                    </div>

                <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-black text-navy/40 ml-1">{t('notes')}</label>
                    <div className="relative">
                        <FileText className="absolute left-4 top-4 w-4 h-4 text-navy/20" />
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            rows={3}
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:border-secondary transition-all outline-none bg-slate-50 text-navy text-xs font-bold resize-none"
                            placeholder={t('notesPlaceholder')}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-primary font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-secondary/10 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px] disabled:opacity-50 mt-2"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {session ? t('submitStart') : t('submitQuote')} <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => {
                    setIsAuthModalOpen(false);
                    setShouldSubmitAfterAuth(false);
                }}
                onSuccess={() => {
                    setIsAuthModalOpen(false);
                    if (shouldSubmitAfterAuth) {
                        // Small delay to ensure session is updated if client-side
                        setTimeout(() => handleSubmit(), 500);
                    }
                }}
                initialMode="register"
            />
        </div>
    );
}
