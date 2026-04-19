import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const services = await prisma.service.findMany({});
  const countries = await prisma.country.findMany({});

  console.log('--- Services ---');
  console.log(JSON.stringify(services, null, 2));
  console.log('--- Countries ---');
  console.log(JSON.stringify(countries, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
