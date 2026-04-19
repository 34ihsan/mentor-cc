import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const homeSetting = await prisma.settings.findUnique({ where: { key: 'home_page_config' } });
    
    if (homeSetting?.value) {
        const parsed = JSON.parse(homeSetting.value);
        console.log("Current Featured Institutions IDs:", JSON.stringify(parsed.featuredInstitutions, null, 2));
        
        const institutions = await prisma.institution.findMany({
            where: {
                id: { in: parsed.featuredInstitutions }
            },
            select: {
                id: true,
                name: true,
                slug: true
            }
        });
        console.log("Current Institutions names:", JSON.stringify(institutions, null, 2));
    } else {
        console.log("No home_page_config found.");
    }

    // Also list some prestigious unis available in the DB
    const prestigious = await prisma.institution.findMany({
        where: {
            name: {
                contains: "University",
                mode: 'insensitive'
            }
        },
        take: 10,
        select: {
            id: true,
            name: true
        }
    });
    console.log("Available Universities in DB:", JSON.stringify(prestigious, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
