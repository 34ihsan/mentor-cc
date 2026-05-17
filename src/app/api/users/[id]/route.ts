import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const isStaff = session.user.role === "ADMIN" || session.user.role === "CEO" || session.user.role === "ADVISOR";
    if (session.user.id !== id && !isStaff) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { profile: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Remove password from response
        const { password, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const isAdmin = session.user.role === "ADMIN" || session.user.role === "CEO";
    if (session.user.id !== id && !isAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await req.json();

        // Update user
        const user = await prisma.user.update({
            where: { id },
            data: {
                name: body.name,
                profile: {
                    upsert: {
                        create: {
                            phone: body.phone,
                            address: body.address,
                            birthDate: body.birthdate ? new Date(body.birthdate) : null,
                        },
                        update: {
                            phone: body.phone,
                            address: body.address,
                            birthDate: body.birthdate ? new Date(body.birthdate) : null,
                        },
                    },
                },
            },
            include: { profile: true },
        });

        const { password, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("Failed to update user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "CEO";
    if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete user:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
