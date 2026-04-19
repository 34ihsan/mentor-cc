import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Check if Cambridge already exists
    const existing = await prisma.institution.findUnique({
        where: { slug: 'university-of-cambridge' }
    });

    if (existing) {
        console.log("University of Cambridge already exists.");
        return;
    }

    // Add University of Cambridge
    const cambridge = await prisma.institution.create({
        data: {
            name: "University of Cambridge",
            slug: "university-of-cambridge",
            city: "Cambridge",
            city_en: "Cambridge",
            description: "World-class university located in the UK, known for academic excellence.",
            description_en: "World-class university located in the UK, known for academic excellence.",
            countryId: "cmn52bf160006o26gfx6lkbn9", // İngiltere ID
            serviceId: "cmnp5x5tk000ho27szrx5t4wy", // University Service ID
            isFeatured: true,
            active: true,
            rank: "2",
            rating: 5.0,
            image: "/images/institutions/cambridge.png"
        }
    });

    console.log("University of Cambridge added successfully:", cambridge.id);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
