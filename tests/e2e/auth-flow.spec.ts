import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@mentor-cc.com';
const ADMIN_PASSWORD = 'password123';

test.describe('Authentication Flows', () => {
  test('Login page loads correctly', async ({ page }) => {
    await page.goto('/auth/login', { waitUntil: 'networkidle' });
    await expect(page.locator('body')).toContainText(/Giriş|Login|Hoş Geldiniz/i, { timeout: 15000 });
  });

  test('Login redirects to dashboard on valid credentials', async ({ page }) => {
    await page.goto('/auth/login', { waitUntil: 'networkidle' });
    
    // Fill credentials
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    
    await emailInput.fill(ADMIN_EMAIL);
    await passwordInput.fill(ADMIN_PASSWORD);
    
    // Submit
    await page.locator('button[type="submit"]').first().click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/dashboard/, { timeout: 25000 });
  });

  test('Unauthenticated dashboard access redirects to login', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'networkidle' });
    const url = page.url();
    // Should redirect to login or signin
    expect(url).toMatch(/login|signin|auth/i);
  });

  test('Register page renders', async ({ page }) => {
    await page.goto('/auth/register', { waitUntil: 'networkidle' });
    await expect(page.locator('body')).toContainText(/Kayıt|Hesap|Register/i, { timeout: 15000 });
  });
});

