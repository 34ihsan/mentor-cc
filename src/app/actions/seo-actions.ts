"use server";

import { prisma } from "@/lib/prisma";
import { SEOActionSchema } from "@/lib/schemas";
import { auth } from "@/auth";

export async function checkSEOAction(title: string, content: string, keyword: string) {
    const session = await auth();
    if (!session) return { error: "Yönetici girişi gereklidir" };

    // Validate Input
    const validated = SEOActionSchema.safeParse({ title, content, keyword });
    if (!validated.success) {
        return { error: "Geçersiz veri", details: validated.error.flatten() };
    }

    try {
        // SECURITY REMOVAL: Python-based child_process spawning has been removed 
        // to prevent RCE vulnerabilities.
        
        // Native fallback/mock logic
        const keywordInTitle = title.toLowerCase().includes(keyword.toLowerCase());
        const keywordCount = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
        
        return {
            score: (keywordInTitle ? 40 : 10) + Math.min(60, keywordCount * 5),
            analysis: [
                keywordInTitle ? "Anahtar kelime başlıkta mevcut." : "Anahtar kelime başlıkta eksik.",
                `Anahtar kelime içerik içinde ${keywordCount} kez geçiyor.`,
                "Kapsamlı analiz modülü güvenlik nedeniyle güncellenmektedir."
            ]
        };
    } catch (error) {
        return { error: "SEO Analizi şu an yapılamıyor." };
    }
}

export async function suggestLinksAction(content: string) {
    const session = await auth();
    if (!session) return { error: "Yönetici girişi gereklidir" };

    try {
        // Fetch known entities from DB to match against content
        const [countries, services] = await Promise.all([
            prisma.country.findMany({ where: { active: true } }),
            prisma.service.findMany({ where: { active: true } })
        ]);

        const entities = [
            ...countries.map(c => ({ name: c.name, url: `/ulkeler/${c.slug}`, type: 'country' })),
            ...services.map(s => ({ name: s.title, url: `/hizmetler/${s.slug}`, type: 'service' }))
        ];

        // SECURITY REMOVAL: Python subprocess removed.
        // Simple native link suggestion logic
        const suggestions = entities.filter(entity => 
            content.toLowerCase().includes(entity.name.toLowerCase())
        );

        return suggestions;
    } catch (error) {
        return { error: "Link önerisi şu an yapılamıyor." };
    }
}
