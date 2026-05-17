const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const inst = await p.institution.findFirst({
    where: { slug: 'utoronto' },
    include: { programs: true, country: true }
  });
  console.log(JSON.stringify(inst, null, 2));
}

main().finally(() => p.$disconnect());
