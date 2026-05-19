import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-test="username"]')).toBeVisible();

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

test('should display inventory items after login', async ({ page }) => {
  const inventoryList = page.locator('[data-test="inventory-list"]');
  const inventoryItems = page.locator('[data-test="inventory-item"]');
  const backpackItem = inventoryItems.filter({
    hasText: 'Sauce Labs Backpack',
  });

  await expect(inventoryList).toBeVisible();
  await expect(inventoryItems).toHaveCount(6);

  await expect(backpackItem).toBeVisible();
  await expect(backpackItem.locator('[data-test="inventory-item-name"]')).toHaveText(
    'Sauce Labs Backpack'
  );
  await expect(backpackItem.locator('[data-test="inventory-item-desc"]')).toContainText(
    'carry.allTheThings'
  );
  await expect(backpackItem.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
  await expect(
    backpackItem.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
  ).toBeVisible();
});