import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly completeContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.completeContainer = page.locator('[data-test="checkout-complete-container"]');
  }

  async expectInformationPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async expectOverviewPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async expectPaymentInfo(expectedPaymentInfo: string) {
    await expect(this.paymentInfo).toHaveText(expectedPaymentInfo);
  }

  async expectShippingInfo(expectedShippingInfo: string) {
    await expect(this.shippingInfo).toHaveText(expectedShippingInfo);
  }

  async expectSubtotal(expectedSubtotal: string) {
    await expect(this.subtotalLabel).toContainText(expectedSubtotal);
  }

  async expectTax(expectedTax: string) {
    await expect(this.taxLabel).toContainText(expectedTax);
  }

  async expectTotal(expectedTotal: string) {
    await expect(this.totalLabel).toContainText(expectedTotal);
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async expectCheckoutComplete() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.completeContainer).toBeVisible();
  }
}
