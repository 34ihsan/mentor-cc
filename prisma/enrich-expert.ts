import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const institutions = await prisma.institution.findMany({
        include: {
            programs: true,
            country: true
        }
    });

    console.log(`Enriching ${institutions.length} institutions with expert data...`);

    for (const inst of institutions) {
        const countrySlug = inst.country?.slug || 'almanya';
        const category = inst.programs[0]?.category || 'UNIVERSITY';
        
        let metadata: any = {};
        try {
            metadata = inst.metadata ? JSON.parse(inst.metadata as string) : {};
        } catch (e) {
            metadata = {};
        }

        // --- Expert Content Logic ---
        let aboutText = "";
        let admissionRequirements: string[] = [];
        let requiredDocuments: string[] = [
            "Güncel Pasaport Fotokopisi",
            "Biyometrik Fotoğraf",
            "Özgeçmiş (CV) - Akademik Format",
            "Motivasyon Mektubu (Personal Statement)"
        ];
        let tuitionFees = { undergraduate: "", graduate: "" };
        let livingExpenses = [
            { label: "Konaklama", value: "450€ - 800€ / Ay" },
            { label: "Beslenme & Sosyal", value: "300€ - 400€ / Ay" },
            { label: "Sağlık Sigortası", value: "110€ / Ay" }
        ];

        if (category === 'UNIVERSITY') {
            if (countrySlug === 'almanya') {
                aboutText = `<strong>${inst.name}</strong>, Almanya'nın "Excellence University" statüsündeki elit kurumlarından biridir. Mühendislik ve temel bilimlerde dünyanın en iyi 50 kurumu arasında yer alan kurum, sanayi devleri ile olan doğrudan iş birlikleriyle tanınır.`;
                admissionRequirements = [
                    "Not Ortalaması (GPA): 2.5 / 4.0 ve üzeri",
                    "İngilizce: IELTS 6.5 / TOEFL 88+",
                    "Almanca (Varsa): TestDaF 4x4",
                    "Akademik Motivasyon Mektubu"
                ];
                tuitionFees = { undergraduate: "0€ (Ücretsiz)", graduate: "0€ (Ücretsiz)" };
                livingExpenses = [
                    { label: "Bloke Hesap", value: "11.208€ / Yıl" },
                    { label: "Ortalama Yaşam", value: "900€ - 1.200€ / Ay" }
                ];
            } else if (countrySlug === 'fransa') {
                aboutText = `<strong>${inst.name}</strong>, Fransa'nın akademik mükemmeliyet sembolüdür. Paris'in tarihi dokusuyla modern araştırma imkanlarını birleştiren kurum, Avrupa'nın entelektüel gelişimine yön vermektedir. Sanat ve bilimde dünya lideridir.`;
                admissionRequirements = [
                    "Not Ortalaması (GPA): 3.0 / 4.0 ve üzeri",
                    "Fransızca: DELF B2 (Bölüme göre)",
                    "İngilizce: IELTS 6.5 - 7.0",
                    "Akademik Referans Mektupları"
                ];
                tuitionFees = { undergraduate: "2,770€ / Yıl (AB Dışı)", graduate: "3,770€ / Yıl (AB Dışı)" };
            } else if (['ingiltere', 'amerika', 'kanada', 'avustralya'].includes(countrySlug)) {
                aboutText = `<strong>${inst.name}</strong>, global eğitim arenasının zirvesinde, yüzyıllara dayanan akademik mirası modern inovasyonla birleştiren bir liderdir. Araştırma odaklı eğitim modeliyle dünya çapında tanınmaktadır.`;
                admissionRequirements = [
                    "Yüksek Not Ortalaması (GPA): 3.0 / 4.0",
                    "IELTS 7.0 / TOEFL 100+",
                    "Referans Mektupları",
                    "Portfolyo (Bölüme göre)"
                ];
                tuitionFees = { 
                    undergraduate: countrySlug === 'ingiltere' ? "£18,000 - £35,000 / Yıl" : "$25,000 - $55,000 / Yıl", 
                    graduate: countrySlug === 'ingiltere' ? "£20,000 - £45,000 / Yıl" : "$30,000 - $60,000 / Yıl" 
                };
            } else {
                aboutText = `<strong>${inst.name}</strong>, bulunduğu bölgenin en prestijli eğitim kurumlarından biridir. Uluslararası tanınırlığı yüksek olan kurum, öğrencilerine çok kültürlü bir ortamda dünya standartlarında eğitim sunar.`;
                admissionRequirements = [
                    "Not Ortalaması: 2.5 / 4.0",
                    "Dil Yeterlilik: IELTS 6.0+",
                    "Başvuru Belgeleri"
                ];
                tuitionFees = { undergraduate: "2,000€ - 12,000€ / Yıl", graduate: "3,000€ - 15,000€ / Yıl" };
            }
        } else {
            aboutText = `<strong>${inst.name}</strong>, kaliteli eğitim ve zengin sosyal imkanlar sunan bir kurumdur. Öğrencilerin global yetkinliklerini geliştirmeyi hedefler.`;
            admissionRequirements = ["Başvuru Formu", "Dil Belgesi"];
        }

        // Apply shared expert data
        metadata.aboutText = aboutText;
        metadata.admissionRequirements = admissionRequirements;
        metadata.requiredDocuments = requiredDocuments;
        metadata.tuitionFees = tuitionFees;
        metadata.livingExpenses = livingExpenses;

        // Update the record
        await prisma.institution.update({
            where: { id: inst.id },
            data: {
                description: aboutText.replace(/<[^>]*>/g, '').substring(0, 500),
                metadata: JSON.stringify(metadata)
            }
        });
    }

    console.log("All institutions have been enriched with Corrected Content using Slugs!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
