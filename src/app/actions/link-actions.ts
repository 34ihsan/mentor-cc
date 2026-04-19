"use server";

import { prisma } from "@/lib/prisma";

export async function getRelatedInstitutionsAction(slug: string) {
    try {
        // Find the blog post
        const post = await prisma.post.findUnique({
            where: { slug }
        });

        if (!post) return { success: false, error: "Post not found" };

        // Semantic matching logic:
        // 1. Check if the post title or content mentions any country names
        // 2. Check if it mentions any institution names
        
        const countries = await prisma.country.findMany({ where: { active: true } });
        const institutions = await (prisma.institution.findMany as any)({ 
            where: { active: true }, 
            include: { country: true } 
        });

        const matchedCountries = countries.filter(c => 
            post.title.toLowerCase().includes(c.name.toLowerCase()) || 
            post.content.toLowerCase().includes(c.name.toLowerCase())
        );

        const matchedInstitutions = institutions.filter((inst: any) => 
            post.title.toLowerCase().includes(inst.name.toLowerCase()) || 
            post.content.toLowerCase().includes(inst.name.toLowerCase()) ||
            matchedCountries.some(mc => inst.countryId === mc.id)
        );

        return { success: true, institutions: matchedInstitutions.slice(0, 4) };
    } catch (error) {
        console.error("Link matching failed:", error);
        return { success: false, error: "Failed to match related content" };
    }
}

export async function getRelatedPostsAction(institutionId: string) {
    try {
        const inst = await (prisma.institution.findUnique as any)({
            where: { id: institutionId },
            include: { country: true }
        });

        if (!inst) return { success: false, error: "Institution not found" };

        const posts = await prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            take: 20
        });

        const matchedPosts = posts.filter(post => 
            post.title.toLowerCase().includes(inst.name.toLowerCase()) || 
            post.content.toLowerCase().includes(inst.name.toLowerCase()) ||
            (inst.country && (post.title.toLowerCase().includes((inst as any).country.name.toLowerCase()) || post.content.toLowerCase().includes((inst as any).country.name.toLowerCase())))
        );

        return { success: true, posts: matchedPosts.slice(0, 3) };
    } catch (error) {
        return { success: false, error: "Failed to match posts" };
    }
}
