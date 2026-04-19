import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const unis = await prisma.institution.findMany({
        where: {
            name: {
                in: ["University of Oxford", "King's College London", "EC English London", "University of Warsaw"]
            }
        },
        select: {
            id: true,
            name: true,
            image: true,
            slug: true
        }
    });

    console.log(JSON.stringify(unis, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
