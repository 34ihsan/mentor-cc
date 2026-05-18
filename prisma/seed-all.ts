import { execSync } from 'child_process';
import path from 'path';

const prismaDir = __dirname;

const seedScripts = [
  'seed.ts',
  'seed-undergrad.ts',
  'seed-masters.ts',
  'seed-highschool.ts',
  'seed-mega-institutions.ts',
  'seed-non-university.ts',
  'seed-united-towers.ts',
  'seed-global-expansion.ts',
  'seed-comprehensive-universities.ts',
  'add-missing-countries.ts',
  'enrich-countries.ts',
  'enrich-expert.ts',
  'enrich-content.ts',
  'enrich-all.ts',
  'seed-test-workflow.ts'
];

async function main() {
  console.log('🚀 Starting Consolidated Master Seeding Process...');
  
  for (const script of seedScripts) {
    const scriptPath = path.join(prismaDir, script);
    console.log(`\n⏳ Running seed script: ${script}...`);
    try {
      execSync(`npx tsx "${scriptPath}"`, { stdio: 'inherit' });
      console.log(`✅ Completed: ${script}`);
    } catch (error) {
      console.error(`❌ Error executing ${script}:`, error);
      process.exit(1);
    }
  }
  
  console.log('\n🎉 ALL SEED SCRIPTS COMPLETED SUCCESSFULLY! Database is fully populated with all users, countries, services, and institutions.');
}

main();
