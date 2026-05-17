"use server";

import { auth } from "@/auth";
import { generateBlogPost } from "@/lib/openrouter";

export async function generateAIBlogAction(topic: string, keywords?: string) {
    const session = await auth();
    if (session?.user.role !== "ADMIN" && session?.user.role !== "CEO") {
        return { success: false, error: "Yetkisiz erişim" };
    }

    if (!topic) {
        return { success: false, error: "Lütfen bir konu belirtin." };
    }

    try {
        const result = await generateBlogPost(topic, keywords);
        
        if (result.success) {
            try {
                const parsed = JSON.parse(result.content);
                return { success: true, data: parsed };
            } catch (e) {
                const jsonMatch = result.content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const cleaned = JSON.parse(jsonMatch[0]);
                    return { success: true, data: cleaned };
                }
                return { success: false, error: "AI geçersiz format döndürdü. Lütfen tekrar deneyin." };
            }
        }
        
        return { success: false, error: result.error || "İçerik üretilemedi." };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
