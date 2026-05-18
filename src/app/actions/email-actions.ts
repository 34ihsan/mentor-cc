"use server";

import { auth } from "@/auth";
import { sendEmail } from "@/lib/mail";
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

        // We wrap the message in a basic HTML template for professionalism
        const emailTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; line-height: 1.6;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <img src="https://mentor-cc.com/images/MentorCareer.png" alt="Mentor Career Logo" style="max-height: 50px;">
                </div>
                <div style="background-color: #f9f9f9; padding: 30px; border-radius: 8px; border: 1px solid #eaeaea;">
                    ${validatedData.html.replace(/\n/g, '<br/>')}
                </div>
                <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #777;">
                    <p>© ${new Date().getFullYear()} Mentor Career Consulting. Tüm hakları saklıdır.</p>
                </div>
            </div>
        `;

        const result = await sendEmail({
            to: validatedData.to,
            subject: validatedData.subject,
            html: emailTemplate,
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
