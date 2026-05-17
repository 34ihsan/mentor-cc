import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mentor-cc.com';
    const locales = ['tr', 'en', 'de'];

    const getLocalizedEntries = (path: string, lastModified: Date = new Date(), priority: number = 0.5) => {
        return locales.map((locale) => ({
            url: `${baseUrl}/${locale}${path === '/' ? '' : path}`,
            lastModified,
            changeFrequency: 'daily' as const,
            priority,
            alternates: {
                languages: {
                    tr: `${baseUrl}/tr${path === '/' ? '' : path}`,
                    en: `${baseUrl}/en${path === '/' ? '' : path}`,
                    de: `${baseUrl}/de${path === '/' ? '' : path}`,
                    'x-default': `${baseUrl}/tr${path === '/' ? '' : path}`,
                },
            },
        }));
    };

    // Static routes
    const staticPaths = [
        '/',
        '/kurumsal',
        '/iletisim',
        '/blog',
        '/program-bulucu',
        '/success-stories',
        '/subeler',
        '/career',
        '/kurumsal/kurumlar',
    ];

    const staticRoutes = staticPaths.flatMap((path) => 
        getLocalizedEntries(path, new Date(), path === '/' ? 1 : 0.8)
    );

    // Countries
    const dbCountries = await prisma.country.findMany({
        where: { active: true },
        select: { slug: true, updatedAt: true }
    });

    const countryRoutes = dbCountries.flatMap((c) => 
        getLocalizedEntries(`/rotalar/${c.slug}`, c.updatedAt, 0.7)
    );

    // Institutions
    const institutions = await prisma.institution.findMany({
        where: { active: true },
        select: { slug: true, updatedAt: true }
    });

    const institutionRoutes = institutions.flatMap((inst) => 
        getLocalizedEntries(`/kurumsal/kurumlar/${inst.slug}`, inst.updatedAt, 0.7)
    );

    // Programs
    const programs = await prisma.program.findMany({
        select: { slug: true, updatedAt: true, institution: { select: { slug: true } } }
    });

    const programRoutes = programs.flatMap((p) => 
        getLocalizedEntries(`/kurumsal/kurumlar/${p.institution.slug}/${p.slug}`, p.updatedAt, 0.5)
    );

    // Exam Pages
    const examSlugs = ['toefl', 'ielts', 'sat', 'pte', 'gre', 'gmat', 'cambridge'];
    const examRoutes = examSlugs.flatMap((slug) => 
        getLocalizedEntries(`/programlar/sertifika-programlari/${slug}`, new Date(), 0.6)
    );

    // Blog Posts
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true }
    });

    const postRoutes = posts.flatMap((post) => 
        getLocalizedEntries(`/blog/${post.slug}`, post.updatedAt, 0.6)
    );

    return [
        ...staticRoutes,
        ...countryRoutes,
        ...institutionRoutes,
        ...programRoutes,
        ...examRoutes,
        ...postRoutes,
    ];
}
