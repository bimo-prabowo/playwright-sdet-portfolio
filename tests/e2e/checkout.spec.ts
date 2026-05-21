import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

const productName = 'Sauce Labs Backpack';

const checkoutInfo = {
  firstName: 'Sample Firstname',
  lastName: 'Sample Lastname',
  postalCode: '12345',
};

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(
    process.env.SAUCEDEMO_STANDARD_USER!,
    process.env.SAUCEDEMO_PASSWORD!
  );

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(productName);
  await inventoryPage.expectCartBadgeCount(1);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductInCart(productName);
  await cartPage.expectProductDescription('carry.allTheThings');
  await cartPage.expectProductQuantity('1');
});

test('should complete checkout for Sauce Labs Backpack', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.proceedToCheckout();

  await page.locator('[data-test="firstName"]').fill(checkoutInfo.firstName);
  await page.locator('[data-test="lastName"]').fill(checkoutInfo.lastName);
  await page.locator('[data-test="postalCode"]').fill(checkoutInfo.postalCode);
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  await cartPage.expectProductInCart(productName);
  await cartPage.expectProductDescription('carry.allTheThings');
  await cartPage.expectProductQuantity('1');
  await cartPage.expectProductPrice('$29.99');

  await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');
  await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText(
    'Free Pony Express Delivery!'
  );
  await expect(page.locator('[data-test="subtotal-label"]')).toContainText('$29.99');
  await expect(page.locator('[data-test="tax-label"]')).toContainText('$2.40');
  await expect(page.locator('[data-test="total-label"]')).toContainText('$32.39');

  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
  await expect(page.locator('[data-test="checkout-complete-container"]')).toBeVisible();
});