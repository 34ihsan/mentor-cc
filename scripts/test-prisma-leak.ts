import { prisma } from "../src/lib/prisma";

async function runLeakTest() {
  console.log("🚀 Starting Prisma Connection Leak Test...");
  console.log("Testing singleton behavior and connection pooling...");

  const TOTAL_REQUESTS = 500;
  const CONCURRENCY = 50;

  let completed = 0;
  let errors = 0;

  const startTime = Date.now();

  async function executeBatch() {
    const promises = [];
    for (let i = 0; i < CONCURRENCY; i++) {
      promises.push(
        prisma.user.count()
          .then(() => {
            completed++;
            if (completed % 100 === 0) {
              console.log(`✅ Completed ${completed}/${TOTAL_REQUESTS} queries...`);
            }
          })
          .catch((err) => {
            errors++;
            console.error(`❌ Query Error: ${err.message}`);
          })
      );
    }
    await Promise.all(promises);
  }

  for (let i = 0; i < TOTAL_REQUESTS / CONCURRENCY; i++) {
    await executeBatch();
  }

  const duration = (Date.now() - startTime) / 1000;
  console.log("\n📊 --- Test Results ---");
  console.log(`Total Queries: ${TOTAL_REQUESTS}`);
  console.log(`Success: ${completed}`);
  console.log(`Errors: ${errors}`);
  console.log(`Duration: ${duration.toFixed(2)}s`);
  console.log(`Avg Response: ${((duration / TOTAL_REQUESTS) * 1000).toFixed(2)}ms`);
  
  // Checking if connections are active
  // In a real leak, repeated runs of this script without proper singleton
  // would eventually crash the DB connection pool.
}

runLeakTest()
  .then(async () => {
    // We intentionally DON'T disconnect here to see if the process exits cleanly
    // or if the pool stays open. 
    console.log("Test finished.");
  })
  .catch((err) => {
    console.error("Fatal Error:", err);
    process.exit(1);
  });
