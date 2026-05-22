import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

const productName = 'Sauce Labs Backpack';

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

test('@e2e @smoke should add product to cart and validate cart content', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.addProductToCart(productName);
  await inventoryPage.expectCartBadgeCount(1);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductInCart(productName);
  await cartPage.expectProductDescription('carry.allTheThings');
  await cartPage.expectProductQuantity('1');
  await cartPage.expectProductPrice('$29.99');
});