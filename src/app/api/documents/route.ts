import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getRequiredDocuments } from "@/lib/application";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

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

        // Use Promise.allSettled to prevent one failure from crashing everything
        const results = await Promise.allSettled(
            appIds.map(async (id) => ({
                id,
                reqs: await getRequiredDocuments(id)
            }))
        );

        results.forEach((res) => {
            if (res.status === 'fulfilled') {
                requirementsMap[res.value.id] = res.value.reqs;
            } else {
                console.error(`Error fetching requirements for application ${res.status}:`, res.reason);
            }
        });

        const enhancedDocuments = documents.map(doc => ({
            ...doc,
            isRequired: doc.applicationId ? (requirementsMap[doc.applicationId] || []).some((r: any) => r.name === doc.name) : false
        }));

        return NextResponse.json(enhancedDocuments);
    } catch (error: any) {
        console.error("Failed to fetch documents:", error);
        return NextResponse.json({ 
            error: "Failed to fetch documents", 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        let name: string;
        let url: string = "";
        let confirmedLegal: boolean = false;
        let applicationId: string | null = null;
        let file: File | null = null;

        const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            file = formData.get("file") as File;
            name = formData.get("name") as string;
            confirmedLegal = formData.get("confirmedLegal") === "true";
            applicationId = formData.get("applicationId") as string;
        } else {
            const body = await req.json();
            name = body.name;
            url = body.url;
            confirmedLegal = body.confirmedLegal;
            applicationId = body.applicationId;
        }

        // Legal Confirmation Enforcement
        if (!confirmedLegal) {
            return NextResponse.json({ error: "Legal confirmation required" }, { status: 400 });
        }

        // Handle File Upload if present
        if (file && typeof file !== 'string') {
            const buffer = Buffer.from(await file.arrayBuffer());
            const relativeUploadDir = `/uploads/documents/general/${session.user.id}`;
            const uploadDir = join(process.cwd(), "public", relativeUploadDir);

            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (e) {
                console.error("Error creating directory", e);
            }

            const uniqueSuffix = randomUUID().slice(0, 8);
            const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "");
            const filename = `${uniqueSuffix}-${originalName}`;
            const finalPath = join(uploadDir, filename);

            await writeFile(finalPath, buffer);
            url = `${relativeUploadDir}/${filename}`;
        }

        if (!url) {
            return NextResponse.json({ error: "URL or File is required" }, { status: 400 });
        }

        const document = await prisma.document.create({
            data: {
                name: name || (file ? file.name : "Unnamed Document"),
                url: url,
                status: "PENDING",
                ...(applicationId ? { applicationId } : { userId: session.user.id })
            }
        });

        // Audit Log for Legal Confirmation
        if (applicationId) {
            await prisma.activityLog.create({
                data: {
                    applicationId: applicationId,
                    userId: session.user.id,
                    action: "DOCUMENT_UPLOAD",
                    details: `Belge yüklendi: ${document.name} (KVKK/Güvenlik Onaylandı)`,
                }
            });
        }

        return NextResponse.json(document);
    } catch (error) {
        console.error("Failed to upload document metadata:", error);
        return NextResponse.json({ error: "Failed to upload document metadata" }, { status: 500 });
    }
}

