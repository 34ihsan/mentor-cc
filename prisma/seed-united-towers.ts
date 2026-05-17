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
        // --- IRELAND (irlanda) ---
        { name: "Apollo Language Centre", slug: "apollo-language-ireland", city: "Dublin", countrySlug: "irlanda", category: "LANGUAGE_SCHOOL", rank: "Award Winning", rating: 4.8, image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=1600", programs: ["Real World English", "IELTS Focus", "Young Adult Program"] },
        { name: "Atlas Language School", slug: "atlas-language-ireland", city: "Dublin", countrySlug: "irlanda", category: "LANGUAGE_SCHOOL", rank: "Accredited", rating: 4.7, image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=1600", programs: ["General English", "Business English", "Exam Preparation"] },
        { name: "CES - Centre of English Studies", slug: "ces-dublin-ireland", city: "Dublin", countrySlug: "irlanda", category: "LANGUAGE_SCHOOL", rank: "Accredited", rating: 4.6, image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=1600", programs: ["Standard English", "Intensive English", "Teacher Training"] },
        { name: "Emerald Cultural Institute", slug: "emerald-cultural-ireland", city: "Dublin", countrySlug: "irlanda", category: "LANGUAGE_SCHOOL", rank: "Elite", rating: 4.9, image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=1600", programs: ["Intensive Plus", "Business Workshop", "University Pathway"] },

        // --- MALTA (malta) ---
        { name: "ESE - European School of English", slug: "ese-malta", city: "St. Julian's", countrySlug: "malta", category: "LANGUAGE_SCHOOL", rank: "Best in Malta", rating: 4.8, image: "https://images.unsplash.com/photo-1543783232-f79f98278358?auto=format&fit=crop&q=80&w=1600", programs: ["General English", "Academic Year", "Teen Camp"] },
        { name: "IELS Malta", slug: "iels-malta", city: "Sliema", countrySlug: "malta", category: "LANGUAGE_SCHOOL", rank: "Accredited", rating: 4.7, image: "https://images.unsplash.com/photo-1543783232-f79f98278358?auto=format&fit=crop&q=80&w=1600", programs: ["Standard English", "Cambridge Prep", "Business Plus"] },
        { name: "Clubclass Malta", slug: "clubclass-malta", city: "Swieqi", countrySlug: "malta", category: "LANGUAGE_SCHOOL", rank: "Residency School", rating: 4.5, image: "https://images.unsplash.com/photo-1543783232-f79f98278358?auto=format&fit=crop&q=80&w=1600", programs: ["General English", "Exam Prep", "Junior Program"] },
        { name: "AM Language Malta", slug: "am-language-malta", city: "Sliema", countrySlug: "malta", category: "LANGUAGE_SCHOOL", rank: "Boutique", rating: 4.6, image: "https://images.unsplash.com/photo-1543783232-f79f98278358?auto=format&fit=crop&q=80&w=1600", programs: ["Intensive English", "Business English", "Social Program"] },

        // --- USA (amerika) ---
        { name: "Northeastern University", slug: "northeastern-university-usa", city: "Boston", countrySlug: "amerika", category: "UNIVERSITY", rank: "#44", rating: 4.9, image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=1600", programs: ["Co-op Program", "Data Science", "Finance"] },
        { name: "George Mason University", slug: "george-mason-usa", city: "Fairfax", countrySlug: "amerika", category: "UNIVERSITY", rank: "#105", rating: 4.7, image: "https://images.unsplash.com/photo-1523050853063-bd42da695cfc?auto=format&fit=crop&q=80&w=1600", programs: ["Cyber Security", "Public Policy", "Economics"] },
        { name: "Full Sail University", slug: "full-sail-usa", city: "Winter Park", countrySlug: "amerika", category: "UNIVERSITY", rank: "Top Creative", rating: 4.8, image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1600", programs: ["Film Production", "Game Design", "Digital Media"] },
        { name: "ELS Language Centers", slug: "els-language-usa", city: "Multiple Locations", countrySlug: "amerika", category: "LANGUAGE_SCHOOL", rank: "Pathway Leader", rating: 4.6, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600", programs: ["English for Academic Purposes", "Intensive English", "GMAT Prep"] },
        { name: "NESE Boston", slug: "nese-boston-usa", city: "Boston", countrySlug: "amerika", category: "LANGUAGE_SCHOOL", rank: "Elite", rating: 4.9, image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=1600", programs: ["Intensive English", "Business English", "TOEFL Prep"] },

        // --- UK (ingiltere) ---
        { name: "St Giles International London", slug: "st-giles-london-uk", city: "London", countrySlug: "ingiltere", category: "LANGUAGE_SCHOOL", rank: "Accredited", rating: 4.7, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1600", programs: ["Platinum Course", "General English", "TEFL"] },
        { name: "Kings Education Oxford", slug: "kings-education-oxford-uk", city: "Oxford", countrySlug: "ingiltere", category: "LANGUAGE_SCHOOL", rank: "Academic Focus", rating: 4.8, image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=1600", programs: ["Advanced Level Foundation", "Intensive English", "Art & Design Foundation"] },
        { name: "International House London", slug: "ih-london-uk", city: "London", countrySlug: "ingiltere", category: "LANGUAGE_SCHOOL", rank: "Global Excellence", rating: 4.8, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1600", programs: ["Executive English", "IELTS Preparation", "Teacher Training"] },

        // --- CANADA (kanada) ---
        { name: "Centennial College", slug: "centennial-college-canada", city: "Toronto", countrySlug: "kanada", category: "UNIVERSITY", rank: "#1 Research College", rating: 4.7, image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1600", programs: ["Engineering Tech", "Hospitality", "Business Admin"] },
        { name: "Fanshawe College", slug: "fanshawe-college-canada", city: "London, ON", countrySlug: "kanada", category: "UNIVERSITY", rank: "Top Applied Arts", rating: 4.6, image: "https://images.unsplash.com/photo-1519091035857-65d2c58462ec?auto=format&fit=crop&q=80&w=1600", programs: ["Aviation", "Early Childhood Education", "IT Solutions"] },
        { name: "Tamwood International", slug: "tamwood-canada", city: "Vancouver", countrySlug: "kanada", category: "LANGUAGE_SCHOOL", rank: "Accredited", rating: 4.5, image: "https://images.unsplash.com/photo-1519091035857-65d2c58462ec?auto=format&fit=crop&q=80&w=1600", programs: ["Skill Builder", "Go International", "Camp Tamwood"] }
    ];

    console.log("Seeding United Towers Competitor data...");

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

        for (const progName of programs) {
            const progSlug = `${institution.slug}-${progName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
            await prisma.program.upsert({
                where: { slug: progSlug },
                update: { category: category as Category },
                create: {
                    name: progName,
                    slug: progSlug,
                    institutionId: institution.id,
                    category: category as Category,
                    duration: "1-4 Yıl",
                    price: 0,
                    currency: "EUR"
                }
            });
        }
    }

    console.log("Competitor data seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
