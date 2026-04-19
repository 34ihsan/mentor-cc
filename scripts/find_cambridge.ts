import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const cambridge = await prisma.institution.findMany({
        where: {
            name: {
                contains: "Cambridge",
                mode: 'insensitive'
            }
        }
    });

    console.log(JSON.stringify(cambridge, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
