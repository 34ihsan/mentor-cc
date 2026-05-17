import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';
import { 
  generateContent, 
  generateSocialRoadmap, 
  generateSocialPostContent,
  enhanceImagePrompt,
  generateImage,
  generateHashtags
} from "@/lib/openrouter";
import { auth } from "@/auth";
import { SocialPlatform } from "@prisma/client";

/**
 * GET: Fetch status or roadmaps
 */
export async function GET(req: Request) {
  const session = await auth();
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'CEO' && session.user.role !== 'AGENCY_MANAGER')) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const checkStatus = searchParams.get("status");

  if (checkStatus) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      // 1. Check OpenRouter Connectivity
      const openRouterHealth = await fetch("https://openrouter.ai/api/v1/models", {
        headers: { "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}` },
        signal: controller.signal
      })
      .then(r => r.ok)
      .catch(() => false);
      
      // 2. Check Image API (Pollinations.ai)
      const imageHealth = await fetch('https://image.pollinations.ai/', {
        signal: controller.signal
      })
      .then(r => r.ok)
      .catch(() => false);
      
      clearTimeout(timeoutId);

      return NextResponse.json({
        ollama: openRouterHealth, 
        imageApi: imageHealth,
        timestamp: new Date().toISOString(),
        provider: "OpenRouter (Gemini)"
      });
    } catch (e: any) {
      console.error("Health Check Error:", e.message);
      return NextResponse.json({ ollama: false, imageApi: false, error: e.message }, { status: 200 });
    }
  }

  const getSettings = searchParams.get("action");
  
  if (getSettings === "GET_SETTINGS") {
    try {
      const hashtags = await prisma.settings.findUnique({ where: { key: "defaultHashtags" } });
      const imagePrompt = await prisma.settings.findUnique({ where: { key: "advancedImagePrompt" } });
      return NextResponse.json({ 
        defaultHashtags: hashtags?.value || "#mentorcc #yurtdisiegitim #eğitimdanışmanlığı",
        advancedImagePrompt: imagePrompt?.value || "professional photography, hyper-realistic, 8k resolution, cinematic lighting, shot on 35mm lens, f/1.8, sharp focus, vibrant colors, premium aesthetic, shallow depth of field, highly detailed textures, masterfully composed, award-winning composition, no distortion, clean background."
      });
    } catch (e) {
      return NextResponse.json({ defaultHashtags: "", advancedImagePrompt: "" });
    }
  }

  try {
    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set");
      return NextResponse.json({ error: "Database configuration missing" }, { status: 500 });
    }

    const roadmaps = await prisma.socialRoadmap.findMany({
      include: { posts: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(roadmaps || []);
  } catch (error: any) {
    console.error("GET Roadmaps Full Error:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta
    });
    return NextResponse.json({ 
      error: "Failed to fetch roadmaps", 
      details: error.message,
      code: error.code
    }, { status: 500 });
  }
}

/**
 * POST: Generate a new roadmap or a single post
 */
export async function POST(req: Request) {
  console.log(">>> [Social API] İstek Alındı (POST)");
  const session = await auth();
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'CEO' && session.user.role !== 'AGENCY_MANAGER')) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any = null;
  try {
    body = await req.json();
    const { action, topic, roadmapId, postId } = body;
    console.log(`[Social API] Action: ${action}, PostId: ${postId}, Topic: ${topic}`);
    
    // Defensive check: Ensure imageUrl is a string if present in body
    if (body.imageUrl && typeof body.imageUrl === 'object') {
      console.log("[Social API] Normalizing imageUrl object from request body");
      body.imageUrl = body.imageUrl.url || body.imageUrl.image_url?.url || body.imageUrl.image_url || JSON.stringify(body.imageUrl);
    }

    // Only ADMIN/CEO can do destructive or generative actions
    const isPowerUser = session.user.role === 'ADMIN' || session.user.role === 'CEO';

    if (!isPowerUser && action !== "APPROVE_POST" && action !== "GENERATE_HASHTAGS") {
       return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    // 1. Generate a Roadmap (The Strategy)
    if (action === "GENERATE_ROADMAP") {
      const { timeframe } = body;
      const count = timeframe === 'MONTHLY' ? 12 : 7;

      const imageSetting = await prisma.settings.findUnique({ where: { key: "advancedImagePrompt" } });
      const customSuffix = imageSetting?.value;
      
      const roadmapResult = await generateSocialRoadmap(topic, count);
      
      if (!roadmapResult.success) {
        return NextResponse.json({ error: roadmapResult.error || "AI service is not reachable." }, { status: 503 });
      }

      let plan;
      try {
        const jsonMatch = roadmapResult.content.match(/\[[\s\S]*\]/);
        plan = JSON.parse(jsonMatch ? jsonMatch[0] : roadmapResult.content);
      } catch (e) {
        return NextResponse.json({ error: "AI returned invalid JSON format", raw: roadmapResult.content }, { status: 422 });
      }

      const roadmap = await prisma.socialRoadmap.create({
        data: {
          topic,
          strategy: roadmapResult.content,
          startDate: new Date(),
          endDate: new Date(Date.now() + (timeframe === 'MONTHLY' ? 30 : 7) * 24 * 60 * 60 * 1000),
          posts: {
            create: plan.map((p: any, index: number) => {
              const [hours, minutes] = (body.defaultPostingTime || "18:00").split(":").map(Number);
              const scheduledDate = new Date();
              scheduledDate.setDate(scheduledDate.getDate() + (index + 1));
              scheduledDate.setHours(hours, minutes, 0, 0);
              
              return {
                platform: (p.platforms?.[0] || 'INSTAGRAM') as SocialPlatform,
                content: p.topic + ": " + p.brief,
                imagePrompt: enhanceImagePrompt(p.visual_hint, customSuffix),
                scheduledAt: scheduledDate,
                status: "DRAFT"
              };
            })
          }
        },
        include: { posts: true }
      });

      // Email Notify Admin
      try {
        const { sendEmail } = await import("@/lib/mail");
        await sendEmail({
          to: "info@mentor-cc.com",
          subject: `Yeni Sosyal Medya Planı: ${topic}`,
          html: `<h2>Yeni Yol Haritası Hazırlandı</h2><p>Konu: ${topic}</p>`
        });
      } catch (e) { console.error("Email error:", e); }

      return NextResponse.json(roadmap);
    }

    // 2. Generate Final Content (Text + Image)
    if (action === "GENERATE_CONTENT") {
      if (!postId) {
        console.error("[Social API] GENERATE_CONTENT called without postId");
        return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
      }
      const post = await prisma.socialPost.findUnique({ where: { id: postId } });
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

      console.log(`[Social API] Calling AI for post ${postId}...`);
      const aiResult = await generateSocialPostContent(post.platform, post.content);
      console.log(`[Social API] AI call finished with success: ${aiResult.success}`);
      
      if (!aiResult.success) {
        console.error(`[Social API] Content generation failed:`, aiResult.error);
        return NextResponse.json({ error: aiResult.error }, { status: 503 });
      }

      let parsedContent;
      try {
        console.log(`[Social API] AI Raw Response:`, aiResult.content);
        const jsonMatch = aiResult.content.match(/\{[\s\S]*\}/);
        parsedContent = JSON.parse(jsonMatch ? jsonMatch[0] : aiResult.content);
      } catch (e: any) {
        console.error(`[Social API] JSON Parse Error:`, e.message, aiResult.content);
        return NextResponse.json({ error: "AI returned invalid post format", raw: aiResult.content }, { status: 422 });
      }

      const imageSetting = await prisma.settings.findUnique({ where: { key: "advancedImagePrompt" } });
      const enhancedPrompt = enhanceImagePrompt(parsedContent.imagePrompt || post.imagePrompt, imageSetting?.value);

      // Truncate prompt if it's too long (OpenRouter/Flux handle up to 4000+)
      const safePrompt = enhancedPrompt.length > 3000 
        ? enhancedPrompt.substring(0, 3000) + "..." 
        : enhancedPrompt;

      let imageUrl = "";
      
      // 1. Try OpenRouter Premium Models (Sequence handles its own fallbacks internally)
      console.log(`[Social API] Attempting OpenRouter Image Generation for Post ${postId}...`);
      try {
        const orImage = await generateImage(safePrompt);
        
        if (orImage.success && orImage.url) {
          imageUrl = orImage.url;
          console.log(`[Social API] OpenRouter Image generated successfully.`);
        } else {
          throw new Error(orImage.error || "Tüm premium modeller denendi fakat görsel üretilemedi.");
        }
      } catch (error: any) {
        console.error(`[Social API] CRITICAL IMAGE ERROR:`, error.message);
        // We no longer fallback to low-quality free services.
        // If it fails, we return the error so the user can try again or manually edit.
        return NextResponse.json({ error: "Görsel üretimi başarısız. Lütfen OpenRouter bakiyenizi veya bağlantınızı kontrol edin." }, { status: 500 });
      }

      console.log(`[Social API] Updating DB for post ${postId}...`);
      try {
        // Deep search for content fields in case of nested JSON
        const findField = (obj: any, fields: string[]): string | null => {
          for (const f of fields) {
            if (obj[f] && typeof obj[f] === 'string') return obj[f];
          }
          for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              const result = findField(obj[key], fields);
              if (result) return result;
            }
          }
          return null;
        };

        const finalCaption = findField(parsedContent, ['caption', 'content', 'text', 'description', 'body', 'post']);
        const finalImagePrompt = findField(parsedContent, ['imagePrompt', 'visual_hint', 'prompt', 'image_prompt', 'visual']);

        console.log(`[Social API] Mapped fields -> Caption: ${!!finalCaption}, ImagePrompt: ${!!finalImagePrompt}`);

        if (!finalCaption) {
          console.error(`[Social API] AI response missing usable content:`, parsedContent);
          return NextResponse.json({ error: "AI response missing post content", raw: parsedContent }, { status: 422 });
        }

        // --- BASE64 TO FILE STORAGE LOGIC ---
        let finalImageUrl = imageUrl;
        if (imageUrl && imageUrl.startsWith('data:image')) {
          try {
            const base64Data = imageUrl.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            const fileName = `social-${postId || crypto.randomUUID()}.png`;
            const uploadDir = join(process.cwd(), 'public', 'uploads', 'social');
            
            // Ensure directory exists
            await mkdir(uploadDir, { recursive: true });
            
            const filePath = join(uploadDir, fileName);
            await writeFile(filePath, buffer);
            
            // Set the final URL to the public path
            finalImageUrl = `/uploads/social/${fileName}`;
            console.log(`[Social API] Image saved to file: ${finalImageUrl}`);
          } catch (fsError) {
            console.error("[Social API] Failed to save base64 image to file:", fsError);
            // Fallback to original imageUrl if file save fails
          }
        }
        // -------------------------------------

        const updatedPost = await prisma.socialPost.update({
          where: { id: postId },
          data: {
            content: finalCaption,
            imagePrompt: finalImagePrompt || enhancedPrompt,
            imageUrl: finalImageUrl,
            status: "PENDING_APPROVAL"
          }
        });

        console.log(`[Social API] Successfully generated and saved post ${postId}.`);
        return NextResponse.json(updatedPost);
      } catch (dbError: any) {
        console.error(`[Social API] Database Update Error for post ${postId}:`, dbError);
        throw dbError; // Bubble up to main try-catch
      }
    }

    // 3. Update a post (Edit)
    if (action === "UPDATE_POST") {
      const { content, imageUrl, imagePrompt, platform } = body;
      return NextResponse.json(await prisma.socialPost.update({
        where: { id: postId },
        data: { 
          content, 
          imageUrl, 
          imagePrompt, 
          ...(platform && { platform }),
          status: "PENDING_APPROVAL" 
        }
      }));
    }

    // 4. Approve
    if (action === "APPROVE_POST") {
      return NextResponse.json(await prisma.socialPost.update({
        where: { id: postId },
        data: { 
          status: "APPROVED" 
        }
      }));
    }

    // 5. Save Manual Roadmap
    if (action === "SAVE_MANUAL_ROADMAP") {
      const { posts, defaultPostingTime } = body;
      
      const roadmap = await prisma.socialRoadmap.create({
        data: {
          topic,
          strategy: "Manuel Planlama",
          startDate: new Date(),
          endDate: new Date(Date.now() + (posts.length * 24 * 60 * 60 * 1000)),
          posts: {
            create: posts.map((p: any) => {
              const scheduledDate = new Date(`${p.date}T${p.time || defaultPostingTime || "18:00"}:00`);
              
              return {
                platform: p.platform as SocialPlatform,
                content: p.topic, // Will be generated if not instant, or acts as brief
                imagePrompt: p.visual_hint,
                scheduledAt: scheduledDate,
                status: "DRAFT"
              };
            })
          }
        },
        include: { posts: true }
      });

      return NextResponse.json(roadmap);
    }

    // 6. Save Settings (Unified Logic)
    if (action === "SAVE_SETTINGS") {
      const { 
        defaultHashtags, 
        advancedImagePrompt,
        key,
        value 
      } = body;

      // Handle both structured and key-value formats
      const updates = [];
      
      if (defaultHashtags !== undefined) {
        updates.push(prisma.settings.upsert({
          where: { key: 'defaultHashtags' },
          update: { value: defaultHashtags },
          create: { key: 'defaultHashtags', value: defaultHashtags }
        }));
      }
      
      if (advancedImagePrompt !== undefined) {
        updates.push(prisma.settings.upsert({
          where: { key: 'advancedImagePrompt' },
          update: { value: advancedImagePrompt },
          create: { key: 'advancedImagePrompt', value: advancedImagePrompt }
        }));
      }

      if (key && value !== undefined) {
        updates.push(prisma.settings.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        }));
      }

      await Promise.all(updates);
      return NextResponse.json({ success: true });
    }

    // 8. Generate Hashtags (AI)
    if (action === "GENERATE_HASHTAGS") {
      const { content: postContent } = body;
      if (!postContent) return NextResponse.json({ error: "İçerik gerekli" }, { status: 400 });

      try {
        console.log(`[Social API] Generating hashtags for content length: ${postContent.length}`);
        const hashtags = await generateHashtags(postContent);
        
        if (!hashtags) {
          return NextResponse.json({ error: "Hashtag üretilemedi, lütfen tekrar deneyin." }, { status: 500 });
        }
        
        return NextResponse.json({ hashtags });
      } catch (error: any) {
        console.error("[Social API] Hashtag Error:", error);
        return NextResponse.json({ error: error.message || "Hashtag üretimi sırasında bir hata oluştu." }, { status: 500 });
      }
    }

    // 9. Generate Image Only (Premium)
    if (action === "GENERATE_IMAGE_ONLY") {
      const { prompt: imagePrompt, postId } = body;
      if (!imagePrompt) return NextResponse.json({ error: "Prompt gerekli" }, { status: 400 });

      console.log(`[Social API] Generating Premium Image for post ${postId || 'manual'}...`);
      const orImage = await generateImage(imagePrompt);
      
      if (orImage.success && orImage.url) {
        // If postId provided, update DB
        if (postId) {
          await prisma.socialPost.update({
            where: { id: postId },
            data: { imageUrl: orImage.url }
          });
        }
        return NextResponse.json({ imageUrl: orImage.url });
      } else {
        return NextResponse.json({ error: orImage.error || "Görsel üretilemedi" }, { status: 500 });
      }
    }

    // 10. Delete Post
    if (action === "DELETE_POST") {
      await prisma.socialPost.delete({ where: { id: postId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error: any) {
    console.error("[Social API] Critical Error:", error);
    // Return detailed error for debugging if in development
    return NextResponse.json({ 
      error: error.message || "Internal Server Error",
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      action: body?.action || "UNKNOWN"
    }, { status: 500 });
  }
}
