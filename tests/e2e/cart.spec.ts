import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { products } from '../../test-data/products';

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

  await inventoryPage.addProductToCart(products.backpack.name);
  await inventoryPage.expectCartBadgeCount(1);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductInCart(products.backpack.name);
  await cartPage.expectProductDescription(products.backpack.description);
  await cartPage.expectProductQuantity(products.backpack.quantity);
  await cartPage.expectProductPrice(products.backpack.price);
});