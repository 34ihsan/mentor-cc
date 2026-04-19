import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'Password123!';
  const testName = 'Test User';

  test('should register a new student and redirect to dashboard', async ({ page }) => {
    // 1. Navigate to register page
    console.log('Navigating to register page...');
    await page.goto('/tr/auth/register', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('h2:has-text("Kayıt Ol")', { timeout: 30000 });
    
    // Accept cookies if present
    const cookieButton = page.locator('button:has-text("Hepsini Kabul Et")');
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }

    // 2. Step 1: Select Student Role
    console.log('Selecting Student role...');
    await page.click('button:has-text("Öğrenci Kaydı")');
    await page.click('button:has-text("Bilgileri Doldur")');

    // 3. Step 2: Fill Personal Information
    console.log('Filling form fields...');
    await page.fill('input[placeholder="Ad Soyad"]', testName);
    await page.fill('input[placeholder="email@adres.com"]', testEmail);
    await page.fill('input[placeholder="05xx..."]', '05554443322');
    
    // Passwords - be more specific due to identical placeholders
    await page.locator('div').filter({ hasText: /^Şifre$/ }).getByPlaceholder('••••••••').fill(testPassword);
    await page.locator('div').filter({ hasText: /^Şifre Onayı$/ }).getByPlaceholder('••••••••').fill(testPassword);

    // 4. Submit Registration
    console.log('Submitting registration form...');
    const submitBtn = page.getByRole('button', { name: /Kayıt İşlemini Tamamla/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // 5. Verification: Should be on dashboard
    console.log('Waiting for redirection to dashboard...');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 20000 });
    // Check for dashboard content
    await expect(page.locator('body')).toContainText(/Dashboard|Panel|Hoş Geldiniz/i);
  });

  test('should login with newly created account', async ({ page }) => {
    // 1. Navigate to login page
    console.log('Navigating to login page...');
    await page.goto('/tr/auth/login', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('h2:has-text("Hoş Geldiniz")', { timeout: 30000 });

    // 2. Fill login credentials
    await page.fill('input[placeholder="ornek@email.com"]', testEmail);
    await page.fill('input[placeholder="••••••••"]', testPassword);

    // 3. Submit Login
    console.log('Submitting login...');
    await page.click('button:has-text("Giriş Yap")');

    // 4. Verification: Should be on dashboard
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 20000 });
  });
});
