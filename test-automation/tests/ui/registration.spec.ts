import { test } from '@fixtures/ui.fixtures';
import { expect } from '@playwright/test';
import DataFactory from '@utils/data/DataFactory';

test.describe('User Registration', () => {
  test('Should register new user successfully', async ({
    loginPage,
    registerFormPage,
  }) => {
    const userData = DataFactory.generateUserData();

    await loginPage.navigateTo();
    await loginPage.signup(userData);
    await registerFormPage.fillRegisterForm(userData);

    await expect(registerFormPage.accountCreatedMessage).toBeVisible();
  });
});
