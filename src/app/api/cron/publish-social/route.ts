import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Vercel Cron Authentication check (optional but recommended)
    // const authHeader = req.headers.get("authorization");
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const now = new Date();

    // Find posts that are APPROVED, scheduled for now or earlier, and not yet posted
    const postsToPublish = await prisma.socialPost.findMany({
      where: {
        status: "APPROVED", // Or whatever status means it's ready and approved
        scheduledAt: {
          lte: now
        }
      }
    });

    if (postsToPublish.length === 0) {
      return NextResponse.json({ success: true, message: "No pending approved posts to publish." });
    }

    const results = [];

    for (const post of postsToPublish) {
      try {
        // 🚀 Here we would integrate with actual Social Media APIs
        // (Meta Graph API, LinkedIn API, X API, etc.)
        
        // Example structure for future implementation:
        // if (post.platform === "INSTAGRAM") {
        //   await publishToInstagram(post.imageUrl, post.content);
        // } else if (post.platform === "LINKEDIN") {
        //   await publishToLinkedIn(post.imageUrl, post.content);
        // }

        // Simulate a successful publish by updating the status to POSTED
        await prisma.socialPost.update({
          where: { id: post.id },
          data: {
            status: "POSTED",
          }
        });

        results.push({ id: post.id, status: "success", platform: post.platform });
      } catch (err: any) {
        console.error(`Error publishing post ${post.id}:`, err);
        results.push({ id: post.id, status: "error", error: err.message });
      }
    }

    return NextResponse.json({ success: true, publishedCount: results.filter(r => r.status === "success").length, results });
  } catch (error: any) {
    console.error("Cron execution error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
