import { test, expect } from '@playwright/test';
import { ProductApiClient } from '../../utils/productApiClient';

const baseUrl = process.env.DUMMYJSON_BASE_URL!;

test('@api @smoke should get product list', async ({ request }) => {
  const productApiClient = new ProductApiClient(request, baseUrl);
  const response = await productApiClient.getProducts();
  const responseBody = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(responseBody.products).toBeDefined();
  expect(Array.isArray(responseBody.products)).toBeTruthy();
  expect(responseBody.products.length).toBeGreaterThan(0);
  expect(responseBody.total).toBeGreaterThan(0);
});

test('@api @smoke should get product by id', async ({ request }) => {
  const productApiClient = new ProductApiClient(request, baseUrl);
  const response = await productApiClient.getProductById(1);
  const responseBody = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(responseBody.id).toEqual(1);
  expect(responseBody.title).toEqual('Essence Mascara Lash Princess');
  expect(responseBody.price).toEqual(9.99);
});

test('@api @smoke should search products by keyword', async ({ request }) => {
  const productApiClient = new ProductApiClient(request, baseUrl);
  const searchKeyword = 'phone';
  const response = await productApiClient.searchProducts(searchKeyword);
  const responseBody = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(responseBody.products).toBeDefined();
  expect(Array.isArray(responseBody.products)).toBeTruthy();
  expect(responseBody.products.length).toBeGreaterThan(0);

  for (const product of responseBody.products) {
    const searchableText =
      `${product.title} ${product.description} ${product.category}`.toLowerCase();
    expect(searchableText).toContain(searchKeyword);
  }
});
