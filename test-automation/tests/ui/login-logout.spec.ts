import { LoginData } from '@customTypes/user.types';
import { test } from '@fixtures/ui.fixtures';
import { expect } from '@playwright/test';

test.describe('User Login and Logout Test', () => {
  test('should be able to successfully login!', async ({
    loginPage,
    homePage,
    testUser,

    page,
  }) => {
    await loginPage.navigateTo();
    const loginData: LoginData = {
      email: testUser.email,
      password: testUser.password,
    };
    await loginPage.login(loginData);

    await expect(page).toHaveTitle(homePage.homePageTitle);
  });

  test('should be able to successfully logout!', async ({
    loginPage,
    testUser,

    page,
  }) => {
    await loginPage.navigateTo();

    const loginData: LoginData = {
      email: testUser.email,
      password: testUser.password,
    };
    await loginPage.login(loginData);
    await loginPage.logout();

    await expect(page).toHaveTitle(loginPage.pageTitle);
  });
});
