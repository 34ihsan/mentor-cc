const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const roadmaps = await prisma.socialRoadmap.findMany({
      take: 1
    });
    console.log('Success: Found roadmaps table', roadmaps);
  } catch (error) {
    console.error('Error connecting to database or finding roadmaps table:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
