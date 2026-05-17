"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Calendar, 
    BookOpen, 
    Euro, 
    MapPin, 
    CheckCircle2, 
    Building2,
    GraduationCap,
    Clock,
    Globe,
    Zap,
    ShieldCheck,
    ArrowRight,
    Sparkles,
    Trophy,
    Users,
    Target,
    Award,
    LogIn,
    UserPlus,
    Lock
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import AuthModal from './AuthModal';

interface ProgramDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    program: any;
    onApply: (programId: string) => void;
    isApplying: boolean;
}

/** Returns a rich, category-specific educational goal description */
function getEducationalGoal(program: any, t: any): string {
    // Use DB description first
    if (program.description && program.description.trim().length > 20) {
        return program.description;
    }

    const category = program.category || '';
    const name = program.name || '';

    const goals: Record<string, string> = {
        LANGUAGE_SCHOOL:
            `${name} programı, uluslararası ortamda dil becerilerini geliştirmeyi ve global iletişim yetkinliği kazanmayı hedefler. Mezunlar; sınavlarda (IELTS, TOEFL, Goethe) yüksek puan alabilir, iş ve akademik yaşamda akıcı iletişim kurabilir hale gelir.`,
        UNIVERSITY:
            `${name} programı, lisans düzeyinde kapsamlı akademik bilgi ile donanmış, uluslararası iş dünyasına hazır mezunlar yetiştirmeyi hedefler. Öğrenciler araştırma becerileri, kritik düşünce ve alan uzmanlığı kazanır.`,
        MASTER:
            `${name} programı, seçilen alanda ileri düzey akademik ve profesyonel yetkinlik kazandırmayı amaçlar. Mezunlar, küresel ölçekte kariyer fırsatlarına erişim sağlar ve sektörde lider konumlara yükselir.`,
        HIGH_SCHOOL:
            `${name} programı, öğrencilere uluslararası müfredatla (IB, A-Level, Abitur vb.) yüksek öğretim sürecine güçlü bir başlangıç yapmaları için kültürel uyum ve akademik disiplin kazandırır.`,
        SUMMER_SCHOOL:
            `${name} programı, kısa yoğun eğitim formatında akademik içerik, liderlik becerileri ve kültürel deneyimi bir arada sunarak öğrencilerin özgüvenini ve global bakış açısını geliştirmeyi hedefler.`,
    };

    return goals[category] || `${name} programı, katılımcılara uluslararası standartlarda akademik ve kişisel gelişim imkânı sunar.`;
}

export default function ProgramDetailModal({ 
    isOpen, 
    onClose, 
    program, 
    onApply,
    isApplying 
}: ProgramDetailModalProps) {
    const t = useTranslations('SmartFinder');
    const commonT = useTranslations('Common');
    const { data: session } = useSession();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

    if (!program) return null;

    const isStudent = session?.user?.role === 'STUDENT';
    const isLoggedIn = !!session;

    const handleApplyClick = () => {
        if (!isLoggedIn) {
            setAuthMode('register');
            setShowAuthModal(true);
            return;
        }
        onApply(program.id);
    };

    const educationalGoal = getEducationalGoal(program, t);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white/90 backdrop-blur-2xl rounded-[3rem] border border-white/50 shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="relative h-48 md:h-64 overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary to-navy opacity-90" />
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                                
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl transition-all z-20 border border-white/20"
                                >
                                    <X size={20} />
                                </button>

                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 bg-gradient-to-t from-black/60 to-transparent">
                                    <div className="flex items-end gap-6">
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl p-3 shadow-2xl shrink-0">
                                            {program.institution?.logo ? (
                                                <Image 
                                                    src={program.institution.logo} 
                                                    alt={program.institution.name}
                                                    width={100} height={100}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : <Building2 size={40} className="text-zinc-200" />}
                                        </div>
                                        <div className="mb-2">
                                            <h2 className="text-2xl md:text-4xl font-serif font-bold italic text-white leading-tight">
                                                {program.name}
                                            </h2>
                                            <p className="text-white/80 font-black text-[10px] uppercase tracking-[0.2em] flex flex-wrap items-center gap-2 mt-2">
                                                <MapPin size={12} className="text-secondary" />
                                                <Link 
                                                    href={`/kurumsal/kurumlar/${program.institution?.slug}`}
                                                    className="hover:text-secondary transition-colors"
                                                >
                                                    {program.institution?.name}
                                                </Link>
                                                <span className="text-white/40">•</span>
                                                <span>{program.institution?.city}, {program.institution?.country?.name || program.institution?.country?.label || (typeof program.institution?.country === 'string' ? program.institution?.country : '')}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {/* Left Column */}
                                    <div className="md:col-span-2 space-y-10">
                                        {/* Key Stats */}
                                        <section>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                <Sparkles size={14} className="text-secondary" /> {t('details')}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 group hover:border-secondary/30 transition-all duration-500">
                                                    <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-4 text-secondary group-hover:scale-110 transition-transform">
                                                        <Calendar size={18} />
                                                    </div>
                                                    <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">{t('fields.period')}</div>
                                                    <div className="font-bold text-primary">{program.duration || 'N/A'}</div>
                                                </div>
                                                <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 group hover:border-secondary/30 transition-all duration-500">
                                                    <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-4 text-secondary group-hover:scale-110 transition-transform">
                                                        <Euro size={18} />
                                                    </div>
                                                    <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">{commonT('tuition')}</div>
                                                    <div className="font-bold text-primary">
                                                        {program.price ? `${program.price.toLocaleString()} ${program.currency}` : commonT('getInformation')}
                                                    </div>
                                                </div>
                                                {program.institution?.rank && (
                                                    <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 group hover:border-secondary/30 transition-all duration-500">
                                                        <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-4 text-amber-500 group-hover:scale-110 transition-transform">
                                                            <Trophy size={18} />
                                                        </div>
                                                        <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">{t('modal.ranking')}</div>
                                                        <div className="font-bold text-primary">{program.institution.rank}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        {/* Educational Goal — always meaningful content */}
                                        <section>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                <BookOpen size={14} className="text-secondary" /> {t('fields.eduGoal')}
                                            </h3>
                                            <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 leading-relaxed text-zinc-600 italic">
                                                {educationalGoal}
                                            </div>
                                        </section>

                                        {/* Admission Criteria */}
                                        {program.templateData && (program.templateData.minGpa || program.templateData.languageScore) && (
                                            <section>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                    <Award size={14} className="text-secondary" /> {t('modal.admissionCriteria')}
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {program.templateData.minGpa && (
                                                        <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                                                            <div className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">{t('modal.minGpa')}</div>
                                                            <div className="text-sm font-bold text-primary">{program.templateData.minGpa}</div>
                                                        </div>
                                                    )}
                                                    {program.templateData.languageScore && (
                                                        <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                                                            <div className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">{t('modal.langProficiency')}</div>
                                                            <div className="text-sm font-bold text-primary">{program.templateData.languageScore}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </section>
                                        )}

                                        {/* Institution Highlights */}
                                        {program.institution?.features && Array.isArray(program.institution.features) && program.institution.features.length > 0 && (
                                            <section>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                    <Target size={14} className="text-secondary" /> {t('modal.highlights')}
                                                </h3>
                                                <div className="flex flex-wrap gap-3">
                                                    {program.institution.features.map((feature: string, idx: number) => (
                                                        <div key={idx} className="px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] shadow-sm">
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Institutional Stats */}
                                        {program.institution?.stats && (
                                            <section>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                    <Users size={14} className="text-secondary" /> {t('modal.institutionalStats')}
                                                </h3>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                    {Object.entries(program.institution.stats).map(([key, value]: [string, any], idx) => (
                                                        <div key={idx} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                                                            <div className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">{key}</div>
                                                            <div className="text-sm font-bold text-primary">{value}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Process badges */}
                                        <section>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                                                <CheckCircle2 size={14} className="text-emerald-500" /> {t('secureApplication')}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                                                    <ShieldCheck size={16} /> {t('fastProcessing')}
                                                </div>
                                                <div className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                                                    <Zap size={16} /> {t('directAdmission')}
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Column: Actions */}
                                    <div className="space-y-6">
                                        {/* Compatibility card */}
                                        <div className="p-8 bg-primary text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group/card">
                                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover/card:scale-150 transition-transform duration-1000" />
                                            <div className="relative z-10">
                                                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-2">{t('compatibilityLabel')}</div>
                                                <div className="text-5xl font-serif font-bold italic mb-8">
                                                    %{program.compatibilityScore || 0}
                                                </div>

                                                {/* Apply CTA — Auth-aware */}
                                                {isLoggedIn ? (
                                                    <div className="space-y-3">
                                                        <button
                                                            onClick={handleApplyClick}
                                                            disabled={isApplying}
                                                            className="w-full py-5 bg-secondary hover:bg-secondary/90 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3"
                                                        >
                                                            {isApplying ? <Clock size={16} className="animate-spin" /> : (
                                                                <>
                                                                    {t('applyNow')} <ArrowRight size={16} />
                                                                </>
                                                            )}
                                                        </button>
                                                        {!isStudent && (
                                                            <p className="text-[9px] text-amber-300 text-center uppercase tracking-widest font-black italic">
                                                                Sadece öğrenci hesabıyla başvuru yapılabilir
                                                            </p>
                                                        )}
                                                        {isStudent && (
                                                            <p className="text-[9px] text-white/40 text-center uppercase tracking-widest font-black italic">
                                                                {t('mentorshipIncluded')}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    /* Not logged in — show auth prompt */
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 mb-4 p-3 bg-white/10 rounded-xl border border-white/10">
                                                            <Lock size={14} className="text-secondary shrink-0" />
                                                            <p className="text-[9px] text-white/70 font-bold uppercase tracking-wider leading-relaxed">
                                                                Sadece öğrenci hesabı ile başvuru yapılabilir
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
                                                            className="w-full py-4 bg-secondary hover:bg-secondary/90 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3"
                                                        >
                                                            <UserPlus size={16} /> Hesap Oluştur
                                                        </button>
                                                        <button
                                                            onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                                                            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-white/20"
                                                        >
                                                            <LogIn size={16} /> Giriş Yap
                                                        </button>
                                                    </div>
                                                )}

                                                <Link 
                                                    href={`/programlar/${program.slug}`}
                                                    className="mt-4 flex items-center justify-center gap-2 text-white/60 hover:text-white text-[9px] font-black uppercase tracking-[0.3em] transition-all group/full"
                                                >
                                                    {t('details')} <ArrowRight size={12} className="group-hover/full:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Requirements */}
                                        <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 italic">{t('requirementsLabel')}</h4>
                                            <ul className="space-y-4">
                                                {['req_academic', 'req_language', 'req_personal'].map((reqKey, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-widest">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                                        {t(reqKey)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Auth modal triggered from inside detail modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => {
                    setShowAuthModal(false);
                    // After login, trigger apply
                    setTimeout(() => onApply(program.id), 500);
                }}
                initialMode={authMode}
            />
        </>
    );
}
