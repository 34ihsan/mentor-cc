import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { logActivity } from "@/lib/activity";
import { OFFER_TEMPLATES } from "@/lib/templates";


export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const applicationId = searchParams.get("applicationId");

    try {
        const where: any = {};

        if (applicationId) {
            where.applicationId = applicationId;
        }

        const offers = await prisma.offer.findMany({
            where,
            include: {
                application: {
                    include: {
                        student: true,
                        program: { include: { institution: true } },
                    },
                },
                contract: true,
            },

            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(offers);
    } catch (error) {
        console.error("Failed to fetch offers:", error);
        return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session || (session.user.role !== "ADVISOR" && session.user.role !== "AGENCY_MANAGER" && session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { applicationId, content, amount, currency, validUntil, templateKey, customData } = body;

        let finalContent = content;
        let finalTitle = body.title;

        // If a template is specified, generate content
        if (templateKey && OFFER_TEMPLATES[templateKey]) {
            const template = OFFER_TEMPLATES[templateKey];
            finalTitle = finalTitle || template.title;
            finalContent = template.content(customData);
        }

        const offer = await prisma.offer.create({
            data: {
                applicationId,
                title: finalTitle,
                content: finalContent,
                templateKey,
                amount: amount ? parseFloat(amount) : null,
                currency: currency || "USD",
                validUntil: validUntil ? new Date(validUntil) : null,
                status: "PENDING",
            },
            include: {
                application: {
                    include: {
                        student: true,
                        program: { include: { institution: true } },
                    },
                },
            },
        });

        // Log activity
        await logActivity({
            applicationId,
            action: "OFFER_SENT",
            userId: session.user.id,
            details: { offerId: offer.id, title: finalTitle }
        });

        // Automatically update application status to OFFER_SENT
        await prisma.application.update({
            where: { id: applicationId },
            data: { status: "OFFER_SENT" }
        });

        return NextResponse.json(offer);
    } catch (error) {
        console.error("Failed to create offer:", error);
        return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
    }
}

