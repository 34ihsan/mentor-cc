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
import SafeHTMLContent from './SafeHTMLContent';
import { BRANDING_ASSETS } from '@/lib/mappings';

const Footer = () => {
    const t = useTranslations('Footer');
    const nt = useTranslations('Navbar');
    const st = useTranslations('HomePage.Services');

    const footerLinks = {
        programs: [
            { name: st('yurtdisi-yuksek-lisans'), href: "/yurtdisi-yuksek-lisans" },
            { name: st('yurtdisi-universite'), href: "/yurtdisi-universite" },
            { name: st('yurtdisi-lise'), href: "/yurtdisi-lise" },
            { name: st('yurtdisi-yaz-okullari'), href: "/yurtdisi-yaz-okullari" },
            { name: st('yurtdisi-dil-okullari'), href: "/yurtdisi-dil-okullari" },
            { name: st('egitim-koclugu'), href: "/egitim-koclugu" },
        ],
        services: [
            { name: nt('sinavlar'), href: "/sinavlar" },
            { name: nt('aboutUs'), href: "/kurumsal" },
            { name: nt('contact'), href: "/iletisim" },
            { name: nt('blog'), href: "/blog" },
        ],
        quickLinks: [
            { name: nt('home'), href: "/" },
            { name: nt('aboutUs'), href: "/kurumsal" },
            { name: nt('services'), href: "/programlar" },
            { name: nt('contact'), href: "/iletisim" },
            { name: nt('blog'), href: "/blog" },
        ]
    };

    return (
        <footer className="relative bg-[#050505] text-zinc-100 pt-32 pb-20 overflow-hidden font-sans border-t border-white/5">
            {/* Background Accents - Solar Flare */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[180px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="container-content relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-32">
                    {/* Brand Section */}
                    <div className="space-y-12">
                        <Link href="/" className="relative w-[220px] h-[80px] flex items-center justify-center group border-white/5 p-4 transition-all duration-700 hover:scale-105 rounded-xl">
                            <Image
                                src={BRANDING_ASSETS.LOGO}
                                alt="Star Education Consulting"
                                width={180}
                                height={60}
                                className="w-full h-full object-contain contrast-125 drop-shadow-[0_0_20px_rgba(255,100,0,0.4)]"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                        </Link>
                        <SafeHTMLContent 
                            as="p"
                            className="text-zinc-500 text-[15px] leading-relaxed font-serif italic border-l-2 border-secondary/50 pl-8 pr-4"
                            html={`&ldquo;${t.raw('brandDescription')}&rdquo;`}
                        />
                        <div className="flex items-center gap-6 pt-4">
                            <Link href="/iletisim" className="text-[10px] uppercase tracking-[0.4em] font-black text-secondary hover:text-white transition-all duration-700 flex items-center gap-3 group/cta">
                                {t('sections.contact')} <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Programs */}
                    <div className="space-y-10">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] text-white font-black mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-secondary shadow-neon" />
                            {t('sections.programs')}
                        </h3>
                        <ul className="space-y-5">
                            {footerLinks.programs.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-secondary transition-all duration-500 flex items-center gap-4 group"
                                    >
                                        <div className="w-1 h-[1px] bg-white/5 group-hover:w-4 group-hover:bg-secondary transition-all duration-700" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Access */}
                    <div className="space-y-10">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] text-white font-black mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-secondary shadow-neon" />
                            {nt('services')}
                        </h3>
                        <ul className="space-y-5">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-secondary transition-all duration-500 flex items-center gap-4 group"
                                    >
                                        <div className="w-1 h-[1px] bg-white/5 group-hover:w-4 group-hover:bg-secondary transition-all duration-700" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials & Contact */}
                    <div className="space-y-10">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] text-white font-black mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-secondary shadow-neon" />
                            {t('sections.contact')}
                        </h3>
                        <div className="space-y-8">
                            <a href="mailto:info@stareducon.co.uk" className="flex items-center gap-6 group">
                                <div className="w-12 h-12 bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-secondary group-hover:border-secondary transition-all duration-700 shadow-sm hover:shadow-neon">
                                    <Mail size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 group-hover:text-zinc-500 transition-colors">Digital Desk</span>
                                    <span className="text-xs font-bold tracking-widest text-white group-hover:text-secondary transition-colors italic">info@stareducon.co.uk</span>
                                </div>
                            </a>
                            <a href="https://www.instagram.com/stareducon/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                                <div className="w-12 h-12 bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-secondary group-hover:border-secondary transition-all duration-700 shadow-sm hover:shadow-neon">
                                    <Instagram size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 group-hover:text-zinc-500 transition-colors">Social Feed</span>
                                    <span className="text-xs font-bold tracking-widest text-white group-hover:text-secondary transition-colors italic">@stareducon</span>
                                </div>
                            </a>
                            <a href="https://www.facebook.com/StarEducationConsulting" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                                <div className="w-12 h-12 bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-secondary group-hover:border-secondary transition-all duration-700 shadow-sm hover:shadow-neon">
                                    <Facebook size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 group-hover:text-zinc-500 transition-colors">Community</span>
                                    <span className="text-xs font-bold tracking-widest text-white group-hover:text-secondary transition-colors italic">StarEducation</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                    <div className="flex flex-wrap justify-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                        <Link href="/privacy" className="hover:text-white transition-colors">{t('links.privacy')}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{t('links.terms')}</Link>
                        <Link href="/kvkk" className="hover:text-white transition-colors">KVKK Compliance</Link>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                            &copy; {new Date().getFullYear()} <span className="text-white">StarEducation</span> Global.
                        </p>
                        <div className="text-[10px] font-mono text-zinc-600 tracking-[0.3em] uppercase">Secured by Webstarflow</div>
                    </div>
                </div>
            </div>
            
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] pointer-events-none" />
        </footer>
    );
};

export default Footer;

