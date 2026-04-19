import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { logActivity } from "@/lib/activity";
import { CONTRACT_TEMPLATES } from "@/lib/templates";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const applicationId = searchParams.get("applicationId");
    const offerId = searchParams.get("offerId");

    try {
        const where: any = {};
        if (applicationId) {
            where.offer = { applicationId };
        }
        if (offerId) {
            where.offerId = offerId;
        }

        const contracts = await prisma.contract.findMany({
            where,
            include: {
                offer: {
                    include: {
                        application: {
                            include: {
                                student: true,
                                program: { include: { institution: true } },
                            },
                        },
                    },
                },
            },
            orderBy: { signedAt: "desc" },
        });

        return NextResponse.json(contracts);
    } catch (error) {
        console.error("Failed to fetch contracts:", error);
        return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session || (session.user.role !== "ADVISOR" && session.user.role !== "CEO" && session.user.role !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { offerId, studentId, studentEmail, templateKey, title, customData } = body;

        let finalOfferId = offerId || null;
        let finalStudentId = studentId || null;
        let applicationId = null;

        if (offerId) {
            const offer = await prisma.offer.findUnique({
                where: { id: offerId },
                include: { application: { include: { student: true, program: { include: { institution: true } } } } }
            });

            if (!offer) {
                return NextResponse.json({ error: "Offer not found" }, { status: 404 });
            }
            finalStudentId = offer.application.studentId;
            applicationId = offer.applicationId;
        } else if (studentEmail && !finalStudentId) {
            const student = await prisma.user.findUnique({
                where: { email: studentEmail }
            });
            if (student) {
                finalStudentId = student.id;
            }
        }

        let finalContent = "";
        let finalTitle = title || "Hizmet Sözleşmesi";

        if (templateKey && CONTRACT_TEMPLATES[templateKey]) {
            const template = CONTRACT_TEMPLATES[templateKey];
            finalTitle = title || template.title;
            
            // Reconstruct data if missing from customData
            const templateData = { ...customData };
            
            if (offerId && !customData) {
                // Should not happen with new UI but for safety:
                const offer = await prisma.offer.findUnique({
                    where: { id: offerId },
                    include: { application: { include: { student: true, program: { include: { institution: { include: { country: true } } } } } } }
                });
                if (offer) {
                    templateData.studentName = offer.application.student.name || offer.application.student.email;
                    templateData.programName = offer.application.program.name;
                    templateData.institutionName = offer.application.program.institution.name;
                    templateData.country = offer.application.program.institution.country?.name || "Belirtilmedi";
                    templateData.price = offer.amount;
                    templateData.currency = offer.currency;
                }
            }

            finalContent = template.content(templateData);
        } else {
            finalContent = customData?.content || "";
        }

        // For standalone contracts, we use create instead of upsert if offerId is null
        // because we don't have a unique constraint to match on other than offerId
        let contract;
        if (finalOfferId) {
            contract = await prisma.contract.upsert({
                where: { offerId: finalOfferId },
                update: {
                    content: finalContent,
                    title: finalTitle,
                    status: "SENT",
                    studentId: finalStudentId,
                },
                create: {
                    offerId: finalOfferId,
                    content: finalContent,
                    title: finalTitle,
                    status: "SENT",
                    studentId: finalStudentId,
                }
            });
        } else {
            contract = await prisma.contract.create({
                data: {
                    content: finalContent,
                    title: finalTitle,
                    status: "SENT",
                    studentId: finalStudentId,
                }
            });
        }

        if (applicationId) {
            await logActivity({
                applicationId,
                action: "CONTRACT_GENERATED",
                userId: session.user.id,
                details: { contractId: contract.id, offerId: finalOfferId }
            });
        }

        return NextResponse.json(contract);
    } catch (error) {
        console.error("Failed to create contract:", error);
        return NextResponse.json({ error: "Failed to create contract" }, { status: 500 });
    }
}
