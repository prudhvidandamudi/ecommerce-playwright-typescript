import { test as base, expect } from '@playwright/test';
import { PageFixtures, TestFixtures } from '@customTypes/index';
import {
  ContactUsPage,
  HomePage,
  LoginPage,
  RegisterFormPage,
} from '@pages/index';
import { AccountClient } from 'api/AccountClient';
import DataFactory from '@utils/data/DataFactory';

type UiFixtures = PageFixtures & TestFixtures;

export const test = base.extend<UiFixtures>({
  // Page Fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerFormPage: async ({ page }, use) => {
    await use(new RegisterFormPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // Test data Fixtures
  testUser: async ({ request }, use) => {
    const accountClient = new AccountClient(request);
    const userData = DataFactory.generateUserData();
    const accountCreatedResponse = await accountClient.createAccount(userData);
    let responseBody = await accountCreatedResponse.json();
    expect(responseBody.responseCode).toEqual(201);
    await use(userData);
    const accountDeletedResponse = await accountClient.deleteAccount({
      email: userData.email,
      password: userData.password,
    });
    responseBody = await accountDeletedResponse.json();
    expect(responseBody.responseCode).toEqual(200);
  },
});
