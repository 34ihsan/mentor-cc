import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { orders } = body; // Expected: [{ id: string, order: number }, ...]

        if (!Array.isArray(orders)) {
            return new NextResponse("Invalid request body", { status: 400 });
        }

        /* 
        await prisma.$transaction(
            orders.map((item) =>
                prisma.service.update({
                    where: { id: item.id },
                    data: { order: item.order }
                })
            )
        );
        */

        revalidatePath('/dashboard/admin/services');
        revalidatePath('/'); // For navigation

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[SERVICES_REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
