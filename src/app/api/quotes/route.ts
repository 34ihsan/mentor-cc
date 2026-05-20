
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendTemplatedEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Oturum açmanız gerekmektedir." }, { status: 401 });
        }

        const {
            institutionId,
            programId,
            startDate,
            duration,
            notes,
            category,
            accommodation,
            examScores,
            gradeLevel,
            age
        } = await req.json();

        // Construct a richer message for the advisor
        let dynamicInfo = [];
        if (duration) dynamicInfo.push(`${duration} süreli eğitim`);
        if (startDate) dynamicInfo.push(`${startDate} başlangıç`);
        if (accommodation) dynamicInfo.push("Konaklama talebi var");
        if (examScores) dynamicInfo.push(`Sınav Skorları: ${examScores}`);
        if (gradeLevel) dynamicInfo.push(`Sınıf: ${gradeLevel}`);
        if (age) dynamicInfo.push(`Yaş: ${age}`);

        const messageContent = `Yeni teklif talebi (${category || 'Genel'}): ${dynamicInfo.join(', ')}. Notlar: ${notes || 'Yok'}`;

        // Find an admin or advisor to assign the request to
        const moderator = await prisma.user.findFirst({
            where: {
                role: { in: ['ADMIN', 'ADVISOR'] }
            },
            select: { id: true }
        });

        if (!moderator) {
            return NextResponse.json({ error: "Şu anda uygun danışman bulunmamaktadır." }, { status: 500 });
        }

        // Create the application
        const application = await prisma.application.create({
            data: {
                studentId: session.user.id,
                programId,
                consultantId: moderator.id,
                status: "UNDER_REVIEW",
                messages: {
                    create: {
                        content: messageContent,
                        senderId: session.user.id,
                        receiverId: moderator.id,
                    }
                }
            }
        });

        // Also create a Lead record for CRM tracking if needed
        await prisma.lead.create({
            data: {
                name: session.user.name || session.user.email || 'Öğrenci',
                email: session.user.email,
                program: programId,
                status: "new",
                value: duration, // Using duration as an initial value hint
                source: "website_quote"
            }
        });

        // Öğrenciye otomatik teklif onay maili gönder (fire-and-forget)
        if (session.user.email) {
            sendTemplatedEmail({
                to: session.user.email,
                templateType: "QUOTE_RECEIVED",
                variables: {
                    isim: session.user.name || "Öğrenci",
                    kategori: category || "Genel",
                    sure: duration || "Belirtilmedi",
                    tarih: startDate || "Belirtilmedi",
                },
                sentBy: "Teklif Sistemi",
            }).catch(err => console.error("Quote confirmation mail error:", err));
        }

        return NextResponse.json({ application });
    } catch (error) {
        console.error("Quote API error:", error);
        return NextResponse.json({ error: "Talep işlenirken bir hata oluştu." }, { status: 500 });
    }
}
