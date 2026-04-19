"use server";

import { prisma } from "@/lib/prisma";
import { generateResetToken, generateTokenExpiry } from "@/lib/auth-tokens";
import { sendEmail } from "@/lib/mail";
import { hash } from "bcryptjs";

export async function forgotPasswordAction(email: string) {
    if (!email) return { error: "E-posta adresi gerekli." };

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Güvenlik için e-posta bulunmasa bile "Gönderildi" mesajı veriyoruz
            return { success: true, message: "Eğer bu e-posta adresi kayıtlı ise, sıfırlama linki gönderilecektir." };
        }

        const token = generateResetToken();
        const expiry = generateTokenExpiry();

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: token,
                resetTokenExpiry: expiry,
            },
        });

        const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${token}`;

        const emailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0B1751;">Şifre Sıfırlama İsteği</h2>
                <p>StarEducation hesabınız için şifre sıfırlama talebi aldık. Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
                <div style="margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #0B1751; color: #B4943E; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Şifremi Sıfırla</a>
                </div>
                <p>Bu link 1 saat geçerlidir. Eğer bu talebi siz yapmadıysanız, bu e-postayı dikkate almayınız.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #666;">StarEducation Ekibi</p>
            </div>
        `;

        const emailResult = await sendEmail({
            to: email,
            subject: "Şifre Sıfırlama - StarEducation",
            html: emailHtml,
        });

        if (!emailResult.success) {
            console.error("SMTP Delivery Failed Output:", emailResult.error);
            return { error: "E-posta gönderimi başarısız oldu. Sunucu hatası oluştu." };
        }

        console.log(`Password reset email completed processing for ${email}`);
        return { success: true, message: "Şifre sıfırlama linki e-posta adresinize gönderildi." };
    } catch (error) {
        console.error("Forgot password error:", error);
        return { error: "Bir hata oluştu, lütfen daha sonra tekrar deneyin." };
    }
}

export async function resetPasswordAction(token: string, password: string) {
    if (!token || !password) return { error: "Geçersiz istek." };

    try {
        const user = await prisma.user.findUnique({
            where: { resetToken: token },
        });

        if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
            return { error: "Geçersiz veya süresi dolmuş sıfırlama kodu." };
        }

        const hashedPassword = await hash(password, 12);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return { success: true, message: "Şifreniz başarıyla güncellendi." };
    } catch (error) {
        console.error("Reset password error:", error);
        return { error: "Şifre güncellenirken bir hata oluştu." };
    }
}
