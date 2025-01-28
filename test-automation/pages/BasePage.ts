import { expect, Locator, Page } from '@playwright/test';
import LoginPage from './LoginPage';

abstract class BasePage {
  protected readonly page: Page;
  protected readonly homeLink: Locator;
  protected readonly productsLink: Locator;
  protected readonly cartLink: Locator;
  protected readonly signupLoginLink: Locator;
  protected readonly contactUsLink: Locator;
  protected readonly logoutLink: Locator;
  protected readonly deleteAccountLink: Locator;
  protected readonly accountDeletedMessage: Locator;
  protected readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact Us' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    this.accountDeletedMessage = page.getByText('Account Deleted!');
    this.continueButton = page.getByTestId('continue-button');
  }

  public async visitAutomationPractice() {
    await this.page.goto('./');
  }

  abstract navigateTo(): Promise<void>;

  public async logout(): Promise<LoginPage> {
    await this.logoutLink.click();
    return new LoginPage(this.page);
  }

  public async validateAccountDeleted() {
    await expect(this.accountDeletedMessage).toHaveText('Account Deleted!');
  }

  public async clickContinueButton() {
    await this.continueButton.click();
  }
}

export default BasePage;
