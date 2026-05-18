import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// ─── Base wrapper ────────────────────────────────────────────
function wrapInBase(content: string, signature: string = '') {
    return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#0B1751 0%,#1a2a8a 100%);padding:28px 40px;text-align:center;">
          <img src="https://mentor-cc.com/images/MentorCareer.png" alt="Mentor Career" style="height:44px;width:auto;">
        </td></tr>
        <!-- BODY -->
        <tr><td style="padding:40px;color:#1a1a2e;font-size:15px;line-height:1.7;">
          ${content}
        </td></tr>
        ${signature ? `<!-- SIGNATURE --><tr><td style="padding:0 40px 32px;">${signature}</td></tr>` : ''}
        <!-- FOOTER -->
        <tr><td style="background:#f8f9fc;padding:20px 40px;text-align:center;border-top:1px solid #eaecf0;">
          <p style="margin:0;font-size:11px;color:#999;">© ${new Date().getFullYear()} Mentor Career Consulting. Tüm hakları saklıdır.</p>
          <p style="margin:4px 0 0;font-size:11px;color:#bbb;">
            <a href="https://mentor-cc.com" style="color:#B4943E;text-decoration:none;">mentor-cc.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Replace template variables ───────────────────────────────
function fillVariables(template: string, vars: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(vars)) {
        result = result.replaceAll(`{{${key}}}`, value);
    }
    return result;
}

// ─── Get signature from DB ────────────────────────────────────
async function getSignatureHtml(): Promise<string> {
    try {
        const sig = await prisma.settings.findUnique({ where: { key: 'email_signature' } });
        return sig?.value || '';
    } catch {
        return '';
    }
}

// ─── Core sender ─────────────────────────────────────────────
export async function sendEmail({
    to,
    subject,
    html,
    sentBy = "System",
    attachments,
}: {
    to: string;
    subject: string;
    html: string;
    sentBy?: string;
    attachments?: Array<{
        filename: string;
        content: Buffer;
        contentType: string;
    }>;
}) {
    try {
        const info = await transporter.sendMail({
            from: `"Mentor Career" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            attachments,
        });

        // Log successful send to DB
        await prisma.emailLog.create({
            data: {
                to,
                subject,
                body: html,
                sentBy,
                status: "SUCCESS",
            },
        });

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email send error:', error);

        // Log failed send to DB
        try {
            await prisma.emailLog.create({
                data: {
                    to,
                    subject,
                    body: html,
                    sentBy,
                    status: "FAILED",
                    error: error instanceof Error ? error.message : String(error),
                },
            });
        } catch (dbErr) {
            console.error('Failed to write email error log to DB:', dbErr);
        }

        return { success: false, error };
    }
}

// ─── Template-based sender ────────────────────────────────────
export async function sendTemplatedEmail({
    to,
    templateType,
    variables = {},
    sentBy = "System",
}: {
    to: string;
    templateType: string;
    variables?: Record<string, string>;
    sentBy?: string;
}) {
    try {
        const template = await prisma.emailTemplate.findUnique({ where: { type: templateType } });
        if (!template || !template.isActive) {
            console.warn(`Template "${templateType}" not found or inactive`);
            return { success: false, error: 'Template not found' };
        }

        const signature = await getSignatureHtml();
        const bodyFilled = fillVariables(template.body, variables);
        const fullHtml = wrapInBase(bodyFilled, signature);

        return sendEmail({ to, subject: fillVariables(template.subject, variables), html: fullHtml, sentBy });
    } catch (error) {
        console.error('sendTemplatedEmail error:', error);
        return { success: false, error };
    }
}

// ─── Convenience helpers ──────────────────────────────────────
export async function sendOtpEmail(to: string, name: string, otp: string) {
    return sendTemplatedEmail({
        to,
        templateType: 'LOGIN_OTP',
        variables: { isim: name, otp },
        sentBy: 'Giriş Doğrulama (OTP)',
    });
}

export async function sendWelcomeEmail(to: string, name: string) {
    return sendTemplatedEmail({
        to,
        templateType: 'WELCOME',
        variables: { isim: name },
        sentBy: 'Hoş Geldin E-postası',
    });
}

export async function sendContactReplyEmail(to: string, name: string) {
    return sendTemplatedEmail({
        to,
        templateType: 'CONTACT_REPLY',
        variables: { isim: name },
        sentBy: 'İletişim Formu Yanıtı',
    });
}

export async function sendVerificationEmail(to: string, token: string) {
    const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify-email?token=${token}`;
    const signature = await getSignatureHtml();
    const html = wrapInBase(`
        <h2 style="color:#0B1751;margin-top:0;">E-Posta Adresinizi Doğrulayın</h2>
        <p style="color:#555;">Mentor Career platformuna kaydolduğunuz için teşekkürler. Hesabınızı aktifleştirmek için lütfen aşağıdaki butona tıklayın:</p>
        <div style="text-align:center;margin:30px 0;">
            <a href="${verifyUrl}" style="background:#0B1751;color:#B4943E;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:bold;font-size:15px;display:inline-block;">
                E-Posta Adresimi Doğrula
            </a>
        </div>
        <p style="color:#888;font-size:13px;">Bu link <strong>24 saat</strong> geçerlidir. Bu kaydı siz yapmadıysanız bu e-postayı dikkate almayın.</p>
    `, signature);
    return sendEmail({ to, subject: 'E-Posta Adresinizi Doğrulayın - Mentor Career', html, sentBy: 'E-Posta Doğrulama' });
}

// ─── Admin custom send (wraps in branded template) ────────────
export async function sendCustomEmail({
    to,
    subject,
    body,
    sentBy = "System",
    attachments,
}: {
    to: string;
    subject: string;
    body: string;
    sentBy?: string;
    attachments?: Array<{
        filename: string;
        content: Buffer;
        contentType: string;
    }>;
}) {
    const signature = await getSignatureHtml();
    const html = wrapInBase(body, signature);
    return sendEmail({ to, subject, html, sentBy, attachments });
}
