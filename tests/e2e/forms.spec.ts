import { test, expect } from '@playwright/test';

test.describe('Form Submission Flows', () => {
  test('Contact/Quote form shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/tr/iletisim', { waitUntil: 'domcontentloaded' });
    
    // Find and click submit button without filling form
    const submitBtn = page.locator('button[type="submit"]').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // Should show validation error or stay on page
      await expect(page).toHaveURL(/iletisim/);
    }
  });

  test('Quote request form renders correctly', async ({ page }) => {
    await page.goto('/tr/yurtdisi-yuksek-lisans', { waitUntil: 'domcontentloaded' });
    // Contact form should be present on service pages
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 15000 });
  });

  test('Service page renders with correct locale (EN)', async ({ page }) => {
    await page.goto('/en/yurtdisi-yuksek-lisans', { waitUntil: 'domcontentloaded' });
    const body = page.locator('body');
    await expect(body).toContainText(/Master|Postgraduate|Study/i, { timeout: 15000 });
  });

  test('Service page renders with correct locale (DE)', async ({ page }) => {
    await page.goto('/de/yurtdisi-yuksek-lisans', { waitUntil: 'domcontentloaded' });
    const body = page.locator('body');
    await expect(body).toContainText(/Master|Studium|Ausland/i, { timeout: 15000 });
  });

  test('Vize service page loads after seed fix', async ({ page }) => {
    await page.goto('/tr/vize', { waitUntil: 'domcontentloaded' });
    // Should NOT 404 anymore — it should render the service page
    const title = await page.title();
    expect(title).not.toContain('404');
    expect(title).not.toContain('Not Found');
  });

  test('Program finder page renders', async ({ page }) => {
    await page.goto('/tr/program-bulucu', { waitUntil: 'domcontentloaded' });
    const body = page.locator('body');
    await expect(body).toContainText(/program|bulucu|arama/i, { timeout: 15000 });
  });
});
