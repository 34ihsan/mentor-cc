import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const SIGNATURE_KEY = "email_signature";

const DEFAULT_SIGNATURE = `<div style="margin-top: 24px; padding-top: 16px; border-top: 2px solid #0B1751;">
  <table cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding-right: 16px; vertical-align: middle;">
        <img src="https://mentor-cc.com/images/MentorCareer.png" alt="Mentor Career" style="height: 40px; width: auto;">
      </td>
      <td style="border-left: 2px solid #B4943E; padding-left: 16px; vertical-align: middle;">
        <p style="margin:0; font-weight: bold; color: #0B1751; font-size: 14px;">{{imza_ad}}</p>
        <p style="margin:0; color: #B4943E; font-size: 12px;">{{imza_unvan}}</p>
        <p style="margin:4px 0 0; color: #555; font-size: 12px;">
          📞 {{imza_telefon}} &nbsp;|&nbsp; 🌐 <a href="https://mentor-cc.com" style="color:#0B1751;">mentor-cc.com</a>
        </p>
      </td>
    </tr>
  </table>
</div>`;

export async function GET() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        let setting = await prisma.settings.findUnique({ where: { key: SIGNATURE_KEY } });
        if (!setting) {
            setting = await prisma.settings.create({
                data: { key: SIGNATURE_KEY, value: DEFAULT_SIGNATURE },
            });
        }
        
        // Also get signature field values
        const nameField = await prisma.settings.findUnique({ where: { key: "email_signature_name" } });
        const titleField = await prisma.settings.findUnique({ where: { key: "email_signature_title" } });
        const phoneField = await prisma.settings.findUnique({ where: { key: "email_signature_phone" } });

        return NextResponse.json({
            html: setting.value,
            name: nameField?.value || "Mentor Career Ekibi",
            title: titleField?.value || "Danışmanlık Uzmanı",
            phone: phoneField?.value || "+90 (212) 000 00 00",
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch signature" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { name, title, phone } = await req.json();

        // Build HTML from fields
        const html = `<div style="margin-top: 24px; padding-top: 16px; border-top: 2px solid #0B1751;">
  <table cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding-right: 16px; vertical-align: middle;">
        <img src="https://mentor-cc.com/images/MentorCareer.png" alt="Mentor Career" style="height: 40px; width: auto;">
      </td>
      <td style="border-left: 2px solid #B4943E; padding-left: 16px; vertical-align: middle;">
        <p style="margin:0; font-weight: bold; color: #0B1751; font-size: 14px;">${name}</p>
        <p style="margin:0; color: #B4943E; font-size: 12px;">${title}</p>
        <p style="margin:4px 0 0; color: #555; font-size: 12px;">
          📞 ${phone} &nbsp;|&nbsp; 🌐 <a href="https://mentor-cc.com" style="color:#0B1751;">mentor-cc.com</a>
        </p>
      </td>
    </tr>
  </table>
</div>`;

        await prisma.settings.upsert({ where: { key: SIGNATURE_KEY }, update: { value: html }, create: { key: SIGNATURE_KEY, value: html } });
        await prisma.settings.upsert({ where: { key: "email_signature_name" }, update: { value: name }, create: { key: "email_signature_name", value: name } });
        await prisma.settings.upsert({ where: { key: "email_signature_title" }, update: { value: title }, create: { key: "email_signature_title", value: title } });
        await prisma.settings.upsert({ where: { key: "email_signature_phone" }, update: { value: phone }, create: { key: "email_signature_phone", value: phone } });

        return NextResponse.json({ success: true, html });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update signature" }, { status: 500 });
    }
}
