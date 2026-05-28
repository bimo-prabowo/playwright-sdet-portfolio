import { test, expect } from '@playwright/test';
import { ProductApiClient } from '../../utils/productApiClient';

const baseUrl = process.env.DUMMYJSON_BASE_URL!;

test('@api should return 404 for non-existing product id', async ({ request }) => {
  const productApiClient = new ProductApiClient(request, baseUrl);
  const response = await productApiClient.getProductById(999999);
  const responseBody = await response.json();

  expect(response.status()).toBe(404);
  expect(responseBody.message).toBeTruthy();
});

test('@api should return empty results for unmatched product search', async ({ request }) => {
  const productApiClient = new ProductApiClient(request, baseUrl);
  const response = await productApiClient.searchProducts('nonexistentproductkeyword');
  const responseBody = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(responseBody.products).toEqual([]);
  expect(responseBody.total).toBe(0);
});

test('@api should return 404 for invalid product path parameter', async ({ request }) => {
  const productApiClient = new ProductApiClient(request, baseUrl);
  const response = await productApiClient.getProductById('invalid-product-id');
  const responseBody = await response.json();

  expect(response.status()).toBe(404);
  expect(responseBody.message).toBeTruthy();
});