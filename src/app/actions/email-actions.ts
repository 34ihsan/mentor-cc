"use server";

import { auth } from "@/auth";
import { sendCustomEmail } from "@/lib/mail";
import { z } from "zod";

const sendEmailSchema = z.object({
    to: z.string().email("Geçerli bir e-posta adresi giriniz"),
    subject: z.string().min(1, "Konu boş bırakılamaz"),
    html: z.string().min(1, "Mesaj içeriği boş bırakılamaz"),
});

export async function sendCustomEmailAction(formData: FormData) {
    try {
        const session = await auth();

        // Check if user is authenticated and is an ADMIN
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Yetkisiz erişim. Bu işlem için ADMIN yetkisi gereklidir." };
        }

        const data = {
            to: formData.get("to") as string,
            subject: formData.get("subject") as string,
            html: formData.get("html") as string,
        };

        const validatedData = sendEmailSchema.parse(data);

        // Process attachments if they exist
        const files = formData.getAll("attachments") as File[];
        const attachmentsList: Array<{ filename: string; content: Buffer; contentType: string }> = [];

        for (const file of files) {
            if (file && file.size > 0 && file.name) {
                const buffer = Buffer.from(await file.arrayBuffer());
                attachmentsList.push({
                    filename: file.name,
                    content: buffer,
                    contentType: file.type || "application/octet-stream",
                });
            }
        }

        // We use the new wrapper which adds branded layout & dynamic signature
        const result = await sendCustomEmail({
            to: validatedData.to,
            subject: validatedData.subject,
            body: validatedData.html.replace(/\n/g, '<br/>'),
            sentBy: session.user.name || session.user.email || "Admin",
            attachments: attachmentsList.length > 0 ? attachmentsList : undefined,
        });

        if (result.success) {
            return { success: true };
        } else {
            console.error("Failed to send email via action:", result.error);
            return { success: false, error: "E-posta gönderilirken bir hata oluştu." };
        }

    } catch (error) {
        console.error("Send custom email action error:", error);
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message };
        }
        return { success: false, error: "Beklenmeyen bir hata oluştu." };
    }
}
