import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const pageTitle = page.locator('[data-test="title"]');
  const cartLink = page.locator('[data-test="shopping-cart-link"]');

  await loginPage.goto();
  await loginPage.login(
    process.env.SAUCEDEMO_STANDARD_USER!,
    process.env.SAUCEDEMO_PASSWORD!
  );

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(pageTitle).toHaveText('Products');
  await expect(cartLink).toBeVisible();
});

test('should add product to cart and validate cart content', async ({ page }) => {
  const inventoryItems = page.locator('[data-test="inventory-item"]');
  const backpackItem = inventoryItems.filter({
    hasText: 'Sauce Labs Backpack',
  });

  const addToCartButton = backpackItem.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const removeButton = backpackItem.locator('[data-test="remove-sauce-labs-backpack"]');
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  const cartLink = page.locator('[data-test="shopping-cart-link"]');

  await expect(backpackItem).toBeVisible();
  await expect(addToCartButton).toBeVisible();

  await addToCartButton.click();

  await expect(addToCartButton).not.toBeVisible();
  await expect(removeButton).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  await cartLink.click();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1');
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('carry.allTheThings');
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
});