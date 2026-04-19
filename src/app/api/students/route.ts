import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = session.user.role;
    // Admins, CEOs and Advisors can see the students list
    const allowedRoles = ["ADMIN", "CEO", "ADVISOR"];
    if (!allowedRoles.includes(role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const students = await prisma.user.findMany({
            where: { role: "STUDENT" },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                profile: {
                    select: {
                        phone: true,
                        address: true,
                        companyName: true,
                    },
                },
                asStudent: {
                    select: {
                        id: true,
                        status: true,
                        program: {
                            select: {
                                name: true,
                                institution: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                },
                managedBy: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            orderBy: { createdAt: "desc" },
        });

        // Map data for easier consumption in frontend
        const formattedStudents = students.map(student => ({
            ...student,
            applicationCount: student.asStudent.length,
            latestApplication: student.asStudent[0] || null,
        }));

        return NextResponse.json(formattedStudents);
    } catch (error) {
        console.error("Failed to fetch students:", error);
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
}
