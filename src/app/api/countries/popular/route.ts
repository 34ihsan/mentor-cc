
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const namesString = searchParams.get("names");
        const locale = searchParams.get("locale");
        const featured = searchParams.get("featured") === "true";
        const names = namesString ? namesString.split(",") : null;

        const countries = await prisma.country.findMany({
            where: {
                AND: [
                    { active: true },
                    featured ? { isFeatured: true } : {},
                    names ? { name: { in: names } } : {}
                ]
            },
            take: names ? undefined : 12,
            orderBy: names ? undefined : { name: 'asc' }
        });

        const localizedResult = countries.map(country => ({
            ...country,
            name: locale === 'en' ? country.name_en || country.name : country.name
        }));

        const result = names
            ? names.map(name => localizedResult.find(c => c.name === name || c.name_en === name)).filter(Boolean)
            : localizedResult;

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
    }
}
