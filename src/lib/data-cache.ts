import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

/**
 * Cache for Hero Slides
 */
export const getCachedHeroSlides = unstable_cache(
    async (context: string, locale: string) => {
        const slides = await prisma.heroSlide.findMany({
            where: {
                active: true,
                ...(context ? { pageContext: context } : {})
            },
            orderBy: { order: "asc" }
        });

        // Localize results
        return slides.map(slide => ({
            ...slide,
            title: locale === 'en' ? slide.title_en || slide.title : locale === 'de' ? slide.title_de || slide.title : slide.title,
            subtitle: locale === 'en' ? slide.subtitle_en || slide.subtitle : locale === 'de' ? slide.subtitle_de || slide.subtitle : slide.subtitle
        }));
    },
    ["hero-slides"],
    { revalidate: 3600, tags: ["hero"] }
);

/**
 * Cache for Popular Countries
 */
export const getCachedPopularCountries = unstable_cache(
    async (locale: string, featured: boolean = true) => {
        const countries = await prisma.country.findMany({
            where: {
                active: true,
                ...(featured ? { isFeatured: true } : {})
            },
            take: 12,
            orderBy: { name: 'asc' }
        });

        return countries.map(country => ({
            ...country,
            name: locale === 'en' ? country.name_en || country.name : locale === 'de' ? country.name_de || country.name : country.name
        }));
    },
    ["popular-countries"],
    { revalidate: 3600, tags: ["countries"] }
);

/**
 * Cache for Active Services
 */
export const getCachedServices = unstable_cache(
    async () => {
        return prisma.service.findMany({ 
            where: { active: true }, 
            orderBy: { order: 'asc' } 
        });
    },
    ["services-list"],
    { revalidate: 3600, tags: ["services"] }
);

/**
 * Cache for Settings
 */
export const getCachedSetting = unstable_cache(
    async (key: string) => {
        return prisma.settings.findUnique({ 
            where: { key } 
        });
    },
    ["site-settings"],
    { revalidate: 3600, tags: ["settings"] }
);
