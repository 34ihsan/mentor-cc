import { MetadataRoute } from 'next';

/**
 * Advanced robots.ts for StarEducation
 * Focuses on High-Level SEO and Security.
 * 
 * Includes:
 * - Environment detection (Prevents SEO issues on staging/preview)
 * - Bot segmentation (Good bots vs AI/Aggressive scrapers)
 * - Security path protection
 * - Decoy blocking for generic scanners
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stareducon.co.uk';
    
    // Determine if we are in a production indexing environment
    const isProd = process.env.NODE_ENV === 'production' && 
                   process.env.VERCEL_ENV !== 'preview' &&
                   process.env.VERCEL_ENV !== 'development';

    // Sensitive application paths
    const sensitivePaths = [
        '/admin/',
        '/api/',
        '/_next/',
        '/dashboard/',
        '/auth/',
        '/profile/',
        '/settings/',
        '/monitoring/',
        '/login',
        '/register',
        '/reset-password',
        '/verify-email',
    ];

    // Security decoys to block generic vulnerability scanners
    const securityDecoys = [
        '/wp-admin/',
        '/xmlrpc.php',
        '/cgi-bin/',
        '/.env',
        '/.git/',
        '/phpinfo.php',
        '/config.php',
    ];

    // Bots to block entirely (AI Training & Aggressive SEO scrapers)
    const blockedBots = [
        // AI Training Bots
        'GPTBot',
        'ChatGPT-User',
        'Claude-Web',
        'ClaudeBot',
        'CCBot',
        'Google-Extended',
        'Amazonbot',
        'FacebookBot',
        'Omgilibot',
        'anthropic-ai',
        'CommonCrawl',
        
        // Aggressive SEO/Researcher Bots (Blocked per user decision)
        'AhrefsBot',
        'SemrushBot',
        'MJ12bot',
        'DotBot',
        'Rogerbot',
        'SeznamBot',
        'Baiduspider',
        'Sogou web spider',
        'Exabot',
        'PetalBot',
    ];

    /**
     * Non-production environments should be completely invisible to search engines
     * to prevent duplicate content penalties on the main production domain.
     */
    if (!isProd) {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        };
    }

    /**
     * Production configuration
     */
    return {
        rules: [
            // Standard rules for friendly search engines
            {
                userAgent: '*',
                allow: '/',
                disallow: [...sensitivePaths, ...securityDecoys],
            },
            // Comprehensive block for AI and high-load scrapers
            {
                userAgent: blockedBots,
                disallow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
