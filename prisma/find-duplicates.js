const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const institutions = await p.institution.findMany({
    select: { id: true, name: true, slug: true, countryId: true }
  });

  const nameMap = {};
  institutions.forEach(inst => {
    const normalizedName = inst.name.toLowerCase().trim();
    if (!nameMap[normalizedName]) {
      nameMap[normalizedName] = [];
    }
    nameMap[normalizedName].push(inst);
  });

  console.log('--- Duplicate Institutions Check ---');
  let duplicatesFound = false;
  for (const [name, list] of Object.entries(nameMap)) {
    if (list.length > 1) {
      duplicatesFound = true;
      console.log(`\nDuplicate found for name: "${list[0].name}"`);
      list.forEach(item => {
        console.log(`  ID: ${item.id}, Slug: ${item.slug}, CountryID: ${item.countryId}`);
      });
    }
  }

  if (!duplicatesFound) {
    console.log('No duplicates found based on name.');
  }
}

main().finally(() => p.$disconnect());
