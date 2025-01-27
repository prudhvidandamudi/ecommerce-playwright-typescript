import { expect, Locator, Page } from '@playwright/test';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ContactUsPage from './ContactUsPage';

class BasePage {
  protected readonly page: Page;
  private readonly homeLink: Locator;
  private readonly productsLink: Locator;
  private readonly cartLink: Locator;
  private readonly signupLoginLink: Locator;
  private readonly contactUsLink: Locator;
  private readonly logoutLink: Locator;
  private readonly deleteAccountLink: Locator;
  private readonly accountDeletedMessage: Locator;
  private readonly continueButton: Locator;

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

  public async loginPage(): Promise<LoginPage> {
    await this.signupLoginLink.click();
    return new LoginPage(this.page);
  }

  public async logout(): Promise<LoginPage> {
    await this.logoutLink.click();
    return new LoginPage(this.page);
  }

  public async homePage(): Promise<HomePage> {
    await this.homeLink.click();
    return new HomePage(this.page);
  }

  public async contactUsPage(): Promise<ContactUsPage> {
    await this.contactUsLink.click();
    return new ContactUsPage(this.page);
  }

  public async validateAccountDeleted() {
    await expect(this.accountDeletedMessage).toHaveText('Account Deleted!');
  }

  public async clickContinueButton() {
    await this.continueButton.click();
  }
}

export default BasePage;
