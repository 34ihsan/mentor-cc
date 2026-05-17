import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * CRON JOB / WORKER Endpoint
 * This should be called every 15-60 minutes.
 * It finds APPROVED posts that are due for posting and "publishes" them.
 */
export async function GET(req: Request) {
  // Proactive: Basic security check via secret token in header or param
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  
  if (token !== process.env.CRON_SECRET && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    
    // Find posts to publish
    const postsToPublish = await prisma.socialPost.findMany({
      where: {
        status: "APPROVED",
        scheduledAt: { lte: now }
      }
    });

    if (postsToPublish.length === 0) {
      return NextResponse.json({ message: "No posts due for publishing" });
    }

    const results = [];
    for (const post of postsToPublish) {
      // Mock Publishing Logic
      // In reality, this would call Meta/LinkedIn Graph APIs here
      console.log(`[WORKER] Publishing post ${post.id} to ${post.platform}...`);
      
      const updated = await prisma.socialPost.update({
        where: { id: post.id },
        data: {
          status: "POSTED",
          publishedUrl: `https://${post.platform.toLowerCase()}.com/mock-post-${post.id}`
        }
      });
      results.push(updated.id);
    }

    return NextResponse.json({ 
      message: `${results.length} posts published successfully`,
      publishedIds: results
    });

  } catch (error: any) {
    console.error("Worker Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
