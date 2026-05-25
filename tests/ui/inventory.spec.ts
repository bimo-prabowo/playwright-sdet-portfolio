import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { products } from '../../test-data/Products';

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
  const backpackItem = inventoryPage.getProductByName(products.backpack.name);

  await expect(inventoryPage.inventoryItems).toHaveCount(6);

  await expect(backpackItem).toBeVisible();
  await expect(backpackItem.locator('[data-test="inventory-item-name"]')).toHaveText(
    products.backpack.name
  );
  await expect(backpackItem.locator('[data-test="inventory-item-desc"]')).toContainText(
    products.backpack.description
  );
  await expect(backpackItem.locator('[data-test="inventory-item-price"]')).toHaveText(
    products.backpack.price
  );
  await expect(
    backpackItem.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
  ).toBeVisible();
});