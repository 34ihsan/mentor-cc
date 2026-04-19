import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const appointmentSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    startTime: z.string(),
    endTime: z.string(),
    type: z.enum(["ONLINE", "OFFICE", "VIDEO"]).default("ONLINE"),
    studentId: z.string().optional(),
});

export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const appointments = await prisma.appointment.findMany({
            where: { advisorId: session.user.id },
            include: { student: { select: { name: true, email: true } } },
            orderBy: { startTime: "asc" }
        });
        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const validated = appointmentSchema.parse(body);

        const appointment = await prisma.appointment.create({
            data: {
                ...validated,
                advisorId: session.user.id,
                startTime: new Date(validated.startTime),
                endTime: new Date(validated.endTime),
            }
        });

        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: "Creation failed" }, { status: 500 });
    }
}
