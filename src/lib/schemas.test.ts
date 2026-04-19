import { describe, it, expect } from 'vitest';
import { ContactFormSchema, SEOActionSchema, HarvesterSchema } from './schemas';

describe('Form Validation Schemas', () => {
  describe('ContactFormSchema', () => {
    it('should validate a correct contact form', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with more than 10 characters.'
      };
      const result = ContactFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail for incorrect email', () => {
      const data = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Valid message content'
      };
      const result = ContactFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Geçerli bir e-posta adresi giriniz');
      }
    });

    it('should fail for short message', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short'
      };
      const result = ContactFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('SEOActionSchema', () => {
    it('should fail for short content', () => {
      const data = {
        title: 'Valid title with enough length',
        content: 'Too short',
        keyword: 'test'
      };
      const result = SEOActionSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('HarvesterSchema', () => {
    it('should validate a correct URL', () => {
      const data = { url: 'https://starberatung.com' };
      const result = HarvesterSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail for invalid URL', () => {
      const data = { url: 'not-a-url' };
      const result = HarvesterSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
