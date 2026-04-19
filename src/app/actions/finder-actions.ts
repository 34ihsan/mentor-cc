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
        const { category, budget, country, gpa, languageScore, preference, duration } = criteria;

        let priceQuery = {};
        if (budget === "ECONOMY") {
            priceQuery = { lt: 5000 };
        } else if (budget === "MID") {
            priceQuery = { gte: 5000, lte: 15000 };
        } else if (budget === "PREMIUM") {
            priceQuery = { gt: 15000 };
        }

        const query: any = {
            where: {
                ...(category && category !== "ALL" ? { category: category as Category } : {}),
                ...(budget ? { price: priceQuery } : {}),
            },
            include: {
                institution: {
                    include: {
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
                        { name_en: { contains: country, mode: 'insensitive' } }
                    ]
                }
            };
        }

        const programs = await (prisma.program.findMany as any)(query);

        // Client-side filtering and sorting for templateData
        const scoredPrograms = programs.map((prog: any) => {
            const dataStr = prog.templateData;
            const data = dataStr ? JSON.parse(dataStr) : {};
            let score = 100;
            const reasons = [];

            // GPA Check & Scoring
            if (gpa && data.minGpa) {
                const minGpa = parseFloat(data.minGpa.split('/')[0]);
                if (gpa < minGpa) {
                    score -= 50; // Major penalty
                    reasons.push(`Minimum GPA: ${data.minGpa}`);
                } else {
                    score += 10; // Bonus for meeting requirements
                }
            }

            // Language Score Check
            if (languageScore && data.languageScore) {
                if (!data.languageScore.toLowerCase().includes(languageScore.toLowerCase())) {
                    score -= 30;
                    reasons.push(`Dil Şartı: ${data.languageScore}`);
                }
            }

            // Preference (Discipline/Focus) Score
            if (preference && preference !== 'HEPSI' && preference !== 'ALL') {
                const searchStr = (prog.name + " " + (prog.description || "")).toLowerCase();
                if (searchStr.includes(preference.toLowerCase())) {
                    score += 20;
                }
            }

            // Localization
            const localizedProg = {
                ...prog,
                name: locale === 'en' ? prog.name_en || prog.name : prog.name,
                description: locale === 'en' ? prog.description_en || prog.description : prog.description,
                institution: prog.institution ? {
                    ...prog.institution,
                    name: locale === 'en' ? prog.institution.name_en || prog.institution.name : prog.institution.name,
                    country: prog.institution.country ? {
                        ...prog.institution.country,
                        name: locale === 'en' ? prog.institution.country.name_en || prog.institution.country.name : prog.institution.country.name
                    } : null
                } : null
            };

            return { 
                ...localizedProg, 
                compatibilityScore: Math.min(100, Math.max(0, score)),
                mismatchReasons: reasons
            };
        });

        // Filter out very low compatibility if needed, else just sort
        const sortedPrograms = scoredPrograms
            .sort((a: any, b: any) => b.compatibilityScore - a.compatibilityScore || (a.price || 0) - (b.price || 0));

        return { success: true, programs: sortedPrograms.slice(0, 20) };
    } catch (error) {
        console.error("Find programs failed:", error);
        return { success: false, error: "Failed to find programs" };
    }
}
