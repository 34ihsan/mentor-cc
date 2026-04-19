import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

async function main() {
  const prisma = new PrismaClient();
  const backupDir = path.join(process.cwd(), '.tmp');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const data = {
    HeroSlide: await prisma.heroSlide.findMany(),
    Service: await prisma.service.findMany(),
    Country: await prisma.country.findMany(),
    CountryServiceContent: await prisma.countryServiceContent.findMany(),
    Institution: await prisma.institution.findMany(),
    Program: await prisma.program.findMany(),
    Announcement: await prisma.announcement.findMany(),
    Page: await prisma.page.findMany(),
    Post: await prisma.post.findMany(),
    User: await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, managedById: true } }) // Careful with User model
  };

  fs.writeFileSync(path.join(backupDir, 'db_backup.json'), JSON.stringify(data, null, 2));
  console.log('Backup saved to .tmp/db_backup.json');

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
