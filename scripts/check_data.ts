import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const countries = await prisma.country.findMany({
    select: { id: true, name: true, slug: true }
  });
  const services = await prisma.service.findMany({
    select: { id: true, title: true, slug: true }
  });
  const contents = await prisma.countryServiceContent.findMany({
    include: {
      country: true,
      service: true
    }
  });

  console.log('Countries:', JSON.stringify(countries, null, 2));
  console.log('Services:', JSON.stringify(services, null, 2));
  console.log('Contents Count:', contents.length);
  
  // Check specifically for England + Language Schools
  const englandLanguage = contents.find(c => c.country.slug === 'ingiltere' && c.service.slug === 'yurtdisi-dil-okullari');
  console.log('England Language School Content:', englandLanguage ? (englandLanguage.content ? 'Exists' : 'Empty') : 'Not Found');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
