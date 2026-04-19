"use client";

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
    Search, 
    ChevronRight, 
    ChevronLeft,
    ChevronDown,
    GraduationCap, 
    Globe, 
    Euro, 
    Sparkles,
    CheckCircle2,
    Building2,
    MapPin,
    ArrowRight,
    Trophy,
    AlertCircle,
    BookOpen,
    Clock,
    RefreshCcw
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { findProgramsAction, FinderCriteria } from '@/app/actions/finder-actions';

export default function SmartFinder() {
    const t = useTranslations('SmartFinder');
    const commonT = useTranslations('Common');
    const params = useParams();
    const locale = params?.locale as string;
    const [step, setStep] = useState(0);
    const [criteria, setCriteria] = useState<FinderCriteria>({});
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const BASE_STEPS = [
        { id: 'category', title: t('steps.category'), icon: <GraduationCap size={20} /> },
        { id: 'profile', title: t('steps.profile'), icon: <BookOpen size={20} /> },
        { id: 'budget', title: t('steps.budget'), icon: <Euro size={20} /> },
        { id: 'country', title: t('steps.country'), icon: <Globe size={20} /> },
    ];

    const CATEGORIES = [
        { id: 'UNIVERSITY', label: t('categories.UNIVERSITY.label'), desc: t('categories.UNIVERSITY.desc') },
        { id: 'MASTER', label: t('categories.MASTER.label'), desc: t('categories.MASTER.desc') },
        { id: 'HIGH_SCHOOL', label: t('categories.HIGH_SCHOOL.label'), desc: t('categories.HIGH_SCHOOL.desc') },
        { id: 'LANGUAGE_SCHOOL', label: t('categories.LANGUAGE_SCHOOL.label'), desc: t('categories.LANGUAGE_SCHOOL.desc') },
        { id: 'SUMMER_SCHOOL', label: t('categories.SUMMER_SCHOOL.label'), desc: t('categories.SUMMER_SCHOOL.desc') },
    ];

    const BUDGETS = [
        { id: 'ECONOMY', label: t('budgetLabels.ECONOMY.label'), desc: t('budgetLabels.ECONOMY.desc'), icon: '💎' },
        { id: 'MID', label: t('budgetLabels.MID.label'), desc: t('budgetLabels.MID.desc'), icon: '🚀' },
        { id: 'PREMIUM', label: t('budgetLabels.PREMIUM.label'), desc: t('budgetLabels.PREMIUM.desc'), icon: '👑' },
    ];

    const COUNTRIES = [
        { id: 'ALL', label: t('countries.ALL') },
        { id: 'almanya', label: t('countries.almanya') },
        { id: 'ingiltere', label: t('countries.ingiltere') },
        { id: 'amerika', label: t('countries.amerika') },
        { id: 'kanada', label: t('countries.kanada') },
    ];

    const getSteps = () => {
        const steps = [...BASE_STEPS];
        if (criteria.category === 'UNIVERSITY' || criteria.category === 'MASTER') {
            steps[1] = { id: 'profile', title: t('steps.academicProfile'), icon: <Trophy size={20} /> };
        } else if (criteria.category === 'HIGH_SCHOOL') {
            steps[1] = { id: 'profile', title: t('steps.schoolSuccess'), icon: <BookOpen size={20} /> };
        } else if (criteria.category === 'LANGUAGE_SCHOOL' || criteria.category === 'SUMMER_SCHOOL') {
            steps[1] = { id: 'profile', title: t('steps.eduGoal'), icon: <Sparkles size={20} /> };
        }
        return steps;
    };

    const steps = getSteps();

    const handleSelect = (field: keyof FinderCriteria, value: any) => {
        setCriteria(prev => ({ ...prev, [field]: value }));
        if (step < steps.length - 1) {
            setStep(prev => prev + 1);
        } else {
            handleSearch({ ...criteria, [field]: value });
        }
    };

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(prev => prev + 1);
        } else {
            handleSearch(criteria);
        }
    };

    const handleSearch = async (finalCriteria: FinderCriteria) => {
        setIsLoading(true);
        setIsFinished(true);
        const result = await findProgramsAction(finalCriteria, locale);
        if (result.success && result.programs) {
            setResults(result.programs);
        } else {
            setResults([]);
        }
        setIsLoading(false);
    };

    const reset = () => {
        setStep(0);
        setCriteria({});
        setResults([]);
        setIsFinished(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-10 relative z-10">

            {/* Background Accent */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

            {!isFinished ? (
                <div className="space-y-12">
                    {/* Progress Bar - Solar Flare Premium */}
                    <div className="flex justify-between items-center bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl asymmetric-bold px-10 shadow-neon relative z-10 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-50" />
                        {steps.map((s, idx) => (
                            <div key={s.id} className="flex items-center gap-4 group/step relative z-10">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-1000 shadow-xl ${
                                    idx <= step 
                                        ? "bg-secondary text-white scale-110 rotate-3 neon-glow ring-2 ring-secondary/40" 
                                        : "bg-zinc-800 text-zinc-600 border border-white/5"
                                }`}>
                                    {idx < step ? <CheckCircle2 size={20} strokeWidth={3} /> : idx + 1}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-1000 ${
                                    idx <= step ? "max-w-[150px] opacity-100 mr-2 text-white" : "max-w-0 opacity-0 text-zinc-500"
                                } hidden md:block`}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>


                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                            className="bg-zinc-900 p-10 md:p-16 shadow-neon border border-white/5 asymmetric-bold relative overflow-hidden group/main"
                        >
                            {/* Decorative Neon Corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 asymmetric-reverse backdrop-blur-3xl group-hover/main:bg-secondary/20 transition-colors duration-1000" />
                            
                            <div className="flex items-center gap-6 mb-14 relative z-10">
                                <div className="p-5 bg-secondary text-white rounded-2xl shadow-neon rotate-6 group-hover:rotate-0 transition-transform duration-700">
                                    {steps[step].icon}
                                </div>
                                <div>
                                    <h2 className="text-4xl font-serif font-bold italic tracking-tight text-white">
                                        {steps[step].title}
                                    </h2>
                                    <div className="h-1.5 w-12 bg-secondary mt-3 rounded-full shadow-neon" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                {step === 0 && CATEGORIES.map((cat) => (
                                    <motion.button
                                        key={cat.id}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelect('category', cat.id)}
                                        className="text-left p-10 rounded-3xl border border-white/5 hover:border-secondary/40 hover:bg-zinc-800/80 transition-all duration-700 group shadow-lg bg-zinc-800 relative z-10 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                        <div className="font-serif font-bold italic text-white text-2xl group-hover:text-secondary transition-colors mb-3 tracking-tight relative z-10">{cat.label}</div>
                                        <div className="text-[11px] text-zinc-500 font-bold leading-relaxed group-hover:text-zinc-300 transition-colors uppercase tracking-[0.2em] relative z-10">{cat.desc}</div>
                                        <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700 relative z-10">
                                            <ArrowRight size={24} className="text-secondary" />
                                        </div>
                                    </motion.button>
                                ))}


                                {step === 1 && (
                                    <div className="col-span-full space-y-12">
                                        {(criteria.category === 'UNIVERSITY' || criteria.category === 'MASTER') ? (
                                            <div className="space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1 flex items-center gap-2">
                                                            <Trophy size={14} className="text-secondary" /> {t('fields.gpa')}
                                                        </label>
                                                        <input 
                                                            type="number" step="0.1" min="0" max="4"
                                                            placeholder={t('fields.gpaPlaceholder')}
                                                            className="w-full p-6 rounded-2xl bg-zinc-800 border border-white/5 focus:bg-zinc-800 focus:border-secondary/40 focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-white font-black text-xl shadow-inner placeholder:text-zinc-600"
                                                            value={criteria.gpa || ''}
                                                            onChange={(e) => setCriteria({...criteria, gpa: parseFloat(e.target.value)})}
                                                        />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1 flex items-center gap-2">
                                                            <Sparkles size={14} className="text-secondary" /> {t('fields.langProficiency')}
                                                        </label>
                                                        <div className="relative group/select">
                                                            <select 
                                                                className="w-full p-6 rounded-2xl bg-zinc-800 border border-white/5 focus:bg-zinc-800 focus:border-secondary/40 focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-white font-black text-lg appearance-none shadow-inner cursor-pointer"
                                                                value={criteria.languageScore || ''}
                                                                onChange={(e) => setCriteria({...criteria, languageScore: e.target.value})}
                                                            >
                                                                <option value="" className="bg-zinc-900">{t('selectScore')}</option>
                                                                <option value="IELTS 6.0" className="bg-zinc-900">IELTS 6.0</option>
                                                                <option value="IELTS 6.5" className="bg-zinc-900">IELTS 6.5</option>
                                                                <option value="IELTS 7.0+" className="bg-zinc-900">IELTS 7.0+</option>
                                                                <option value="Duolingo 110" className="bg-zinc-900">Duolingo 110+</option>
                                                                <option value="Telc A2" className="bg-zinc-900">Telc A2</option>
                                                                <option value="Telc B1" className="bg-zinc-900">Telc B1</option>
                                                                <option value="Telc B2" className="bg-zinc-900">Telc B2</option>
                                                                <option value="Telc C1" className="bg-zinc-900">Telc C1</option>
                                                                <option value="Telc C2" className="bg-zinc-900">Telc C2</option>
                                                                <option value="DSH I" className="bg-zinc-900">DSH I</option>
                                                                <option value="DSH II" className="bg-zinc-900">DSH II</option>
                                                                <option value="TestDaf" className="bg-zinc-900">TestDaf</option>
                                                                <option value="DSD" className="bg-zinc-900">DSD</option>
                                                                <option value="Geothe-Z" className="bg-zinc-900">Geothe-Z</option>
                                                                <option value="KMK" className="bg-zinc-900">KMK</option>
                                                                <option value="DTZ" className="bg-zinc-900">DTZ</option>
                                                                <option value="KP" className="bg-zinc-900">KP</option>
                                                                <option value="TMS" className="bg-zinc-900">TMS</option>
                                                                <option value="FSP" className="bg-zinc-900">FSP</option>
                                                            </select>
                                                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary group-hover/select:scale-110 transition-transform pointer-events-none" size={20} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1">{t('fields.specialization')}</label>
                                                    <div className="flex flex-wrap gap-4">
                                                        {['Mühendislik', 'İşletme', 'Tıp', 'Sanat', 'Diğer'].map(area => (
                                                            <button
                                                                key={area}
                                                                onClick={() => setCriteria({...criteria, preference: area})}
                                                                className={`flex-1 min-w-[120px] p-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 border-2 ${
                                                                    criteria.preference === area 
                                                                        ? 'bg-secondary border-secondary text-white shadow-neon scale-105' 
                                                                        : 'bg-zinc-800 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-secondary/40'
                                                                }`}
                                                            >
                                                                {area === 'Diğer' ? 'Diğer' : t(`areas.${area}`)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        ) : criteria.category === 'HIGH_SCHOOL' ? (
                                            <div className="space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1">{t('fields.highSchoolGpa')}</label>
                                                        <input 
                                                            type="number" placeholder={t('fields.highSchoolGpaPlaceholder')}
                                                            className="w-full p-6 rounded-2xl bg-zinc-800 border border-white/5 focus:bg-zinc-800 focus:border-secondary/40 focus:ring-4 focus:ring-secondary/10 outline-none transition-all text-white font-black text-xl shadow-inner placeholder:text-zinc-600"
                                                            value={criteria.gpa || ''}
                                                            onChange={(e) => setCriteria({...criteria, gpa: parseFloat(e.target.value)})}
                                                        />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1">{t('fields.langLevel')}</label>
                                                        <div className="flex gap-4">
                                                            {['A2', 'B1', 'B2'].map(lvl => (
                                                                <button
                                                                    key={lvl}
                                                                    onClick={() => setCriteria({...criteria, languageScore: lvl})}
                                                                    className={`flex-1 p-5 rounded-2xl font-black transition-all duration-700 ${
                                                                        criteria.languageScore === lvl 
                                                                            ? 'bg-secondary text-white shadow-neon scale-105' 
                                                                            : 'bg-zinc-800 text-zinc-500 border border-white/5 hover:text-zinc-300 hover:border-secondary/40'
                                                                    }`}
                                                                >
                                                                    {lvl}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ) : (
                                            <div className="space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1">{t('fields.currentLangLevel')}</label>
                                                        <div className="grid grid-cols-4 gap-3">
                                                            {['A1', 'A2', 'B1', 'B2'].map(lvl => (
                                                                <button
                                                                    key={lvl}
                                                                    onClick={() => setCriteria({...criteria, languageScore: lvl})}
                                                                    className={`p-5 rounded-2xl font-black transition-all duration-700 ${
                                                                        criteria.languageScore === lvl 
                                                                            ? 'bg-secondary text-white shadow-neon scale-110' 
                                                                            : 'bg-zinc-800 border border-white/5 text-zinc-500 hover:text-zinc-300'
                                                                    }`}
                                                                >
                                                                    {lvl}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1">{t('fields.eduFocus')}</label>
                                                        <div className="relative group/select">
                                                            <select 
                                                                className="w-full p-6 rounded-2xl bg-zinc-800 border border-white/5 focus:bg-zinc-800 focus:border-secondary/40 outline-none text-white font-black appearance-none shadow-inner cursor-pointer"
                                                                onChange={(e) => setCriteria({...criteria, preference: e.target.value})}
                                                            >
                                                                {['Genel', 'Sinav', 'Is'].map(f => <option key={f} value={f} className="bg-zinc-900">{t(`focus.${f}`)}</option>)}
                                                            </select>
                                                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary group-hover/select:translate-y-[-40%] transition-transform pointer-events-none" size={20} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <motion.button 
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={nextStep}
                                            className="w-full py-7 bg-secondary text-white rounded-2xl text-[10px] uppercase tracking-[0.5em] font-black shadow-neon hover:shadow-premium-hover transition-all duration-700 flex items-center justify-center gap-4"
                                        >
                                            {t('completeStep')} <ArrowRight size={18} />
                                        </motion.button>
                                    </div>
                                )}


                                {step === 2 && (
                                    <div className="col-span-full space-y-12">
                                        <div className="space-y-6">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1 flex items-center gap-2">
                                                <Clock size={16} className="text-secondary" /> 
                                                {(criteria.category === 'LANGUAGE_SCHOOL' || criteria.category === 'SUMMER_SCHOOL') ? t('fields.duration') : t('fields.period')}
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {(criteria.category === 'SUMMER_SCHOOL' ? [
                                                    { id: 'short_summer', icon: '☀️' }, { id: 'med_summer', icon: '🌊' }, { id: 'long_summer', icon: '🏄' }
                                                ] : criteria.category === 'LANGUAGE_SCHOOL' ? [
                                                    { id: 'short_lang', icon: '⚡' }, { id: 'med_lang', icon: '📚' }, { id: 'long_lang', icon: '🌎' }
                                                ] : [
                                                    { id: 'semester', icon: '🌓' }, { id: 'year', icon: '🌍' }, { id: 'full', icon: '🎓' }
                                                ]).map((dur) => (
                                                    <button
                                                        key={dur.id}
                                                        onClick={() => setCriteria({...criteria, duration: t(`durationLabels.${dur.id}`)})}
                                                        className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-700 ${criteria.duration === t(`durationLabels.${dur.id}`) ? 'border-secondary bg-secondary/10 text-white shadow-neon' : 'border-white/5 bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-secondary/40'}`}
                                                    >
                                                        <span className="font-black text-xs uppercase tracking-widest">{t(`durationLabels.${dur.id}`)}</span>
                                                        <span className="text-2xl">{dur.icon}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>


                                        <div className="space-y-6">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 ml-1 flex items-center gap-2">
                                                <Trophy size={16} className="text-secondary" /> {t('fields.budgetPlan')}
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {BUDGETS.map((bud) => (
                                                    <motion.button
                                                        key={bud.id}
                                                        whileHover={{ y: -6 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => setCriteria({...criteria, budget: bud.id as any})}
                                                        className={`text-left p-10 rounded-3xl border-2 transition-all duration-700 group shadow-sm hover:shadow-neon relative z-10 overflow-hidden ${
                                                            criteria.budget === bud.id 
                                                                ? 'border-secondary/60 bg-secondary/10 shadow-neon' 
                                                                : 'border-white/5 bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-secondary/40'
                                                        }`}
                                                    >
                                                        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-700">{bud.icon}</div>
                                                        <div className={`font-serif font-bold italic text-2xl group-hover:text-secondary transition-colors tracking-tight ${
                                                            criteria.budget === bud.id ? "text-secondary" : "text-white"
                                                        }`}>{bud.label}</div>
                                                        <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-3 leading-relaxed">{bud.desc}</div>
                                                        {criteria.budget === bud.id && <div className="absolute top-8 right-8 text-secondary animate-reveal"><CheckCircle2 size={32} strokeWidth={3} /></div>}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        <motion.button 
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={nextStep}
                                            disabled={!criteria.duration || !criteria.budget}
                                            className="w-full py-7 bg-secondary text-white rounded-2xl text-[10px] uppercase tracking-[0.5em] font-black shadow-neon hover:shadow-premium-hover disabled:opacity-20 transition-all duration-700 flex items-center justify-center gap-4 mt-4"
                                        >
                                            {t('nextStep')} <ArrowRight size={18} />
                                        </motion.button>
                                    </div>
                                )}


                                {step === 3 && COUNTRIES.map((ct) => (
                                    <motion.button
                                        key={ct.id}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelect('country', ct.id)}
                                        className={`p-10 rounded-3xl border-2 transition-all duration-700 relative overflow-hidden group/ct ${
                                            criteria.country === ct.id 
                                                ? 'border-secondary/60 bg-secondary/10 shadow-neon scale-105' 
                                                : 'border-white/5 bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-secondary/40'
                                        }`}
                                    >
                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className={`p-4 rounded-xl transition-colors duration-700 ${
                                                criteria.country === ct.id ? 'bg-secondary text-white' : 'bg-zinc-700 text-zinc-400'
                                            }`}>
                                                <Globe size={24} />
                                            </div>
                                            <div className={`font-serif font-bold italic text-2xl tracking-tight transition-colors ${
                                                criteria.country === ct.id ? 'text-secondary' : 'text-white'
                                            }`}>
                                                {ct.label}
                                            </div>
                                        </div>
                                        {criteria.country === ct.id && <div className="absolute top-10 right-10 text-secondary animate-reveal"><CheckCircle2 size={24} strokeWidth={3} /></div>}
                                        <ChevronRight size={24} className="absolute right-10 top-1/2 -translate-y-1/2 text-zinc-600 group-hover/ct:text-secondary group-hover/ct:translate-x-3 transition-all duration-500" />
                                    </motion.button>
                                ))}

                            </div>

                            {step > 0 && (
                                <button
                                    onClick={() => setStep(prev => prev - 1)}
                                    className="mt-14 text-[10px] font-black text-zinc-300 hover:text-secondary uppercase tracking-[0.4em] flex items-center gap-3 transition-all duration-700 group"
                                >
                                    <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> {t('prevStep')}
                                </button>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            ) : (
                <div className="space-y-12 animate-fadeIn relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-6">
                        <div className="space-y-4">
                             <div className="flex items-center gap-6">
                                <div className="p-4 bg-secondary text-white rounded-2xl shadow-neon">
                                    <Sparkles size={32} />
                                </div>
                                <h2 className="text-5xl font-serif font-bold italic tracking-tight text-white">
                                    {t('title')}
                                </h2>
                             </div>
                             <p className="text-[11px] uppercase tracking-[0.5em] text-zinc-500 font-bold ml-20">{results.length} {commonT('resultsFound')}</p>
                        </div>
                        <button 
                            onClick={reset}
                            className="bg-secondary text-white px-12 py-6 rounded-2xl hover:shadow-premium-hover transition-all duration-700 shadow-neon flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.4em]"
                        >
                            <RefreshCcw size={16} /> {t('retry')}
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="bg-zinc-800 p-32 text-center flex flex-col items-center gap-10 rounded-3xl border border-white/5 shadow-neon">
                            <div className="relative">
                                <div className="w-24 h-24 border-4 border-white/5 border-t-secondary rounded-[2rem] animate-spin" />
                                <Search className="absolute inset-0 m-auto text-secondary animate-pulse" size={32} />
                            </div>
                            <p className="font-black text-zinc-500 uppercase tracking-[0.5em] text-sm">{t('searching')}</p>
                        </div>
                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {results.length > 0 ? results.map((prog, idx) => (
                                <motion.div
                                    key={prog.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: idx * 0.1, ease: [0.65, 0, 0.35, 1] }}
                                    className="bg-zinc-800 p-10 md:p-14 min-h-[380px] flex flex-col relative overflow-hidden group asymmetric-bold border border-white/5 shadow-premium hover:shadow-neon transition-all duration-1000"
                                >
                                    <div className={`absolute top-0 right-0 px-10 py-5 rounded-bl-[2.5rem] font-black text-[9px] uppercase tracking-[0.4em] shadow-lg z-20 ${
                                        prog.compatibilityScore > 80 ? 'bg-secondary text-white' : 
                                        prog.compatibilityScore > 50 ? 'bg-secondary/60 text-white' : 
                                        'bg-zinc-700 text-zinc-400'
                                    }`}>
                                        {t('compatibility', { score: prog.compatibilityScore })}
                                    </div>

                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                                    <div className="flex items-start gap-8 mb-12 relative z-10">
                                        <div className="w-24 h-24 rounded-2xl bg-zinc-700 flex items-center justify-center p-5 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-1000 overflow-hidden bg-white">
                                            {prog.institution.logo ? (
                                                <Image 
                                                    src={prog.institution.logo} 
                                                    alt={prog.institution.name}
                                                    width={100} height={100} 
                                                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-1000" 
                                                />
                                            ) : <Building2 className="text-zinc-500 group-hover:text-secondary transition-colors" size={40} />}
                                        </div>
                                        <div className="flex-grow pt-3">
                                            <h4 className="font-serif font-bold italic text-white group-hover:text-secondary transition-colors pr-10 leading-tight text-2xl tracking-tight">{prog.name}</h4>
                                            <p className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 uppercase tracking-[0.3em] flex items-center gap-3 mt-5 transition-colors">
                                                <MapPin size={14} className="text-secondary" /> {prog.institution.city} / {prog.institution.country?.name || prog.institution.country}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 mb-12 flex-grow relative z-10">
                                        <div className="flex justify-between items-center bg-zinc-900/50 p-7 rounded-2xl border border-white/5 shadow-inner group-hover:bg-zinc-900 transition-colors duration-700">
                                            <span className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[9px]">{commonT('tuition')}</span>
                                            <span className="font-black text-secondary text-2xl tracking-tighter">
                                                {prog.price ? `${prog.price.toLocaleString()} ${prog.currency}` : commonT('getInformation')}
                                            </span>
                                        </div>
                                        
                                        {prog.mismatchReasons?.length > 0 && (
                                            <div className="p-6 bg-secondary/10 rounded-xl flex items-start gap-4 border border-secondary/20">
                                                <AlertCircle size={20} className="text-secondary shrink-0 mt-0.5" />
                                                <div className="text-[10px] text-zinc-400 font-bold leading-relaxed uppercase tracking-[0.2em]">
                                                    {t('mismatch', { reason: prog.mismatchReasons.join(', ') })}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                                        <Link 
                                            href={`/programlar/${prog.id}`}
                                            className="py-6 bg-zinc-700 hover:bg-zinc-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl transition-all text-center border border-white/5 shadow-sm"
                                        >
                                            {t('details')}
                                        </Link>
                                        <button 
                                            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="py-6 bg-secondary text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl shadow-neon hover:shadow-premium-hover transition-all duration-700 flex items-center justify-center gap-3 group/btn"
                                        >
                                            {t('applyNow')} <ArrowRight size={16} className="group-hover/btn:translate-x-3 transition-transform duration-700" />
                                        </button>
                                    </div>
                                </motion.div>
                            )) : (

                                <div className="col-span-full bg-zinc-800 p-32 text-center rounded-3xl border border-white/5 shadow-neon">
                                    <div className="w-24 h-24 bg-zinc-700 rounded-2xl flex items-center justify-center mx-auto mb-12 border border-white/5 shadow-inner">
                                        <Search size={40} className="text-zinc-500" />
                                    </div>
                                    <p className="text-4xl font-serif font-bold italic text-white mb-6 tracking-tight">{t('noMatch')}</p>
                                    <p className="text-[14px] text-zinc-500 font-bold uppercase tracking-[0.3em] max-w-sm mx-auto mb-14 leading-loose">{t('noMatchDesc')}</p>
                                    <button onClick={reset} className="bg-secondary text-white px-16 py-7 rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] shadow-neon hover:shadow-premium-hover transition-all duration-700">{t('retry')}</button>
                                </div>

                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

