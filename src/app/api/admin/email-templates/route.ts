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
    {
        type: "APPLICATION_RECEIVED",
        name: "Başvuru Alındı Bildirimi",
        subject: "Başvurunuz Alındı ✅ - Mentor Career",
        body: `<h2>Merhaba {{isim}},</h2>
<p>🎓 <strong>{{program}}</strong> programına yaptığınız başvuru başarıyla alındı!</p>
<p>Başvurunuz şu anda danışmanlarımız tarafından incelenmektedir. Sürecin her aşamasında sizi bilgilendireceğiz.</p>
<div style="background:#f0f4ff;border-left:4px solid #0B1751;padding:16px 20px;border-radius:8px;margin:24px 0;">
  <p style="margin:0;font-size:13px;color:#0B1751;"><strong>📌 Başvuru Detayları</strong></p>
  <p style="margin:8px 0 0;font-size:13px;color:#444;">Program: <strong>{{program}}</strong></p>
  <p style="margin:4px 0 0;font-size:13px;color:#444;">Kurum: <strong>{{kurum}}</strong></p>
  <p style="margin:4px 0 0;font-size:13px;color:#444;">Durum: <strong>Taslak (İnceleme Bekliyor)</strong></p>
</div>
<p>Başvurunuzun güncel durumunu <a href="https://mentor-cc.com/dashboard">dashboard</a> üzerinden takip edebilirsiniz.</p>
<p>Herhangi bir sorunuz için danışmanınızla iletişime geçebilirsiniz.</p>
<p>Başarılar dileriz,<br><strong>Mentor Career Danışmanlık Ekibi</strong></p>`,
        isActive: true,
    },
    {
        type: "QUOTE_RECEIVED",
        name: "Teklif Talebi Alındı Bildirimi",
        subject: "Teklif Talebiniz Alındı 📋 - Mentor Career",
        body: `<h2>Merhaba {{isim}},</h2>
<p>📋 Teklif talebiniz başarıyla alındı! Ekibimiz en kısa sürede size özel bir teklif hazırlayacaktır.</p>
<div style="background:#f0f4ff;border-left:4px solid #B4943E;padding:16px 20px;border-radius:8px;margin:24px 0;">
  <p style="margin:0;font-size:13px;color:#0B1751;"><strong>📌 Talep Detayları</strong></p>
  <p style="margin:8px 0 0;font-size:13px;color:#444;">Kategori: <strong>{{kategori}}</strong></p>
  <p style="margin:4px 0 0;font-size:13px;color:#444;">Süre: <strong>{{sure}}</strong></p>
  <p style="margin:4px 0 0;font-size:13px;color:#444;">Başlangıç Tarihi: <strong>{{tarih}}</strong></p>
</div>
<p>Danışmanınız talebinizi inceleyip <strong>1-2 iş günü</strong> içinde sizinle iletişime geçecektir.</p>
<p>Sürecin güncel durumunu <a href="https://mentor-cc.com/dashboard">dashboard</a> üzerinden takip edebilirsiniz.</p>
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
        // Upsert each default template so new ones are added without overwriting existing edits
        for (const tpl of DEFAULT_TEMPLATES) {
            await prisma.emailTemplate.upsert({
                where: { type: tpl.type },
                update: {}, // don't overwrite admin edits
                create: tpl,
            });
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
