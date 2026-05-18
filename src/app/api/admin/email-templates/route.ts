import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const DEFAULT_TEMPLATES = [
    {
        type: "WELCOME",
        name: "Hoş Geldin E-postası",
        subject: "Mentor Career'a Hoş Geldiniz! 🎉",
        body: `<h2>Merhaba {{isim}},</h2>
<p>Mentor Career platformuna hoş geldiniz! Yurtdışı eğitim hedeflerinize ulaşmak için doğru yerdesiniz.</p>
<p>Platformumuzda şunları yapabilirsiniz:</p>
<ul>
  <li>🎓 Dünya genelindeki üniversiteleri keşfedin</li>
  <li>📋 Başvurularınızı takip edin</li>
  <li>💬 Danışmanlarınızla iletişime geçin</li>
  <li>📄 Belgelerinizi yönetin</li>
</ul>
<p>Herhangi bir sorunuz olursa bize ulaşmaktan çekinmeyin.</p>
<p>Başarılar dileriz,<br><strong>Mentor Career Ekibi</strong></p>`,
        isActive: true,
    },
    {
        type: "LOGIN_OTP",
        name: "Giriş Doğrulama Kodu",
        subject: "Giriş Doğrulama Kodunuz - Mentor Career",
        body: `<h2>Merhaba {{isim}},</h2>
<p>Mentor Career hesabınıza giriş yapmak için aşağıdaki doğrulama kodunu kullanın:</p>
<div style="text-align:center; margin: 30px 0;">
  <span style="font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #0B1751; font-family: monospace; background: #f5f5f5; padding: 16px 24px; border-radius: 8px;">{{otp}}</span>
</div>
<p>Bu kod <strong>10 dakika</strong> geçerlidir.</p>
<p>Bu girişi siz yapmadıysanız, lütfen dikkate almayın.</p>`,
        isActive: true,
    },
    {
        type: "CONTACT_REPLY",
        name: "İletişim Formu Otomatik Cevap",
        subject: "Mesajınızı Aldık - Mentor Career",
        body: `<h2>Merhaba {{isim}},</h2>
<p>Bize ulaştığınız için teşekkür ederiz! Mesajınız başarıyla alındı.</p>
<p>Ekibimiz en kısa sürede, genellikle <strong>1 iş günü içinde</strong>, size geri dönüş yapacaktır.</p>
<p>Bu sürede yurtdışı eğitim fırsatlarını keşfetmek için <a href="https://mentor-cc.com">sitemizi</a> ziyaret edebilirsiniz.</p>
<p>Saygılarımızla,<br><strong>Mentor Career Danışmanlık Ekibi</strong></p>`,
        isActive: true,
    },
];

export async function GET() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Seed defaults if none exist
        const count = await prisma.emailTemplate.count();
        if (count === 0) {
            await prisma.emailTemplate.createMany({ data: DEFAULT_TEMPLATES });
        }

        const templates = await prisma.emailTemplate.findMany({
            orderBy: { createdAt: "asc" },
        });
        return NextResponse.json(templates);
    } catch (error) {
        console.error("Email templates fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const template = await prisma.emailTemplate.create({
            data: {
                type: body.type || `CUSTOM_${Date.now()}`,
                name: body.name,
                subject: body.subject,
                body: body.body,
                isActive: body.isActive ?? true,
            },
        });
        return NextResponse.json(template);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
    }
}
