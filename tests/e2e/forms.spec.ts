import { test, expect } from '@playwright/test';

test.describe('Form Submission Flows', () => {
  test('Contact/Quote form prevents empty submit by disabling button', async ({ page }) => {
    await page.goto('/iletisim', { waitUntil: 'domcontentloaded' });
    
    // Submit button should be disabled by default (due to reCAPTCHA and policy acceptance)
    const submitBtn = page.locator('button[type="submit"]').first();
    await expect(submitBtn).toBeVisible({ timeout: 15000 });
    await expect(submitBtn).toBeDisabled();
  });

  test('Quote request form renders correctly', async ({ page }) => {
    await page.goto('/yurtdisi-yuksek-lisans', { waitUntil: 'domcontentloaded' });
    // Contact form should be present on service pages
    const form = page.locator('form').first();
    await expect(form).toBeVisible({ timeout: 15000 });
  });

  test('Service page renders with correct locale (EN)', async ({ page, context }) => {
    await context.addCookies([{
      name: 'NEXT_LOCALE',
      value: 'en',
      domain: 'localhost',
      path: '/'
    }]);
    await page.goto('/yurtdisi-yuksek-lisans', { waitUntil: 'domcontentloaded' });
    const body = page.locator('body');
    await expect(body).toContainText(/Master|Postgraduate|Study/i, { timeout: 15000 });
  });

  test('Vize service page loads after seed fix', async ({ page }) => {
    await page.goto('/vize', { waitUntil: 'domcontentloaded' });
    // Should NOT 404 anymore — it should render the service page
    const title = await page.title();
    expect(title).not.toContain('404');
    expect(title).not.toContain('Not Found');
  });

  test('Program finder page renders', async ({ page }) => {
    await page.goto('/program-bulucu', { waitUntil: 'domcontentloaded' });
    const body = page.locator('body');
    await expect(body).toContainText(/program|bulucu|arama/i, { timeout: 15000 });
  });
});

