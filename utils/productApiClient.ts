import { type APIRequestContext, type APIResponse } from '@playwright/test';

export class ProductApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string
  ) {}

  async getProducts(): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/products`);
  }

  async getProductById(productId: number | string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/products/${productId}`);
  }

  async searchProducts(keyword: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/products/search`, {
      params: {
        q: keyword,
      },
    });
  }
}
