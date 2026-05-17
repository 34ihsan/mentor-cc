# Mentor Career Consulting: Profesyonel Yapay Zeka Entegrasyon Kılavuzu

Bu kılavuz, Mentor Career Consulting admin panelindeki çeşitli CMS alanlarında (Blog, Kurumlar, Programlar) yapay zekayı nasıl profesyonel seviyede kullanabileceğinizi açıklar.

## 1. Temel Altyapı (`@/lib/openrouter`)

Tüm AI işlemleri `src/lib/openrouter.ts` üzerinden yürütülür. Bu kütüphane otomatik "Fallback" (yedek model) mekanizmasına sahiptir. Eğer ana model (Gemini-2.0) kota aşımına uğrarsa, otomatik olarak ücretsiz yedek modellere geçer.

### Kullanılabilir Fonksiyonlar:
- `generateContent(prompt, systemPrompt)`: Genel amaçlı metin üretimi.
- `generateBlogPost(topic)`: SEO uyumlu, HTML formatlı blog yazısı.
- `extractInstitutionInfo(name, url)`: Web sitesinden kurum verisi toplama.
- `generateSocialRoadmap(topic)`: Sosyal medya stratejisi (JSON).

---

## 2. Mevcut Entegrasyon Örnekleri

### A. Blog Yazısı Oluşturma
Blog sayfasında bir başlık girip "Yapay Zeka" butonuna bastığınızda arka planda şu işlem döner:
```typescript
import { generateBlogPost } from "@/lib/openrouter";

const res = await generateBlogPost("Almanya'da Tıp Eğitimi");
if (res.success) {
   // res.content -> { title, excerpt, content, keywords }
}
```

### B. Kurum Bilgilerini Otomatik Doldurma (Harvester)
Yeni bir üniversite eklerken sadece adını ve web sitesini yazarak tüm detayları AI'ya buldurabilirsiniz:
```typescript
import { extractInstitutionInfo } from "@/lib/openrouter";

const res = await extractInstitutionInfo("TUM", "https://tum.de", "University");
// AI; açıklama, dünya sıralaması, şehir ve stats verilerini JSON olarak döner.
```

---

## 3. Yeni Bir CMS Alanına AI Desteği Ekleme (Pro Seviye)

Diyelim ki "Hizmetler" bölümüne bir AI butonu eklemek istiyorsunuz. İzlemeniz gereken adımlar:

1. **Server Action Oluşturun**: `src/app/actions/service-actions.ts`
```typescript
"use server";
import { generateContent } from "@/lib/openrouter";

export async function suggestServiceDescriptionAction(serviceName: string) {
    const prompt = `${serviceName} adlı danışmanlık hizmetimiz için profesyonel, güven veren bir tanıtım metni yaz.`;
    return await generateContent(prompt);
}
```

2. **Frontend Entegrasyonu**:
```tsx
const handleAISuggest = async () => {
    setIsLoading(true);
    const res = await suggestServiceDescriptionAction(formData.name);
    if (res.success) {
        setFormData({ ...formData, description: res.content });
    }
    setIsLoading(false);
};
```

---

## 4. İleri Seviye: Görsel Üretimi

Sosyal medya bölümünde olduğu gibi, metinden görsel üretmek için `Pollinations.ai` (Flux modeli) kullanıyoruz:
```typescript
const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1080&height=1350&model=flux`;
```
*Profesyonel İpucu:* Görsel promptlarını her zaman İngilizce olarak AI'ya yazdırın ve ardından bu URL'e gönderin.

---

## 5. Dikkat Edilmesi Gerekenler
- **JSON Parsing**: AI her zaman temiz JSON dönmeyebilir. `openrouter.ts` içindeki `match(/\{[\s\S]*\}/)` mantığını kullanarak JSON'ı ayıklayın.
- **Dil**: Tüm sistem mesajları (systemPrompt) AI'ya ne yapacağını, kullanıcı mesajları (prompt) ise konuyu söyler.
- **Hız**: Karmaşık görevler (Blog yazma gibi) 10-15 saniye sürebilir, her zaman bir "loading" state kullanın.
