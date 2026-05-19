import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-test="username"]')).toBeVisible();
});

test('should login successfully with valid credentials', async ({ page }) => {
  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');
  const pageTitle = page.locator('[data-test="title"]');
  const cartLink = page.locator('[data-test="shopping-cart-link"]');

  await usernameInput.fill(process.env.SAUCEDEMO_STANDARD_USER!);
  await passwordInput.fill(process.env.SAUCEDEMO_PASSWORD!);
  await loginButton.click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(pageTitle).toHaveText('Products');
  await expect(cartLink).toBeVisible();
});

test('should show locked out error for locked out user', async ({ page }) => {
  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');
  const errorMessage = page.locator('[data-test="error"]');

  await usernameInput.fill(process.env.SAUCEDEMO_LOCKED_OUT_USER!);
  await passwordInput.fill(process.env.SAUCEDEMO_PASSWORD!);
  await loginButton.click();

  await expect(page).not.toHaveURL(/inventory\.html/);
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
});