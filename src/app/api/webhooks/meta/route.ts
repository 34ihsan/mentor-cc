
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Handle Meta Webhook Validation (GET usually, but some platforms send challenge in POST)
        // For Meta POST leads:
        const { entry } = body;
        
        if (entry && entry[0].changes) {
            for (const change of entry[0].changes) {
                if (change.field === "leadgen") {
                    const leadData = change.value;
                    
                    // In a real scenario, we'd fetch the actual lead details using leadgen_id
                    // Here we simulate saving it
                    await prisma.lead.create({
                        data: {
                            name: `Lead ${leadData.ad_id}`,
                            email: "webhook@meta.com",
                            phone: "N/A",
                            program: "Facebook/Instagram Reklam Talebi",
                            value: `Meta Lead ID: ${leadData.leadgen_id} | Ad: ${leadData.ad_name || leadData.ad_id}`,
                            source: "instagram_automation",
                            status: "new"
                        }
                    });
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Meta Webhook Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Meta Webhook Verification
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
    }

    return new Response("Forbidden", { status: 403 });
}
