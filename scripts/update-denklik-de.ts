import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const serviceSlug = 'denklik';
  
  console.log(`Updating service: ${serviceSlug}...`);
  
  const updatedService = await prisma.service.update({
    where: { slug: serviceSlug },
    data: {
      title_de: "Anerkennung von Diplomen",
      content_de: "Bringen Sie Ihre im Ausland erworbene Ausbildung mit der Expertenberatung von Star Beratung in die Türkei. Wir begleiten Sie professionell bei Ihren Diplomanerkennungsverfahren beim YÖK.",
      seoTitle_de: "Diplomanerkennung Türkei | YÖK Denklik Beratung | Star Beratung",
      seoDescription_de: "Überlassen Sie Ihre Diplomanerkennung in der Türkei den Experten. Professionelle YÖK-Anerkennungsberatung, Unterlagenvorbereitung und Prozessverfolgung.",
      // Also updating English for completeness
      title_en: "Diploma Equivalency",
      content_en: "Bring your education obtained abroad to Turkey with the expert consultancy of Star Beratung. We professionally guide you through your diploma equivalency procedures at YÖK.",
      seoTitle_en: "Diploma Equivalency Turkey | YÖK Recognition Consultancy | Star Beratung",
      seoDescription_en: "Leave your diploma equivalency in Turkey to the experts. Professional YÖK recognition consultancy, document preparation, and process tracking."
    }
  });

  console.log("Service updated successfully:", updatedService.slug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
