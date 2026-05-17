import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const missingCountries = [
        {
            name: "Malta",
            slug: "malta",
            image: "https://images.unsplash.com/photo-1543783232-f79f98278358?q=80&w=2070",
            language: "İngilizce, Maltaca",
            currency: "EUR (€)",
            capital: "Valletta",
            isFeatured: true,
            active: true,
            shortDesc: "Akdeniz'in kalbinde İngilizce eğitimi ve tatilin buluştuğu nokta.",
            overview: "Malta, yıl boyu süren güneşi, kristal berraklığındaki denizi ve uygun maliyetli İngilizce dil okullarıyla öğrenciler için vazgeçilmez bir destinasyondur."
        },
        {
            name: "İspanya",
            slug: "ispanya",
            image: "https://images.unsplash.com/photo-1543783232-f79f98278358?q=80&w=2070", // Replace with real one later
            language: "İspanyolca",
            currency: "EUR (€)",
            capital: "Madrid",
            isFeatured: true,
            active: true,
            shortDesc: "Kültür, sanat ve köklü üniversitelerle dolu bir Avrupa deneyimi.",
            overview: "İspanya, hem dil eğitimi hem de yüksek lisans programları için zengin seçenekler sunar."
        }
    ];

    for (const country of missingCountries) {
        await prisma.country.upsert({
            where: { slug: country.slug },
            update: country,
            create: country
        });
        console.log(`Added/Updated country: ${country.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
