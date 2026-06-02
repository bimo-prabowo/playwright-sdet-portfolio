import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemQuantity: Locator;
  readonly itemPrice: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectProductInCart(productName: string) {
    await expect(this.itemName).toHaveText(productName);
  }

  async expectProductDescription(productDescription: string) {
    await expect(this.itemDescription).toContainText(productDescription);
  }

  async expectProductQuantity(productQuantity: string) {
    await expect(this.itemQuantity).toHaveText(productQuantity);
  }

  async expectProductPrice(productPrice: string) {
    await expect(this.itemPrice).toHaveText(productPrice);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.title).toHaveText('Checkout: Your Information');
  }
}
