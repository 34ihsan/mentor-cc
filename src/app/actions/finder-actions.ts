"use server";

import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

export interface FinderCriteria {
    category?: string;
    budget?: "ECONOMY" | "MID" | "PREMIUM";
    country?: string;
    gpa?: number;
    languageScore?: string;
    preference?: string; // Discipline or Focus
    duration?: string; // Weeks or Terms
}

export async function findProgramsAction(criteria: FinderCriteria, locale?: string) {
    try {
        const { category, country, gpa, languageScore, preference, duration } = criteria;

        const query: any = {
            where: {
                ...(category && category !== "ALL" ? { category: category as Category } : {}),
            },
            include: {
                institution: {
                    select: {
                        id: true,
                        name: true,
                        name_en: true,
                        name_de: true,
                        slug: true,
                        city: true,
                        logo: true,
                        rank: true,
                        rating: true,
                        features: true,
                        stats: true,
                        metadata: true,
                        country: true
                    }
                }
            },
            orderBy: {
                price: 'asc'
            }
        };

        // Add country filter if present
        if (country && country !== "ALL") {
            query.where.institution = {
                country: {
                    OR: [
                        { name: { contains: country, mode: 'insensitive' } },
                        { name_en: { contains: country, mode: 'insensitive' } },
                        { name_de: { contains: country, mode: 'insensitive' } },
                        { id: country } // Also check by ID
                    ]
                }
            };
        }

        const programs = await (prisma.program.findMany as any)(query);

        // Client-side filtering and sorting for templateData
        const scoredPrograms = programs.map((prog: any) => {
            const dataStr = prog.templateData;
            const data = dataStr ? JSON.parse(dataStr) : {};
            let score = 80; // Start with base score
            const reasons = [];

            // GPA Check & Scoring
            if (gpa && data.minGpa) {
                const minGpa = parseFloat(data.minGpa.split('/')[0]);
                if (gpa < minGpa) {
                    score -= 40; // Penalty
                    reasons.push(`Minimum GPA: ${data.minGpa}`);
                } else if (gpa >= minGpa + 0.5) {
                    score += 20; // High success bonus
                } else {
                    score += 10;
                }
            }

            // Language Score Check
            if (languageScore && data.languageScore) {
                const searchLang = languageScore.toLowerCase();
                const progLang = data.languageScore.toLowerCase();
                if (!progLang.includes(searchLang)) {
                    score -= 20;
                    reasons.push(`Dil Şartı: ${data.languageScore}`);
                } else {
                    score += 10;
                }
            }

            // Preference (Discipline/Focus) Score - Map IDs to Search Terms
            if (preference && preference !== 'ALL' && preference !== 'OTHER') {
                const areaTerms: Record<string, string[]> = {
                    'ENGINEERING': ['mühendislik', 'engineering', 'tech', 'software', 'bilgisayar'],
                    'BUSINESS': ['işletme', 'business', 'management', 'ekonomi', 'finance'],
                    'MEDICINE': ['tıp', 'medicine', 'health', 'sağlık', 'biomedical'],
                    'ART': ['sanat', 'art', 'design', 'tasarım', 'music'],
                    'GENERAL': ['genel', 'general', 'standard'],
                    'EXAM': ['sınav', 'exam', 'ielts', 'toefl'],
                };

                const terms = areaTerms[preference] || [preference.toLowerCase()];
                const searchStr = (prog.name + " " + (prog.description || "")).toLowerCase();
                
                const matched = terms.some(term => searchStr.includes(term));
                if (matched) {
                    score += 30;
                }
            }

            // Duration match bonus
            if (duration && prog.duration) {
                if (prog.duration.includes(duration)) {
                    score += 10;
                }
            }

            // Localization
            const localizedProg = {
                ...prog,
                name: locale === 'en' ? prog.name_en || prog.name : locale === 'de' ? prog.name_de || prog.name : prog.name,
                description: locale === 'en' ? prog.description_en || prog.description : locale === 'de' ? prog.description_de || prog.description : prog.description,
                duration: locale === 'en' ? prog.duration_en || prog.duration : locale === 'de' ? prog.duration_de || prog.duration : prog.duration,
                institution: prog.institution ? {
                    ...prog.institution,
                    name: locale === 'en' ? prog.institution.name_en || prog.institution.name : locale === 'de' ? prog.institution.name_de || prog.institution.name : prog.institution.name,
                    country: prog.institution.country ? {
                        ...prog.institution.country,
                        name: locale === 'en' ? prog.institution.country.name_en || prog.institution.country.name : locale === 'de' ? prog.institution.country.name_de || prog.institution.country.name : prog.institution.country.name
                    } : null
                } : null
            };

            return { 
                ...localizedProg, 
                templateData: data,
                compatibilityScore: Math.min(100, Math.max(0, score)),
                mismatchReasons: reasons
            };
        });

        // Filter out very low compatibility if needed, else just sort
        const sortedPrograms = scoredPrograms
            .sort((a: any, b: any) => b.compatibilityScore - a.compatibilityScore || (a.price || 0) - (b.price || 0));

        return { success: true, data: sortedPrograms.slice(0, 20) };
    } catch (error) {
        console.error("Find programs failed:", error);
        return { success: false, error: "Failed to find programs" };
    }
}

export async function getFinderCountriesAction(locale: string = 'tr') {
    try {
        const countries = await prisma.country.findMany({
            where: { active: true },
            select: {
                id: true,
                name: true,
                name_en: true,
                name_de: true,
                slug: true,
            },
            orderBy: {
                name: 'asc'
            }
        });

        const localizedCountries = countries.map(c => ({
            id: c.id,
            slug: c.slug,
            label: locale === 'en' ? c.name_en || c.name : locale === 'de' ? c.name_de || c.name : c.name
        }));

        return { success: true, data: localizedCountries };
    } catch (error) {
        console.error("Fetch countries failed:", error);
        return { success: false, error: "Failed to fetch countries" };
    }
}
