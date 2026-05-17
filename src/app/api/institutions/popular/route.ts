
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const idsString = searchParams.get("ids");
        const locale = searchParams.get("locale");
        const ids = idsString ? idsString.split(",") : null;

        const institutions = await prisma.institution.findMany({
            where: ids ? { id: { in: ids } } : {},
            take: ids ? undefined : 4,
            orderBy: ids ? undefined : { rating: 'desc' },
            include: { country: true }
        });

        const localizedInstitutions = institutions.map(inst => ({
            ...inst,
            name: locale === 'en' ? inst.name_en || inst.name : locale === 'de' ? inst.name_de || inst.name : inst.name,
            country: inst.country ? {
                ...inst.country,
                name: locale === 'en' ? inst.country.name_en || inst.country.name : locale === 'de' ? inst.country.name_de || inst.country.name : inst.country.name
            } : null
        }));

        // If IDs are provided, ensure we maintain the requested order if possible
        const result = ids
            ? ids.map(id => localizedInstitutions.find(i => i.id === id)).filter(Boolean)
            : localizedInstitutions;

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch institutions" }, { status: 500 });
    }
}
