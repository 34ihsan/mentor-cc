import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const countries = await prisma.country.findMany({
        where: {
            name_en: { in: ['United Kingdom', 'USA', 'Poland'] }
        },
        select: { id: true, name: true, name_en: true }
    });
    console.log("Countries:", JSON.stringify(countries, null, 2));

    const services = await prisma.service.findMany({
        where: {
            slug: 'yurtdisi-universite'
        },
        select: { id: true, title: true }
    });
    console.log("Services:", JSON.stringify(services, null, 2));

    const unis = await prisma.institution.findMany({
        where: {
            name: { in: ['Harvard University', 'Massachusetts Institute of Technology (MIT)', 'University of Oxford', 'King\'s College London', 'University of Warsaw'] }
        },
        select: { id: true, name: true, image: true }
    });
    console.log("Existing Unis:", JSON.stringify(unis, null, 2));
    
    const settings = await prisma.settings.findUnique({ where: { key: 'home_page_config' } });
    console.log("Home Page Config:", settings?.value);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
