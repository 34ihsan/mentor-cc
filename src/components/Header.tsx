"use client";

import React, { useState, useEffect } from "react";
import NextImage from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

import {
    ChevronDown, Menu, X, Phone, Mail, Globe,
    Instagram, Facebook, Search, Loader2, MessageSquare
} from "lucide-react";
import { globalSearchAction } from "@/app/actions/search-actions";
import { serviceMap, countryMap } from "@/lib/mappings";

interface NavItem {
    name: string;
    href: string;
    subItems?: { name: string; href: string }[];
}

export default function Header() {
    const t = useTranslations('Navbar');
    const commonT = useTranslations('Common');
    const serviceT = useTranslations('HomePage.Services');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [announcement, setAnnouncement] = useState<any>(null);
    const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
        };
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const res = await fetch('/api/public/announcements?type=GLOBAL_HEADER');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setAnnouncement(data[0]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch header announcement:", error);
            }
        };

        fetchAnnouncement();
    }, []);

    const onLanguageChange = (newLocale: string) => {
        if (!pathname) {
            router.replace("/", { locale: newLocale });
            return;
        }
        router.replace(pathname, { locale: newLocale });
    };

    const locales = [
        { code: 'tr', label: 'TR' },
        { code: 'en', label: 'EN' }
    ];

    const getCountryName = (id: string): string => {
        const country = countryMap[id];
        if (!country) return id;
        if (locale === 'en') return country.title_en ?? id;
        return country.title ?? id;
    };

    useEffect(() => {
        const items: NavItem[] = [
            { 
                name: t('uni'), 
                href: '/yurtdisi-universite',
                subItems: [
                    { name: serviceT('yurtdisi-universite-detail.categories.ranking'), href: '/yurtdisi-universite?cat=ranking' },
                    { name: serviceT('yurtdisi-universite-detail.categories.scholarship'), href: '/yurtdisi-universite?cat=scholarship' },
                    { name: serviceT('yurtdisi-universite-detail.categories.free'), href: '/yurtdisi-universite?cat=free' },
                    { name: "---", href: "#" }, // Separator
                    { name: getCountryName('ingiltere'), href: '/yurtdisi-universite/ingiltere' },
                    { name: getCountryName('amerika'), href: '/yurtdisi-universite/amerika' },
                    { name: getCountryName('almanya'), href: '/yurtdisi-universite/almanya' },
                    { name: getCountryName('kanada'), href: '/yurtdisi-universite/kanada' },
                    { name: getCountryName('hollanda'), href: '/yurtdisi-universite/hollanda' },
                    { name: getCountryName('irlanda'), href: '/yurtdisi-universite/irlanda' },
                    { name: getCountryName('italya'), href: '/yurtdisi-universite/italya' },
                    { name: getCountryName('polonya'), href: '/yurtdisi-universite/polonya' },
                    { name: getCountryName('macaristan'), href: '/yurtdisi-universite/macaristan' },
                    { name: getCountryName('belcika'), href: '/yurtdisi-universite/belcika' },
                ]
            },
            { 
                name: t('master'), 
                href: '/yurtdisi-yuksek-lisans',
                subItems: [
                    { name: serviceT('yurtdisi-yuksek-lisans-detail.categories.mba'), href: '/yurtdisi-yuksek-lisans?cat=mba' },
                    { name: serviceT('yurtdisi-yuksek-lisans-detail.categories.msc'), href: '/yurtdisi-yuksek-lisans?cat=msc' },
                    { name: serviceT('yurtdisi-yuksek-lisans-detail.categories.art'), href: '/yurtdisi-yuksek-lisans?cat=art' },
                    { name: "---", href: "#" }, // Separator
                    { name: getCountryName('ingiltere'), href: '/yurtdisi-yuksek-lisans/ingiltere' },
                    { name: getCountryName('amerika'), href: '/yurtdisi-yuksek-lisans/amerika' },
                    { name: getCountryName('almanya'), href: '/yurtdisi-yuksek-lisans/almanya' },
                    { name: getCountryName('kanada'), href: '/yurtdisi-yuksek-lisans/kanada' },
                    { name: getCountryName('italya'), href: '/yurtdisi-yuksek-lisans/italya' },
                    { name: getCountryName('hollanda'), href: '/yurtdisi-yuksek-lisans/hollanda' },
                    { name: getCountryName('irlanda'), href: '/yurtdisi-yuksek-lisans/irlanda' },
                    { name: getCountryName('fransa'), href: '/yurtdisi-yuksek-lisans/fransa' },
                    { name: getCountryName('ispanya'), href: '/yurtdisi-yuksek-lisans/ispanya' },
                    { name: getCountryName('polonya'), href: '/yurtdisi-yuksek-lisans/polonya' },
                ]
            },
            { 
                name: t('highschool'), 
                href: '/yurtdisi-lise',
                subItems: [
                    { name: serviceT('yurtdisi-lise-detail.categories.boarding'), href: '/yurtdisi-lise?cat=boarding' },
                    { name: serviceT('yurtdisi-lise-detail.categories.day'), href: '/yurtdisi-lise?cat=day' },
                    { name: serviceT('yurtdisi-lise-detail.categories.exchange'), href: '/yurtdisi-lise?cat=exchange' },
                    { name: "---", href: "#" }, // Separator
                    { name: getCountryName('ingiltere'), href: '/yurtdisi-lise/ingiltere' },
                    { name: getCountryName('amerika'), href: '/yurtdisi-lise/amerika' },
                    { name: getCountryName('kanada'), href: '/yurtdisi-lise/kanada' },
                    { name: getCountryName('isvicre'), href: '/yurtdisi-lise/isvicre' },
                    { name: getCountryName('almanya'), href: '/yurtdisi-lise/almanya' },
                    { name: getCountryName('irlanda'), href: '/yurtdisi-lise/irlanda' },
                    { name: getCountryName('fransa'), href: '/yurtdisi-lise/fransa' },
                    { name: getCountryName('ispanya'), href: '/yurtdisi-lise/ispanya' },
                ]
            },
            { 
                name: t('summer'), 
                href: '/yurtdisi-yaz-okullari',
                subItems: [
                    { name: serviceT('yurtdisi-yaz-okullari-detail.categories.academic'), href: '/yurtdisi-yaz-okullari?cat=academic' },
                    { name: serviceT('yurtdisi-yaz-okullari-detail.categories.sports'), href: '/yurtdisi-yaz-okullari?cat=sports' },
                    { name: serviceT('yurtdisi-yaz-okullari-detail.categories.language'), href: '/yurtdisi-yaz-okullari?cat=language' },
                    { name: "---", href: "#" }, // Separator
                    { name: getCountryName('ingiltere'), href: '/yurtdisi-yaz-okullari/ingiltere' },
                    { name: getCountryName('amerika'), href: '/yurtdisi-yaz-okullari/amerika' },
                    { name: getCountryName('kanada'), href: '/yurtdisi-yaz-okullari/kanada' },
                    { name: getCountryName('almanya'), href: '/yurtdisi-yaz-okullari/almanya' },
                    { name: getCountryName('isvicre'), href: '/yurtdisi-yaz-okullari/isvicre' },
                    { name: getCountryName('malta'), href: '/yurtdisi-yaz-okullari/malta' },
                    { name: getCountryName('irlanda'), href: '/yurtdisi-yaz-okullari/irlanda' },
                ]
            },
            { 
                name: t('language'), 
                href: '/yurtdisi-dil-okullari',
                subItems: [
                    { name: serviceT('yurtdisi-dil-okullari-detail.categories.general'), href: '/yurtdisi-dil-okullari?cat=general' },
                    { name: serviceT('yurtdisi-dil-okullari-detail.categories.business'), href: '/yurtdisi-dil-okullari?cat=business' },
                    { name: serviceT('yurtdisi-dil-okullari-detail.categories.pathway'), href: '/yurtdisi-dil-okullari?cat=pathway' },
                    { name: "---", href: "#" }, // Separator
                    { name: getCountryName('ingiltere'), href: '/yurtdisi-dil-okullari/ingiltere' },
                    { name: getCountryName('amerika'), href: '/yurtdisi-dil-okullari/amerika' },
                    { name: getCountryName('kanada'), href: '/yurtdisi-dil-okullari/kanada' },
                    { name: getCountryName('irlanda'), href: '/yurtdisi-dil-okullari/irlanda' },
                    { name: getCountryName('malta'), href: '/yurtdisi-dil-okullari/malta' },
                    { name: getCountryName('avustralya'), href: '/yurtdisi-dil-okullari/avustralya' },
                ]
            },
            { 
                name: t('exams'), 
                href: '/sinavlar',
                subItems: [
                    { name: 'IELTS', href: '/sinavlar/ielts' },
                    { name: 'TOEFL iBT', href: '/sinavlar/toefl' },
                    { name: 'Digital SAT', href: '/sinavlar/sat' },
                    { name: 'GRE', href: '/sinavlar/gre' },
                    { name: 'GMAT Focus Edition', href: '/sinavlar/gmat' },
                ]
            },
            { 
                name: t('career'), 
                href: '/career',
                subItems: [
                    { name: serviceT('career-detail.categories.vocational'), href: '/career?cat=vocational' },
                    { name: serviceT('career-detail.categories.career'), href: '/career?cat=career' },
                    { name: serviceT('career-detail.categories.cv'), href: '/career?cat=cv' },
                ]
            },
        ];

        const localeString = locale === 'tr' ? 'tr-TR' : 'en-US';
        const initializedItems: NavItem[] = items.map(item => ({
            ...item,
            name: item.name.toLocaleUpperCase(localeString),
            subItems: item.subItems?.map(sub => ({
                ...sub,
                name: sub.name.toLocaleUpperCase(localeString)
            }))
        }));

        setNavItems(initializedItems);
    }, [locale, t, serviceT]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    const announcementContent = announcement ? (
        locale === 'en' ? (announcement.content_en || announcement.content)
        : announcement.content
    ) : null;

    return (
        <header className="w-full z-[100] fixed top-0 left-0 transition-all duration-300 font-sans">
            {/* Announcement Bar */}
            {announcement && isAnnouncementVisible && (
                <div className="bg-zinc-950 border-b border-zinc-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(180,148,62,0.1),_transparent_70%)] opacity-50 pointer-events-none" />
                    <div className="container mx-auto px-6 py-2 flex items-center justify-center gap-4 relative z-10">
                        <div className="flex items-center gap-2">
                             <div className="w-4 h-[1px] bg-[#D4AF37]/30" />
                             <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37] flex items-center gap-1">
                                 {commonT('announcement')}
                             </span>
                        </div>
                        <div 
                            className="text-[10px] md:text-xs font-serif font-medium italic text-zinc-300 tracking-wide line-clamp-1"
                            dangerouslySetInnerHTML={{ __html: announcementContent }}
                        />
                        <div className="flex items-center gap-4">
                            {announcement.link && (
                                <Link 
                                    href={announcement.link}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors whitespace-nowrap"
                                >
                                    {commonT('details')}
                                </Link>
                            )}
                            <button 
                                onClick={() => setIsAnnouncementVisible(false)}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Bar */}
            <div className="bg-slate-50 py-3 border-b border-slate-200 hidden md:block">
                <div className="container mx-auto px-6 flex justify-between items-center text-[12px] font-bold tracking-[0.2em] text-slate-500">
                    <div className="flex items-center gap-10">
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/mentorcareer" target="_blank" rel="noopener noreferrer">
                                <Instagram className="w-4 h-4 hover:text-[#D4AF37] cursor-pointer transition-colors stroke-[2.5]" />
                            </a>
                            <a href="https://facebook.com/MentorCareer" target="_blank" rel="noopener noreferrer">
                                <Facebook className="w-4 h-4 hover:text-[#D4AF37] cursor-pointer transition-colors stroke-[2.5]" />
                            </a>
                        </div>
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-8">
                            <Mail className="w-4 h-4 text-[#D4AF37] stroke-[2.5]" />
                            <Link href={"/iletisim" as any}>
                                <span className="text-slate-600 lowercase text-[13px] font-bold hover:text-[#D4AF37] transition-colors cursor-pointer">info@mentor-cc.com</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 font-bold">
                        <Link href={"/blog" as any} className="hover:text-[#D4AF37] transition-colors">{t('blog')}</Link>
                        <div className="flex items-center gap-6 border-l border-slate-200 pl-8">
                            <Link href={"/auth/login" as any} className="hover:text-[#D4AF37] transition-colors">{commonT('login')}</Link>
                            <Link href={"/auth/register" as any} className="hover:text-[#D4AF37] transition-colors">{commonT('register')}</Link>
                        </div>
                        <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
                            {locales.map((l, idx) => (
                                <React.Fragment key={l.code}>
                                    <button
                                        onClick={() => onLanguageChange(l.code)}
                                        className={`text-[11px] font-black transition-all hover:text-[#D4AF37] ${
                                            locale === l.code ? 'text-[#D4AF37]' : 'text-slate-500'
                                        }`}
                                    >
                                        {l.label}
                                    </button>
                                    {idx < locales.length - 1 && <span className="text-slate-300 text-[10px] -mx-1 opacity-50">|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Nav Bar */}
            <div className={`w-full transition-all duration-500 bg-white ${isScrolled ? "py-3 shadow-lg border-b border-slate-100" : "py-6 border-b border-slate-100"}`}>
                <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-full">
                        <div className="flex-shrink-0 z-10 group ml-2 lg:ml-4">
                            <Link href="/" title={t('home')} className="relative w-[150px] h-[70px] lg:w-[220px] lg:h-[100px] bg-white rounded-2xl flex items-center justify-start p-0 transition-all duration-300 hover:scale-105 group pointer-events-auto">
                                <NextImage
                                    src="/images/MentorCareer.png"
                                    alt="Mentor Career Consulting"
                                    fill
                                    priority
                                    className="object-contain transition-all duration-300 relative z-10 p-1"
                                    sizes="(max-width: 768px) 150px, 220px"
                                />
                            </Link>
                        </div>

                        <div className="hidden lg:flex flex-1 items-center justify-center h-full px-8">
                            <ul className="flex items-center gap-2 xl:gap-8 h-full">
                                {navItems.map((item) => (
                                     <li key={item.name} className="group relative h-full flex items-center">
                                         <div 
                                             onClick={(e) => {
                                                 if (item.subItems) {
                                                     e.preventDefault();
                                                     e.stopPropagation();
                                                     setActiveDropdown(activeDropdown === item.name ? null : item.name);
                                                 }
                                             }}
                                             className="flex items-center gap-1 cursor-pointer py-4"
                                         >
                                             <Link
                                                 href={item.href as any}
                                                 onClick={(e) => {
                                                     if (item.subItems) {
                                                         e.preventDefault();
                                                         e.stopPropagation();
                                                         setActiveDropdown(activeDropdown === item.name ? null : item.name);
                                                     }
                                                 }}
                                                 className="text-[12px] xl:text-[13px] font-bold text-slate-800 group-hover:text-[#D4AF37] transition-all duration-300 uppercase tracking-[0.05em] relative whitespace-nowrap pointer-events-auto"
                                             >
                                                 {item.name}
                                                 <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-500 group-hover:w-full pointer-events-none" />
                                             </Link>
                                             {item.subItems && (
                                                 <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-[#D4AF37] transition-transform duration-300 ${
                                                     activeDropdown === item.name ? "rotate-180 text-[#D4AF37]" : "group-hover:rotate-180"
                                                 }`} />
                                             )}
                                         </div>

                                         {item.subItems && (
                                             <div className={`absolute top-full left-0 w-[450px] bg-white shadow-2xl rounded-b-2xl border-t-2 border-[#D4AF37] transition-all duration-300 z-50 overflow-hidden ${
                                                 activeDropdown === item.name
                                                     ? "opacity-100 visible translate-y-0"
                                                     : "opacity-0 invisible translate-y-2 lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0"
                                             }`}>
                                                 <div className="py-2">
                                                     <Link
                                                         href={item.href as any}
                                                         onClick={() => setActiveDropdown(null)}
                                                         className="block px-6 py-4 text-[11px] font-black text-[#D4AF37] hover:bg-slate-50 transition-all uppercase tracking-[0.2em] border-b border-slate-50"
                                                     >
                                                         {t('viewAll')}
                                                     </Link>
                                                     <div className="grid grid-cols-2 gap-x-2 py-4 px-2">
                                                         {item.subItems.map((sub, idx) => (
                                                             sub.name === "---" ? (
                                                                 <div key={`sep-${idx}`} className="col-span-2 h-[1px] bg-slate-100 my-2 mx-4" />
                                                             ) : (
                                                                 <Link
                                                                     key={sub.name}
                                                                     href={sub.href as any}
                                                                     onClick={() => setActiveDropdown(null)}
                                                                     className="block px-4 py-2.5 text-[10px] font-bold text-slate-600 hover:text-[#D4AF37] hover:bg-slate-50 transition-all uppercase tracking-wider rounded-lg"
                                                                 >
                                                                     {sub.name}
                                                                 </Link>
                                                             )
                                                         ))}
                                                     </div>
                                                 </div>
                                             </div>
                                         )}
                                     </li>
                                 ))}
                            </ul>
                        </div>

                        <div className="flex-shrink-0 flex items-center gap-4">
                            <div className="hidden lg:flex items-center">
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="p-3 border border-slate-100 hover:border-[#D4AF37]/50 transition-all cursor-pointer rounded-full bg-slate-50 group flex items-center justify-center pointer-events-auto"
                                    aria-label="Search"
                                >
                                    <Search className="w-5 h-5 text-slate-400 group-hover:text-[#D4AF37] transition-colors stroke-[2.5]" />
                                </button>
                            </div>

                            <button
                                className="lg:hidden p-3 border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all rounded-xl"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[200] bg-white/98 backdrop-blur-2xl animate-fadeIn flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                    <button
                        onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                            setSearchResults([]);
                        }}
                        className="absolute top-6 right-6 sm:top-10 sm:right-10 p-4 text-slate-400 hover:text-gold transition-all hover:rotate-90 z-[210]"
                    >
                        <X size={40} />
                    </button>
                    <div className="w-full max-w-4xl space-y-8 sm:space-y-12">
                        <div className="space-y-4">
                            <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold">{t('searchCenter') || 'Arama Merkezi'}</span>
                            <h2 className="text-slate-900 text-3xl md:text-6xl font-serif italic font-bold">{t('searchDiscover') || 'Aradığınız Geleceği Keşfedin'}</h2>
                        </div>
                        <div className="relative group">
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('searchPlaceholder') || "Hangi programı veya ülkeyi arıyorsunuz?"}
                                className="w-full bg-transparent border-b-2 border-slate-200 py-6 sm:py-8 text-xl md:text-4xl text-slate-900 font-serif outline-none focus:border-gold transition-all placeholder:text-slate-300"
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
                                {isSearching ? (
                                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-gold animate-spin" />
                                ) : (
                                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gold opacity-50" />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[50vh] overflow-y-auto pr-4 scrollbar-premium">
                            {searchResults.length > 0 ? (
                                <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {searchResults.map((result, idx) => (
                                        <Link
                                            key={idx}
                                            href={result.href as any}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="group flex flex-col p-6 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-2xl transition-all"
                                        >
                                            <span className="text-gold text-[10px] uppercase tracking-widest font-black mb-2 opacity-60 group-hover:opacity-100">{result.type}</span>
                                            <h4 className="text-slate-900 text-lg font-bold group-hover:text-[#D4AF37] transition-colors">{result.title}</h4>
                                        </Link>
                                    ))}
                                </div>
                            ) : searchQuery.length >= 2 && !isSearching ? (
                                <div className="col-span-full py-10 text-center">
                                    <p className="text-slate-400 italic">"{searchQuery}" {t('noResults') || 'için sonuç bulunamadı.'}</p>
                                </div>
                            ) : (
                                <div className="col-span-full py-10 text-center">
                                    <p className="text-slate-400 italic">{t('searchDiscover') || 'Aradığınız Geleceği Keşfedin'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className={`absolute left-0 top-0 h-full w-[85%] bg-white transition-transform duration-700 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="p-8 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-12 pb-6 border-b border-slate-100">
                            <Link 
                                href="/" 
                                title={t('home')}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="inline-flex items-center"
                            >
                                <NextImage
                                    src="/images/MentorCareer.png"
                                    alt="Mentor Career Consulting"
                                    width={120}
                                    height={36}
                                    priority
                                    className="object-contain transition-transform duration-500 hover:scale-105"
                                    style={{ width: "auto", height: "auto" }}
                                />
                            </Link>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsSearchOpen(true);
                                    }}
                                    className="p-2 text-slate-400 hover:text-[#D4AF37] transition-colors"
                                >
                                    <Search size={24} />
                                </button>
                                <div className="flex items-center gap-3 border-x border-slate-100 px-4">
                                    {locales.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => onLanguageChange(l.code)}
                                            className={`text-[12px] font-black transition-all ${
                                                locale === l.code ? 'text-[#D4AF37]' : 'text-slate-400'
                                            }`}
                                        >
                                            {l.label}
                                        </button>
                                    ))}
                                </div>
                                <X className="w-8 h-8 text-slate-400 hover:text-[#D4AF37] transition-colors stroke-[2.5]" onClick={() => setIsMobileMenuOpen(false)} />
                            </div>
                        </div>
                        <nav className="flex-1 overflow-y-auto pr-4">
                            <ul className="space-y-8">
                                {navItems.map((item) => (
                                    <li key={item.name} className="flex flex-col border-b border-slate-50 pb-4">
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={item.href as any}
                                                className="text-md font-bold text-slate-900 uppercase tracking-widest py-2"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                            {item.subItems && (
                                                <button 
                                                    onClick={() => setOpenSubMenu(openSubMenu === item.name ? null : item.name)}
                                                    className="p-2 text-slate-400 hover:text-[#D4AF37] transition-colors"
                                                >
                                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSubMenu === item.name ? 'rotate-180' : ''}`} />
                                                </button>
                                            )}
                                        </div>
                                        
                                        {item.subItems && openSubMenu === item.name && (
                                            <div className="pl-4 mt-2 space-y-2 animate-fadeIn">
                                                {item.subItems.map((sub, idx) => (
                                                    sub.name === "---" ? (
                                                        <div key={`mob-sep-${idx}`} className="h-[1px] bg-slate-100 my-2" />
                                                    ) : (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.href as any}
                                                            className="block py-2 text-[12px] font-bold text-slate-500 hover:text-[#D4AF37] uppercase tracking-wider"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        )}
                                    </li>
                                ))}
                                <li className="flex flex-col gap-4 border-b border-slate-50 pb-6">
                                    <Link
                                        href={"/blog" as any}
                                        className="text-lg font-roboto font-bold italic text-slate-900 uppercase flex items-center justify-between group"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="group-hover:text-[#D4AF37] transition-colors tracking-widest">{t('blog')}</span>
                                    </Link>
                                </li>
                                <li className="flex flex-col gap-4 border-b border-slate-50 pb-6">
                                    <Link
                                        href={"/auth/login" as any}
                                        className="text-lg font-roboto font-bold italic text-slate-900 uppercase flex items-center justify-between group"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="group-hover:text-[#D4AF37] transition-colors tracking-widest">{commonT('login')}</span>
                                    </Link>
                                </li>
                                <li className="flex flex-col gap-4 border-b border-slate-50 pb-6">
                                    <Link
                                        href={"/auth/register" as any}
                                        className="text-lg font-roboto font-bold italic text-slate-900 uppercase flex items-center justify-between group"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="group-hover:text-[#D4AF37] transition-colors tracking-widest">{commonT('register')}</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="mt-auto pt-8 border-t border-slate-100">
                            <div className="flex flex-col gap-6">
                                <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="btn-gold !w-full !py-6 text-center text-xs tracking-[0.4em] uppercase font-bold justify-center rounded-xl">
                                    {t('freeConsultation')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
