import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { status, signedUrl, confirmedLegal } = body;

        // Legal Confirmation Enforcement for signing
        if (status === "SIGNED" && !confirmedLegal) {
            return NextResponse.json({ error: "Legal confirmation required for contract signature" }, { status: 400 });
        }

        const contract = await prisma.contract.findUnique({
            where: { id },
            include: { offer: true }
        });

        if (!contract) {
            return NextResponse.json({ error: "Contract not found" }, { status: 404 });
        }

        const data: any = { status };
        if (status === "SIGNED") {
            data.signedAt = new Date();
            if (signedUrl) data.signedUrl = signedUrl;
        }

        const updatedContract = await prisma.contract.update({
            where: { id },
            data
        });

        // Log activity (Fixed to match schema fields: action/details)
        if (contract.offer?.applicationId) {
            await prisma.activityLog.create({
                data: {
                    applicationId: contract.offer.applicationId,
                    userId: session.user.id,
                    action: "CONTRACT_UPDATE",
                    details: `Sözleşme durumu güncellendi: ${contract.title} -> ${status}${status === "SIGNED" ? " (KVKK Onaylandı)" : ""}`,
                }
            });
        }

        // If signed, potentially update application status
        if (status === "SIGNED" && contract.offer?.applicationId) {
            await prisma.application.update({
                where: { id: contract.offer.applicationId },
                data: { status: "CONTRACT_SIGNED" }
            });
        }

        return NextResponse.json(updatedContract);
    } catch (error) {
        console.error("Contract update failed:", error);
        return NextResponse.json({ error: "Failed to update contract" }, { status: 500 });
    }
}
