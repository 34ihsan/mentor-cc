import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This handles the Webhook verification from Meta (GET request)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode && token) {
        if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
            console.log("WEBHOOK_VERIFIED");
            return new NextResponse(challenge, { status: 200 });
        } else {
            return new NextResponse("Forbidden", { status: 403 });
        }
    }
    return new NextResponse("Bad Request", { status: 400 });
}

// This handles the actual Lead data from Meta (POST request)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Check if this is a leadgen entry
        if (body.object === "page") {
            for (const entry of body.entry) {
                for (const change of entry.changes) {
                    if (change.field === "leadgen") {
                        const leadId = change.value.leadgen_id;
                        const pageId = change.value.page_id;

                        // Note: In a real production scenario, you would then call Meta API 
                        // with the leadId to get the actual field values (phone, email, etc.)
                        // using the META_PAGE_ACCESS_TOKEN.
                        
                        console.log("New Instagram Lead Received:", leadId);

                        /**
                         * PRODUCTION STEP: 
                         * In a live environment with a valid META_PAGE_ACCESS_TOKEN, you would:
                         * const response = await fetch(`https://graph.facebook.com/v21.0/${leadId}?access_token=${process.env.META_PAGE_ACCESS_TOKEN}`);
                         * const leadDetails = await response.json();
                         * name = leadDetails.field_data.find(f => f.name === 'full_name')?.values[0];
                         * email = leadDetails.field_data.find(f => f.name === 'email')?.values[0];
                         */

                        // Basic integration log for now
                        await prisma.lead.create({
                            data: {
                                name: `IG Reklam Adayı #${leadId.substring(0, 6)}`,
                                source: "instagram_automation",
                                program: "Sosyal Medya Talebi",
                                value: `Meta Lead ID: ${leadId} - Reklam üzerinden gelen otomatik başvuru.`,
                                status: "new",
                                notes: `[BİLGİ] Instagram Reklam Talebi Yakalandı.\nLead ID: ${leadId}\nLütfen Meta Business Suite üzerinden detaylarını kontrol edin.`
                            }
                        });
                    }
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
