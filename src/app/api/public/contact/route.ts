import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ContactSchema } from "@/lib/schemas/auth";
import { verifyReCaptcha } from "@/lib/captcha";

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = ContactSchema.safeParse(json);

        if (!body.success) {
            return NextResponse.json({ 
                error: "Geçersiz giriş verileri.",
                details: body.error.format() 
            }, { status: 400 });
        }

        const { name, email, phone, service, message, captchaToken } = body.data;

        // Verify reCAPTCHA token
        const isHuman = await verifyReCaptcha(captchaToken);
        if (!isHuman) {
            return NextResponse.json({ error: "Bot olduğunuz tespit edildi veya captcha geçersiz." }, { status: 403 });
        }

        // Save as a Lead in the system
        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                phone,
                program: service, // Using service slug as 'program' in Lead table
                value: message,   // Using 'value' field for the message content
                status: "new",
                source: "website_contact"
            }
        });

        // Send Contact Reply Email asynchronously (doesn't block the request)
        if (email) {
            import("@/lib/mail").then((mail) => {
                mail.sendContactReplyEmail(email, name).catch(console.error);
            });
        }

        return NextResponse.json({ success: true, leadId: lead.id });
    } catch (error) {
        console.error("Public contact API error:", error);
        return NextResponse.json({ error: "Failed to process contact request" }, { status: 500 });
    }
}
