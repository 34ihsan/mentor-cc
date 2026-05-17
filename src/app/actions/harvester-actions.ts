"use server";

import { prisma } from "@/lib/prisma";
import { HarvesterSchema } from "@/lib/schemas";
import { auth } from "@/auth";

import { generateContent, extractInstitutionInfo } from "@/lib/openrouter";

export async function deepHarvestAction(name: string, url: string, category: string) {
    const session = await auth();
    if (session?.user.role !== "ADMIN" && session?.user.role !== "CEO") {
        return { success: false, error: "Yetkisiz erişim" };
    }

    try {
        const result = await extractInstitutionInfo(name, url, category);
        
        if (result.success) {
            try {
                const parsed = JSON.parse(result.content);
                return { success: true, data: parsed };
            } catch (e) {
                // If AI didn't return valid JSON, try to clean it
                const jsonMatch = result.content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const cleaned = JSON.parse(jsonMatch[0]);
                    return { success: true, data: cleaned };
                }
                return { success: false, error: "AI geçersiz veri formatı döndürdü." };
            }
        }
        
        return { 
            success: false, 
            error: result.error || "Veri toplama başarısız oldu." 
        };
    } catch (error: any) {
        return { success: false, error: error.message || "Harvester şu an kullanıalamıyor." };
    }
}

export async function triggerHarvesterAction(id: string, url: string) {
     const session = await auth();
    if (session?.user.role !== "ADMIN" && session?.user.role !== "CEO") {
        return { success: false, error: "Yetkisiz erişim" };
    }

    try {
        const inst = await prisma.institution.findUnique({
            where: { id },
            include: { service: true }
        });

        if (!inst) return { success: false, error: "Kurum bulunamadı" };

        await prisma.institution.update({
            where: { id },
            data: { 
                harvestStatus: "PENDING",
                lastHarvestAt: new Date()
            }
        });

        const result: any = await deepHarvestAction(inst.name, url, inst.service?.title || "Eğitim");

        if (result.success) {
            const data = result.data;
            await prisma.institution.update({
                where: { id },
                data: { 
                    harvestStatus: "SUCCESS",
                    description: data.description || inst.description,
                    content: data.content || inst.content,
                    city: data.city || inst.city,
                    rank: data.rank || inst.rank,
                    rating: data.rating || inst.rating,
                    features: data.features || inst.features,
                    stats: data.stats || inst.stats,
                    tuition: data.tuition || inst.tuition,
                }
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

export async function processHarvestWithAI(name: string, url: string, category: string) {
    return deepHarvestAction(name, url, category);
}


export async function generateSalesCopyAction(programData: any) {
    const { name, category, price, currency, templateData } = programData;
    
    const prompt = `Lütfen şu eğitim programı için etkileyici ve profesyonel bir satış metni (sales copy) yaz:
    Program Adı: ${name}
    Kategori: ${category}
    Ücret: ${currency} ${price}
    Ek Bilgiler: ${JSON.stringify(templateData)}
    
    Metin ikna edici, Mentor Career markasının premium vizyonunu yansıtan ve öğrenci odaklı olmalıdır. Dil Türkçe olmalıdır.`;

    try {
        const result = await generateContent(prompt);
        if (result.success) {
            return { 
                success: true, 
                copy: result.content + "\n\nBu program Mentor Career stratejik danışmanlığı ile size sunulmaktadır." 
            };
        }
        throw new Error(result.error);
    } catch (error: any) {
        // Fallback to static if AI fails
        const templates: Record<string, string> = {
            UNIVERSITY: `${name} size sadece bir diploma değil, küresel bir kariyerin anahtarını sunuyor.`,
            LANGUAGE_SCHOOL: `${name} dil okulu ile sadece bir dil öğrenmekle kalmayıp, o dili yaşadığınız kültürün bir parçası olacaksınız.`,
        };
        return { 
            success: true, 
            copy: (templates[category] || `${name} programı sizi bekliyor.`) + "\n\n(Not: AI servisi geçici olarak kullanılamadığı için taslak metin sunulmuştur.)"
        };
    }
}

