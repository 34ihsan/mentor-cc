
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const linkMapping = [
  { order: 0, link: '/yurtdisi-universite' },
  { order: 1, link: '/yurtdisi-yuksek-lisans' },
  { order: 2, link: '/yurtdisi-dil-okullari' },
  { order: 3, link: '/yurtdisi-lise' },
  { order: 4, link: '/yurtdisi-yaz-okullari' },
  { order: 5, link: '/kariyer' },
];

async function main() {
  console.log('Updating Hero slider links...');
  
  for (const item of linkMapping) {
    const updated = await prisma.heroSlide.updateMany({
      where: {
        order: item.order,
        pageContext: 'home'
      },
      data: {
        link: item.link
      }
    });
    console.log(`Updated slide with order ${item.order}: ${updated.count} records affected.`);
  }

  console.log('Update complete.');
}

main()
  .catch((e) => {
    console.error('Error updating hero links:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
