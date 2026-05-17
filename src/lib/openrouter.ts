/**
 * OpenRouter AI Integration for Mentor Career
 * Provides unified access to Gemini and other models via OpenRouter.
 */

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mentor-cc.com';
const SITE_NAME = 'Mentor Career';

export interface AIResponse {
  content: string;
  success: boolean;
  error?: string;
}

/**
 * Default fallback models - fast models first to minimize total wait time.
 * Priority: speed > quality for user-facing generation.
 */
const DEFAULT_MODELS = [
  'google/gemini-2.5-flash',          // ~1s, extremely fast, smart
  'google/gemini-3.1-flash-lite',     // ~1s, very fast preview model
  'google/gemma-3-12b-it:free',       // free tier, fast
  'qwen/qwen3.6-flash',               // fast flash variant
  'deepseek/deepseek-v4-flash',       // fast flash variant
  'google/gemma-4-26b-a4b-it:free',   // free tier
  'meta-llama/llama-3.3-70b-instruct:free', // free tier fallback
  'openrouter/auto'                   // last resort
];

/**
 * Premium Image Models for Social Media & CMS
 */
const IMAGE_MODELS = [
  'black-forest-labs/flux.2-pro',
  'black-forest-labs/flux.2-max',
  'sourceful/riverflow-v2-standard-preview',
  'black-forest-labs/flux.2-flex',
  'openai/dall-e-3',
  'google/gemini-2.5-flash-image',
  'sourceful/riverflow-v2-fast',
  'black-forest-labs/flux.2-klein-4b'
];

/**
 * Advanced Prompt Suffix for High-Quality Images
 * Ensures every generated image has a premium, professional look.
 */
const ADVANCED_IMAGE_STYLE = "professional photography, hyper-realistic, 8k resolution, cinematic lighting, shot on 35mm lens, f/1.8, sharp focus, vibrant colors, premium aesthetic, shallow depth of field, highly detailed textures, masterfully composed, award-winning composition, no distortion, clean background.";

/**
 * Ensures any image prompt has the premium quality suffix.
 */
export function enhanceImagePrompt(prompt: string, customSuffix?: string): string {
  const suffix = customSuffix || ADVANCED_IMAGE_STYLE;
  if (!prompt) return `A professional and aspirational scene representing study abroad, ${suffix}`;
  if (prompt.includes("8k") || prompt.includes("hyper-realistic")) return prompt;
  return `${prompt.trim()}, ${suffix}`;
}

/**
 * Gets the list of models to use, prioritizing .env configuration if available.
 */
function getModelList(requestedModel?: string): string[] {
  const envModels = (process.env.OPENROUTER_MODEL_SEQUENCE || process.env.OPENROUTER_MODELS)
    ? (process.env.OPENROUTER_MODEL_SEQUENCE || process.env.OPENROUTER_MODELS)!.split(',').map(m => m.trim()) 
    : [];
  
  const baseList = envModels.length > 0 ? envModels : DEFAULT_MODELS;
  
  if (requestedModel) {
    return [requestedModel, ...baseList.filter(m => m !== requestedModel)];
  }
  
  return baseList;
}

/**
 * Core text generation function using OpenRouter with Fallback Mechanism
 */
export async function generateContent(
  prompt: string, 
  systemPrompt: string = "Sen Mentor Career için çalışan uzman bir eğitim danışmanı ve içerik üreticisisin.",
  model?: string
): Promise<AIResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return { content: '', success: false, error: 'OPENROUTER_API_KEY is not configured.' };
  }

  // Get models prioritized by .env or defaults, with optional requested model at top
  const modelsToTry = getModelList(model);
  
  let lastError = '';

  for (const currentModel of modelsToTry) {
    try {
      console.log(`AI Attempting with model: ${currentModel}`);
      
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json"
        },
        signal: AbortSignal.timeout(20000), // 20s per model
        body: JSON.stringify({
          "model": currentModel,
          "messages": [
            { "role": "system", "content": systemPrompt },
            { "role": "user", "content": prompt }
          ],
          "temperature": 0.7,
          "max_tokens": 4000
        })
      });

      if (!response.ok) {
        let errorMessage = response.statusText;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
        }
        
        console.warn(`Model ${currentModel} failed with status ${response.status}: ${errorMessage}`);

        // If it's a quota error or rate limit, continue to next model
        if (response.status === 429 || response.status === 402 || errorMessage.toLowerCase().includes('quota') || errorMessage.toLowerCase().includes('limit') || response.status >= 500) {
          lastError = errorMessage;
          continue; 
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (!data || !data.choices || data.choices.length === 0) {
        throw new Error("OpenRouter returned an empty response (no choices).");
      }
      const content = data.choices[0]?.message?.content || '';

      return { content, success: true };
    } catch (error: any) {
      console.error(`Error with model ${currentModel}:`, error.message);
      lastError = error.message;
      // If it's not a quota error, we might want to stop, but for reliability we try all fallbacks
      continue;
    }
  }

  return { content: '', success: false, error: `All models failed. Last error: ${lastError}` };
}


/**
 * Specialized function to extract institution info from a website (via Gemini's knowledge)
 */
export async function extractInstitutionInfo(name: string, website: string, category: string): Promise<AIResponse> {
  const systemPrompt = `Sen bir eğitim verisi uzmanısın. Verilen kurum ismi ve web sitesine dayanarak, kurum hakkında detaylı ve doğru bilgiler üretmelisin. 
  Cevabını MUTLAKA şu JSON formatında ver:
  {
    "description": "Kısa özet",
    "content": "Detaylı HTML formatında tanıtım yazısı",
    "city": "Şehir",
    "rank": "Dünya sıralaması (varsa)",
    "rating": 4.5,
    "features": ["Özellik 1", "Özellik 2"],
    "stats": {"Öğrenci Sayısı": "...", "Uluslararası Öğrenci": "..."},
    "tuition": {"Lisans": "...", "Yüksek Lisans": "..."}
  }`;

  const prompt = `Kurum Adı: ${name}
  Web Sitesi: ${website}
  Kategori: ${category}
  
  Lütfen bu kurum hakkında en güncel ve profesyonel bilgileri hazırla. Dil Türkçe olmalıdır.`;

  return generateContent(prompt, systemPrompt);
}

/**
 * Specialized function to generate professional hashtags
 */
export async function generateHashtags(topicOrContent: string): Promise<string> {
  const systemPrompt = "Sen profesyonel bir sosyal medya uzmanısın. Verilen metne uygun, en popüler ve etkileşim getirecek 15-20 adet hashtag üret. Sadece hashtagleri aralarında boşluk bırakarak döndür. Başka metin ekleme.";
  const prompt = `Metin: ${topicOrContent}`;
  
  const response = await generateContent(prompt, systemPrompt);
  return response.success ? response.content.trim() : "";
}

/**
 * Specialized function for blog generation
 */
export async function generateBlogPost(topic: string, keywords?: string): Promise<AIResponse> {
  const systemPrompt = `Sen Mentor Career & Star Education için çalışan kıdemli bir Eğitim Editörü ve SEO Uzmanısın.
  Görevin, yurt dışı eğitim ve kariyer danışmanlığı konularında son derece kapsamlı (en az 800-1200 kelime), derinlikli (geniş yönleriyle ele alan), profesyonel ve premium blog yazıları yazmaktır.

  İÇERİK KURALLARI:
  1. Derinlik: Konuyu sadece genel hatlarıyla değil; başvuru şartları, maliyetler, burs olanakları, kariyer fırsatları gibi geniş yönleriyle ve pratik tavsiyelerle ele al.
  2. Başlıklar: Hiyerarşik HTML etiketleri (<h2>, <h3>) kullan. <h1> kullanma (yazı başlığı otomatik ekleniyor).
  3. Biçimlendirme: Okumayı kolaylaştırmak için paragraflar (<p>), listeler (<ul><li>), önemli vurgular (<strong>) ve açıklayıcı tablolar/listeler kullan.
  4. Ton: Güven veren, kurumsal, son derece bilgili ve premium bir üslup benimse.

  STRATEJİK SİTE İÇİ LİNKLER:
  Metin içinde en alakalı yerlerde, okuyucunun ilgisini çekecek şekilde aşağıdaki iç sayfalarımıza DOĞAL HTML linkleri yerleştir. Her yazıda en az 2-4 adet site içi link bulunmalıdır. Linkler mutlaka şu formatta olmalıdır: <a href="LİNK" class="text-primary hover:underline font-semibold">Anahtar Kelime</a>
  
  Kullanabileceğin Geçerli Link Listesi:
  - Yurtdışı Üniversite Lisans Eğitimi için: "/yurtdisi-universite" (Örn: "...prestijli bir <a href=\"/yurtdisi-universite\" class=\"text-primary hover:underline font-semibold\">yurtdışı üniversite eğitimi</a> alarak...")
  - Yurtdışı Yüksek Lisans / Master için: "/yurtdisi-yuksek-lisans" (Örn: "...kariyerinizi zirveye taşıyacak <a href=\"/yurtdisi-yuksek-lisans\" class=\"text-primary hover:underline font-semibold\">yurtdışı yüksek lisans</a> programları...")
  - Yurtdışı Lise için: "/yurtdisi-lise" (Örn: "...erken yaşta global vizyon kazandıran <a href=\"/yurtdisi-lise\" class=\"text-primary hover:underline font-semibold\">yurtdışı lise</a> alternatifleri...")
  - Dil Okulları için: "/yurtdisi-dil-okullari" (Örn: "...dil becerilerinizi yerinde geliştirebileceğiniz <a href=\"/yurtdisi-dil-okullari\" class=\"text-primary hover:underline font-semibold\">yurtdışı dil okulları</a>...")
  - Yaz Okulları için: "/yurtdisi-yaz-okullari" (Örn: "...akademik ve sosyal gelişimi birleştiren <a href=\"/yurtdisi-yaz-okullari\" class=\"text-primary hover:underline font-semibold\">yurtdışı yaz okulları</a>...")
  - IELTS, TOEFL, SAT, GRE, GMAT Sınav Hazırlığı için: "/sinavlar" (Örn: "...başvurularda altın anahtar olan <a href=\"/sinavlar\" class=\"text-primary hover:underline font-semibold\">sınav hazırlık programları</a>...")
  - Yurtdışı Mesleki Eğitim (Ausbildung) ve Uluslararası Kariyer için: "/career" (Örn: "...global pazarda öne çıkmanızı sağlayacak <a href=\"/career\" class=\"text-primary hover:underline font-semibold\">uluslararası kariyer danışmanlığı</a>...")
  - İletişim / Randevu için: "/iletisim" (Örn: "...size özel yol haritasını çizmek için <a href=\"/iletisim\" class=\"text-primary hover:underline font-semibold\">bizimle iletişime geçin</a>.")

  Cevabını MUTLAKA şu JSON formatında ver:
  {
    "title": "SEO uyumlu, çarpıcı başlık",
    "excerpt": "Yazının okuyucuyu yakalayan kısa özeti (yaklaşık 150-180 karakter)",
    "content": "HTML formatında yukarıdaki tüm kurallara uygun detaylı blog içeriği",
    "keywords": "virgülle ayrılmış 5-8 adet anahtar kelime"
  }`;

  const prompt = `Konu: ${topic}
  ${keywords ? `Anahtar Kelimeler: ${keywords}` : ''}
  
  Lütfen yukarıdaki eğitim ve kariyer hedeflerine uygun, site içi linkler barındıran, zengin ve kusursuz bir blog yazısı hazırla. Dil tamamen Türkçe olmalıdır.`;

  return generateContent(prompt, systemPrompt);
}

/**
 * Generates a social media roadmap (strategy + post ideas)
 */
export async function generateSocialRoadmap(topic: string, count: number = 7): Promise<AIResponse> {
  const systemPrompt = `Sen bir Kıdemli Sosyal Medya Stratejistisin. Mentor Career markası (Başta Almanya olmak üzere Avrupa, Amerika, Kanada gibi ülkelerde eğitim ve kariyer danışmanlığı) için profesyonel, veri odaklı ve ajans kalitesinde bir yol haritası oluşturmalısın.
  Hedef Kitle: Yurtdışında üniversite/master eğitimi almak isteyen Türk öğrenciler ve onların velileri.
  Görev: Platforma özel içerik stratejisi kurmak (Örn: LinkedIn için vizyon/kariyer, Instagram için başarı hikayeleri/kampüs hayatı).
  Cevabını MUTLAKA şu JSON formatında (bir dizi/array olarak) ver:
  [
    {
      "day": 1,
      "topic": "Post konusu",
      "brief": "Post içeriği için kısa özet",
      "visual_hint": "Görsel için detaylı İngilizce prompt. Eğer konu soyut ise (başarı, kariyer vb.), bunu görsel bir hikayeye dönüştür (örn: Berlin'de gün batımında geleceğe bakan bir öğrenci). Daima şu teknik detayları içermeli: ${ADVANCED_IMAGE_STYLE}",
      "platforms": ["INSTAGRAM", "LINKEDIN"]
    }
  ]`;

  const prompt = `Konu: ${topic}
  Süre: ${count} adet post önerisi hazırla.
  Lütfen hedef kitleyi (Türk öğrenciler ve aileleri) harekete geçirecek, onlara güven verecek ve profesyonelliği yansıtacak detaylı bir strateji planı hazırla. Dil tamamen Türkçe olmalı ve Türkçe karakterler eksiksiz kullanılmalıdır.`;

  return generateContent(prompt, systemPrompt);
}

/**
 * Generates final content for a specific social media post
 */
export async function generateSocialPostContent(platform: string, context: string): Promise<AIResponse> {
  const systemPrompt = `Sen Mentor Career ajansı için çalışan usta bir Metin Yazarı ve Sosyal Medya Uzmanısın.
  Görevin, yurtdışına eğitime gitmek isteyen Türk gençler için ikna edici içerikler üretmektir.
  Cevabını şu JSON formatında ver:
  {
    "caption": "Hazır post metni. Metin içine platforma uygun emojiler ekle. Metnin sonuna MUTLAKA konuyla alakalı en az 10-15 adet profesyonel hashtag ekle (Örn: #yurtdisiegitim #mentorcareer). En alta şu linkleri ekle: www.mentor-cc.com ve instagram.com/mentorcareer",
    "imagePrompt": "Görsel üretim motoru için ultra-detaylı İngilizce prompt. Aspirational, profesyonel çekim kalitesinde, yurtdışı eğitim hayalini yansıtan premium bir sahne. Sonuna şunu ekle: ${ADVANCED_IMAGE_STYLE}"
  }`;

  const prompt = `Post Bağlamı/Konusu: ${context}
  Platform: ${platform}
  
  Lütfen platformun dinamiklerine en uygun, vurucu ve profesyonel Türkçe içeriği (METNİN SONUNA HASHTAGLERİ EKLEYEREK) hazırla.`;

  return generateContent(prompt, systemPrompt);
}
/**
 * Core image generation function using OpenRouter with Fallback Mechanism
 */
export async function generateImage(prompt: string, model?: string): Promise<{ url: string; success: boolean; error?: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return { url: '', success: false, error: 'OPENROUTER_API_KEY is not configured.' };
  }

  // Get image models prioritized by .env or defaults
  const envModels = process.env.OPENROUTER_IMAGE_SEQUENCE 
    ? process.env.OPENROUTER_IMAGE_SEQUENCE.split(',').map(m => m.trim()) 
    : (process.env.OPENROUTER_IMAGE_MODEL ? [process.env.OPENROUTER_IMAGE_MODEL] : []);
  
  // Combine env models with our hardcoded fallbacks, removing duplicates
  const modelsToTry = Array.from(new Set([...envModels, ...IMAGE_MODELS]));
  if (model) modelsToTry.unshift(model);

  let lastError = '';

  for (const currentModel of modelsToTry) {
    try {
      console.log(`[Image Debug] Trying model: ${currentModel} at ${new Date().toLocaleTimeString()}`);
      
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json"
        },
        signal: AbortSignal.timeout(45000), // Increased for ultra-quality: 45s
        body: JSON.stringify({
          "model": currentModel,
          "messages": [
            { "role": "user", "content": prompt }
          ],
          "modalities": ["image"]
        })
      });

      if (!response.ok) {
        let errorMessage = response.statusText;
        try {
          const errData = await response.json();
          errorMessage = errData.error?.message || errorMessage;
          console.error(`[OpenRouter Image] Error with model ${currentModel}:`, errData);
        } catch (e) {
          console.error(`[OpenRouter Image] Non-JSON error from ${currentModel}:`, errorMessage);
        }
        lastError = errorMessage;
        continue;
      }

      const data = await response.json();
      if (!data || !data.choices || data.choices.length === 0) {
        console.error(`[OpenRouter Image] No choices in response from ${currentModel}:`, data);
        continue;
      }

      let imageUrl = data.choices[0]?.message?.content?.trim() || 
                       data.choices[0]?.message?.images?.[0];

      // Normalize object structure if present (OpenRouter/OpenAI format)
      if (typeof imageUrl === 'object' && imageUrl !== null) {
        if (imageUrl.url) {
          imageUrl = imageUrl.url;
        } else if (imageUrl.image_url && typeof imageUrl.image_url === 'object') {
          imageUrl = imageUrl.image_url.url;
        } else if (imageUrl.type === 'image_url' && imageUrl.image_url?.url) {
          imageUrl = imageUrl.image_url.url;
        }
      }

      if (!imageUrl || typeof imageUrl !== 'string') {
        console.warn(`Model ${currentModel} returned invalid image format:`, imageUrl);
        lastError = "Invalid image format in response";
        continue;
      }

      return { url: imageUrl, success: true };
    } catch (error: any) {
      console.error(`Error with image model ${currentModel}:`, error.message);
      lastError = error.message;
      continue;
    }
  }

  return { url: '', success: false, error: `All image models failed. Last error: ${lastError}` };
}
