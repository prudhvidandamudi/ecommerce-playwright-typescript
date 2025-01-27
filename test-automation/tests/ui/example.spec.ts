import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('./');

  await page.getByRole('link', { name: 'Signup / Login' }).click();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
