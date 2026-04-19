"use server";

import { prisma } from "@/lib/prisma";

export async function globalSearchAction(query: string) {
    if (!query || query.length < 2) return [];

    try {
        const [services, countries, institutions, posts, pages, programs] = await Promise.all([
            prisma.service.findMany({
                where: {
                    OR: [
                        { title: { contains: query } },
                        { slug: { contains: query } }
                    ],
                    active: true
                },
                take: 5
            }),
            prisma.country.findMany({
                where: {
                    OR: [
                        { name: { contains: query } },
                        { slug: { contains: query } }
                    ],
                    active: true
                },
                take: 5
            }),
            prisma.institution.findMany({
                where: {
                    OR: [
                        { name: { contains: query } },
                        { city: { contains: query } }
                    ],
                    active: true
                },
                take: 5
            }),
            prisma.post.findMany({
                where: {
                    OR: [
                        { title: { contains: query } },
                        { slug: { contains: query } }
                    ],
                    published: true
                },
                take: 5
            }),
            prisma.page.findMany({
                where: {
                    OR: [
                        { title: { contains: query } },
                        { slug: { contains: query } }
                    ],
                    published: true
                },
                take: 5
            }),
            prisma.program.findMany({
                where: {
                    OR: [
                        { name: { contains: query } },
                        { slug: { contains: query } }
                    ]
                },
                include: {
                    institution: true
                },
                take: 5
            })
        ]);

        const results = [
            ...services.map(s => ({ id: s.id, title: s.title, type: "Hizmet", href: `/${s.slug}` })),
            ...countries.map(c => ({ id: c.id, title: c.name, type: "Ülke", href: `/ulkeler/${c.slug}` })),
            ...institutions.map(i => ({ id: i.id, title: i.name, type: "Okul", href: `/kurumsal/kurumlar/${i.slug}` })),
            ...posts.map(p => ({ id: p.id, title: p.title, type: "Blog", href: `/blog/${p.slug}` })),
            ...pages.map(p => ({ id: p.id, title: p.title, type: "Sayfa", href: `/pages/${p.slug}` })),
            ...programs.map(p => ({ id: p.id, title: `${p.name} (${p.institution.name})`, type: "Program", href: `/programlar/${p.slug}` }))
        ];

        return results;
    } catch (error) {
        console.error("Search failed:", error);
        return [];
    }
}
