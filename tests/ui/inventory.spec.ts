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

test('@ui @smoke should display inventory items after login', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const backpackItem = inventoryPage.getProductByName('Sauce Labs Backpack');

  await expect(inventoryPage.inventoryItems).toHaveCount(6);

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