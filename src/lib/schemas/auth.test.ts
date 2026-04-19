import { describe, it, expect } from 'vitest';
import { LoginSchema, RegisterSchema, ContactSchema } from './auth';

describe('Auth Validation Schemas', () => {
  describe('LoginSchema', () => {
    it('should validate a correct login', () => {
      const data = { email: 'test@example.com', password: 'password123' };
      const result = LoginSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail for empty password', () => {
      const data = { email: 'test@example.com', password: '' };
      const result = LoginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('RegisterSchema', () => {
    it('should validate a correct registration', () => {
      const data = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'Password123',
        role: 'STUDENT'
      };
      const result = RegisterSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail for weak password', () => {
      const data = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password', // No uppercase, no number
        role: 'STUDENT'
      };
      const result = RegisterSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const messages = result.error.issues.map(i => i.message);
        expect(messages).toContain('Şifre en az bir büyük harf içermelidir.');
        expect(messages).toContain('Şifre en az bir rakam içermelidir.');
      }
    });

    it('should fail for short name', () => {
      const data = {
        name: 'J',
        email: 'jane@example.com',
        password: 'Password123',
        role: 'STUDENT'
      };
      const result = RegisterSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('ContactSchema', () => {
    it('should fail if service is missing', () => {
      const data = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        service: '',
        message: 'Hello, I need help with my application.'
      };
      const result = ContactSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
