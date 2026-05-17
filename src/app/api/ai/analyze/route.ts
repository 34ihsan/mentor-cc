import { NextRequest, NextResponse } from "next/server";
import { askAI } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { gpa, country, degree, english } = body;

    const prompt = `
      Sen bir yurt dışı eğitim danışmanısın. Bir öğrencinin şu bilgilerine dayanarak bir analiz yap:
      GPA: ${gpa}
      Hedef Ülke: ${country}
      Derece: ${degree}
      İngilizce Seviyesi: ${english}

      Lütfen şu formatta bir JSON yanıt dön (SADECE JSON, başka metin olmasın):
      {
        "score": 70-98 arası bir sayı,
        "text": "Kısa bir analiz metni (Türkçe)",
        "universities": ["Önerilen 3 üniversite adı"]
      }
    `;

    const response = await askAI(
      prompt,
      "fast", // Use gemini-2.0-flash for speed and cost-efficiency
      "Sen profesyonel bir eğitim danışmanısın. Sadece JSON formatında yanıt verirsin."
    );

    // Parse the JSON from the AI response
    // Sometimes AI adds markdown code blocks, so we clean it
    const cleanContent = response.content.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleanContent);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: "Analiz sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
