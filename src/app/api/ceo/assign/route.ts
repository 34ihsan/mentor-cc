import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session || session.user.role !== "CEO") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { studentId, advisorId } = body;

        if (!studentId || !advisorId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Assignment logic (ManagedBy relation in User model)
        const updatedUser = await prisma.user.update({
            where: { id: studentId },
            data: {
                managedById: advisorId
            }
        });

        // Also update any active applications of this student
        await prisma.application.updateMany({
            where: { studentId },
            data: {
                consultantId: advisorId
            }
        });

        return NextResponse.json({ success: true, updatedUser });
    } catch (error) {
        console.error("Assignment failed:", error);
        return NextResponse.json({ error: "Assignment failed" }, { status: 500 });
    }
}
