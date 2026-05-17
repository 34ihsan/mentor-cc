import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const services = await prisma.service.findMany({
        orderBy: { order: "asc" }
    });
    console.log("Current services in DB:");
    console.dir(services, { depth: null });
}

main().catch(console.error).finally(() => prisma.$disconnect());
