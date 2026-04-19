import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const countries = await prisma.country.findMany({
        where: { name: { in: ['İngiltere', 'Amerika', 'Polonya'] } },
        select: { id: true, name: true }
    });
    console.log("Countries:", JSON.stringify(countries, null, 2));

    const services = await prisma.service.findMany({
        where: { slug: 'yurtdisi-universite' },
        select: { id: true, title: true }
    });
    console.log("Services:", JSON.stringify(services, null, 2));

    const unis = await prisma.institution.findMany({
        where: {
            name: { in: [
                'University of Oxford', 
                'King\'s College London', 
                'Harvard University', 
                'Massachusetts Institute of Technology (MIT)',
                'University of Warsaw',
                'EC English London'
            ] }
        },
        select: { id: true, name: true, image: true, slug: true }
    });
    console.log("Unis:", JSON.stringify(unis, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
