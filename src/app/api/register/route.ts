import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/schemas/auth";
import { verifyReCaptcha } from "@/lib/captcha";

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = RegisterSchema.safeParse(json);

        if (!body.success) {
            return NextResponse.json({ 
                error: "Geçersiz giriş verileri.",
                details: body.error.format() 
            }, { status: 400 });
        }

        const { email, password, name, role, phone, companyName, captchaToken } = body.data;

        // Verify reCAPTCHA token
        const isHuman = await verifyReCaptcha(captchaToken);
        if (!isHuman) {
            return NextResponse.json({ error: "Bot olduğunuz tespit edildi veya captcha geçersiz." }, { status: 403 });
        }

        // Validate role - only allow STUDENT and AGENCY_MANAGER to be self-registered
        const allowedRoles = ["STUDENT", "AGENCY_MANAGER"];
        const finalRole = allowedRoles.includes(role) ? role : "STUDENT";

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Bu e-posta adresi zaten kullanımda." }, { status: 400 });
        }

        const hashedPassword = await hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: finalRole as any,
                profile: {
                    create: {
                        phone,
                        companyName: finalRole === "AGENCY_MANAGER" ? companyName : undefined,
                    } as any
                }
            },
            include: {
                profile: true
            }
        });

        // Send Welcome Template Email asynchronously (don't block the response if it fails)
        import("@/lib/mail").then((mail) => {
            mail.sendWelcomeEmail(user.email, user.name || "Kullanıcı").catch(console.error);
        });

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                phone: (user as any).profile?.phone,
                companyName: (user as any).profile?.companyName
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Kayıt sırasında bir hata oluştu." }, { status: 500 });
    }
}
