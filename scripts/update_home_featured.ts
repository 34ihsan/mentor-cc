import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 1. Update Institution images
    await prisma.institution.updateMany({
        where: { name: "Harvard University" },
        data: { image: "/images/institutions/harvard.png" }
    });

    await prisma.institution.updateMany({
        where: { name: "Massachusetts Institute of Technology (MIT)" },
        data: { image: "/images/institutions/mit.png" }
    });

    // 2. Update Home Page Config
    const featuredIds = [
        "cmnp5x6x3000so27sebsb6cf0", // Oxford
        "cmnp7wfd50001o2987vcx48io", // Cambridge
        "cmnp5x7200011o27srcmm5943", // Harvard
        "cmnp5x7340014o27s12mstb1e"  // MIT
    ];

    const currentSetting = await prisma.settings.findUnique({ where: { key: 'home_page_config' } });
    if (currentSetting) {
        let config = JSON.parse(currentSetting.value);
        config.featuredInstitutions = featuredIds;
        
        await prisma.settings.update({
            where: { key: 'home_page_config' },
            data: { value: JSON.stringify(config) }
        });
        console.log("Home Page Config updated with prestigious universities.");
    } else {
        console.log("Error: home_page_config setting not found.");
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
