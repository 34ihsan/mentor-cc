import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma } from "./prisma";
import { Role } from "@prisma/client";

describe("Prisma Integration Tests (Staging DB)", () => {
  const testUser = {
    email: `test-${Date.now()}@mentor-cc.com`,
    name: "Integration Test User",
    password: "hashed_password_123",
    role: Role.CEO, // Using a valid role from the schema
  };

  beforeAll(async () => {
    // Cleanup any existing test data if needed
    await prisma.user.deleteMany({
      where: { email: { startsWith: "test-" } },
    });
  });

  afterAll(async () => {
    // Final cleanup
    await prisma.user.deleteMany({
      where: { email: { startsWith: "test-" } },
    });
    // We don't disconnect in the singleton, but Vitest might need it to exit
    // await prisma.$disconnect();
  });

  it("should connect to the staging database", async () => {
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    expect(result).toEqual([{ connected: 1 }]);
  });

  it("should create a new user in the database", async () => {
    const user = await prisma.user.create({
      data: testUser,
    });
    expect(user).toBeDefined();
    expect(user.email).toBe(testUser.email);
    expect(user.role).toBe(testUser.role);
  });

  it("should find the created user", async () => {
    const user = await prisma.user.findUnique({
      where: { email: testUser.email },
    });
    expect(user).not.toBeNull();
    expect(user?.name).toBe(testUser.name);
  });

  it("should update user information", async () => {
    const updatedUser = await prisma.user.update({
      where: { email: testUser.email },
      data: { name: "Updated Name" },
    });
    expect(updatedUser.name).toBe("Updated Name");
  });

  it("should delete the test user", async () => {
    const deletedUser = await prisma.user.delete({
      where: { email: testUser.email },
    });
    expect(deletedUser.email).toBe(testUser.email);

    const findDeleted = await prisma.user.findUnique({
      where: { email: testUser.email },
    });
    expect(findDeleted).toBeNull();
  });
});
