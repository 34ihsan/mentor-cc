import { randomBytes } from "crypto";

export function generateResetToken(): string {
  return randomBytes(32).toString("hex");
}

export function generateTokenExpiry(): Date {
  // Token expires in 1 hour
  return new Date(Date.now() + 3600000);
}
