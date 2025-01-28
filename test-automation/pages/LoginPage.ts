import { Locator, Page } from '@playwright/test';
import { LoginData, UserData } from '@customTypes/index';
import BasePage from './BasePage';
import RegisterFormPage from './RegisterFormPage';

class LoginPage extends BasePage {
  private readonly loginEmailAddressTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly loginButton: Locator;
  private readonly nameTextbox: Locator;
  private readonly signupEmailAddressTextbox: Locator;
  private readonly signupButton: Locator;
  readonly pageTitle: string;

  constructor(page: Page) {
    super(page);

    this.loginEmailAddressTextbox = page
      .getByRole('textbox', {
        name: 'Email address',
      })
      .nth(0);
    this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.nameTextbox = page.getByRole('textbox', { name: 'Name' });
    this.signupEmailAddressTextbox = page
      .getByRole('textbox', { name: 'Email address' })
      .nth(1);
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.pageTitle = 'Automation Exercise - Signup / Login';
  }

  private async fillLoginEmailAddress(email: string): Promise<void> {
    await this.loginEmailAddressTextbox.fill(email);
  }

  private async fillPassword(password: string): Promise<void> {
    await this.passwordTextbox.fill(password);
  }

  private async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  private async fillName(name: string): Promise<void> {
    await this.nameTextbox.fill(name);
  }

  private async fillSignupEmailAddress(email: string): Promise<void> {
    await this.signupEmailAddressTextbox.fill(email);
  }

  private async clickSignupButton(): Promise<void> {
    await this.signupButton.click();
  }

  async navigateTo(): Promise<void> {
    await this.visitAutomationPractice();
    await this.signupLoginLink.click();
  }

  public async login(loginData: LoginData): Promise<void> {
    await this.fillLoginEmailAddress(loginData.email);
    await this.fillPassword(loginData.password);
    await this.clickLoginButton();
  }

  public async signup(userData: UserData): Promise<RegisterFormPage> {
    await this.fillName(userData.name);
    await this.fillSignupEmailAddress(userData.email);
    await this.clickSignupButton();

    return new RegisterFormPage(this.page);
  }
}

export default LoginPage;
