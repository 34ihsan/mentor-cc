import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  
  const counts = {
    Page: await prisma.page.count(),
    Post: await prisma.post.count(),
    Announcement: await prisma.announcement.count(),
    HeroSlide: await prisma.heroSlide.count(),
    Service: await prisma.service.count(),
    Country: await prisma.country.count(),
    Institution: await prisma.institution.count(),
    Program: await prisma.program.count(),
  };

  console.log('Record counts:', JSON.stringify(counts, null, 2));

  // Small sample to see the content
  const pageSample = await prisma.page.findFirst();
  console.log('Sample Page title:', pageSample?.title);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
