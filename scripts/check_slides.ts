import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Fetching Hero Slides from database...");
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" }
  });
  
  if (slides.length === 0) {
    console.log("No slides found in database.");
  } else {
    slides.forEach((slide, index) => {
      console.log(`\nSlide ${index + 1}:`);
      console.log(`ID: ${slide.id}`);
      console.log(`Title: ${slide.title}`);
      console.log(`Subtitle: ${slide.subtitle}`);
      console.log(`Image: ${slide.imageUrl}`);
      console.log(`Order: ${slide.order}`);
      console.log(`Active: ${slide.active}`);
    });
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
