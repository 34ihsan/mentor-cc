
import { PrismaClient, Category } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // 1. Create Core Users
    console.log("Creating users for all roles...");

    const users = [
        { email: "admin@stareducation.com", name: "StarEducation Admin", role: "ADMIN" as const },
        { email: "ceo@stareducation.com", name: "StarEducation CEO", role: "CEO" as const },
        { email: "advisor@stareducation.com", name: "Senior Advisor", role: "ADVISOR" as const },
        { email: "agency@stareducation.com", name: "Global Agency Manager", role: "AGENCY_MANAGER" as const },
        { email: "student@stareducation.com", name: "Test Student", role: "STUDENT" as const },
    ];

    for (const { email, name, role } of users) {
        await prisma.user.upsert({
            where: { email },
            update: { name, role },
            create: {
                email,
                name,
                role,
                password: await hash("password123", 12),
            },
        });
    }

    const adminUser = await prisma.user.findUnique({ where: { email: "admin@stareducation.com" } });
    if (!adminUser) throw new Error("Admin user not found");

    // 3. Create Countries and Services for relations
    console.log("Creating countries and services...");
    
    const countriesData = [
        { 
            name: "Almanya", 
            slug: "almanya",
            capital: "Berlin",
            currency: "EUR (€)",
            language: "Almanca",
            isFeatured: true
        },
        { 
            name: "İngiltere", 
            slug: "ingiltere",
            capital: "Londra",
            currency: "GBP (£)",
            language: "İngilizce",
            isFeatured: true
        },
        { 
            name: "Polonya", 
            slug: "polonya",
            capital: "Varşova",
            currency: "PLN (Zloty)",
            language: "Lehçe",
            isFeatured: false
        },
        { 
            name: "Amerika", 
            slug: "amerika",
            capital: "Washington D.C.",
            currency: "USD ($)",
            language: "İngilizce",
            isFeatured: true
        },
        { 
            name: "Kanada", 
            slug: "kanada",
            capital: "Ottawa",
            currency: "CAD ($)",
            language: "İngilizce, Fransızca",
            isFeatured: true
        },
        { 
            name: "Hollanda", 
            slug: "hollanda",
            capital: "Amsterdam",
            currency: "EUR (€)",
            language: "Felemenkçe, İngilizce",
            isFeatured: true
        },
        { 
            name: "Avustralya", 
            slug: "avustralya",
            capital: "Canberra",
            currency: "AUD ($)",
            language: "İngilizce",
            isFeatured: true
        },
        { 
            name: "İrlanda", 
            slug: "irlanda",
            capital: "Dublin",
            currency: "EUR (€)",
            language: "İngilizce, İrlandaca",
            isFeatured: true
        },
        { name: "Belçika", slug: "belcika" }
    ];

    const countriesMap: Record<string, string> = {};
    for (const c of countriesData) {
        const country = await prisma.country.upsert({
            where: { slug: c.slug },
            update: { 
                name: c.name,
                capital: c.capital,
                currency: c.currency,
                language: c.language,
                isFeatured: c.isFeatured ?? false
            },
            create: { 
                name: c.name, 
                slug: c.slug, 
                capital: c.capital,
                currency: c.currency,
                language: c.language,
                active: true, 
                isFeatured: c.isFeatured ?? false 
            }
        });
        countriesMap[c.slug] = country.id;
    }

    // 3. Clear existing services for a clean slate
    console.log("Cleaning up existing services...");
    await prisma.service.deleteMany({});

    const servicesData = [
        { title: "Denklik", slug: "denklik", image: "/images/hero/denklik.png" },
        { title: "Master & Yüksek Lisans", slug: "yurtdisi-yuksek-lisans", image: "/images/hero/yuksek-lisans.png" },
        { title: "Lise Eğitimi", slug: "yurtdisi-lise", image: "/images/hero/lise.png" },
        { title: "Yurtdışı Üniversite", slug: "yurtdisi-universite", image: "/images/hero/universite.png" },
        { title: "Yaz Okulları", slug: "yurtdisi-yaz-okullari", image: "/images/hero/yaz-okul.png" },
        { title: "Dil Okulu", slug: "yurtdisi-dil-okullari", image: "/images/hero/dil-egitim.png" },
        { title: "Mesleki Denklik & Kariyer", slug: "kariyer", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200" }
    ];

    const servicesMap: Record<string, string> = {};
    for (const s of servicesData) {
        const service = await prisma.service.create({
            data: { title: s.title, slug: s.slug, image: s.image, active: true }
        });
        servicesMap[s.slug] = service.id;
    }

    // 4. Create Settings (Home Page Config)
    console.log("Creating settings...");
    const homePageConfig = {
        workflow: {
            title: "Neden Star Beratung?",
            subtitle: "Hayallerinize Giden <span class='gold-text not-italic'>Yolculuk</span>",
            steps: [
                { icon: 'Users', title: 'Uzman Danışmanlık', desc: 'Deneyimli kadromuzla yanınızdayız.' },
                { icon: 'Search', title: 'Doğru Seçim', desc: 'Size en uygun okulu birlikte buluyoruz.' },
                { icon: 'CheckCircle2', title: 'Kesin Sonuç', desc: 'Başarı odaklı çalışma prensibi.' },
                { icon: 'ShieldCheck', title: 'Güvenilir Hizmet', desc: 'Şeffaf ve dürüst süreç yönetimi.' }
            ]
        },
        popularDestinations: {
            items: ["Almanya", "İngiltere", "Türkiye", "Amerika", "Kanada", "İrlanda"]
        }
    };

    await prisma.settings.upsert({
        where: { key: 'home_page_config' },
        update: { value: JSON.stringify(homePageConfig) },
        create: { key: 'home_page_config', value: JSON.stringify(homePageConfig) }
    });

    await prisma.settings.upsert({
        where: { key: 'site_config' },
        update: { value: JSON.stringify({ contact: { whatsapp: "+90 555 123 45 67" } }) },
        create: { key: 'site_config', value: JSON.stringify({ contact: { whatsapp: "+90 555 123 45 67" } }) }
    });

    // 5. Clear existing institutions and programs
    console.log("Cleaning up existing institutions...");
    await prisma.program.deleteMany();
    await prisma.institution.deleteMany();

    const institutions = [
        // --- UK ---
        {
            name: "King's College London",
            slug: "kings-college-london",
            countrySlug: "ingiltere",
            serviceSlug: "yurtdisi-universite",
            city: "Londra",
            description: "Londra'nın kalbinde yer alan, araştırma odaklı köklü bir üniversite.",
            website: "https://www.kcl.ac.uk",
            image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2000",
            programs: [
                { name: "Law (LLB)", slug: "kcl-law-llb", category: "UNIVERSITY" as Category, price: 28000, currency: "GBP", duration: "3 Years" },
                { name: "Global Business (MSc)", slug: "kcl-global-biz-msc", category: "MASTER" as Category, price: 32000, currency: "GBP", duration: "1 Year" }
            ]
        },
        {
            name: "University of Oxford",
            slug: "university-of-oxford",
            countrySlug: "ingiltere",
            serviceSlug: "yurtdisi-universite",
            city: "Oxford",
            description: "Dünyanın en eski üniversitelerinden biri.",
            website: "https://www.ox.ac.uk",
            image: "https://images.unsplash.com/photo-1570126618983-2dc7716bdd4f?q=80&w=2000",
            programs: [
                { name: "Computer Science (BA)", slug: "oxford-cs-ba", category: "UNIVERSITY" as Category, price: 35000, currency: "GBP", duration: "3 Years" }
            ]
        },
        {
            name: "EC English London",
            slug: "ec-english-london",
            countrySlug: "ingiltere",
            serviceSlug: "yurtdisi-dil-okullari",
            city: "Londra",
            description: "EC London, Londra'nın kalbinde dil eğitimi verir.",
            website: "https://www.ecenglish.com",
            image: "/images/hero/dil-egitim.png",
            programs: [
                { name: "General English", slug: "ec-london-general-english", category: "LANGUAGE_SCHOOL" as Category, price: 1200, duration: "4 Weeks" }
            ]
        },
        // --- Poland ---
        {
            name: "University of Warsaw",
            slug: "university-of-warsaw",
            countrySlug: "polonya",
            serviceSlug: "yurtdisi-universite",
            city: "Varşova",
            description: "Polonya'nın en büyük ve uluslararası alanda en iyi tanınan üniversitesi.",
            website: "https://www.uw.edu.pl",
            image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=2000",
            programs: [
                { name: "International Relations (BA)", slug: "uw-ir-ba", category: "UNIVERSITY" as Category, price: 3000, currency: "EUR", duration: "3 Years" }
            ]
        },
        // --- USA ---
        {
            name: "Harvard University",
            slug: "harvard-university",
            countrySlug: "amerika",
            serviceSlug: "yurtdisi-universite",
            city: "Cambridge",
            description: "Dünyanın en prestijli eğitim kurumu.",
            website: "https://www.harvard.edu",
            image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2000",
            programs: [
                { name: "Global Management (MBA)", slug: "harvard-mba", category: "MASTER" as Category, price: 75000, currency: "USD", duration: "2 Years" }
            ]
        },
        {
            name: "Massachusetts Institute of Technology (MIT)",
            slug: "mit-university",
            countrySlug: "amerika",
            serviceSlug: "yurtdisi-universite",
            city: "Cambridge",
            description: "Teknoloji ve bilim dünyasının zirvesi.",
            website: "https://www.mit.edu",
            image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=2000",
            programs: [
                { name: "Computer Science (BSc)", slug: "mit-cs-bsc", category: "UNIVERSITY" as Category, price: 55000, currency: "USD", duration: "4 Years" }
            ]
        },
        // --- Canada ---
        {
            name: "University of Toronto",
            slug: "university-of-toronto",
            countrySlug: "kanada",
            serviceSlug: "yurtdisi-universite",
            city: "Toronto",
            description: "Kanada'nın en büyük ve en başarılı üniversitesi.",
            website: "https://www.utoronto.ca",
            image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=2000",
            programs: [
                { name: "Computer Science (MA)", slug: "utoronto-cs-ma", category: "MASTER" as Category, price: 35000, currency: "CAD", duration: "2 Years" }
            ]
        },
        // --- Netherlands ---
        {
            name: "University of Amsterdam",
            slug: "university-of-amsterdam",
            countrySlug: "hollanda",
            serviceSlug: "yurtdisi-universite",
            city: "Amsterdam",
            description: "Avrupa'nın kalbinde dünya çapında bir araştırma merkezi.",
            website: "https://www.uva.nl",
            image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2000",
            programs: [
                { name: "Communication Science (BSc)", slug: "uva-comm-bsc", category: "UNIVERSITY" as Category, price: 12000, currency: "EUR", duration: "3 Years" }
            ]
        },
        // --- Australia ---
        {
            name: "University of Sydney",
            slug: "university-of-sydney",
            countrySlug: "avustralya",
            serviceSlug: "yurtdisi-universite",
            city: "Sydney",
            description: "Avustralya'nın en prestijli ve en eski üniversitesi.",
            website: "https://www.sydney.edu.au",
            image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=2000",
            programs: [
                { name: "Business (BCom)", slug: "usyd-biz-bcom", category: "UNIVERSITY" as Category, price: 42000, currency: "AUD", duration: "3 Years" }
            ]
        },
        // --- Germany ---
        {
            name: "Technical University of Munich",
            slug: "tum-munich",
            countrySlug: "almanya",
            serviceSlug: "yurtdisi-universite",
            city: "Münih",
            description: "Avrupa'nın önde gelen teknik üniversitelerinden biri.",
            website: "https://www.tum.de",
            image: "/images/hero/universite.png",
            programs: [
                { name: "Informatics (M.Sc.)", slug: "tum-informatics-ms", category: "UNIVERSITY" as Category, price: 0, currency: "EUR", duration: "2 Years" }
            ]
        }
    ];

    for (const inst of institutions) {
        const { programs, countrySlug, serviceSlug, ...instData } = inst;
        console.log(`Creating institution: ${instData.name}`);
        const countryId = countriesMap[countrySlug];
        const serviceId = servicesMap[serviceSlug];

        if (!countryId || !serviceId) {
            console.error(`Missing country or service for ${instData.name}:`, { countrySlug, serviceSlug });
            continue;
        }

        await prisma.institution.create({
            data: {
                ...instData,
                countryId,
                serviceId,
                active: true,
                isFeatured: true,
                programs: {
                    create: programs.map(p => ({
                        ...p,
                        description: `${p.name} program at ${instData.name}.`
                    }))
                }
            }
        });
    }

    // 6. Create Hero Slides
    console.log("Creating hero slides...");
    const heroSlides = [
        {
            title: "Yurtdışı Üniversite Eğitimi",
            subtitle: "Dünyanın en iyi üniversitelerinde lisans eğitimi alarak geleceğinizi garantiye alın.",
            imageUrl: "/images/hero/universite.png",
            pageContext: "home",
            order: 0,
            active: true
        },
        {
            title: "Yüksek Lisans ve Master",
            subtitle: "Global kariyer yolculuğunuzda uzmanlaşın. Avrupa ve Amerika'da saygın yüksek lisans programları.",
            imageUrl: "/images/hero/yuksek-lisans.png",
            pageContext: "home",
            order: 1,
            active: true
        },
        {
            title: "Dil Okulları ve Dil Eğitimi",
            subtitle: "İngilizce, Almanca ve daha fazlası. Dilinizi yerinde, en iyi okullarda öğrenin.",
            imageUrl: "/images/hero/dil-egitim.png",
            pageContext: "home",
            order: 2,
            active: true
        },
        {
            title: "Yurtdışı Lise Eğitimi",
            subtitle: "Çocuğunuzun geleceğine erken yatırım yapın. Uluslararası standartlarda lise eğitimi.",
            imageUrl: "/images/hero/lise.png",
            pageContext: "home",
            order: 3,
            active: true
        },
        {
            title: "Yurtdışı Yaz Okulları",
            subtitle: "Eğlenceli ve öğretici bir yaz tatili. Çocuklar ve gençler için global kamp programları.",
            imageUrl: "/images/hero/yaz-okul.png",
            pageContext: "home",
            order: 4,
            active: true
        },
        {
            title: "Mesleki Denklik ve Kariyer",
            subtitle: "Almanya ve Avrupa'da diplomanızı tanıtalım, mesleğinizi icra etmeye başlayın.",
            imageUrl: "/images/hero/denklik.png",
            pageContext: "home",
            order: 5,
            active: true
        }
    ];

    // Clear existing hero slides first to avoid duplicates
    await prisma.heroSlide.deleteMany({ where: { pageContext: 'home' } });

    for (const slide of heroSlides) {
        await prisma.heroSlide.create({ data: slide });
    }

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
