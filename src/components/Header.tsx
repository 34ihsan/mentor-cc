"use client";

import React, { useState, useEffect } from "react";
import NextImage from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

import {
    ChevronDown, Menu, X, Phone, Mail, Globe,
    Search, Loader2, MessageSquare, Briefcase, ChevronRight,
    GraduationCap, School, BookOpen, Sun, Languages, ArrowRight, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { globalSearchAction } from "@/app/actions/search-actions";

import { serviceMap, countryMap, examMap, highSchoolCategoryMap, BRANDING_ASSETS } from "@/lib/mappings";

interface SubLink {
    name: string;
    href: string;
}

interface MenuCategory {
    title: string;
    links: SubLink[];
}

interface MegaMenu {
    sideCategories: { icon?: React.ReactNode; name: string; id: string }[];
    content: Record<string, MenuCategory[]>;
}

interface NavItem {
    name: string;
    href: string;
    megaMenu?: MegaMenu;
}

export default function Header() {
    const t = useTranslations('Navbar');
    const commonT = useTranslations('Common');
    const serviceT = useTranslations('HomePage.Services');
    const countryT = useTranslations('SmartFinder.countries');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("countries");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [navItems, setNavItems] = useState<NavItem[]>([]);

    const onLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const locales = [
        { code: 'tr', label: 'TR' },
        { code: 'en', label: 'EN' }
    ];

    useEffect(() => {
        // Specifically requested items for the menu
        const mainSlugs = [
            'yurtdisi-yuksek-lisans',
            'yurtdisi-universite',
            'yurtdisi-lise',
            'yurtdisi-yaz-okullari',
            'yurtdisi-dil-okullari',
        ];

        const serviceItems: NavItem[] = mainSlugs.map(slug => {
            const service = serviceMap[slug];
            if (!service) return null;
            const serviceTitle = serviceT(slug, { defaultValue: service.title });
            
            return {
                name: serviceTitle.toLocaleUpperCase(locale === 'tr' ? 'tr-TR' : 'en-US'),
                href: `/${slug}`,
            };
        }).filter(item => item !== null) as NavItem[];

        // Add Exams and Programs Parent
        const finalItems: NavItem[] = [
            { name: t('programlar').toLocaleUpperCase(locale === 'tr' ? 'tr-TR' : 'en-US'), href: '/programlar' },
            ...serviceItems,
            { name: t('sinavlar').toLocaleUpperCase(locale === 'tr' ? 'tr-TR' : 'en-US'), href: '/sinavlar' }
        ];

        setNavItems(finalItems);
    }, [locale, t, serviceT]);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (activeItem) {
            const item = navItems.find(i => i.name === activeItem);
            if (item?.megaMenu?.sideCategories?.length) {
                setActiveCategory(item.megaMenu.sideCategories[0].id);
            }
        }
    }, [activeItem, navItems]);

    // Handle Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                setIsSearching(true);
                const results = await globalSearchAction(searchQuery);
                setSearchResults(results);
                setIsSearching(false);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <header className={`w-full z-[100] fixed top-0 left-0 transition-all duration-500 ${
            isScrolled ? "bg-white/80 backdrop-blur-xl shadow-premium py-2" : "bg-transparent py-6"
        }`}>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center h-full">
                {/* 1. Brand Logo */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="flex items-center gap-3">
                        <NextImage
                            src={BRANDING_ASSETS.LOGO}
                            alt="Star Education Consulting"
                            width={160}
                            height={50}
                            className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            priority
                        />
                    </div>
                </Link>

                {/* 2. Primary Navigation */}
                <nav className="hidden xl:flex items-center gap-8">
                    {/* Home Link */}
                    <Link 
                        href="/" 
                        className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group
                            ${pathname === '/' ? "text-secondary" : "text-primary/70 hover:text-secondary"}
                        `}
                    >
                        {t('home')}
                        <span className={`absolute -bottom-1 left-0 h-[2px] bg-secondary transition-all duration-300 ${pathname === '/' ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </Link>

                    {/* Programlar (Mega Menu Trigger) */}
                    <div 
                        className="relative group py-4"
                        onMouseEnter={() => setActiveItem("PROGRAMLAR")}
                        onMouseLeave={() => setActiveItem(null)}
                    >
                        <button className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] transition-all
                            ${activeItem === "PROGRAMLAR" ? "text-secondary" : "text-primary/70 hover:text-secondary"}
                        `}>
                            {t('programlar')}
                            <ChevronDown size={14} className={`transition-transform duration-300 ${activeItem === "PROGRAMLAR" ? "rotate-180" : ""}`} />
                        </button>
                        
                        {/* Mega Menu Container */}
                        <AnimatePresence>
                            {activeItem === "PROGRAMLAR" && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.97, y: 12 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.97, y: 12 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white/95 backdrop-blur-3xl border border-zinc-100 shadow-[0_40px_80px_-20px_rgba(11,23,81,0.14)] rounded-[2.5rem] z-[110] flex overflow-hidden"
                                >
                                    {/* Left Panel */}
                                    <div className="w-[260px] bg-gradient-to-b from-primary to-primary/90 p-10 flex flex-col justify-between shrink-0">
                                        <div className="space-y-6">
                                            <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
                                                <Star size={22} className="text-secondary" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-secondary mb-1">{t('globalHub')}</p>
                                                <h3 className="text-2xl font-serif font-bold text-white italic leading-tight">Yurtdışı Eğitim Programları</h3>
                                            </div>
                                            <p className="text-sm text-white/50 leading-relaxed">Akademik hedeflerinize uygun uluslararası programa ulaşın.</p>
                                        </div>
                                        <Link 
                                            href="/programlar" 
                                            className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-black text-secondary border border-secondary/30 rounded-2xl px-6 py-4 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-500 group/cta"
                                        >
                                            Tüm Programlar <ArrowRight size={13} className="group-hover/cta:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>

                                    {/* Right Panel: Service Grid */}
                                    <div className="flex-1 p-10">
                                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-300 mb-8">Program Kategorileri</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { label: serviceT('yurtdisi-yuksek-lisans'), href: '/yurtdisi-yuksek-lisans', icon: BRANDING_ASSETS.HERO_OVERRIDES['yurtdisi-yuksek-lisans'], desc: 'MSc · MBA · LLM' },
                                                { label: serviceT('yurtdisi-universite'), href: '/yurtdisi-universite', icon: BRANDING_ASSETS.SERVICES['yurtdisi-universite'], desc: 'Lisans · Foundation' },
                                                { label: serviceT('yurtdisi-lise'), href: '/yurtdisi-lise', icon: BRANDING_ASSETS.SERVICES['yurtdisi-lise'], desc: 'A-Level · IB · Pathway' },
                                                { label: serviceT('yurtdisi-yaz-okullari'), href: '/yurtdisi-yaz-okullari', icon: BRANDING_ASSETS.SERVICES['yurtdisi-yaz-okullari'], desc: 'Yaz Kampü · Junior' },
                                                { label: serviceT('yurtdisi-dil-okullari'), href: '/yurtdisi-dil-okullari', icon: BRANDING_ASSETS.SERVICES['yurtdisi-dil-okullari'], desc: 'IELTS · TOEFL · Genel' },
                                                { label: serviceT('egitim-koclugu', { defaultValue: 'Eğitim Koçluğu' }), href: '/egitim-koclugu', icon: null, desc: 'Kariyer · Mentor' },
                                            ].map((item) => (
                                                <Link 
                                                    key={item.href}
                                                    href={item.href}
                                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-all duration-300 group/item"
                                                >
                                                    <div className="w-11 h-11 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 group-hover/item:bg-secondary/10 group-hover/item:text-secondary transition-all duration-300 shrink-0 overflow-hidden relative">
                                                        {item.icon ? (
                                                            <NextImage 
                                                                src={item.icon as string} 
                                                                alt={item.label}
                                                                fill
                                                                className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <Star size={20} className="text-zinc-300 group-hover/item:text-secondary" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span className="block text-xs font-black text-primary uppercase tracking-tight group-hover/item:text-secondary transition-colors leading-tight truncate">{item.label}</span>
                                                        <span className="text-[9px] text-zinc-400 font-medium tracking-wider">{item.desc}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-[9px] font-mono tracking-widest text-zinc-300 uppercase">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                                Premium Academic Portal
                                            </div>
                                            <Link href="/iletisim" className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform group/all">
                                                {t('contact') || 'Danışmanlık Al'} <ChevronRight size={12} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Bottom gold accent */}
                                    <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sınavlar Link */}
                    <Link 
                        href="/sinavlar" 
                        className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group
                            ${pathname.includes('sinavlar') ? "text-secondary" : "text-primary/70 hover:text-secondary"}
                        `}
                    >
                        {t('sinavlar')}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Other Links (Optional, but included for completeness) */}
                    <Link 
                        href="/iletisim" 
                        className="text-[11px] font-black uppercase tracking-[0.2em] text-primary/70 hover:text-secondary transition-all"
                    >
                        {t('contact')}
                    </Link>
                </nav>

                {/* 3. Action Tools (Search, Auth, Languages) */}
                <div className="flex items-center gap-2 md:gap-6 shrink-0">
                    <div className="flex items-center gap-1 md:gap-4 mr-2">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-primary/70 hover:text-secondary transition-all"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 stroke-[2.5]" />
                        </button>

                        <div className="h-4 w-[1px] bg-zinc-200 hidden md:block" />

                        {/* Language Selection */}
                        <div className="flex items-center gap-3">
                            {locales.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => onLanguageChange(l.code)}
                                    className={`text-[10px] font-black transition-all hover:text-secondary ${
                                        locale === l.code ? 'text-secondary' : 'text-primary/40'
                                    }`}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-10 w-[1px] bg-zinc-200 hidden lg:block" />

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link 
                            href="/auth/login" 
                            className="text-[11px] font-black uppercase tracking-widest text-primary/70 hover:text-secondary transition-colors"
                        >
                            {commonT('login')}
                        </Link>
                        <Link 
                            href="/auth/register" 
                            className="bg-primary text-white text-[11px] font-black uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-zinc-800 transition-all shadow-premium hover:-translate-y-0.5"
                        >
                            {commonT('register')}
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="xl:hidden p-3 bg-zinc-50 rounded-xl text-primary hover:bg-secondary hover:text-white transition-all"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>


            {/* Search Overlay - Daylight Flare */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-3xl animate-fadeIn flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                    <button
                        onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                            setSearchResults([]);
                        }}
                        className="absolute top-6 right-6 sm:top-10 sm:right-10 p-4 text-zinc-300 hover:text-secondary transition-all hover:rotate-90 z-[210]"
                    >
                        <X size={48} className="stroke-[3]" />
                    </button>
                    <div className="w-full max-w-4xl space-y-8 sm:space-y-12">
                        <div className="space-y-4 text-center">
                            <span className="text-secondary text-[10px] uppercase tracking-[0.4em] font-black">{t('searchCenter') || 'SEARCH HUB'}</span>
                            <h2 className="text-primary text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">{t('searchDiscover') || 'FIND YOUR FUTURE'}</h2>
                        </div>
                        <div className="relative group max-w-2xl mx-auto w-full">
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('searchPlaceholder') || "Enter keyword..."}
                                className="w-full bg-transparent border-b-4 border-zinc-100 py-8 sm:py-12 text-2xl md:text-6xl text-primary font-black outline-none focus:border-secondary transition-all placeholder:text-zinc-100 italic uppercase tracking-tighter text-center"
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
                                {isSearching ? (
                                    <Loader2 className="w-10 h-10 sm:w-16 sm:h-16 text-secondary animate-spin" />
                                ) : (
                                    <Search className="w-10 h-10 sm:w-16 sm:h-16 text-secondary opacity-30 group-focus-within:opacity-100 transition-opacity" />
                                )}
                            </div>
                        </div>

                        {/* Search Results */}
                        <div className="grid grid-cols-1 gap-8 max-h-[50vh] overflow-y-auto pr-4 scrollbar-none">
                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {searchResults.map((result, idx) => (
                                        <Link
                                            key={idx}
                                            href={result.href}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="group flex flex-col p-8 bg-zinc-50 hover:bg-white border border-zinc-100 rounded-3xl transition-all hover:scale-[1.02] shadow-sm hover:shadow-premium"
                                        >
                                            <span className="text-secondary text-[9px] uppercase tracking-[0.3em] font-black mb-3 opacity-60 group-hover:opacity-100">{result.type}</span>
                                            <h4 className="text-primary text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-flare transition-colors">{result.title}</h4>
                                        </Link>
                                    ))}
                                </div>
                            ) : searchQuery.length >= 2 && !isSearching ? (
                                <div className="py-20 text-center">
                                    <p className="text-zinc-300 italic text-2xl">"{searchQuery}" {t('noResults') || 'no results found.'}</p>
                                </div>
                            ) : searchQuery.length === 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pt-10">
                                    <div className="space-y-6">
                                        <h4 className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-black">{t('popularSearches') || 'TRENDING'}</h4>
                                        <div className="flex flex-col gap-4">
                                            {[
                                                { label: countryT('ingiltere'), href: "/yurtdisi-dil-okullari/ingiltere" },
                                                { label: countryT('almanya'), href: "/yurtdisi-universite/almanya" },
                                                { label: "Master", href: "/yurtdisi-yuksek-lisans" },
                                                { label: "Pathway", href: "/yurtdisi-lise" }
                                            ].map((pop) => (
                                                <Link 
                                                    key={pop.label}
                                                    href={pop.href} 
                                                    onClick={() => setIsSearchOpen(false)} 
                                                    className="text-white/40 hover:text-white transition-all text-sm font-black uppercase tracking-widest text-left"
                                                >
                                                    {pop.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[210] bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 pointer-events-auto"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full max-w-6xl bg-white border border-zinc-200 rounded-[40px] shadow-premium overflow-hidden flex flex-col max-h-[91vh]"
                        >
                            {/* Hub Top Bar */}
                            <div className="p-6 sm:p-8 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center">
                                        <NextImage
                                            src={BRANDING_ASSETS.LOGO}
                                            alt="Star Education Consulting"
                                            width={140}
                                            height={45}
                                            className="h-9 w-auto object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-primary uppercase tracking-tighter italic">Star Navigation Hub</h3>
                                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{navItems.length} ACTIVE MODULES</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-12 h-12 bg-zinc-100 hover:bg-secondary hover:text-white rounded-full flex items-center justify-center transition-all transform hover:rotate-90 group"
                                >
                                    <X size={24} className="stroke-[3]" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 sm:p-12 scrollbar-none">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {navItems.map((item, idx) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="group relative h-[200px] sm:h-[220px] bg-zinc-50 border border-zinc-100 rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:bg-white hover:shadow-premium hover:-translate-y-1"
                                        >
                                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Globe size={120} strokeWidth={1} className="text-primary rotate-12" />
                                            </div>
                                                <div className="relative z-10 h-full flex flex-col justify-between">
                                                    <div>
                                                        <span className="text-[10px] font-mono font-black text-secondary italic mb-2 block tracking-widest">0{idx + 1}</span>
                                                        <h4 className="text-2xl font-black text-primary uppercase tracking-tighter italic leading-none group-hover:text-secondary mb-3 transition-colors">{item.name}</h4>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest transition-all">
                                                        EXPLORE MODULE <ChevronRight size={12} />
                                                    </div>
                                                </div>
                                        </Link>
                                    ))}
                                    
                                    <Link
                                        href="/blog"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="group relative h-[200px] sm:h-[220px] bg-primary text-white rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-xl"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-transparent pointer-events-none" />
                                        <div className="relative z-10 h-full flex flex-col justify-between">
                                            <h4 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Global Blog & News</h4>
                                            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Latest updates from our experts</p>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-4 border-t border-white/10">
                                                READ ARTICLES <ChevronRight size={12} />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Hub Footer */}
                            <div className="p-6 sm:p-8 border-t border-zinc-100 bg-zinc-50/80 flex flex-wrap justify-between items-center gap-6 mt-auto">
                                <div className="flex gap-8">
                                    <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-primary font-black uppercase text-[10px] tracking-[0.3em] transition-all">{t('contact') || 'Contact Us'}</Link>
                                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-primary font-black uppercase text-[10px] tracking-[0.3em] transition-all">{commonT('login')}</Link>
                                </div>
                                <div className="flex items-center gap-4">
                                    {locales.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => onLanguageChange(l.code)}
                                            className={`w-10 h-10 rounded-full text-[10px] font-black border transition-all ${
                                                locale === l.code ? 'bg-secondary border-secondary text-white shadow-premium' : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300'
                                            }`}
                                        >
                                            {l.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
