import { test as base } from '@playwright/test';
import { PageFixtures } from '@customTypes/index';
import { ContactUsPage, LoginPage, RegisterFormPage } from '@pages/index';

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerFormPage: async ({ page }, use) => {
    await use(new RegisterFormPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
});
