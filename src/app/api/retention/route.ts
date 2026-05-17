import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

// GET /api/retention?token=xxx&action=extend|delete
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const action = searchParams.get("action"); // "extend" | "delete"

    if (!token || !action) {
        return new Response(renderPage("Hatalı İstek", "Geçersiz bağlantı. Lütfen e-postanızdaki linke tıklayın.", false), {
            headers: { "Content-Type": "text/html; charset=utf-8" }
        });
    }

    const document = await prisma.document.findUnique({
        where: { retentionToken: token },
        include: {
            user: { select: { name: true, email: true } },
            application: { include: { student: { select: { name: true } } } }
        }
    });

    if (!document) {
        return new Response(renderPage("Bağlantı Geçersiz", "Bu bağlantı artık geçerli değil. Belge zaten silinmiş olabilir.", false), {
            headers: { "Content-Type": "text/html; charset=utf-8" }
        });
    }

    if (action === "extend") {
        // Extend by 2 more years
        const newExpiry = new Date();
        newExpiry.setFullYear(newExpiry.getFullYear() + 2);

        await prisma.document.update({
            where: { id: document.id },
            data: {
                retentionExpiresAt: newExpiry,
                retentionNoticeSentAt: null, // reset so notice can be sent again
                retentionToken: null,        // invalidate token
            }
        });

        return new Response(renderPage(
            "✅ Saklama Süresi Uzatıldı",
            `"${document.name}" belgesi 2 yıl daha (${newExpiry.toLocaleDateString("tr-TR")} tarihine kadar) saklanacaktır.`,
            true
        ), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    if (action === "delete") {
        // Delete file from disk
        if (document.url.startsWith("/")) {
            const filePath = join(process.cwd(), "public", document.url);
            try { await unlink(filePath); } catch (e) { /* already gone */ }
        }

        await prisma.document.delete({ where: { id: document.id } });

        return new Response(renderPage(
            "🗑️ Belge Silindi",
            `"${document.name}" belgesi GDPR kapsamında kalıcı olarak sistemden silinmiştir.`,
            true
        ), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    return new Response(renderPage("Hata", "Geçersiz işlem.", false), {
        headers: { "Content-Type": "text/html; charset=utf-8" }
    });
}

function renderPage(title: string, message: string, success: boolean) {
    const color = success ? "#003366" : "#dc2626";
    return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Mentor Career</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: white; border-radius: 16px; padding: 48px; max-width: 480px; width: 90%; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { color: ${color}; font-size: 22px; margin: 0 0 12px; }
    p { color: #64748b; line-height: 1.6; margin: 0; }
    .logo { font-weight: 900; font-size: 20px; color: #003366; margin-bottom: 32px; letter-spacing: -0.5px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">★ Mentor Career</div>
    <div class="icon">${success ? "✅" : "❌"}</div>
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
