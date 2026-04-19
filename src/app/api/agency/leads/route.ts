
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const leadSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    country: z.string().optional(),
    program: z.string().optional(),
    value: z.string().optional(),
    status: z.string().default("new"),
    agencyId: z.string().optional()
});

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

        const where = session.user.role === "ADMIN" || session.user.role === "CEO"
            ? {}
            : { agencyId: session.user.id };

        const leads = await prisma.lead.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                agency: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        return NextResponse.json(leads);
    } catch (error) {
        console.error("[LEADS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const validated = leadSchema.parse(body);

        const lead = await prisma.lead.create({
            data: {
                ...validated,
                agencyId: session.user.role === "ADMIN" || session.user.role === "CEO"
                    ? (validated.agencyId || session.user.id)
                    : session.user.id
            }
        });

        return NextResponse.json(lead);
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
        console.error("[LEADS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
