"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { 
    Instagram, 
    Facebook,
    Mail, 
    Zap,
    MessageCircle,
    ArrowRight
} from 'lucide-react';
import Image from 'next/image';

const Footer = ({ siteConfig }: { siteConfig?: any }) => {
    const t = useTranslations('Footer');
    const nt = useTranslations('Navbar');
    const st = useTranslations('HomePage.Services');

    const footerLinks = {
        programs: [
            { name: nt('uni'), href: "/yurtdisi-universite" },
            { name: nt('master'), href: "/yurtdisi-yuksek-lisans" },
            { name: nt('highschool'), href: "/yurtdisi-lise" },
            { name: nt('summer'), href: "/yurtdisi-yaz-okullari" },
            { name: nt('language'), href: "/yurtdisi-dil-okullari" },
        ],
        services: [
            { name: nt('exams'), href: "/sinavlar" },
            { name: nt('career'), href: "/career" },
        ],
        quickLinks: [
            { name: nt('about'), href: "/kurumsal" },
            { name: nt('contact'), href: "/iletisim" },
        ]
    };

    return (
        <footer className="relative bg-primary text-zinc-400 pt-32 pb-20 overflow-hidden font-sans border-t border-zinc-900">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="container-content relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-32">
                    {/* Brand Section */}
                    <div className="space-y-12">
                        <Link href="/" className="relative w-[220px] h-[80px] flex items-center justify-center group bg-white shadow-2xl transition-all duration-700 hover:scale-105 p-4">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/MentorCareer.png"
                                    alt="Mentor Career Consulting"
                                    fill
                                    className="object-contain transition-all duration-1000 contrast-125"
                                    sizes="220px"
                                />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                        </Link>

                        <h3 className="text-[10px] uppercase tracking-[0.5em] text-zinc-100 font-black mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 bg-secondary" />
                            {t('aboutTitle')}
                        </h3>
                        <p className="text-zinc-500 text-[15px] leading-relaxed font-serif italic border-l-2 border-secondary pl-8 pr-4 whitespace-pre-line">
                            &ldquo;{t('brandDescription')}&rdquo;
                        </p>
                        <div className="flex items-center gap-6 pt-4">
                            <Link href="/iletisim" className="text-[10px] uppercase tracking-[0.4em] font-black text-secondary hover:text-white transition-all duration-700 flex items-center gap-3 group/cta">
                                {t('sections.contact')} <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Programs */}
                    <div className="space-y-10">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] text-zinc-100 font-black mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-secondary" />
                            {t('sections.programs')}
                        </h3>
                        <ul className="space-y-5">
                            {footerLinks.programs.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-secondary transition-all duration-500 flex items-center gap-4 group"
                                    >
                                        <div className="w-1 h-[1px] bg-zinc-800 group-hover:w-4 group-hover:bg-secondary transition-all duration-700" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services & Corporate */}
                    <div className="space-y-10">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] text-zinc-100 font-black mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-secondary" />
                            {nt('services')}
                        </h3>
                        <ul className="space-y-5">
                            {[...footerLinks.services, ...footerLinks.quickLinks].map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-secondary transition-all duration-500 flex items-center gap-4 group"
                                    >
                                        <div className="w-1 h-[1px] bg-zinc-800 group-hover:w-4 group-hover:bg-secondary transition-all duration-700" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials & Contact */}
                    <div className="space-y-10">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] text-zinc-100 font-black mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-secondary" />
                            {t('sections.contact')}
                        </h3>
                        <div className="space-y-8">
                            <a href={`mailto:${siteConfig?.contact?.email || 'info@mentor-cc.com'}`} className="flex items-center gap-6 group">
                                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-secondary group-hover:border-secondary transition-all duration-700 shadow-xl">
                                    <Mail size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 group-hover:text-zinc-400 transition-colors">Digital Desk</span>
                                    <span className="text-xs font-bold tracking-widest text-zinc-300 group-hover:text-secondary transition-colors italic">{siteConfig?.contact?.email || 'info@mentor-cc.com'}</span>
                                </div>
                            </a>
                            {siteConfig?.social?.instagram && (
                                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-secondary group-hover:border-secondary transition-all duration-700 shadow-xl">
                                        <Instagram size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 group-hover:text-zinc-400 transition-colors">Social Feed</span>
                                        <span className="text-xs font-bold tracking-widest text-zinc-300 group-hover:text-secondary transition-colors italic">
                                            @{siteConfig.social.instagram.split('/').filter(Boolean).pop()?.split('?')[0] || 'mentorcareer'}
                                        </span>
                                    </div>
                                </a>
                            )}
                            {siteConfig?.social?.facebook && (
                                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-secondary group-hover:border-secondary transition-all duration-700 shadow-xl">
                                        <Facebook size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 group-hover:text-zinc-400 transition-colors">Community</span>
                                        <span className="text-xs font-bold tracking-widest text-zinc-300 group-hover:text-secondary transition-colors italic">
                                            {siteConfig.social.facebook.split('/').filter(Boolean).pop() || 'MentorCareer'}
                                        </span>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-20 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                    <div className="flex flex-wrap justify-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        <Link href="/privacy" className="hover:text-white transition-colors">{t('links.privacy')}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{t('links.terms')}</Link>
                        <Link href="/kvkk" className="hover:text-white transition-colors">KVKK Compliance</Link>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                            &copy; {new Date().getFullYear()} <span className="text-zinc-200">Mentor Career Consulting</span> Global.
                        </p>
                        <div className="text-[10px] font-mono text-zinc-600 tracking-[0.3em] uppercase">Secured by Webstarflow</div>
                    </div>
                </div>
            </div>
            
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] pointer-events-none" />
        </footer>
    );
};

export default Footer;
