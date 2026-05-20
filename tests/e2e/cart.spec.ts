import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(
    process.env.SAUCEDEMO_STANDARD_USER!,
    process.env.SAUCEDEMO_PASSWORD!
  );

  await inventoryPage.expectLoaded();
});

test('should add product to cart and validate cart content', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.expectCartBadgeCount(1);
  await inventoryPage.openCart();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1');
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText(
    'carry.allTheThings'
  );
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
});