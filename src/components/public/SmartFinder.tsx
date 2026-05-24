"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
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
    RefreshCcw,
    ShieldCheck,
    Zap,
    Sun,
    Languages
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { Link, useRouter } from '@/i18n/routing';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { findProgramsAction, getFinderCountriesAction, type FinderCriteria } from '@/app/actions/finder-actions';
import { createApplicationAction } from '@/app/actions/student-actions';
import AuthModal from '@/components/public/AuthModal';
import CelebrationOverlay from '@/components/public/CelebrationOverlay';
import ProgramDetailModal from '@/components/public/ProgramDetailModal';
import SafeComponent from '@/components/public/SafeComponent';
import SafeHTMLContent from './SafeHTMLContent';

export default function SmartFinder() {
    const t = useTranslations('SmartFinder');
    const celT = useTranslations('Celebration');
    const commonT = useTranslations('Common');
    const countriesT = useTranslations('SmartFinder.countries');
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const locale = params ? params.locale as string : "tr";
    
    const [step, setStep] = useState(0);
    const [criteria, setCriteria] = useState<FinderCriteria>({});
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    
    // Program Detail Modal
    const [selectedProgram, setSelectedProgram] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Auth integration
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingProgramId, setPendingProgramId] = useState<string | null>(null);
    const [isApplying, setIsApplying] = useState<string | null>(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [dynamicCountries, setDynamicCountries] = useState<{id: string, label: string, slug?: string}[]>([]);
    const [sortBy, setSortBy] = useState<'compatibility' | 'price'>('compatibility');

    const BASE_STEPS = [
        { id: 'category', title: t('steps.category'), icon: <GraduationCap size={20} /> },
        { id: 'profile', title: t('steps.profile'), icon: <BookOpen size={20} /> },
        { id: 'country', title: t('steps.country'), icon: <Globe size={20} /> },
    ];

    const CATEGORIES = [
        { id: 'UNIVERSITY', label: t('categories.UNIVERSITY.label'), desc: t('categories.UNIVERSITY.desc'), color: 'from-primary/10 to-primary/5', icon: <GraduationCap size={32} className="text-primary" /> },
        { id: 'MASTER', label: t('categories.MASTER.label'), desc: t('categories.MASTER.desc'), color: 'from-secondary/20 to-secondary/10', icon: <Trophy size={32} className="text-secondary" /> },
        { id: 'HIGH_SCHOOL', label: t('categories.HIGH_SCHOOL.label'), desc: t('categories.HIGH_SCHOOL.desc'), color: 'from-primary/15 to-zinc-50/50', icon: <Building2 size={32} className="text-primary/80" /> },
        { id: 'LANGUAGE_SCHOOL', label: t('categories.LANGUAGE_SCHOOL.label'), desc: t('categories.LANGUAGE_SCHOOL.desc'), color: 'from-secondary/15 to-zinc-50/50', icon: <Languages size={32} className="text-secondary/80" /> },
        { id: 'SUMMER_SCHOOL', label: t('categories.SUMMER_SCHOOL.label'), desc: t('categories.SUMMER_SCHOOL.desc'), color: 'from-primary/10 to-secondary/10', icon: <Sun size={32} className="text-primary/70" /> },
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

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await getFinderCountriesAction(locale);
            if (res.success && res.data) {
                setDynamicCountries([
                    { id: 'ALL', label: t('countries.ALL') },
                    ...res.data
                ]);
            }
        };
        fetchCountries();
    }, [locale]);

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
        if (result.success && result.data) {
            setResults(result.data);
        } else {
            setResults([]);
        }
        setIsLoading(false);
    };

    const handleApply = async (programId: string) => {
        if (!session) {
            setPendingProgramId(programId);
            setIsAuthModalOpen(true);
            return;
        }

        if (session.user.role !== 'STUDENT') {
            toast.error(commonT('onlyStudentsCanApply'));
            return;
        }

        setIsApplying(programId);
        try {
            const res = await createApplicationAction(programId);
            if (res.success) {
                setShowCelebration(true);
                setTimeout(() => {
                    router.push('/dashboard/student');
                }, 4000);
            } else if (res.error === 'ALREADY_APPLIED') {
                toast.info(commonT('alreadyApplied'));
                router.push('/dashboard/student');
            } else {
                toast.error(res.error || commonT('applicationError'));
            }
        } catch (err) {
            toast.error(commonT('applicationError'));
        } finally {
            setIsApplying(null);
        }
    };

    const onAuthSuccess = () => {
        if (pendingProgramId) {
            handleApply(pendingProgramId);
            setPendingProgramId(null);
        }
    };

    const reset = () => {
        setStep(0);
        setCriteria({});
        setResults([]);
        setIsFinished(false);
    };

    return (
        <SafeComponent name="SmartFinder">
            <div className="w-full max-w-5xl mx-auto p-4 md:p-10">
            {!isFinished ? (
                <div className="space-y-12">
                    <div className="text-center space-y-4 mb-8">
                        <SafeHTMLContent
                            as="h2"
                            className="text-3xl md:text-5xl font-serif font-bold italic text-primary"
                            html={t.raw('mainTitle') || "AI Planner"}
                        />
                        <SafeHTMLContent
                            as="p"
                            className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                            html={t.raw('mainSubtitle') || ""}
                        />
                    </div>
                    {/* Progress Bar */}
                    <div className="flex justify-between items-center bg-white/60 backdrop-blur-2xl p-6 rounded-[2.5rem] px-10 border border-white/50 shadow-premium">
                        {steps.map((s, idx) => (
                            <div key={s.id} className="flex items-center gap-4 group/step">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all duration-1000 shadow-xl ${
                                    idx <= step ? "bg-secondary text-white scale-110 rotate-3" : "bg-zinc-100 text-zinc-400"
                                }`}>
                                    {idx < step ? <CheckCircle2 size={20} strokeWidth={3} /> : idx + 1}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-1000 ${
                                    idx <= step ? "max-w-[150px] opacity-100 mr-2 text-primary" : "max-w-0 opacity-0"
                                } hidden md:block`}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                            className="bg-white/80 backdrop-blur-sm p-10 md:p-16 shadow-premium border border-white rounded-[3.5rem] relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-1000 rotate-12">
                                {steps[step].icon}
                            </div>

                            <div className="flex items-center gap-6 mb-14 relative z-10">
                                <div className="p-5 bg-secondary/10 text-secondary rounded-[1.5rem] shadow-sm rotate-6 group-hover:rotate-0 transition-transform duration-700">
                                    {steps[step].icon}
                                </div>
                                <div>
                                    <h2 className="text-4xl font-serif font-bold italic tracking-tight text-primary">
                                        {steps[step].title}
                                    </h2>
                                    <div className="h-1 w-12 bg-secondary/20 mt-2 rounded-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                {step === 0 && CATEGORIES.map((cat) => (
                                    <motion.button
                                        key={cat.id}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelect('category', cat.id)}
                                        className={`text-left p-10 rounded-[2.5rem] border border-white bg-gradient-to-br ${cat.color} hover:bg-zinc-50 transition-all duration-700 group shadow-sm hover:shadow-premium relative overflow-hidden`}
                                    >
                                        <div className="relative z-10 flex items-start gap-6">
                                            <div className="p-4 rounded-2xl bg-white/50 border border-white shadow-sm transition-transform group-hover:scale-110 duration-500">
                                                {cat.icon}
                                            </div>
                                            <div>
                                                <div className="font-serif font-bold italic text-primary text-2xl group-hover:text-secondary transition-colors mb-2">{cat.label}</div>
                                                <div className="text-[13px] text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-600 transition-colors uppercase tracking-widest">{cat.desc}</div>
                                            </div>
                                        </div>
                                        <ArrowRight className="absolute bottom-10 right-10 text-primary/10 group-hover:text-secondary/30 group-hover:translate-x-2 transition-all duration-700" size={40} />
                                    </motion.button>
                                ))}

                                {step === 1 && (
                                    <div className="col-span-full space-y-12">
                                        {(criteria.category === 'UNIVERSITY' || criteria.category === 'MASTER') ? (
                                            <div className="space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    <div className="space-y-4">
                                                        <label htmlFor="finder-gpa" className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 ml-1 flex items-center gap-2">
                                                            <Trophy size={14} className="text-secondary" /> {t('fields.gpa')}
                                                        </label>
                                                        <input 
                                                            id="finder-gpa"
                                                            type="number" step="0.1" min="0" max="4"
                                                            placeholder={t('fields.gpaPlaceholder')}
                                                            className="w-full p-6 rounded-2xl bg-zinc-50/50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-black text-xl shadow-inner"
                                                            value={criteria.gpa || ''}
                                                            onChange={(e) => setCriteria({...criteria, gpa: parseFloat(e.target.value)})}
                                                        />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label htmlFor="finder-lang-proficiency" className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 ml-1 flex items-center gap-2">
                                                            <Sparkles size={14} className="text-secondary" /> {t('fields.langProficiency')}
                                                        </label>
                                                        <div className="relative">
                                                            <select 
                                                                id="finder-lang-proficiency"
                                                                className="w-full p-6 rounded-2xl bg-zinc-50/50 border border-zinc-100 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-primary font-black text-lg appearance-none shadow-inner cursor-pointer"
                                                                value={criteria.languageScore || ''}
                                                                onChange={(e) => setCriteria({...criteria, languageScore: e.target.value})}
                                                            >
                                                                <option value="">{t('selectScore')}</option>
                                                                <option value="IELTS 6.0">IELTS 6.0</option>
                                                                <option value="IELTS 6.5">IELTS 6.5</option>
                                                                <option value="IELTS 7.0+">IELTS 7.0+</option>
                                                                <option value="Duolingo 110">Duolingo 110+</option>
                                                                <option value="Telc A2">Telc A2</option>
                                                                <option value="Telc B1">Telc B1</option>
                                                                <option value="Telc B2">Telc B2</option>
                                                                <option value="Telc C1">Telc C1</option>
                                                                <option value="Telc C2">Telc C2</option>
                                                                <option value="DSH I">DSH I</option>
                                                                <option value="DSH II">DSH II</option>
                                                                <option value="TestDaf">TestDaf</option>
                                                                <option value="DSD">DSD</option>
                                                                <option value="Geothe-Z">Geothe-Z</option>
                                                                <option value="KMK">KMK</option>
                                                                <option value="DTZ">DTZ</option>
                                                                <option value="KP">KP</option>
                                                                <option value="TMS">TMS</option>
                                                                <option value="FSP">FSP</option>
                                                            </select>
                                                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" size={20} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 ml-1">{t('fields.specialization')}</label>
                                                    <div className="flex flex-wrap gap-4">
                                                        {['ENGINEERING', 'BUSINESS', 'MEDICINE', 'ART', 'OTHER'].map(area => (
                                                            <button
                                                                key={area}
                                                                onClick={() => setCriteria({...criteria, preference: area})}
                                                                className={`flex-1 min-w-[120px] p-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 border-2 ${criteria.preference === area ? 'bg-secondary border-secondary text-white shadow-2xl scale-105' : 'bg-white border-zinc-100 text-zinc-400 hover:text-primary hover:border-zinc-300'}`}
                                                            >
                                                                {t(`areas.${area}`)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : criteria.category === 'HIGH_SCHOOL' ? (
                                            <div className="space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 ml-1">{t('fields.highSchoolGpa')}</label>
                                                        <input 
                                                            type="number" placeholder={t('fields.highSchoolGpaPlaceholder')}
                                                            className="w-full p-6 rounded-2xl bg-zinc-50/50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none text-primary font-black text-xl shadow-inner"
                                                            value={criteria.gpa || ''}
                                                            onChange={(e) => setCriteria({...criteria, gpa: parseFloat(e.target.value)})}
                                                        />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 ml-1">{t('fields.langLevel')}</label>
                                                        <div className="flex gap-4">
                                                            {['A2', 'B1', 'B2'].map(lvl => (
                                                                <button
                                                                    key={lvl}
                                                                    onClick={() => setCriteria({...criteria, languageScore: lvl})}
                                                                    className={`flex-1 p-5 rounded-2xl font-black transition-all duration-700 ${criteria.languageScore === lvl ? 'bg-secondary text-white shadow-2xl scale-105 rotate-2' : 'bg-zinc-50/50 text-zinc-400 hover:text-primary hover:bg-white'}`}
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
                                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 ml-1">{t('fields.currentLangLevel')}</label>
                                                        <div className="grid grid-cols-4 gap-3">
                                                            {['A1', 'A2', 'B1', 'B2'].map(lvl => (
                                                                <button
                                                                    key={lvl}
                                                                    onClick={() => setCriteria({...criteria, languageScore: lvl})}
                                                                    className={`p-5 rounded-2xl font-black transition-all duration-700 ${criteria.languageScore === lvl ? 'bg-secondary text-white shadow-2xl scale-110' : 'bg-white border border-zinc-100 text-zinc-400 hover:text-primary'}`}
                                                                >
                                                                    {lvl}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label htmlFor="finder-edu-focus" className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 ml-1">{t('fields.eduFocus')}</label>
                                                        <div className="relative">
                                                            <select 
                                                                id="finder-edu-focus"
                                                                className="w-full p-6 rounded-2xl bg-zinc-50/50 border border-zinc-100 focus:bg-white focus:border-secondary outline-none text-primary font-black appearance-none shadow-inner cursor-pointer"
                                                                onChange={(e) => setCriteria({...criteria, preference: e.target.value})}
                                                            >
                                                                {['GENERAL', 'EXAM', 'BUSINESS'].map(f => <option key={f} value={f}>{t(`focus.${f}`)}</option>)}
                                                            </select>
                                                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" size={20} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <motion.button 
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={nextStep}
                                            className="btn-primary w-full py-6 text-xs uppercase tracking-[0.4em] font-black shadow-2xl"
                                        >
                                            {t('completeStep')} <ArrowRight size={18} className="ml-2" />
                                        </motion.button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="col-span-full space-y-12">
                                        <div className="space-y-6">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 ml-1 flex items-center gap-2">
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
                                                        className={`flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all duration-700 ${criteria.duration === t(`durationLabels.${dur.id}`) ? 'border-secondary bg-secondary/5 text-primary shadow-premium' : 'border-zinc-50 bg-white text-zinc-400 hover:text-primary hover:border-zinc-200'}`}
                                                    >
                                                        <span className="font-black text-xs uppercase tracking-widest">{t(`durationLabels.${dur.id}`)}</span>
                                                        <span className="text-2xl">{dur.icon}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>


                                        <motion.button 
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={nextStep}
                                            disabled={!criteria.duration}
                                            className="btn-primary w-full py-6 text-xs uppercase tracking-[0.4em] font-black disabled:opacity-20 shadow-2xl mt-4"
                                        >
                                            {t('nextStep')} <ArrowRight size={18} className="ml-2" />
                                        </motion.button>
                                    </div>
                                )}

                                {step === 2 && dynamicCountries.map((ct) => (
                                    <motion.button
                                        key={ct.id}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelect('country', ct.id)}
                                        className="text-left p-10 rounded-[2.5rem] border-2 border-zinc-50 hover:border-secondary/30 hover:bg-zinc-50 transition-all duration-700 group shadow-sm hover:shadow-premium bg-white relative z-10 overflow-hidden"
                                    >
                                        <div className="font-serif font-bold italic text-primary text-2xl group-hover:text-secondary transition-colors uppercase tracking-tight">{ct.label}</div>
                                        <ChevronRight size={24} className="absolute right-10 top-1/2 -translate-y-1/2 text-zinc-200 group-hover:text-secondary group-hover:translate-x-2 transition-all" />
                                    </motion.button>
                                ))}
                            </div>

                            {step > 0 && (
                                <button
                                    onClick={() => setStep(prev => prev - 1)}
                                    className="mt-14 text-[10px] font-black text-zinc-300 hover:text-secondary uppercase tracking-[0.3em] flex items-center gap-2 transition-all duration-700 group"
                                >
                                    <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> {t('prevStep')}
                                </button>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            ) : (
                <div className="space-y-12 animate-fadeIn">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Sparkles className="text-secondary" size={32} />
                                    <SafeHTMLContent
                                        as="h2"
                                        className="text-5xl font-serif font-bold italic tracking-tight text-primary"
                                        html={t.raw('resultsTitle') || "Analiz Sonuçları"}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-3 ml-12">
                                    {Object.entries(criteria).map(([key, value]) => {
                                        if (!value || value === 'ALL' || value === 0) return null;
                                        
                                        // Translate the field label
                                        let label = t(`fields.${key}`);
                                        if (label.includes('fields.')) label = key;
                                        
                                        // Translate the value based on the field type
                                        let displayValue = String(value);
                                        
                                        if (key === 'category') {
                                            displayValue = t(`categories.${value}.label`);
                                        } else if (key === 'preference') {
                                            displayValue = t(`areas.${value}`);
                                        } else if (key === 'country') {
                                            const countryObj = dynamicCountries.find(c => c.id === value || c.slug === value);
                                            if (countryObj) {
                                                const countrySlug = countryObj.slug || countryObj.id;
                                                const translated = t(`countries.${countrySlug}`);
                                                displayValue = translated.includes('countries.') ? (countryObj.label || countrySlug) : translated;
                                            } else {
                                                const translated = t(`countries.${value}`);
                                                displayValue = translated.includes('countries.') ? String(value) : translated;
                                            }
                                        } else if (key === 'budget') {
                                            displayValue = t(`budgetLabels.${value}.label`);
                                        } else if (key === 'languageScore') {
                                            displayValue = String(value);
                                        }

                                        // Final check: if displayValue contains the full key path, it means translation failed
                                        if (displayValue.includes('SmartFinder.') || displayValue.includes('.label')) {
                                            displayValue = String(value);
                                        }

                                        return (
                                            <div key={key} className="bg-zinc-100/80 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500 border border-zinc-200/50 flex items-center gap-2">
                                                <span className="opacity-40">{label}:</span> 
                                                <span className="text-primary">{displayValue}</span>
                                            </div>
                                        );
                                    })}
                                    <div className="bg-secondary/10 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-secondary border border-secondary/20 flex items-center gap-2">
                                        <Sparkles size={10} /> {results.length} {commonT('resultsFound')}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                                {/* Mobile Sort Buttons */}
                                <div className="flex md:hidden items-center gap-2 bg-zinc-100/50 p-1.5 rounded-2xl border border-zinc-200/50">
                                    <button 
                                        onClick={() => setSortBy('compatibility')}
                                        className={`px-3 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${
                                            sortBy === 'compatibility' ? 'bg-white shadow-sm text-primary' : 'text-zinc-400'
                                        }`}
                                    >
                                        {t('sortBy.compatibility')}
                                    </button>
                                    <button 
                                        onClick={() => setSortBy('price')}
                                        className={`px-3 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${
                                            sortBy === 'price' ? 'bg-white shadow-sm text-primary' : 'text-zinc-400'
                                        }`}
                                    >
                                        {t('sortBy.price')}
                                    </button>
                                </div>

                                <div className="hidden md:flex items-center gap-2 bg-zinc-100/50 p-2 rounded-2xl border border-zinc-200/50">
                                    <button 
                                        onClick={() => setSortBy('compatibility')}
                                        className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                                            sortBy === 'compatibility' ? 'bg-white shadow-premium text-primary border border-zinc-100' : 'text-zinc-400 hover:text-primary'
                                        }`}
                                    >
                                        {t('sortBy.compatibility')}
                                    </button>
                                    <button 
                                        onClick={() => setSortBy('price')}
                                        className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                                            sortBy === 'price' ? 'bg-white shadow-premium text-primary border border-zinc-100' : 'text-zinc-400 hover:text-primary'
                                        }`}
                                    >
                                        {t('sortBy.price')}
                                    </button>
                                </div>
                                <button 
                                    onClick={reset}
                                    className="bg-zinc-950 text-white px-8 py-5 rounded-2xl hover:bg-primary transition-all duration-700 shadow-xl flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]"
                                >
                                    <RefreshCcw size={16} /> {t('retry')}
                                </button>
                            </div>
                        </div>

                    {isLoading ? (
                        <div className="bg-white/80 backdrop-blur-sm p-32 text-center flex flex-col items-center gap-10 rounded-[3.5rem] border border-white shadow-premium">
                            <div className="relative">
                                <div className="w-24 h-24 border-4 border-zinc-50 border-t-secondary rounded-[2rem] animate-spin" />
                                <Search className="absolute inset-0 m-auto text-secondary/30" size={32} />
                            </div>
                            <p className="font-black text-zinc-400 uppercase tracking-[0.4em] text-sm animate-pulse">{t('searching')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {results.length > 0 ? [...results].sort((a, b) => {
                                if (sortBy === 'price') return (a.price || 0) - (b.price || 0);
                                return b.compatibilityScore - a.compatibilityScore;
                            }).map((prog, idx) => (
                                <motion.div
                                    key={prog.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: idx * 0.1, ease: [0.65, 0, 0.35, 1] }}
                                    className="bg-white/90 backdrop-blur-md p-10 md:p-14 min-h-[400px] flex flex-col relative overflow-hidden group border border-white rounded-[3.5rem] shadow-premium hover:shadow-2xl transition-all duration-1000"
                                >
                                    {/* Top Match Ribbon & Glow */}
                                    {idx === 0 && prog.compatibilityScore >= 90 && (
                                        <>
                                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />
                                            <div className="absolute top-8 left-[-40px] bg-secondary text-white px-12 py-1.5 rotate-[-45deg] text-[8px] font-black uppercase tracking-[0.3em] shadow-lg z-30">
                                                {t('result.topMatch')}
                                            </div>
                                        </>
                                    )}

                                    <div className={`absolute top-0 right-0 px-8 py-4 rounded-bl-[2.5rem] font-black text-[9px] uppercase tracking-[0.3em] shadow-xl z-20 ${
                                        prog.compatibilityScore > 80 ? 'bg-emerald-500 text-white' : 
                                        prog.compatibilityScore > 50 ? 'bg-secondary text-white' : 
                                        'bg-zinc-500 text-white'
                                    }`}>
                                        {t('compatibility', { score: prog.compatibilityScore })}
                                    </div>

                                    <div className="flex items-start gap-8 mb-10 relative z-10">
                                        <Link 
                                            href={`/kurumsal/kurumlar/${prog.institution.slug}`}
                                            className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center p-4 border border-zinc-50 shadow-inner group-hover:scale-110 transition-transform duration-1000 overflow-hidden"
                                        >
                                            {prog.institution.logo ? (
                                                <Image 
                                                    src={prog.institution.logo} 
                                                    alt={prog.institution.name}
                                                    width={100} height={100} 
                                                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-1000" 
                                                />
                                            ) : <Building2 className="text-zinc-200 group-hover:text-secondary transition-colors" size={40} />}
                                        </Link>
                                        <div className="flex-grow pt-2">
                                            <Link href={`/programlar/${prog.slug}`}>
                                                <h4 className="font-serif font-bold italic text-primary group-hover:text-secondary transition-colors pr-12 leading-tight text-3xl hover:underline decoration-secondary/30">{prog.name}</h4>
                                            </Link>
                                            <div className="text-[10px] font-black text-zinc-400 group-hover:text-primary uppercase tracking-[0.2em] flex flex-wrap items-center gap-3 mt-4 transition-colors">
                                                <Link 
                                                    href={`/kurumsal/kurumlar/${prog.institution.slug}`}
                                                    className="hover:text-secondary transition-colors"
                                                >
                                                    {prog.institution.name}
                                                </Link>
                                                <span className="text-zinc-300">•</span>
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin size={12} className="text-secondary" /> 
                                                    {prog.institution.city} • {prog.institution.country?.name || prog.institution.country?.label || (typeof prog.institution.country === 'string' ? prog.institution.country : '')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 mb-12 flex-grow relative z-10">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-zinc-50/50 p-6 rounded-[2rem] border border-white shadow-inner flex flex-col justify-between h-full group-hover:bg-white transition-colors duration-700">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm text-secondary">
                                                        <Euro size={14} />
                                                    </div>
                                                    <span className="text-zinc-400 font-black uppercase tracking-[0.2em] text-[8px]">{commonT('tuition')}</span>
                                                </div>
                                                <span className="font-black text-primary text-xl tracking-tight leading-none">
                                                    {prog.price ? `${prog.price.toLocaleString()} ${prog.currency}` : commonT('getInformation')}
                                                </span>
                                            </div>

                                            <div className="bg-zinc-50/50 p-6 rounded-[2rem] border border-white shadow-inner flex flex-col justify-between h-full group-hover:bg-white transition-colors duration-700">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm text-secondary">
                                                        <Clock size={14} />
                                                    </div>
                                                    <span className="text-zinc-400 font-black uppercase tracking-[0.2em] text-[8px]">{t('result.duration')}</span>
                                                </div>
                                                <span className="font-black text-primary text-xl tracking-tight leading-none lowercase">
                                                    {prog.duration || t('result.defaultDuration')}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-3">
                                            <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50/50 px-5 py-3 rounded-2xl border border-emerald-100/50 group-hover:bg-emerald-50 transition-colors duration-700">
                                                <ShieldCheck size={14} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">{t('result.fastTrack')}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-secondary bg-secondary/5 px-5 py-3 rounded-2xl border border-secondary/10 group-hover:bg-secondary/10 transition-colors duration-700">
                                                <Zap size={14} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">{t('result.directAdmit')}</span>
                                            </div>
                                        </div>

                                        {prog.mismatchReasons?.length > 0 && (
                                            <div className="p-6 bg-amber-50/50 rounded-[2rem] flex items-start gap-4 border border-amber-100/50">
                                                <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                                <div className="text-[9px] text-amber-700 font-bold leading-relaxed uppercase tracking-widest">
                                                    {t('mismatch', { reason: prog.mismatchReasons.join(', ') })}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 mt-auto">
                                        <button 
                                            onClick={() => {
                                                setSelectedProgram(prog);
                                                setIsModalOpen(true);
                                            }}
                                            className="py-5 bg-white hover:bg-zinc-50 text-zinc-950 text-[10px] font-black uppercase tracking-[0.3em] rounded-[1.5rem] transition-all text-center border border-zinc-100 shadow-sm"
                                        >
                                            {t('details')}
                                        </button>
                                        <button 
                                            onClick={() => handleApply(prog.id)}
                                            disabled={isApplying === prog.id}
                                            className="btn-primary py-5 text-[10px] tracking-[0.3em] gap-3 group/btn rounded-[1.5rem] relative overflow-hidden"
                                        >
                                            {isApplying === prog.id ? (
                                                <RefreshCcw size={16} className="animate-spin" />
                                            ) : (
                                                <>
                                                    {t('applyNow')} <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform duration-700" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="col-span-full bg-white/80 backdrop-blur-sm p-32 text-center rounded-[3.5rem] border border-white shadow-premium">
                                    <div className="w-24 h-24 bg-zinc-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-zinc-100">
                                        <Search size={40} className="text-zinc-200" />
                                    </div>
                                    <p className="text-3xl font-serif font-bold italic text-primary mb-4">{t('noMatch')}</p>
                                    <p className="text-[13px] text-zinc-400 font-bold uppercase tracking-widest max-w-sm mx-auto mb-12 leading-relaxed">{t('noMatchDesc')}</p>
                                    <button onClick={reset} className="btn-secondary px-12 py-5 text-[10px] tracking-[0.4em]">{t('retry')}</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
                onSuccess={onAuthSuccess}
                initialMode="register"
            />

            <ProgramDetailModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                program={selectedProgram}
                onApply={handleApply}
                isApplying={isApplying === selectedProgram?.id}
            />

            <CelebrationOverlay 
                isVisible={showCelebration}
                title={celT('defaultTitle')}
                message={celT('defaultMessage')}
            />
        </SafeComponent>
    );
}
