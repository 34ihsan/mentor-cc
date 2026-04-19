import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🚀 Starting Hero Slides synchronization with NEW images...");

    // 1. Clear existing slides for home page
    console.log("🗑️ Clearing existing home page hero slides...");
    await prisma.heroSlide.deleteMany({
        where: { pageContext: 'home' }
    });

    // 2. Define the exact 6 slides using the NEW specific filenames
    const slides = [
        {
            title: "Yurtdışı Üniversite Eğitimi",
            subtitle: "Dünyanın en prestijli üniversitelerinde lisans eğitimi alarak global bir kariyere ilk adımı atın.",
            imageUrl: "/images/hero/Üniversite.png",
            pageContext: "home",
            order: 0,
            active: true
        },
        {
            title: "Yüksek Lisans ve Master",
            subtitle: "Uzmanlaşın ve fark yaratın. Avrupa ve Amerika'da saygın yüksek lisans programları ile kariyerinizi zirveye taşıyın.",
            imageUrl: "/images/hero/Yüksek Lisans.png",
            pageContext: "home",
            order: 1,
            active: true
        },
        {
            title: "Dil Okulları ve Dil Eğitimi",
            subtitle: "İngilizce, Almanca ve daha fazlası. Dilinizi yerinde, en iyi dil okullarında deneyimleyerek öğrenin.",
            imageUrl: "/images/hero/Dil Okulları.png",
            pageContext: "home",
            order: 2,
            active: true
        },
        {
            title: "Yurtdışı Lise Eğitimi",
            subtitle: "Erken yaşta global vizyon edinin. Uluslararası standartlarda lise eğitimi ile üniversite kapılarını aralayın.",
            imageUrl: "/images/hero/Ydisi Lise.png",
            pageContext: "home",
            order: 3,
            active: true
        },
        {
            title: "Yurtdışı Yaz Okulları",
            subtitle: "Eğlenceli, öğretici ve unutulmaz bir yaz tatili. Çocuklar ve gençler için tasarlanmış global kamp programları.",
            imageUrl: "/images/hero/Yaz Okulları.png",
            pageContext: "home",
            order: 4,
            active: true
        },
        {
            title: "Kariyer ve Mesleki Gelişim",
            subtitle: "Global iş dünyasında fark yaratın. Mesleki becerilerinizi uluslararası sertifika ve eğitim programları ile güçlendirin.",
            imageUrl: "/images/hero/kariyer.png",
            pageContext: "home",
            order: 5,
            active: true
        }
    ];

    console.log("💾 Creating 6 unique hero slides with updated images...");
    for (const slide of slides) {
        await prisma.heroSlide.create({
            data: slide
        });
        console.log(`✅ Created: ${slide.title} -> ${slide.imageUrl}`);
    }

    console.log("✨ Synchronization completed successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Error syncing slides:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
