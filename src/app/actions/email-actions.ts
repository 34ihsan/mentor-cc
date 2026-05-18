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

        // We use the new wrapper which adds branded layout & dynamic signature
        const result = await sendCustomEmail({
            to: validatedData.to,
            subject: validatedData.subject,
            body: validatedData.html.replace(/\n/g, '<br/>'),
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
