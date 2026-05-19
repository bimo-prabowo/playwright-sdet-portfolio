import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('should login successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const pageTitle = page.locator('[data-test="title"]');
  const cartLink = page.locator('[data-test="shopping-cart-link"]');

  await loginPage.login(
    process.env.SAUCEDEMO_STANDARD_USER!,
    process.env.SAUCEDEMO_PASSWORD!
  );

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(pageTitle).toHaveText('Products');
  await expect(cartLink).toBeVisible();
});

test('should show locked out error for locked out user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    process.env.SAUCEDEMO_LOCKED_OUT_USER!,
    process.env.SAUCEDEMO_PASSWORD!
  );

  await expect(page).not.toHaveURL(/inventory\.html/);
  await loginPage.expectLockedOutError();
});