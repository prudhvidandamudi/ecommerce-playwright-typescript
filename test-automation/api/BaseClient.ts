// api/BaseClient.ts
import { APIRequestContext, APIResponse } from '@playwright/test';

interface APIRequestOptions {
  data?: Record<string, string | number | boolean> | string;
  form?: Record<string, string | number | boolean> | FormData;
  headers?: Record<string, string>;
  failOnStatusCode?: boolean;
  ignoreHTTPSErrors?: boolean;
  maxRedirects?: number;
  timeout?: number;
}

export class BaseClient {
  constructor(protected request: APIRequestContext) {}

  protected async post(
    url: string,
    options?: APIRequestOptions
  ): Promise<APIResponse> {
    try {
      const response = await this.request.post(url, {
        headers: {
          'Content-Type': options?.form
            ? 'application/x-www-form-urlencoded'
            : 'application/json',
          ...options?.headers,
        },
        data: options?.data,
        form: options?.form,
        failOnStatusCode: options?.failOnStatusCode ?? true,
        ignoreHTTPSErrors: options?.ignoreHTTPSErrors,
        maxRedirects: options?.maxRedirects,
        timeout: options?.timeout,
      });

      return this.handleResponse(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`POST request failed: ${error.message}`);
      }

      throw new Error(`DELETE request failed with unknown error: ${error}`);
    }
  }

  protected async delete(
    url: string,
    options?: APIRequestOptions
  ): Promise<APIResponse> {
    try {
      const response = await this.request.delete(url, {
        headers: {
          'Content-Type': options?.form
            ? 'application/x-www-form-urlencoded'
            : 'application/json',
          ...options?.headers,
        },
        data: options?.data,
        form: options?.form,
        failOnStatusCode: options?.failOnStatusCode ?? true,
        ignoreHTTPSErrors: options?.ignoreHTTPSErrors,
        maxRedirects: options?.maxRedirects,
        timeout: options?.timeout,
      });

      return this.handleResponse(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`DELETE request failed: ${error.message}`);
      }

      throw new Error(`DELETE request failed with unknown error: ${error}`);
    }
  }

  private async handleResponse(response: APIResponse): Promise<APIResponse> {
    if (!response.ok()) {
      const errorBody = await response.text();
      throw new Error(
        `API request failed with status ${response.status()}: ${errorBody}`
      );
    }
    return response;
  }
}
