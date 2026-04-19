import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Update University of Oxford
    await prisma.institution.updateMany({
        where: { name: "University of Oxford" },
        data: { image: "/images/institutions/oxford.png" }
    });

    // Update King's College London
    await prisma.institution.updateMany({
        where: { name: "King's College London" },
        data: { image: "/images/institutions/kings-college.png" }
    });

    console.log("Database updated successfully for Oxford and King's College London.");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
