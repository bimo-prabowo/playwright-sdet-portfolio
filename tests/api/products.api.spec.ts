import { test, expect } from '@playwright/test';

const baseUrl = process.env.DUMMYJSON_BASE_URL!;

test('@api @smoke should get product list', async ({ request }) => {
  const response = await request.get(`${baseUrl}/products`);
  const responseBody = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(responseBody.products).toBeDefined();
  expect(Array.isArray(responseBody.products)).toBeTruthy();
  expect(responseBody.products.length).toBeGreaterThan(0);
  expect(responseBody.total).toBeGreaterThan(0);
});

test('@api @smoke should get product by id', async ({ request }) => {
  const response = await request.get(`${baseUrl}/products/1`);
  const responseBody = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(responseBody.id).toEqual(1);
  expect(responseBody.title).toEqual('Essence Mascara Lash Princess');
  expect(responseBody.price).toEqual(9.99);
});

test('@api @smoke should search products by keyword', async ({ request }) => {
  const searchKeyword = 'phone';

  const response = await request.get(`${baseUrl}/products/search`, {
    params: {
      q: searchKeyword,
    },
  });
  const responseBody = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(responseBody.products).toBeDefined();
  expect(Array.isArray(responseBody.products)).toBeTruthy();
  expect(responseBody.products.length).toBeGreaterThan(0);

  for (const product of responseBody.products) {
    const searchableText = `${product.title} ${product.description} ${product.category}`.toLowerCase();
    expect(searchableText).toContain(searchKeyword);
  }
});