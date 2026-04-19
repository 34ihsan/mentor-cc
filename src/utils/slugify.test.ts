import { describe, it, expect } from 'vitest';
import { slugify } from './slugify';

describe('slugify utility', () => {
  it('should convert Turkish characters correctly', () => {
    const input = 'İstanbul Şehir Rehberi Çılgın Ördekler';
    const expected = 'istanbul-sehir-rehberi-cilgin-ordekler';
    expect(slugify(input)).toBe(expected);
  });

  it('should handle special characters and multiple spaces', () => {
    const input = 'Hello! World @ 2024   Test';
    const expected = 'hello-world-2024-test';
    expect(slugify(input)).toBe(expected);
  });

  it('should trim dashes from ends', () => {
    const input = '---Hello World---';
    const expected = 'hello-world';
    expect(slugify(input)).toBe(expected);
  });

  it('should handle empty strings', () => {
    expect(slugify('')).toBe('');
  });
});
