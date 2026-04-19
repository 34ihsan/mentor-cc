
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStudentApplicationsAction() {
    const session = await auth();
    if (!session?.user || session.user.role !== "STUDENT") {
        throw new Error("Unauthorized");
    }

    try {
        const applications = await prisma.application.findMany({
            where: { studentId: session.user.id },
            include: {
                program: {
                    include: {
                        institution: true
                    }
                },
                documents: true,
                activityLogs: {
                    orderBy: { createdAt: 'desc' },
                    take: 5
                }
            },
            orderBy: { updatedAt: 'desc' }
        });
        return applications;
    } catch (error) {
        console.error("Failed to fetch student applications:", error);
        return [];
    }
}

export async function uploadDocumentAction(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const applicationId = formData.get("applicationId") as string;
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;

    if (!applicationId || !name || !url) {
        throw new Error("Missing document data");
    }

    try {
        const document = await prisma.document.create({
            data: {
                applicationId,
                name,
                url,
                status: "PENDING",
                version: 1
            }
        });

        // Log activity
        await prisma.activityLog.create({
            data: {
                applicationId,
                action: "DOCUMENT_UPLOAD",
                details: `Öğrenci tarafından yeni belge yüklendi: ${name}`,
                userId: session.user.id
            }
        });

        revalidatePath("/dashboard/student");
        return { success: true, document };
    } catch (error) {
        console.error("Upload failed:", error);
        return { success: false, error: "Belge kaydedilemedi" };
    }
}
