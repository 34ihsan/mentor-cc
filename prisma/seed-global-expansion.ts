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
        // --- FRANCE (fransa) ---
        { name: "Sorbonne University", slug: "sorbonne-university-france", city: "Paris", countrySlug: "fransa", category: "UNIVERSITY", rank: "#60", rating: 4.9, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1600", programs: ["Humanities", "Medicine", "Science"] },
        { name: "HEC Paris", slug: "hec-paris-france", city: "Jouy-en-Josas", countrySlug: "fransa", category: "UNIVERSITY", rank: "#1 Business", rating: 5.0, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1600", programs: ["MBA", "Master in Management", "Finance"] },
        { name: "Ecole Polytechnique", slug: "polytechnique-france", city: "Palaiseau", countrySlug: "fransa", category: "UNIVERSITY", rank: "#48", rating: 4.9, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1600", programs: ["Engineering", "Physics", "Mathematics"] },

        // --- ITALY (italya) ---
        { name: "Sapienza University of Rome", slug: "sapienza-university-italy", city: "Rome", countrySlug: "italya", category: "UNIVERSITY", rank: "#134", rating: 4.8, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1600", programs: ["Classics", "Physics", "Archaeology"] },
        { name: "Politecnico di Milano", slug: "polimi-italy", city: "Milan", countrySlug: "italya", category: "UNIVERSITY", rank: "#123", rating: 4.9, image: "https://images.unsplash.com/photo-1533070479765-227ac7ed73b5?auto=format&fit=crop&q=80&w=1600", programs: ["Design", "Architecture", "Engineering"] },
        { name: "University of Bologna", slug: "university-of-bologna-italy", city: "Bologna", countrySlug: "italya", category: "UNIVERSITY", rank: "#154", rating: 4.8, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1600", programs: ["Law", "Medicine", "Agriculture"] },

        // --- SPAIN (ispanya) ---
        { name: "University of Barcelona", slug: "university-of-barcelona-spain", city: "Barcelona", countrySlug: "ispanya", category: "UNIVERSITY", rank: "#164", rating: 4.7, image: "https://images.unsplash.com/photo-1583997051651-8255c48b782c?auto=format&fit=crop&q=80&w=1600", programs: ["Biology", "Clinical Medicine", "Psychology"] },
        { name: "Complutense University of Madrid", slug: "complutense-madrid-spain", city: "Madrid", countrySlug: "ispanya", category: "UNIVERSITY", rank: "#171", rating: 4.6, image: "https://images.unsplash.com/photo-1543783232-f79f98278358?auto=format&fit=crop&q=80&w=1600", programs: ["Veterinary Science", "Dentistry", "Arts"] },
        { name: "ESADE Business School", slug: "esade-spain", city: "Barcelona", countrySlug: "ispanya", category: "UNIVERSITY", rank: "#20", rating: 4.9, image: "https://images.unsplash.com/photo-1583997051651-8255c48b782c?auto=format&fit=crop&q=80&w=1600", programs: ["Executive MBA", "International Management", "Law"] },

        // --- NETHERLANDS (hollanda) ---
        { name: "University of Amsterdam", slug: "university-of-amsterdam-netherlands", city: "Amsterdam", countrySlug: "hollanda", category: "UNIVERSITY", rank: "#53", rating: 4.9, image: "https://images.unsplash.com/photo-1534351590666-13c3e96b5017?auto=format&fit=crop&q=80&w=1600", programs: ["Communication & Media", "Psychology", "Sociology"] },
        { name: "Delft University of Technology", slug: "delft-university-netherlands", city: "Delft", countrySlug: "hollanda", category: "UNIVERSITY", rank: "#47", rating: 4.9, image: "https://images.unsplash.com/photo-1534351590666-13c3e96b5017?auto=format&fit=crop&q=80&w=1600", programs: ["Civil Engineering", "Aerospace Engineering", "Architecture"] },
        { name: "Leiden University", slug: "leiden-university-netherlands", city: "Leiden", countrySlug: "hollanda", category: "UNIVERSITY", rank: "#131", rating: 4.8, image: "https://images.unsplash.com/photo-1534351590666-13c3e96b5017?auto=format&fit=crop&q=80&w=1600", programs: ["International Law", "Archeology", "History"] },

        // --- AUSTRALIA (avustralya) ---
        { name: "University of Sydney", slug: "university-of-sydney-australia", city: "Sydney", countrySlug: "avustralya", category: "UNIVERSITY", rank: "#19", rating: 5.0, image: "https://images.unsplash.com/photo-1523050853063-bd42da695cfc?auto=format&fit=crop&q=80&w=1600", programs: ["Veterinary Science", "Sports-related subjects", "Medicine"] },
        { name: "University of Melbourne", slug: "university-of-melbourne-australia", city: "Melbourne", countrySlug: "avustralya", category: "UNIVERSITY", rank: "#14", rating: 5.0, image: "https://images.unsplash.com/photo-1523050853063-bd42da695cfc?auto=format&fit=crop&q=80&w=1600", programs: ["Education", "Law", "Accounting"] },
        { name: "UNSW Sydney", slug: "unsw-sydney-australia", city: "Sydney", countrySlug: "avustralya", category: "UNIVERSITY", rank: "#19", rating: 4.9, image: "https://images.unsplash.com/photo-1523050853063-bd42da695cfc?auto=format&fit=crop&q=80&w=1600", programs: ["Civil & Structural Engineering", "Mining Engineering", "Finance"] },

        // --- SWITZERLAND (isvicre) ---
        { name: "ETH Zurich", slug: "eth-zurich-switzerland", city: "Zurich", countrySlug: "isvicre", category: "UNIVERSITY", rank: "#7", rating: 5.0, image: "https://images.unsplash.com/photo-1532009241513-8260a9504a7f?auto=format&fit=crop&q=80&w=1600", programs: ["Earth & Marine Sciences", "Computer Science", "Physics"] },
        { name: "EPFL", slug: "epfl-switzerland", city: "Lausanne", countrySlug: "isvicre", category: "UNIVERSITY", rank: "#36", rating: 4.9, image: "https://images.unsplash.com/photo-1532009241513-8260a9504a7f?auto=format&fit=crop&q=80&w=1600", programs: ["Engineering", "Data Science", "Bio-engineering"] }
    ];

    console.log("Seeding Global Expansion data...");

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

    console.log("Global Expansion seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
