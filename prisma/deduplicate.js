const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const institutions = await p.institution.findMany({
    include: {
      programs: {
        include: { _count: { select: { applications: true } } }
      },
      _count: { select: { resources: true } }
    }
  });

  const nameMap = {};
  institutions.forEach(inst => {
    const normalizedName = inst.name.toLowerCase().trim();
    if (!nameMap[normalizedName]) {
      nameMap[normalizedName] = [];
    }
    nameMap[normalizedName].push(inst);
  });

  console.log('--- Deduplication Process ---');

  for (const [name, list] of Object.entries(nameMap)) {
    if (list.length > 1) {
      console.log(`\nResolving duplicates for: "${list[0].name}"`);

      // Criteria for winner: Most programs, or has JSON data (tuition, features)
      const sorted = list.sort((a, b) => {
        // Prefer ones with JSON data
        const aHasData = a.tuition || a.features ? 1 : 0;
        const bHasData = b.tuition || b.features ? 1 : 0;
        if (aHasData !== bHasData) return bHasData - aHasData;
        
        // Then prefer ones with more programs
        return b.programs.length - a.programs.length;
      });

      const winner = sorted[0];
      const losers = sorted.slice(1);

      console.log(`  KEEPING: ID: ${winner.id}, Slug: ${winner.slug}, Programs: ${winner.programs.length}`);

      for (const loser of losers) {
        // Check for applications in loser's programs
        const hasApplications = loser.programs.some(prog => prog._count.applications > 0);
        
        if (hasApplications) {
          console.warn(`  SKIPPING deletion of ${loser.slug} (ID: ${loser.id}) because it has APPLICATIONS!`);
          continue;
        }

        console.log(`  DELETING: ID: ${loser.id}, Slug: ${loser.slug}`);
        
        // 1. Delete loser's programs
        await p.program.deleteMany({ where: { institutionId: loser.id } });
        
        // 2. Delete loser's resources
        await p.resource.deleteMany({ where: { institutionId: loser.id } });
        
        // 3. Delete institution
        await p.institution.delete({ where: { id: loser.id } });
      }
    }
  }

  console.log('\nDeduplication complete!');
}

main().finally(() => p.$disconnect());
