"use server";

import { prisma } from "@/lib/prisma";
import { HarvesterSchema } from "@/lib/schemas";
import { auth } from "@/auth";

export async function deepHarvestAction(url: string) {
    const session = await auth();
    if (session?.user.role !== "ADMIN" && session?.user.role !== "CEO") {
        return { success: false, error: "Yetkisiz erişim" };
    }

    // Validate Input
    const validated = HarvesterSchema.safeParse({ url });
    if (!validated.success) {
        return { success: false, error: "Geçersiz URL formatı" };
    }

    try {
        // SECURITY REMOVAL: Python-based child_process spawning removed.
        // Web scraping on the main server is a high-risk activity.
        
        return { 
            success: false, 
            error: "Veri toplama modülü güvenlik mimarisi gereği devre dışı bırakılmıştır. Lütfen güvenli bir API (Apify/Firecrawl) entegrasyonu talep ediniz." 
        };
    } catch (error) {
        return { success: false, error: "Harvester şu an kullanılamıyor." };
    }
}

export async function triggerHarvesterAction(id: string, url: string) {
     const session = await auth();
    if (session?.user.role !== "ADMIN" && session?.user.role !== "CEO") {
        return { success: false, error: "Yetkisiz erişim" };
    }

    try {
        await prisma.institution.update({
            where: { id },
            data: { 
                harvestStatus: "PENDING",
                lastHarvestAt: new Date()
            }
        });

        const result: any = await deepHarvestAction(url);

        if (result.success) {
            await prisma.institution.update({
                where: { id },
                data: { harvestStatus: "SUCCESS" }
            });
            return { success: true };
        } else {
            await prisma.institution.update({
                where: { id },
                data: { harvestStatus: "FAILED" }
            });
            return { success: false, error: result.error };
        }
    } catch (error) {
        console.error("Harvester trigger failed:", error);
        return { success: false, error: "Tetikleme başarısız" };
    }
}

export async function processHarvestWithAI(rawData: any, category?: string) {
    const session = await auth();
    if (!session) return { error: "Oturum gerekli" };

    try {
        // SECURITY REMOVAL: Subprocess removed.
        // AI processing should be done via secure SDKs, not local Python scripts.
        return { error: "AI Ayrıştırma modülü güncellenmektedir." };
    } catch (error) {
        return { error: "Ayrıştırma şu an yapılamıyor." };
    }
}

export async function generateSalesCopyAction(programData: any) {
    const { name, category, price, currency, templateData } = programData;
    const data = typeof templateData === 'string' ? JSON.parse(templateData) : templateData;

    const templates: Record<string, string> = {
        UNIVERSITY: `${name} size sadece bir diploma değil, küresel bir kariyerin anahtarını sunuyor. ${currency} ${price} bütçe ile katılabileceğiniz bu program...`,
        MASTER: `${name} yüksek lisans programı, profesyonel gelişiminizi stratejik bir üstünlüğe dönüştürmek için tasarlandı...`,
        LANGUAGE_SCHOOL: `${name} dil okulu ile sadece bir dil öğrenmekle kalmayıp, o dili yaşadığınız kültürün bir parçası olacaksınız...`,
        SUMMER_SCHOOL: `${name} yaz kampı, genç zihinler için unutulmaz bir keşif ve gelişim fırsatı sunuyor...`,
    };

    const copy = templates[category] || `${name} programı, ${currency} ${price} maliyeti ve sunduğu eşsiz imkanlarla geleceğinizi şekillendirmek için sizi bekliyor.`;

    return { 
        success: true, 
        copy: copy + "\n\nBu program StarEducation stratejik danışmanlığı ile size sunulmaktadır." 
    };
}
