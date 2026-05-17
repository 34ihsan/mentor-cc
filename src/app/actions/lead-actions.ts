"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export async function createLeadAction(formData: {
    name: string;
    phone: string;
    subject: string;
    message: string;
    source?: string;
}) {
    try {
        const lead = await prisma.lead.create({
            data: {
                name: formData.name,
                phone: formData.phone,
                program: formData.subject,
                status: 'new',
                source: formData.source || 'website',
                value: formData.message, 
            },
        });
        return { success: true, id: lead.id };
    } catch (error) {
        console.error('Lead creation error:', error);
        return { success: false, error: 'Mesaj gönderilemedi.' };
    }
}

export async function getLeadsAction() {
    const session = await auth();
    if (!session?.user) throw new Error('Unauthorized');

    const role = session.user.role;
    const userId = session.user.id;

    try {
        let where: any = {};
        
        // If Agency Manager, only show leads assigned to them
        if (role === 'AGENCY_MANAGER') {
            where.agencyId = userId;
        } else if (role !== 'ADMIN' && role !== 'CEO') {
            throw new Error('Unauthorized');
        }

        const leads = await prisma.lead.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                agency: {
                    select: { name: true, email: true }
                }
            }
        });
        return { success: true, data: leads };
    } catch (error) {
        console.error('Fetch leads error:', error);
        return { success: false, error: 'Veriler alınamadı.' };
    }
}

export async function updateLeadStatusAction(id: string, status: string) {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'CEO')) {
        throw new Error('Unauthorized');
    }

    try {
        await prisma.lead.update({
            where: { id },
            data: { status },
        });

        // Revalidate paths for both admin and agency
        revalidatePath('/dashboard/admin/leads');
        revalidatePath('/dashboard/agency/leads');
        
        return { success: true };
    } catch (error) {
        console.error('Update lead error:', error);
        return { success: false, error: 'Güncelleme başarısız.' };
    }
}

export async function deleteLeadAction(id: string) {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'CEO')) {
        throw new Error('Unauthorized');
    }

    try {
        await prisma.lead.delete({
            where: { id },
        });
        return { success: true };
    } catch (error) {
        console.error('Delete lead error:', error);
        return { success: false, error: 'Silme işlemi başarısız.' };
    }
}

export async function updateLeadNotesAction(id: string, notes: string) {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'CEO')) {
        throw new Error('Unauthorized');
    }

    try {
        await prisma.lead.update({
            where: { id },
            data: { notes },
        });
        return { success: true };
    } catch (error) {
        console.error('Update notes error:', error);
        return { success: false, error: 'Not kaydedilemedi.' };
    }
}

export async function sendLeadEmailAction(leadId: string, subject: string, content: string) {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'CEO')) {
        throw new Error('Unauthorized');
    }

    try {
        const lead = await prisma.lead.findUnique({ where: { id: leadId } });
        if (!lead || !lead.email) {
            return { success: false, error: 'Lead bulunamadı veya e-posta adresi yok.' };
        }

        const result = await sendEmail({
            to: lead.email,
            subject: subject,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #3b82f6;">Mentor Career</h2>
                    <p>${content.replace(/\n/g, '<br>')}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666;">Bu e-posta Mentor Career CRM sistemi üzerinden gönderilmiştir.</p>
                </div>
            `
        });

        if (result.success) {
            // Log this as a note
            const timestamp = new Date().toLocaleString('tr-TR');
            const newNote = (lead.notes || '') + `\n[${timestamp}] E-posta Gönderildi: ${subject}`;
            await prisma.lead.update({
                where: { id: leadId },
                data: { notes: newNote }
            });
        }

        return result;
    } catch (error) {
        console.error('Send action error:', error);
        return { success: false, error: 'E-posta gönderiminde hata oluştu.' };
    }
}

export async function assignLeadAction(leadId: string, agencyId: string | null) {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'CEO')) {
        throw new Error('Unauthorized');
    }

    try {
        await prisma.lead.update({
            where: { id: leadId },
            data: { agencyId }
        });

        revalidatePath('/dashboard/admin/leads');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Atama başarısız.' };
    }
}

export async function getAssigneesAction() {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'CEO')) {
        throw new Error('Unauthorized');
    }

    try {
        const agencies = await prisma.user.findMany({
            where: { 
                role: { in: ['AGENCY_MANAGER', 'ADVISOR'] } 
            },
            select: { id: true, name: true, role: true }
        });
        return { success: true, data: agencies };
    } catch (error) {
        return { success: false, error: 'Kullanıcılar alınamadı.' };
    }
}
