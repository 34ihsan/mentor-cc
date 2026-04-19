import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const service = await prisma.service.findUnique({
    where: { slug: 'yurtdisi-universite' }
  });
  console.log('Service with slug "yurtdisi-universite":', service);
  
  const allSlugs = await prisma.service.findMany({
    select: { slug: true }
  });
  console.log('All current slugs:', allSlugs.map(s => s.slug));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
