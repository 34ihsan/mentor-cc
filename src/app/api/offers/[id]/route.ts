import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { logActivity } from "@/lib/activity";
import { CONTRACT_TEMPLATES } from "@/lib/templates";


export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const offer = await prisma.offer.findUnique({
            where: { id },
            include: {
                application: {
                    include: {
                        student: true,
                        program: { include: { institution: true } },
                    },
                },
            },
        });

        if (!offer) {
            return NextResponse.json({ error: "Offer not found" }, { status: 404 });
        }

        return NextResponse.json(offer);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { status, content, amount, currency, validUntil } = body;

        // Students can only accept/reject
        if (session.user.role === "STUDENT") {
            if (status !== "ACCEPTED" && status !== "REJECTED") {
                return NextResponse.json({ error: "Students can only accept or reject" }, { status: 403 });
            }
        }

        const updateData: any = {};
        if (status) updateData.status = status;
        if (content !== undefined) updateData.content = content;
        if (amount !== undefined) updateData.amount = amount ? parseFloat(amount) : null;
        if (currency) updateData.currency = currency;
        if (validUntil !== undefined) updateData.validUntil = validUntil ? new Date(validUntil) : null;

        const offer = await prisma.offer.update({
            where: { id },
            data: updateData,
            include: {
                application: {
                    include: {
                        student: { include: { profile: true } },
                        program: { include: { institution: true } },
                    },
                },
            },
        });

        // Log the change
        if (status) {
            await logActivity({
                applicationId: offer.applicationId,
                action: status === "ACCEPTED" ? "OFFER_ACCEPTED" : status === "REJECTED" ? "OFFER_REJECTED" : "OFFER_UPDATED",
                userId: session.user.id,
                details: { offerId: offer.id, status }
            });

            // If accepted, create a contract
            if (status === "ACCEPTED") {
                const template = CONTRACT_TEMPLATES.GENERAL;
                const contractContent = template.content({
                    studentName: offer.application.student.name || offer.application.student.email,
                    institutionName: offer.application.program.institution.name,
                    programName: offer.application.program.name,
                });

                await prisma.contract.create({
                    data: {
                        offerId: offer.id,
                        title: template.title,
                        content: contractContent,
                        status: "PENDING",
                    }
                });

                await logActivity({
                    applicationId: offer.applicationId,
                    action: "CONTRACT_GENERATED",
                    userId: "SYSTEM",
                    details: { offerId: offer.id }
                });

                // Update application status
                await prisma.application.update({
                    where: { id: offer.applicationId },
                    data: { status: "CONTRACT_SIGNED" } // Or just move closer to completion
                });
            }
        }

        return NextResponse.json(offer);
    } catch (error) {
        console.error("Failed to update offer:", error);
        return NextResponse.json({ error: "Failed to update offer" }, { status: 500 });
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
    const isAgency = session?.user?.role === "AGENCY_MANAGER";
    
    if (!isAdmin && !isAgency) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.offer.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete offer:", error);
        return NextResponse.json({ error: "Failed to delete offer" }, { status: 500 });
    }
}
