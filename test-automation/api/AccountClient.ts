import { LoginData, UserData } from '@customTypes/index';
import { BaseClient } from './BaseClient';
import { APIResponse } from '@playwright/test';
import { DataTransformer } from '@utils/data/DataTransformer';

export class AccountClient extends BaseClient {
  private readonly createAccountUrl = '/api/createAccount';
  private readonly deleteAccountUrl = '/api/deleteAccount';

  async createAccount(userData: UserData): Promise<APIResponse> {
    const apiUserData = DataTransformer.transformToCreateUserDataApi(userData);

    return this.post(this.createAccountUrl, {
      form: apiUserData,
      failOnStatusCode: true,
    });
  }

  async deleteAccount(loginData: LoginData): Promise<APIResponse> {
    const formData = new URLSearchParams();
    formData.append('email', loginData.email);
    formData.append('password', loginData.password);

    return this.delete(this.deleteAccountUrl, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: formData.toString(),
      failOnStatusCode: true,
    });
  }
}
