import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = session.user.role;
    const userId = session.user.id;

    try {
        // 1. If Student or Agent, find their Primary Advisor
        if (role === "STUDENT" || role === "AGENCY_MANAGER") {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    managedBy: {
                        select: { id: true, name: true, email: true, role: true }
                    },
                    asStudent: {
                        where: { consultantId: { not: null } },
                        orderBy: { updatedAt: 'desc' },
                        take: 1,
                        include: {
                            consultant: {
                                select: { id: true, name: true, email: true, role: true }
                            }
                        }
                    }
                }
            });

            let primaryContact = user?.managedBy || user?.asStudent?.[0]?.consultant;

            // Fallback: If no assigned advisor, pick the first available ADVISOR in the system
            if (!primaryContact) {
                primaryContact = await prisma.user.findFirst({
                    where: { role: "ADVISOR" },
                    select: { id: true, name: true, email: true, role: true }
                });
            }

            return NextResponse.json({
                primaryContact,
                suggestedContacts: []
            });
        }

        // 2. If Admin, CEO, or Advisor, find users to message
        // They can message any Student or Agent
        const contacts = await prisma.user.findMany({
            where: {
                role: { in: ["STUDENT", "AGENCY_MANAGER", "ADVISOR"] },
                NOT: { id: userId }
            },
            select: { id: true, name: true, email: true, role: true },
            take: 50
        });

        return NextResponse.json({
            contacts
        });

    } catch (error) {
        console.error("Failed to fetch contacts:", error);
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }
}
