import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { logActivity } from "@/lib/activity";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const name = formData.get("name") as string;

        if (!file || typeof file === "string") {
            return NextResponse.json({ error: "No file provided or invalid file" }, { status: 400 });
        }

        // Check application access
        const application = await prisma.application.findUnique({
            where: { id },
        });

        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        const role = session.user.role;
        const userId = session.user.id;

        if (role !== "ADMIN" && role !== "CEO") {
            if (role === "STUDENT" && application.studentId !== userId) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
            if (role === "ADVISOR" && application.consultantId !== userId) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
            if (role === "AGENCY_MANAGER" && application.agencyId !== userId) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const relativeUploadDir = `/uploads/documents/${id}`;
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

        // Legal Confirmation Check
        const confirmedLegal = formData.get("confirmedLegal") === "true";
        if (!confirmedLegal) {
            return NextResponse.json({ error: "Legal confirmation required" }, { status: 400 });
        }

        await writeFile(finalPath, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;

        const document = await prisma.document.create({
            data: {
                name: name || file.name,
                url: fileUrl,
                applicationId: id,
                status: "PENDING",
            },
        });

        // Update application status if it was DRAFT
        if (application.status === "DRAFT") {
            await prisma.application.update({
                where: { id },
                data: { status: "DOCS_PENDING" }
            });
        }

        // Log activity (Standardized to DB fields)
        await prisma.activityLog.create({
            data: {
                applicationId: id,
                userId: session.user.id,
                action: "DOCUMENT_UPLOADED",
                details: `Belge yüklendi: ${document.name} (KVKK Onaylandı)`,
            }
        });

        return NextResponse.json(document);
    } catch (error) {
        console.error("Document upload failed:", error);
        return NextResponse.json({ error: "Failed to upload document" }, { status: 500 });
    }
}
