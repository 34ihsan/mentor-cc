import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const countries = await prisma.country.findMany();
    const services = await prisma.service.findMany();
    
    const getCountryId = (slug: string) => countries.find(c => c.slug === slug)?.id;
    const getServiceId = (slug: string) => services.find(s => s.slug === slug)?.id;

    const categoryToServiceSlug: Record<string, string> = {
        'UNIVERSITY': 'yurtdisi-universite',
        'LANGUAGE_SCHOOL': 'yurtdisi-dil-okullari',
        'HIGH_SCHOOL': 'yurtdisi-lise',
        'SUMMER_SCHOOL': 'yurtdisi-yaz-okullari'
    };

    const institutions = [
        // --- USA (amerika) ---
        { 
            name: "Stanford University", slug: "stanford-university-usa", city: "Stanford", countrySlug: "amerika", category: "UNIVERSITY", rank: "#3", rating: 5.0, 
            image: "https://images.unsplash.com/photo-1533664488202-6af66d26c44a?auto=format&fit=crop&q=80&w=1600",
            description: "Dünyanın en prestijli teknoloji ve inovasyon üssü. Silikon Vadisi'nin kalbinde, girişimcilik ruhuyla harmanlanmış akademik mükemmeliyet.",
            features: ["Silikon Vadisi Networkü", "Girişimcilik Odaklı", "Nobel Ödüllü Akademisyenler", "Üst Düzey Kampüs İmkanları"],
            stats: { "Kabul Oranı": "%4", "Mezun Maaşı (Ort)": "$120k+", "Uluslararası Öğrenci": "%24", "Araştırma Bütçesi": "$1.6B" },
            programs: [
                { name: "Computer Science", minGpa: "3.8/4.0", lang: "IELTS 7.5 / TOEFL 100", desc: "Dünyanın en iyi bilgisayar bilimleri programı." },
                { name: "Business (MBA)", minGpa: "3.7/4.0", lang: "TOEFL 105", desc: "Küresel liderlik ve girişimcilik odaklı MBA." },
                { name: "Engineering", minGpa: "3.6/4.0", lang: "IELTS 7.0", desc: "İnovatif mühendislik çözümleri." }
            ]
        },
        { 
            name: "Columbia University", slug: "columbia-university-usa", city: "New York", countrySlug: "amerika", category: "UNIVERSITY", rank: "#12", rating: 4.8, 
            image: "https://images.unsplash.com/photo-1521406161394-2782b5e2978c?auto=format&fit=crop&q=80&w=1600",
            description: "New York'un merkezinde, Ivy League prestijiyle küresel finans ve medya dünyasına açılan kapı.",
            features: ["NYC Lokasyon Avantajı", "Ivy League Üyesi", "Global Network", "Zengin Kütüphane Arşivi"],
            stats: { "Kabul Oranı": "%6", "İstihdam Oranı": "%96", "Yıllık Burs": "$12M+" },
            programs: [
                { name: "Journalism", minGpa: "3.5/4.0", lang: "TOEFL 100", desc: "Pulitzer ödüllü gazetecilik eğitimi." },
                { name: "Finance", minGpa: "3.6/4.0", lang: "IELTS 7.5", desc: "Wall Street ile iç içe finans programı." },
                { name: "Data Science", minGpa: "3.7/4.0", lang: "IELTS 7.0", desc: "Modern veri analitiği teknikleri." }
            ]
        },
        { 
            name: "Choate Rosemary Hall", slug: "choate-usa", city: "Wallingford", countrySlug: "amerika", category: "HIGH_SCHOOL", rank: "Elite", rating: 4.9, 
            image: "https://images.unsplash.com/photo-1523050853063-bd42da695cfc?auto=format&fit=crop&q=80&w=1600",
            description: "Amerika'nın en seçkin yatılı liselerinden biri. JFK gibi liderlerin yetiştiği akademik mükemmeliyet merkezi.",
            features: ["Prestijli Mezun Ağı", "Gelişmiş Sanat Merkezi", "Üst Düzey Spor Tesisleri", "Kişiselleştirilmiş Müfredat"],
            stats: { "Sınıf Mevcudu": "12", "Ivy League Yerleşme": "%35", "Burslu Öğrenci": "%30" },
            programs: [
                { name: "High School Diploma", minGpa: "85/100", lang: "TOEFL Jr / Duolingo 120", desc: "Üniversite hazırlık odaklı lise eğitimi." },
                { name: "Science", minGpa: "90/100", lang: "IELTS 6.5", desc: "İleri düzey laboratuvar çalışmaları." }
            ]
        },

        // --- UK (ingiltere) ---
        { 
            name: "University of Cambridge", slug: "university-of-cambridge-uk", city: "Cambridge", countrySlug: "ingiltere", category: "UNIVERSITY", rank: "#2", rating: 5.0, 
            image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=1600",
            description: "800 yılı aşkın akademik miras. Dünyanın en köklü ve saygın araştırma üniversitelerinden biri.",
            features: ["Tarihi Kolej Sistemi", "Süpervizyon Eğitimi", "Dünya Çapında İtibar", "Zengin Burs İmkanları"],
            stats: { "Kabul Oranı": "%12", "Mezun Memnuniyeti": "%98", "Nobel Ödülü": "121" },
            programs: [
                { name: "Mathematics", minGpa: "3.9/4.0", lang: "IELTS 8.0", desc: "Dünyanın en zorlu ve prestijli matematik eğitimi." },
                { name: "Law", minGpa: "3.8/4.0", lang: "IELTS 7.5", desc: "Geleneksel ve modern hukuk yaklaşımları." }
            ]
        },

        // --- Germany (almanya) ---
        { 
            name: "RWTH Aachen University", slug: "rwth-aachen-germany", city: "Aachen", countrySlug: "almanya", category: "UNIVERSITY", rank: "#106", rating: 4.8, 
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600",
            description: "Avrupa'nın teknik eğitimdeki kalesi. Mühendislik ve teknoloji alanında sanayi ile en güçlü işbirliğine sahip kurum.",
            features: ["Mühendislikte Lider", "Sanayi İşbirlikleri", "TU9 Üyesi", "Düşük Eğitim Maliyeti"],
            stats: { "Öğrenci Sayısı": "45k+", "Yıllık Patent": "100+", "Uluslararası Oran": "%25" },
            programs: [
                { name: "Mechanical Engineering", minGpa: "2.5 (German Scale)", lang: "TestDaF 4x4 / IELTS 6.5", desc: "Almanya'nın en iyi makine mühendisliği programı." },
                { name: "Civil Engineering", minGpa: "2.7 (German Scale)", lang: "IELTS 6.0", desc: "Sürdürülebilir yapı teknolojileri." }
            ]
        },
        { 
            name: "Goethe-Institut Berlin", slug: "goethe-berlin-germany", city: "Berlin", countrySlug: "almanya", category: "LANGUAGE_SCHOOL", rank: "Official", rating: 5.0, 
            image: "https://images.unsplash.com/photo-1599946347341-6cd394723ac8?auto=format&fit=crop&q=80&w=1600",
            description: "Almanca öğrenmenin en güvenilir adresi. Resmi sertifika ve kültürel entegrasyon merkezi.",
            features: ["Resmi Sertifika", "Kültürel Etkinlikler", "Merkezi Lokasyon", "Modern Sınıflar"],
            stats: { "Öğrenci Memnuniyeti": "%99", "Haftalık Ders": "25 Saat", "Sınıf Mevcudu": "10-14" },
            programs: [
                { name: "Standard German", minGpa: "N/A", lang: "A1-C1", desc: "Kapsamlı Almanca dil eğitimi." },
                { name: "DSH Prep", minGpa: "B2 Certificate", lang: "B2", desc: "Üniversite girişi için hazırlık kursu." }
            ]
        },

        // --- Canada (kanada) ---
        { 
            name: "University of Toronto", slug: "utoronto-canada", city: "Toronto", countrySlug: "kanada", category: "UNIVERSITY", rank: "#21", rating: 5.0, 
            image: "https://images.unsplash.com/photo-1519091035857-65d2c58462ec?auto=format&fit=crop&q=80&w=1600",
            description: "Kanada'nın akademik kalbi. Çok kültürlü yapısı ve araştırma odaklı vizyonuyla global liderlerin okulu.",
            features: ["Kapsamlı Araştırma", "Toronto Lokasyonu", "Geniş Bölüm Seçenekleri", "Kanada'nın En İyisi"],
            stats: { "Kabul Oranı": "%43", "Dünya Sıralaması": "21", "Mezun Sayısı": "600k+" },
            programs: [
                { name: "Computer Science", minGpa: "3.7/4.0", lang: "IELTS 7.0 / TOEFL 93", desc: "Yapay zeka ve yazılım mühendisliğinde öncü." },
                { name: "Commerce", minGpa: "3.6/4.0", lang: "IELTS 7.0", desc: "Rotman Commerce ile küresel iş dünyasına hazırlık." }
            ]
        }
    ];

    console.log("Seeding RICH Mega institution data...");

    for (const instData of institutions) {
        const { programs, countrySlug, category, ...rest } = instData;
        const countryId = getCountryId(countrySlug);
        const serviceId = getServiceId(categoryToServiceSlug[category]);

        if (!countryId) {
            console.log(`Country slug ${countrySlug} not found, skipping ${rest.name}`);
            continue;
        }

        if (!serviceId) {
            console.log(`Service slug ${categoryToServiceSlug[category]} not found, skipping ${rest.name}`);
            continue;
        }

        const institution = await prisma.institution.upsert({
            where: { slug: rest.slug },
            update: {
                ...rest,
                countryId,
                serviceId,
                active: true
            },
            create: {
                ...rest,
                countryId,
                serviceId,
                active: true
            }
        });

        for (const progData of programs) {
            const progName = typeof progData === 'string' ? progData : progData.name;
            const progSlug = `${institution.slug}-${progName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
            
            const templateData = typeof progData === 'object' ? JSON.stringify({
                minGpa: progData.minGpa,
                languageScore: progData.lang
            }) : null;

            await prisma.program.upsert({
                where: {
                    slug: progSlug
                },
                update: {
                    category: category as Category,
                    description: typeof progData === 'object' ? progData.desc : null,
                    templateData
                },
                create: {
                    name: progName,
                    slug: progSlug,
                    institutionId: institution.id,
                    category: category as Category,
                    duration: "1-4 Yıl",
                    price: 0,
                    currency: "EUR",
                    description: typeof progData === 'object' ? progData.desc : null,
                    templateData
                }
            });
        }
    }

    console.log("RICH Mega institution seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
