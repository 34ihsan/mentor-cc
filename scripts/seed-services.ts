import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const services = [
    { title: "YURTDIŞI ÜNİVERSİTE", slug: "yurtdisi-universite" },
    { title: "YURTDIŞI MASTER", slug: "yurtdisi-master" },
    { title: "YURTDIŞI LİSE EĞİTİMİ", slug: "yurtdisi-lise-egitimi" },
    { title: "YURTDIŞI YAZ OKULLARI", slug: "yurtdisi-yaz-okullari" },
    { title: "YURTDIŞI DİL OKULU", slug: "yurtdisi-dil-okulu" },
    { title: "SINAVLAR", slug: "sinavlar" },
    { title: "KARİYER", slug: "kariyer" }
  ];

  console.log("Seeding services...");
  
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        order: i
      },
      create: {
        title: s.title,
        title_en: s.title,
        title_de: s.title,
        slug: s.slug,
        content: `Mükemmel bir ${s.title.toLowerCase()} eğitimi sizi bekliyor.`,
        content_en: `Excellent ${s.title.toLowerCase()} education awaits you.`,
        content_de: `Exzellente ${s.title.toLowerCase()} Bildung erwartet Sie.`,
        order: i,
        active: true
      }
    });
    
    console.log(`Seeded: ${s.title}`);
  }

  console.log("Seeding completed.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
