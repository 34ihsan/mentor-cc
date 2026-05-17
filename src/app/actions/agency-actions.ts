
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/mail";

export async function registerStudentAction(formData: FormData) {
    const session = await auth();
    if (!session || session.user.role !== "AGENCY_MANAGER") {
        throw new Error("Unauthorized");
    }

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (!email || !name || !password) {
        return { success: false, error: "Missing fields" };
    }

    try {
        const hashedPassword = await hash(password, 12);
        
        const newStudent = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: "STUDENT",
                managedById: session.user.id
            }
        });

        revalidatePath("/dashboard/agency/students");
        return { success: true, student: newStudent };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { success: false, error: "Email already exists" };
        }
        return { success: false, error: "Registration failed" };
    }
}

export async function getAgencyStudentsAction() {
    const session = await auth();
    if (!session || session.user.role !== "AGENCY_MANAGER") {
        throw new Error("Unauthorized");
    }

    const students = await prisma.user.findMany({
        where: {
            managedById: session.user.id,
            role: "STUDENT"
        },
        include: {
            asStudent: {
                include: {
                    program: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return students;
}

export async function getAgencyActivitiesAction() {
    const session = await auth();
    if (!session || session.user.role !== "AGENCY_MANAGER") {
        throw new Error("Unauthorized");
    }

    const activities = await prisma.activityLog.findMany({
        where: {
            application: {
                agencyId: session.user.id
            }
        },
        include: {
            application: {
                include: {
                    student: true,
                    program: true
                }
            },
            user: true
        },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    return activities;
}

export async function getAgencyStudentDetailAction(studentId: string) {
    const session = await auth();
    if (!session || session.user.role !== "AGENCY_MANAGER") {
        throw new Error("Unauthorized");
    }

    const student = await prisma.user.findFirst({
        where: {
            id: studentId,
            managedById: session.user.id,
            role: "STUDENT"
        },
        include: {
            asStudent: {
                include: {
                    program: {
                        include: {
                            institution: true
                        }
                    },
                    documents: true,
                    activityLogs: {
                        orderBy: { createdAt: 'desc' }
                    }
                },
                orderBy: { updatedAt: 'desc' }
            }
        }
    });

    return student;
}

export async function createApplicationByAgencyAction(studentId: string, programId: string) {
    const session = await auth();
    if (!session || session.user.role !== "AGENCY_MANAGER") {
        throw new Error("Unauthorized");
    }

    // Verify student is managed by this agency
    const student = await prisma.user.findFirst({
        where: { id: studentId, managedById: session.user.id }
    });

    if (!student) throw new Error("Student not managed by this agency");

    try {
        const application = await prisma.application.create({
            data: {
                studentId,
                programId,
                agencyId: session.user.id,
                status: "DRAFT"
            }
        });

        // Log initial activity
        await prisma.activityLog.create({
            data: {
                applicationId: application.id,
                action: "APPLICATION_CREATED",
                details: "Acenta tarafından yeni başvuru taslağı oluşturuldu.",
                userId: session.user.id
            }
        });

        revalidatePath(`/dashboard/agency/students/${studentId}`);
        return { success: true, applicationId: application.id };
    } catch (error) {
        console.error("Failed to create application:", error);
        return { success: false, error: "Başvuru oluşturulamadı" };
    }
}

export async function agencyUploadDocumentAction(formData: FormData) {
    const session = await auth();
    if (!session || session.user.role !== "AGENCY_MANAGER") {
        throw new Error("Unauthorized");
    }

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
                details: `Acenta tarafından yeni belge yüklendi: ${name}`,
                userId: session.user.id
            }
        });

        revalidatePath(`/dashboard/agency/students`);
        return { success: true, document };
    } catch (error) {
        console.error("Upload failed:", error);
        return { success: false, error: "Belge kaydedilemedi" };
    }
}

export async function updateApplicationStatusAction(applicationId: string, status: any) {
    const session = await auth();
    const allowedRoles = ["ADMIN", "CEO", "ADVISOR", "AGENCY_MANAGER"];
    if (!session || !allowedRoles.includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    try {
        const application = await prisma.application.update({
            where: { id: applicationId },
            data: { status },
            include: { student: true, program: { include: { institution: true } } }
        });
        revalidatePath(`/dashboard/applications/${applicationId}`);

        // Handle Commission creation on completion
        if (status === "COMPLETED" && application.agencyId) {
            // Calculate a default commission or use a placeholder
            // In a real system, this might be based on program price
            const commissionAmount = application.program?.price ? application.program.price * 0.1 : 500; // 10% or default 500
            
            await prisma.commission.create({
                data: {
                    amount: commissionAmount,
                    currency: application.program?.currency || "USD",
                    applicationId: application.id,
                    agencyId: application.agencyId,
                    status: "PENDING"
                }
            });

            await prisma.activityLog.create({
                data: {
                    applicationId,
                    action: "COMMISSION_GENERATED",
                    details: `Başvuru tamamlandı. Acenta komisyonu oluşturuldu: ${commissionAmount} ${application.program?.currency || "USD"}`,
                    userId: session.user.id
                }
            });
        }

        // Send Email Notification
        if (status === "UNDER_REVIEW" || status === "OFFER_SENT" || status === "COMPLETED") {
            const statusLabels: any = {
                "UNDER_REVIEW": "İnceleme Altında",
                "OFFER_SENT": "Teklif Gönderildi",
                "COMPLETED": "Tamamlandı"
            };

            await sendEmail({
                to: application.student.email,
                subject: `Başvuru Güncellemesi: ${application.program.name}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #0B1751;">
                        <h2 style="color: #B4943E;">Merhaba ${application.student.name},</h2>
                        <p><strong>${application.program.institution.name}</strong> - <strong>${application.program.name}</strong> başvurunuzun durumu güncellendi.</p>
                        <div style="padding: 15px; background: #f8fafc; border-radius: 10px; margin: 20px 0;">
                            <p style="margin: 0;">Yeni Durum: <strong>${statusLabels[status] || status}</strong></p>
                        </div>
                        <p>Detayları öğrenci panelinizden inceleyebilirsiniz.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p style="font-size: 12px; color: #64748B;">Mentor Career Consultancy</p>
                    </div>
                `
            });
        }

        // Create Commission for Agency if COMPLETED
        if (status === "COMPLETED" && application.agencyId) {
            const existingComm = await prisma.commission.findFirst({
                where: { applicationId: application.id }
            });

            if (!existingComm) {
                const amount = application.program.price ? (application.program.price * 0.1) : 500;
                await prisma.commission.create({
                    data: {
                        amount,
                        currency: application.program.currency || "EUR",
                        applicationId: application.id,
                        agencyId: application.agencyId,
                        status: "PENDING"
                    }
                });
            }
        }

        await prisma.activityLog.create({
            data: {
                applicationId,
                action: "STATUS_UPDATE",
                details: `Başvuru durumu güncellendi: ${status}`,
                userId: session.user.id
            }
        });

        revalidatePath("/dashboard/agency/students");
        return { success: true };
    } catch (error) {
        console.error("Update error:", error);
        return { success: false, error: "Güncelleme başarısız" };
    }
}

export async function createOfferAction(applicationId: string, data: any) {
    const session = await auth();
    if (!session || (session.user.role !== "AGENCY_MANAGER" && session.user.role !== "ADMIN")) {
        throw new Error("Unauthorized");
    }

    try {
        const offer = await prisma.offer.create({
            data: {
                applicationId,
                content: data.content,
                amount: parseFloat(data.amount),
                currency: data.currency,
                title: data.title,
                status: "PENDING"
            },
            include: { application: { include: { student: true, program: true } } }
        });

        // Notify student about new offer
        await sendEmail({
            to: offer.application.student.email,
            subject: `Yeni Teklif: ${data.title}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #0B1751;">
                    <h2 style="color: #B4943E;">Yeni Bir Teklifiniz Var!</h2>
                    <p>Sayın ${offer.application.student.name}, <strong>${offer.application.program.name}</strong> başvurunuz için yeni bir teklif oluşturuldu.</p>
                    <p>Teklifi incelemek ve onaylamak için lütfen öğrenci panelinize giriş yapınız.</p>
                    <div style="margin-top: 30px;">
                        <a href="${process.env.NEXTAUTH_URL}/dashboard/applications" style="background: #0B1751; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">Teklifi Görüntüle</a>
                    </div>
                </div>
            `
        });

        await prisma.activityLog.create({
            data: {
                applicationId,
                action: "OFFER_CREATED",
                details: `Yeni teklif oluşturuldu: ${data.title}`,
                userId: session.user.id
            }
        });

        revalidatePath("/dashboard/agency/students");
        return { success: true, offer };
    } catch (error) {
        return { success: false, error: "Teklif oluşturulamadı" };
    }
}
