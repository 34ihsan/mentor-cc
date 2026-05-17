import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import { unlink } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";

// POST /api/cron/retention-check
// Bu endpoint her gece sunucuda cron ile çağrılır.
// Güvenlik: CRON_SECRET ile korunur.
export async function POST(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const results = { noticesSent: 0, deleted: 0, errors: 0 };

    // ─── 1. Yeni yüklenen belgelere retentionExpiresAt ata (henüz atanmamışlara) ───
    const docsWithoutExpiry = await prisma.document.findMany({
        where: { retentionExpiresAt: null }
    });

    for (const doc of docsWithoutExpiry) {
        const expiry = new Date(doc.uploadedAt);
        expiry.setFullYear(expiry.getFullYear() + doc.retentionYears);
        await prisma.document.update({
            where: { id: doc.id },
            data: { retentionExpiresAt: expiry }
        });
    }

    // ─── 2. 30 gün içinde dolacak belgelere uyarı maili gönder ───
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const soonExpiringDocs = await prisma.document.findMany({
        where: {
            retentionExpiresAt: { lte: thirtyDaysFromNow, gte: now },
            retentionNoticeSentAt: null, // henüz mail gönderilmemiş
        },
        include: {
            user: { select: { name: true, email: true } },
            application: { include: { student: { select: { name: true, email: true } } } }
        }
    });

    for (const doc of soonExpiringDocs) {
        const recipientEmail = doc.user?.email || doc.application?.student?.email;
        const recipientName = doc.user?.name || doc.application?.student?.name || "Sayın Kullanıcı";
        if (!recipientEmail) continue;

        // Güvenli tek kullanımlık token oluştur
        const token = randomBytes(32).toString("hex");
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mentor-cc.com";
        const extendUrl = `${siteUrl}/api/retention?token=${token}&action=extend`;
        const deleteUrl = `${siteUrl}/api/retention?token=${token}&action=delete`;
        const expiryDate = doc.retentionExpiresAt!.toLocaleDateString("tr-TR");

        try {
            await sendEmail({
                to: recipientEmail,
                subject: `📋 Belge Saklama Süresi Dolmak Üzere — ${doc.name}`,
                html: buildRetentionEmail({
                    name: recipientName,
                    docName: doc.name,
                    expiryDate,
                    extendUrl,
                    deleteUrl,
                })
            });

            await prisma.document.update({
                where: { id: doc.id },
                data: {
                    retentionNoticeSentAt: now,
                    retentionToken: token,
                }
            });

            results.noticesSent++;
        } catch (err) {
            console.error(`Retention notice failed for doc ${doc.id}:`, err);
            results.errors++;
        }
    }

    // ─── 3. Süresi dolmuş VE 30 gün önce mail gönderilmiş (yanıtsız) belgeleri sil ───
    const expiredDocs = await prisma.document.findMany({
        where: {
            retentionExpiresAt: { lt: now },
            retentionNoticeSentAt: { not: null }, // mail gönderilmiş
        }
    });

    for (const doc of expiredDocs) {
        try {
            // Disk'ten sil
            if (doc.url.startsWith("/")) {
                const filePath = join(process.cwd(), "public", doc.url);
                try { await unlink(filePath); } catch (e) { /* zaten yok */ }
            }

            // DB'den sil
            await prisma.document.delete({ where: { id: doc.id } });
            results.deleted++;
        } catch (err) {
            console.error(`Auto-delete failed for doc ${doc.id}:`, err);
            results.errors++;
        }
    }

    console.log(`[GDPR Retention] ${now.toISOString()} — Sent: ${results.noticesSent}, Deleted: ${results.deleted}, Errors: ${results.errors}`);
    return NextResponse.json({ success: true, ...results });
}

function buildRetentionEmail({ name, docName, expiryDate, extendUrl, deleteUrl }: {
    name: string;
    docName: string;
    expiryDate: string;
    extendUrl: string;
    deleteUrl: string;
}) {
    return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#003366,#004080);padding:40px;text-align:center;">
          <div style="color:white;font-size:28px;font-weight:900;letter-spacing:-0.5px;">★ Mentor Career</div>
          <div style="color:rgba(255,255,255,0.7);font-size:12px;margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Veri Koruma Bildirimi</div>
        </td></tr>

        <!-- Content -->
        <tr><td style="padding:40px;">
          <p style="color:#1e293b;font-size:16px;margin:0 0 8px;">Sayın <strong>${name}</strong>,</p>
          <p style="color:#64748b;font-size:14px;line-height:1.7;margin:0 0 24px;">
            GDPR (AB Genel Veri Koruma Yönetmeliği) kapsamında, sistemimizdeki belgelerinizin saklama süresi dolmak üzeredir.
          </p>

          <!-- Document Card -->
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px;">
            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Etkilenen Belge</div>
            <div style="font-size:18px;font-weight:900;color:#003366;margin-bottom:4px;">📄 ${docName}</div>
            <div style="font-size:13px;color:#ef4444;font-weight:700;">⏰ Son Tarih: ${expiryDate}</div>
          </div>

          <p style="color:#64748b;font-size:13px;line-height:1.7;margin:0 0 24px;">
            Aşağıdaki seçeneklerden birini tercih ediniz. <strong>30 gün içinde yanıt vermezseniz belge otomatik olarak silinecektir.</strong>
          </p>

          <!-- Action Buttons -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="48%" style="padding-right:8px;">
                <a href="${extendUrl}" style="display:block;background:#003366;color:white;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:0.5px;">
                  📦 2 Yıl Daha Sakla
                </a>
              </td>
              <td width="4%"></td>
              <td width="48%" style="padding-left:8px;">
                <a href="${deleteUrl}" style="display:block;background:#fee2e2;color:#dc2626;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:0.5px;">
                  🗑️ Şimdi Sil
                </a>
              </td>
            </tr>
          </table>

          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #f1f5f9;">
            <p style="color:#94a3b8;font-size:11px;margin:0;text-align:center;line-height:1.6;">
              Bu e-posta GDPR Madde 17 kapsamında otomatik olarak gönderilmiştir.<br/>
              Mentor Career GmbH · Veri Sorumlusu: info@mentor-cc.com
            </p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
