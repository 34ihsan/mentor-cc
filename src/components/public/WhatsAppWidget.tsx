"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock, User, Calendar, ChevronLeft } from 'lucide-react';
import { createLeadAction } from '@/app/actions/lead-actions';
import SafeHTMLContent from './SafeHTMLContent';

const PHONE_NUMBER = '447501412151';
const BUSINESS_HOURS = { start: 8, end: 19 };

export default function WhatsAppWidget() {
    const t = useTranslations('WhatsApp');
    const locale = useLocale();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [name, setName] = useState('');
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [isAppointmentView, setIsAppointmentView] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate next 5 business days
    const getNextBusinessDays = () => {
        const days = [];
        let current = new Date();
        const localeString = locale === 'tr' ? 'tr-TR' : 'en-US';
        while (days.length < 5) {
            current.setDate(current.getDate() + 1);
            if (current.getDay() !== 0 && current.getDay() !== 6) { // Skip weekends
                days.push({
                    full: current.toLocaleDateString(localeString, { weekday: 'long', day: 'numeric', month: 'long' }),
                    short: current.toLocaleDateString(localeString, { day: 'numeric', month: 'short' }),
                    dayName: current.toLocaleDateString(localeString, { weekday: 'short' })
                });
            }
        }
        return days;
    };

    const TIME_SLOTS = [
        t('appointment.slots.morning'),
        t('appointment.slots.afternoon'),
        t('appointment.slots.evening')
    ];

    const QUICK_TOPICS = [
        { id: 'uni', label: t('topics.uni.label'), message: t('topics.uni.message') },
        { id: 'master', label: t('topics.master.label'), message: t('topics.master.message') },
        { id: 'lise', label: t('topics.lise.label'), message: t('topics.lise.message') },
        { id: 'language', label: t('topics.language.label'), message: t('topics.language.message') },
        { id: 'summer', label: t('topics.summer.label'), message: t('topics.summer.message') },
        { id: 'denklik', label: t('topics.denklik.label'), message: t('topics.denklik.message') },
        { id: 'general', label: t('topics.general.label'), message: t('topics.general.message') }
    ];

    // Check online status
    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            const hour = now.getHours();
            setIsOnline(hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end);
        };
        checkStatus();
        const interval = setInterval(checkStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    // Auto-open after delay (once per session)
    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeen = localStorage.getItem('wa_widget_seen');
            if (!hasSeen && !isOpen) {
                setIsOpen(true);
                localStorage.setItem('wa_widget_seen', 'true');
            }
        }, 15000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    const getContextMessage = () => {
        const GREETING = t('greeting');
        let base = GREETING + " ";
        if (pathname.includes('/yurtdisi-universite')) base += t('topics.uni.message');
        else if (pathname.includes('/yurtdisi-dil-okullari')) base += t('topics.language.message');
        else if (pathname.includes('/yurtdisi-lise')) base += t('topics.lise.message');
        else if (pathname.includes('/yurtdisi-yaz-okullari')) base += t('topics.summer.message');
        else if (pathname.includes('/yurtdisi-yuksek-lisans')) base += t('topics.master.message');
        else if (pathname.includes('/denklik')) base += t('topics.denklik.message');
        else if (pathname.includes('/iletisim')) base += t('topics.general.message');
        else base += t('defaultMessage');
        
        return base;
    };

    const toggleTopic = (topicMsg: string) => {
        setSelectedTopics(prev => 
            prev.includes(topicMsg) 
                ? prev.filter(t => t !== topicMsg) 
                : [...prev, topicMsg]
        );
    };

    const handleWhatsAppRedirect = async (directMsg?: string) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        try {
            let finalMsg = "";
            const GREETING = t('greeting');
            
            if (directMsg) {
                finalMsg = directMsg;
            } else if (isAppointmentView && selectedDate && selectedTime) {
                finalMsg = `${GREETING} ${selectedDate}, ${selectedTime} ${t('appointment.request')}`;
            } else if (selectedTopics.length > 0) {
                const combinedTopics = selectedTopics.join(', ');
                finalMsg = `${GREETING} ${combinedTopics} ${t('topics.request')}`;
            } else {
                finalMsg = getContextMessage();
            }
            
            // Log as lead
            try {
                await createLeadAction({
                    name: name || t('visitor'),
                    phone: 'WhatsApp',
                    subject: isAppointmentView ? t('appointment.subject') : (selectedTopics.length > 1 ? 'Multiple Topics' : (selectedTopics[0] || 'General Inquiry')),
                    message: finalMsg,
                    source: 'WhatsApp Widget'
                });
            } catch (e) {
                console.error('Lead logging failed:', e);
            }

            const encodedMsg = encodeURIComponent(finalMsg);
            const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMsg}`;
            
            window.open(waUrl, '_blank');
            
            // Reset state
            setIsOpen(false);
            setName('');
            setSelectedTopics([]);
            setIsAppointmentView(false);
            setSelectedDate('');
            setSelectedTime('');
        } catch (error) {
            console.error('WhatsApp redirect failed:', error);
        } finally {
            setTimeout(() => setIsSubmitting(false), 2000);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        key="whatsapp-card"
                        className="mb-4 w-[320px] bg-white shadow-2xl overflow-hidden border border-gold/20 flex flex-col"
                        style={{ borderRadius: '1.5rem' }}
                    >
                        {/* Header */}
                        <div className="bg-[#f8fafc] p-6 pt-8 text-navy relative border-b border-slate-100">
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-navy/40 hover:text-navy transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                                        <MessageCircle className="text-[#25D366] w-7 h-7 fill-current" />
                                    </div>
                                    <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${isOnline ? 'bg-[#25D366]' : 'bg-orange-500'}`} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{t('title')}</h4>
                                    <div className="flex items-center gap-2 text-xs text-navy/60 italic">
                                        {isOnline ? (
                                            <span className="flex items-center gap-1 font-black"><span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" /> {t('online')}</span>
                                        ) : (
                                            <span className="flex items-center gap-1"><Clock size={10} /> {t('offline')}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Welcome Message Body */}
                        <div className="p-6 bg-[#e5ddd5] space-y-4">
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-[13px] text-slate-900 font-bold italic leading-relaxed relative">
                                <span className="absolute -left-2 top-0 text-white fill-current">
                                    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.5 0.5V12.5L7.5 0.5H0.5Z" fill="white"/>
                                    </svg>
                                </span>
                                <SafeHTMLContent 
                                    as="div"
                                    html={`${t.raw('greeting')}<br />${t.raw('message')}`}
                                />
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="p-6 bg-white border-t border-slate-50 space-y-4">
                            {!isAppointmentView ? (
                                <>
                                    {/* Optional Name */}
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#128C7E] transition-colors">
                                            <User size={14} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={t('inputPlaceholder')}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 font-bold"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('topics.interest')}:</p>
                                            <button 
                                                onClick={() => setIsAppointmentView(true)}
                                                className="text-[10px] font-bold text-gold hover:underline flex items-center gap-1 uppercase tracking-widest"
                                            >
                                                <Calendar size={12} /> {t('appointment.title')}
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {QUICK_TOPICS.map((topic) => {
                                                const isSelected = selectedTopics.includes(topic.message);
                                                return (
                                                    <button
                                                        key={topic.id}
                                                        disabled={isSubmitting}
                                                        onClick={() => toggleTopic(topic.message)}
                                                        className={`px-2 py-2.5 rounded-xl text-[11px] font-medium transition-all flex items-center justify-center text-center border shadow-sm active:scale-95 ${
                                                            isSelected 
                                                    ? "bg-primary/10 border-primary text-primary ring-1 ring-primary" 
                                                    : "bg-white border-slate-100 text-slate-900 hover:border-slate-300 font-bold"
                                                        }`}
                                                    >
                                                        {topic.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4 animate-fadeIn">
                                    <button 
                                        onClick={() => setIsAppointmentView(false)}
                                        className="text-[10px] font-bold text-slate-400 hover:text-navy flex items-center gap-1 uppercase tracking-widest mb-2"
                                    >
                                        <ChevronLeft size={12} /> {t('appointment.back')}
                                    </button>
                                    
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('appointment.selectDay')}:</p>
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                            {getNextBusinessDays().map((date, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedDate(date.full)}
                                                    className={`flex-shrink-0 w-16 h-16 rounded-xl border flex flex-col items-center justify-center transition-all ${
                                                        selectedDate === date.full 
                                                            ? "bg-[#128C7E] border-[#128C7E] text-white shadow-md shadow-[#128C7E]/20" 
                                                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 font-bold"
                                                    }`}
                                                >
                                                    <span className="text-[9px] uppercase font-bold opacity-60">{date.dayName}</span>
                                                    <span className="text-sm font-bold">{date.short.split(' ')[0]}</span>
                                                    <span className="text-[8px] uppercase">{date.short.split(' ')[1]}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('appointment.selectTime')}:</p>
                                        <div className="space-y-2">
                                            {TIME_SLOTS.map((time, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`w-full p-3 rounded-xl border text-[11px] font-bold text-left transition-all flex items-center justify-between ${
                                                        selectedTime === time 
                                                            ? "bg-primary/5 border-primary text-primary" 
                                                            : "bg-white border-slate-100 text-slate-900 hover:border-slate-200"
                                                    }`}
                                                >
                                                    {time}
                                                    {selectedTime === time && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,74,173,0.5)]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={() => handleWhatsAppRedirect()}
                                disabled={isSubmitting || (isAppointmentView && (!selectedDate || !selectedTime))}
                                className={`w-full text-primary font-black p-3.5 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 group disabled:opacity-70 ${
                                    isAppointmentView ? "bg-secondary text-primary hover:bg-secondary/90 shadow-secondary/20" : 
                                    selectedTopics.length > 0 ? "bg-primary text-white hover:bg-primary/90" : "bg-[#25D366] text-black hover:bg-[#25D366]/90 shadow-[#25D366]/20"
                                }`}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {isAppointmentView ? t('appointment.submit') : selectedTopics.length > 0 ? t('topics.start') : t('topics.direct')}
                                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Footer info */}
                        <div className="p-3 text-center bg-white border-t border-slate-100">
                            <p className="text-[10px] text-slate-400 font-medium">StarEducation © {t('footer')}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <div className="fixed bottom-10 right-10 z-[100] flex items-center group">
                {/* Hover Label */}
                <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 0, x: 20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mr-4 px-6 py-3 bg-white/95 backdrop-blur-md border border-gold/20 text-navy text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                >
                    WhatsApp
                </motion.span>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative p-5 shadow-2xl transition-all duration-300 transform group-hover:scale-110 border-2 bg-[#25D366] text-white border-white/20 rounded-full flex items-center justify-center hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                            >
                                <X size={28} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="wa"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-white/20 animate-ping rounded-full pointer-events-none" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512" fill="currentColor">
                                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>


        </div>
    );
}
