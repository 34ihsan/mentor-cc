import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const contents = await prisma.countryServiceContent.findMany({
    include: {
      country: true,
      service: true,
    },
  });

  const missing = contents.filter(c => !c.content || c.content.includes("henüz içerik eklenmemiştir"));

  console.log(JSON.stringify(missing.map(m => ({
    id: m.id,
    country: m.country.name,
    countrySlug: m.country.slug,
    service: m.service.title,
    serviceSlug: m.service.slug,
    content: m.content
  })), null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
