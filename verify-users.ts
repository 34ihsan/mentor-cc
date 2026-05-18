import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Fetching users and verifying password 'password123'...");
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        password: true
      }
    });
    console.log(`Found ${users.length} users:`);
    for (const u of users) {
      const isMatch = bcrypt.compareSync('password123', u.password);
      console.log(`- ${u.email} (Role: ${u.role}, Name: ${u.name}): Password matches 'password123'? ${isMatch ? "YES" : "NO"} (Hash: ${u.password})`);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
