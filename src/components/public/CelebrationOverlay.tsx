"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, PartyPopper } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CelebrationOverlayProps {
    isVisible: boolean;
    onComplete?: () => void;
    title?: string;
    message?: string;
}

export default function CelebrationOverlay({ 
    isVisible, 
    onComplete,
    title,
    message
}: CelebrationOverlayProps) {
    const t = useTranslations('Celebration');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                >
                    {/* Backdrop with grain effect */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-primary/95 backdrop-blur-2xl"
                    >
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ scale: 0.8, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        transition={{ 
                            type: "spring", 
                            damping: 20, 
                            stiffness: 100,
                            delay: 0.2
                        }}
                        className="relative z-10 w-full max-w-xl text-center"
                    >
                        {/* Animated Icons */}
                        <div className="relative mb-12 flex justify-center">
                            <motion.div
                                initial={{ rotate: -45, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ type: "spring", delay: 0.4 }}
                                className="w-32 h-32 bg-secondary rounded-[3rem] flex items-center justify-center shadow-2xl relative z-10"
                            >
                                <CheckCircle2 size={64} className="text-white" strokeWidth={3} />
                            </motion.div>
                            
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -top-6 -right-6 text-gold"
                            >
                                <PartyPopper size={48} />
                            </motion.div>
                            
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.3, 1],
                                    y: [0, -10, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                className="absolute -bottom-4 -left-8 text-secondary/50"
                            >
                                <Sparkles size={40} />
                            </motion.div>
                        </div>

                        {/* Text Content */}
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-5xl md:text-6xl font-serif font-bold italic text-white mb-6"
                        >
                            {title || t('defaultTitle')}
                        </motion.h2>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-xl text-white/70 font-medium leading-relaxed mb-12 max-w-md mx-auto"
                        >
                            {message || t('defaultMessage')}
                        </motion.p>

                        {/* Action Hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                                {t('redirecting')}
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Ambient Particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ 
                                    x: Math.random() * 100 + "%", 
                                    y: "110%",
                                    opacity: Math.random() 
                                }}
                                animate={{ 
                                    y: "-10%",
                                    x: (Math.random() * 100 - 50) + "%",
                                    rotate: 360
                                }}
                                transition={{ 
                                    duration: Math.random() * 5 + 5, 
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className={`absolute w-${Math.floor(Math.random() * 3 + 1)} h-${Math.floor(Math.random() * 3 + 1)} rounded-full ${i % 2 === 0 ? 'bg-secondary' : 'bg-gold'}`}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
