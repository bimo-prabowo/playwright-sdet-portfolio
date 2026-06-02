import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { products } from '../../test-data/products';
import { checkoutInfo, checkoutSummary } from '../../test-data/checkout';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.SAUCEDEMO_STANDARD_USER!, process.env.SAUCEDEMO_PASSWORD!);

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack.name);
  await inventoryPage.expectCartBadgeCount(1);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectProductInCart(products.backpack.name);
  await cartPage.expectProductDescription(products.backpack.description);
  await cartPage.expectProductQuantity(products.backpack.quantity);
});

test('@e2e @smoke should complete checkout for Sauce Labs Backpack', async ({ page }) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  await cartPage.proceedToCheckout();

  await checkoutPage.expectInformationPageLoaded();
  await checkoutPage.fillCheckoutInformation(
    checkoutInfo.firstName,
    checkoutInfo.lastName,
    checkoutInfo.postalCode
  );
  await checkoutPage.continueToOverview();

  await checkoutPage.expectOverviewPageLoaded();
  await cartPage.expectProductInCart(products.backpack.name);
  await cartPage.expectProductDescription(products.backpack.description);
  await cartPage.expectProductQuantity(products.backpack.quantity);
  await cartPage.expectProductPrice(products.backpack.price);
  await checkoutPage.expectPaymentInfo(checkoutSummary.paymentInfo);
  await checkoutPage.expectShippingInfo(checkoutSummary.shippingInfo);
  await checkoutPage.expectSubtotal(checkoutSummary.subtotal);
  await checkoutPage.expectTax(checkoutSummary.tax);
  await checkoutPage.expectTotal(checkoutSummary.total);

  await checkoutPage.finishCheckout();
  await checkoutPage.expectCheckoutComplete();
});
