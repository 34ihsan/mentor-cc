import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const servicesList = [
  { title: 'YURTDIŞI ÜNİVERSİTE', title_en: 'UNIVERSITY ABROAD', title_de: 'UNIVERSITÄT IM AUSLAND', slug: 'yurtdisi-universite' },
  { title: 'YURTDIŞI MASTER', title_en: 'MASTER ABROAD', title_de: 'MASTER IM AUSLAND', slug: 'yurtdisi-master' },
  { title: 'YURTDIŞI LİSE EĞİTİMİ', title_en: 'HIGH SCHOOL ABROAD', title_de: 'GYMNASIUM IM AUSLAND', slug: 'yurtdisi-lise-egitimi' },
  { title: 'YURTDIŞI YAZ OKULLARI', title_en: 'SUMMER SCHOOLS ABROAD', title_de: 'SOMMERSCHULEN IM AUSLAND', slug: 'yurtdisi-yaz-okullari' },
  { title: 'YURTDIŞI DİL OKULU', title_en: 'LANGUAGE SCHOOL ABROAD', title_de: 'SPRACHSCHULE IM AUSLAND', slug: 'yurtdisi-dil-okulu' },
  { title: 'SINAVLAR', title_en: 'EXAMS', title_de: 'PRÜFUNGEN', slug: 'sinavlar' },
  { title: 'KARİYER', title_en: 'CAREER', title_de: 'KARRIERE', slug: 'kariyer' }
];

async function main() {
  console.log('Seeding services...');
  
  for (let i = 0; i < servicesList.length; i++) {
    const s = servicesList[i];
    
    // Check if exists
    const existing = await prisma.service.findFirst({
      where: { slug: s.slug }
    });
    
    if (!existing) {
      console.log(`Creating ${s.title}...`);
      await prisma.service.create({
        data: {
          title: s.title,
          title_en: s.title_en,
          title_de: s.title_de,
          slug: s.slug,
          content: 'Detaylı bilgi yakında eklenecektir.',
          content_en: 'Detailed information will be added soon.',
          content_de: 'Detaillierte Informationen werden in Kürze hinzugefügt.',
          active: true,
          order: i
        }
      });
    } else {
      console.log(`Updating ${s.title}...`);
      await prisma.service.update({
        where: { id: existing.id },
        data: {
          title: s.title,
          title_en: s.title_en,
          title_de: s.title_de,
          order: i
        }
      });
    }
  }
  
  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
