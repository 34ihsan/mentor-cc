import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = session.user.role;
    const userId = session.user.id;

    try {
        let applications;
        if (role === "ADMIN" || role === "CEO") {
            applications = await prisma.application.findMany({
                include: { student: true, program: { include: { institution: true } } }
            });
        } else if (role === "ADVISOR") {
            applications = await prisma.application.findMany({
                where: {
                    OR: [
                        { consultantId: userId },
                        { student: { managedById: userId } },
                        { consultantId: null }
                    ]
                },
                include: { student: true, program: { include: { institution: true } } }
            });
        } else if (role === "AGENCY_MANAGER") {
            applications = await prisma.application.findMany({
                where: {
                    OR: [
                        { agencyId: userId },
                        { consultantId: userId },
                        { consultantId: null }
                    ]
                },
                include: { student: true, program: { include: { institution: true } } }
            });
        } else {
            applications = await prisma.application.findMany({
                where: { studentId: userId },
                include: { student: true, program: { include: { institution: true } } }
            });
        }

        return NextResponse.json(applications);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();

        // Fetch student's manager if exists for auto-assignment
        const student = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { managedById: true }
        });

        let consultantId = student?.managedById;

        // If no manager, pick any moderator (Admin/Advisor) to own this application
        if (!consultantId) {
            const moderator = await prisma.user.findFirst({
                where: { role: { in: ["ADMIN", "ADVISOR"] } },
                select: { id: true }
            });
            consultantId = moderator?.id || null;
        }

        const application = await prisma.application.create({
            data: {
                studentId: session.user.id,
                programId: body.programId,
                consultantId,
                status: "DRAFT",
            }
        });
        return NextResponse.json(application);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
    }
}
