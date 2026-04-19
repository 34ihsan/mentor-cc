import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const taskSchema = z.object({
    title: z.string().min(1),
    category: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).default("PENDING"),
    deadline: z.string().optional()
});

export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const tasks = await prisma.userTask.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const validated = taskSchema.parse(body);

        const task = await prisma.userTask.create({
            data: {
                ...validated,
                userId: session.user.id,
                deadline: validated.deadline ? new Date(validated.deadline) : null,
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
        return NextResponse.json({ error: "Creation failed" }, { status: 500 });
    }
}
