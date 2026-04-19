import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = session.user.role;
    const allowedRoles = ["ADMIN", "CEO", "ADVISOR"];
    
    if (!allowedRoles.includes(role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const student = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                profile: true,
                asStudent: {
                    select: {
                        id: true,
                        status: true,
                        createdAt: true,
                        program: {
                            include: {
                                institution: true
                            }
                        },
                        consultant: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    },
                    orderBy: { createdAt: "desc" }
                },
                documents: {
                    orderBy: { uploadedAt: "desc" }
                },
                managedBy: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        if (!student || student.role !== "STUDENT") {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        console.error("Failed to fetch student details:", error);
        return NextResponse.json({ error: "Failed to fetch student details" }, { status: 500 });
    }
}
