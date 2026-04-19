import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaHref?: string;
    height?: 'sm' | 'md' | 'lg' | 'xl';
    backgroundImage?: string;
    overlay?: 'dark' | 'navy' | 'light' | 'gradient';
    imageSettings?: string; // JSON string
}

export default function Hero({
    title,
    subtitle,
    ctaText,
    ctaHref = '#contact',
    height = 'lg',
    backgroundImage,
    overlay = 'navy',
    imageSettings
}: HeroProps) {
    const t = useTranslations('Hero');
    const displayCtaText = ctaText || t('cta');

    const heightClasses = {
        sm: 'min-h-[400px]',
        md: 'min-h-[500px]',
        lg: 'min-h-[600px]',
        xl: 'min-h-[700px]',
    };

    const overlayClasses = {
        dark: 'bg-black/50',
        navy: 'bg-primary/40',
        light: 'bg-white/60',
        gradient: 'bg-gradient-to-r from-primary/80 via-primary/30 to-transparent',
    };

    // Parse imageSettings once — not inside JSX
    const settings = (() => {
        try { return imageSettings ? JSON.parse(imageSettings) : {}; } catch { return {}; }
    })();

    const textPositionClass = {
        left: 'justify-start text-left',
        right: 'justify-end text-right',
        center: 'justify-center text-center',
    }[settings.textPosition as 'left' | 'right' | 'center'] ?? 'justify-center text-center';

    const textAlignInner = {
        left: 'mr-auto',
        right: 'ml-auto',
        center: 'mx-auto',
    }[settings.textPosition as 'left' | 'right' | 'center'] ?? 'mx-auto';

    return (
        <div
            className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden bg-zinc-950`}
        >
            {/* Background Image */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt={title}
                        fill
                        priority
                        className="object-cover opacity-90"
                        sizes="100vw"
                    />
                </div>
            )}

            {/* Gradient overlay — navy fade from left, always applied */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/85 via-primary/40 to-transparent" />
            {/* Bottom fade for content legibility */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

            {/* Content */}
            <div className={`relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-20 flex ${textPositionClass}`}>
                <div className={`space-y-8 max-w-3xl ${textAlignInner}`}>

                    {/* Label */}
                    <div className="section-label !text-secondary/70">
                        StarEducation
                    </div>

                    {/* Title */}
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold italic text-white leading-[1.05] tracking-tight drop-shadow-2xl">
                        {title}
                    </h1>

                    {/* Subtitle — left-border accent */}
                    <p className="font-sans text-lg sm:text-xl text-zinc-200 max-w-2xl leading-relaxed border-l-2 border-secondary/40 pl-6">
                        {subtitle}
                    </p>

                    {/* CTA */}
                    <div className="pt-4 flex flex-wrap items-center gap-6">
                        <Link href={ctaHref}>
                            <button className="btn-secondary !px-12 !py-5 text-sm uppercase tracking-wider flex items-center gap-3 shadow-2xl">
                                <span>{displayCtaText}</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-10 flex flex-wrap items-center gap-12 text-zinc-400">
                        {[
                            { value: '25+', label: t('badges.experience') },
                            { value: '10K+', label: t('badges.students') },
                            { value: '50+', label: t('badges.countries') },
                        ].map((badge, i) => (
                            <div key={i} className="flex flex-col items-start gap-1 group cursor-default">
                                <span className="text-3xl font-serif font-bold text-secondary group-hover:scale-110 transition-transform duration-500">
                                    {badge.value}
                                </span>
                                <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-zinc-300">
                                    {badge.label}
                                </span>
                                {i < 2 && <div className="hidden sm:block w-px h-10 bg-zinc-700 absolute" />}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
