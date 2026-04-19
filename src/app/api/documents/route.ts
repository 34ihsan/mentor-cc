import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getRequiredDocuments } from "@/lib/application";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const applicationId = searchParams.get("applicationId");
    const role = session.user.role;
    const userId = session.user.id;

    try {
        const documents = await prisma.document.findMany({
            where: {
                ...(applicationId ? { applicationId } : {
                    OR: [
                        { userId: userId },
                        {
                            application: {
                                OR: [
                                    { studentId: userId },
                                    { consultantId: userId },
                                    { agencyId: userId },
                                    { student: { managedById: userId } },
                                    { consultantId: null },
                                    ...(role === "ADMIN" || role === "CEO" ? [{ id: { not: "" } }] : [])
                                ]
                            }
                        }
                    ]
                })
            },
            include: {
                application: {
                    select: {
                        id: true,
                        program: {
                            select: {
                                name: true
                            }
                        },
                        student: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: { uploadedAt: "desc" }
        });

        // Enhance documents with requirement status
        const appIds = [...new Set(documents.filter(d => d.applicationId).map(d => d.applicationId as string))];
        const requirementsMap: Record<string, any[]> = {};

        for (const id of appIds) {
            requirementsMap[id] = await getRequiredDocuments(id);
        }

        const enhancedDocuments = documents.map(doc => ({
            ...doc,
            isRequired: doc.applicationId ? requirementsMap[doc.applicationId]?.some(r => r.name === doc.name) : false
        }));

        return NextResponse.json(enhancedDocuments);
    } catch (error) {
        console.error("Failed to fetch documents:", error);
        return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();

        // Legal Confirmation Enforcement
        if (!body.confirmedLegal) {
            return NextResponse.json({ error: "Legal confirmation required" }, { status: 400 });
        }

        const document = await prisma.document.create({
            data: {
                name: body.name,
                url: body.url,
                status: "PENDING",
                ...(body.applicationId ? { applicationId: body.applicationId } : { userId: session.user.id })
            }
        });

        // Audit Log for Legal Confirmation
        if (body.applicationId) {
            await prisma.activityLog.create({
                data: {
                    applicationId: body.applicationId,
                    userId: session.user.id,
                    action: "DOCUMENT_UPLOAD",
                    details: `Belge yüklendi: ${body.name} (KVKK/Güvenlik Onaylandı)`,
                }
            });
        }

        return NextResponse.json(document);
    } catch (error) {
        console.error("Failed to upload document metadata:", error);
        return NextResponse.json({ error: "Failed to upload document metadata" }, { status: 500 });
    }
}
