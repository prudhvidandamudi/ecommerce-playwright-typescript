import { expect, Locator, Page } from '@playwright/test';
import { UserData } from '@customTypes/index';
import BasePage from './BasePage';

class RegisterFormPage extends BasePage {
  private readonly mrRadioButton: Locator;
  private readonly mrsRadioButton: Locator;
  private readonly nameTextbox: Locator;
  private readonly emailTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly dayDropdown: Locator;
  private readonly monthDropdown: Locator;
  private readonly yearDropdown: Locator;
  private readonly newsletterCheckbox: Locator;
  private readonly specialOffersCheckbox: Locator;
  private readonly firstNameTextbox: Locator;
  private readonly lastNameTextbox: Locator;
  private readonly companyTextbox: Locator;
  private readonly addressTextbox: Locator;
  private readonly address2Textbox: Locator;
  private readonly countryDropdown: Locator;
  private readonly stateTextbox: Locator;
  private readonly cityTextbox: Locator;
  private readonly zipcodeTextbox: Locator;
  private readonly mobileNumberTextbox: Locator;
  private readonly createAccountButton: Locator;
  private readonly accountCreatedMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.mrRadioButton = page.getByRole('radio', { name: 'Mr.' });
    this.mrsRadioButton = page.getByRole('radio', { name: 'Mrs.' });
    this.nameTextbox = page.getByRole('textbox', {
      name: 'Name *',
      exact: true,
    });
    this.emailTextbox = page.getByRole('textbox', { name: 'Email *' });
    this.passwordTextbox = page.getByRole('textbox', { name: 'Password *' });
    this.dayDropdown = page.getByTestId('days');
    this.monthDropdown = page.getByTestId('months');
    this.yearDropdown = page.getByTestId('years');
    this.newsletterCheckbox = page.getByRole('checkbox', {
      name: 'Sign up for our newsletter!',
    });
    this.specialOffersCheckbox = page.getByRole('checkbox', {
      name: 'Receive special offers from',
    });
    this.firstNameTextbox = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameTextbox = page.getByRole('textbox', { name: 'Last name *' });
    this.companyTextbox = page.getByRole('textbox', {
      name: 'Company',
      exact: true,
    });
    this.addressTextbox = page.getByRole('textbox', {
      name: 'Address * (Street address, P.',
    });
    this.address2Textbox = page.getByRole('textbox', { name: 'Address 2' });
    this.countryDropdown = page.getByTestId('country');
    this.stateTextbox = page.getByRole('textbox', { name: 'State *' });
    this.cityTextbox = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipcodeTextbox = page.getByTestId('zipcode');
    this.mobileNumberTextbox = page.getByRole('textbox', {
      name: 'Mobile Number *',
    });
    this.createAccountButton = page.getByRole('button', {
      name: 'Create Account',
    });
    this.accountCreatedMessage = page.getByText('Account Created!');
  }

  private async selectMr() {
    await this.mrRadioButton.click();
  }

  private async selectMrs() {
    await this.mrsRadioButton.click();
  }

  private async validateNamePopped(value: string) {
    await expect(this.nameTextbox).toHaveValue(value);
  }

  private async validateEmailPopped(email: string) {
    await expect(this.emailTextbox).toHaveValue(email);
  }

  private async enterPassword(password: string) {
    await this.passwordTextbox.fill(password);
  }

  private async selectDay(day: string) {
    await this.dayDropdown.selectOption(day);
  }

  private async selectMonth(month: string) {
    await this.monthDropdown.selectOption(month);
  }

  private async selectYear(year: string) {
    await this.yearDropdown.selectOption(year);
  }

  private async checkNewsletter() {
    await this.newsletterCheckbox.check();
  }

  private async checkSpecialOffers() {
    await this.specialOffersCheckbox.check();
  }

  private async enterFirstName(firstName: string) {
    await this.firstNameTextbox.fill(firstName);
  }

  private async enterLastName(lastName: string) {
    await this.lastNameTextbox.fill(lastName);
  }

  private async enterCompany(company: string) {
    await this.companyTextbox.fill(company);
  }

  private async enterAddress(address: string) {
    await this.addressTextbox.fill(address);
  }

  private async enterAddress2(address2: string) {
    await this.address2Textbox.fill(address2);
  }

  private async selectCountry(country: string) {
    await this.countryDropdown.selectOption(country);
  }

  private async enterState(state: string) {
    await this.stateTextbox.fill(state);
  }

  private async enterCity(city: string) {
    await this.cityTextbox.fill(city);
  }

  private async enterZipcode(zipcode: string) {
    await this.zipcodeTextbox.fill(zipcode);
  }

  private async enterMobileNumber(mobileNumber: string) {
    await this.mobileNumberTextbox.fill(mobileNumber);
  }

  private async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  public async validateAccountCreated() {
    await expect(this.accountCreatedMessage).toHaveText('Account Created!');
  }

  public async fillRegisterForm(userData: UserData) {
    await this.selectMr();
    await this.validateNamePopped(userData.name);
    await this.validateEmailPopped(userData.email);
    await this.enterPassword(userData.password);
    await this.selectDay(userData.dateOfBirth.day.toString());
    await this.selectMonth(userData.dateOfBirth.month);
    await this.selectYear(userData.dateOfBirth.year.toString());
    if (userData.newsletter) {
      await this.checkNewsletter();
    }
    if (userData.specialOffers) {
      await this.checkSpecialOffers();
    }
    await this.enterFirstName(userData.address.firstName);
    await this.enterLastName(userData.address.lastName);
    await this.enterCompany(userData.address.company);
    await this.enterAddress(userData.address.address1);
    await this.enterAddress2(userData.address.address2);
    await this.selectCountry(userData.address.country);
    await this.enterState(userData.address.state);
    await this.enterCity(userData.address.city);
    await this.enterZipcode(userData.address.zipcode);
    await this.enterMobileNumber(userData.address.mobileNumber);
    await this.clickCreateAccount();
  }
}

export default RegisterFormPage;
