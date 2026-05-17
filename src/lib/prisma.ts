import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
} else {
    // In production, we still want to attach it to globalThis to prevent 
    // multiple instances during heavy load or module re-evaluations
    if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;
}
