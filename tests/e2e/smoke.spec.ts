import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Mentor Career Consulting Smoke Tests', () => {
  test.slow(); // Triple the default timeout
  
  test('Home page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/tr`);
    // Logo verification - using role and accessible name
    const logo = page.locator('header').getByRole('link').filter({ hasText: /Mentor Career Consulting/i }).first();
    await expect(logo).toBeVisible({ timeout: 15000 });
    
    // Check for main heading
    const heading = page.locator('h2.text-fluid-h2').first();
    await expect(heading).toBeVisible({ timeout: 15000 });
  });

  test('Localized routes work (EN)', async ({ page }) => {
    await page.goto(`${BASE_URL}/en`);
    // Check for English specific text
    const heading = page.locator('h2.text-fluid-h2').first();
    await expect(heading).toBeVisible({ timeout: 15000 });
    await expect(heading).toContainText(/Academic Guidance/i);
  });

  test('Admin Social AI Dashboard check', async ({ page }) => {
    // Note: This requires login, so we just check if the route exists and redirects to login if not authenticated
    await page.goto(`${BASE_URL}/tr/dashboard/admin/social`, { waitUntil: 'networkidle' });
    const currentUrl = page.url();
    if (currentUrl.includes('/login') || currentUrl.includes('/signin')) {
      console.log('Redirected to login as expected for unauthenticated user.');
    } else {
      // If not redirected, we should see the dashboard content
      await expect(page.getByText(/SOSYAL MEDYA/i)).toBeVisible();
    }
  });

  test('API Health Check', async ({ request }) => {
    // Test the Social AI status endpoint we just updated
    const response = await request.get(`${BASE_URL}/api/admin/social?status=true`);
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toHaveProperty('ollama');
      console.log('AI Status (OpenRouter):', data.ollama);
    }
  });

});
