import { expect } from '@playwright/test';
class RegisterFormPage {
    page;
    mrRadioButton;
    mrsRadioButton;
    nameTextbox;
    emailTextbox;
    passwordTextbox;
    dayDropdown;
    monthDropdown;
    yearDropdown;
    newsletterCheckbox;
    specialOffersCheckbox;
    firstNameTextbox;
    lastNameTextbox;
    companyTextbox;
    addressTextbox;
    address2Textbox;
    countryDropdown;
    stateTextbox;
    cityTextbox;
    zipcodeTextbox;
    mobileNumberTextbox;
    createAccountButton;
    //   private readonly accountCreatedMessage: Locator;
    //   private readonly continueButton: Locator;
    constructor(page) {
        this.page = page;
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
    }
    async selectMr() {
        await this.mrRadioButton.click();
        return this;
    }
    async selectMrs() {
        await this.mrsRadioButton.click();
        return this;
    }
    async validateNamePopped(value) {
        await expect(this.nameTextbox).toHaveValue(value);
        return this;
    }
    async validateEmailPopped(email) {
        await expect(this.emailTextbox).toHaveValue(email);
        return this;
    }
    async enterPassword(password) {
        await this.passwordTextbox.fill(password);
        return this;
    }
    async selectDay(day) {
        await this.dayDropdown.selectOption(day);
        return this;
    }
    async selectMonth(month) {
        await this.monthDropdown.selectOption(month);
        return this;
    }
    async selectYear(year) {
        await this.yearDropdown.selectOption(year);
        return this;
    }
    async checkNewsletter() {
        await this.newsletterCheckbox.check();
        return this;
    }
    async checkSpecialOffers() {
        await this.specialOffersCheckbox.check();
        return this;
    }
    async enterFirstName(firstName) {
        await this.firstNameTextbox.fill(firstName);
        return this;
    }
    async enterLastName(lastName) {
        await this.lastNameTextbox.fill(lastName);
        return this;
    }
    async enterCompany(company) {
        await this.companyTextbox.fill(company);
        return this;
    }
    async enterAddress(address) {
        await this.addressTextbox.fill(address);
        return this;
    }
    async enterAddress2(address2) {
        await this.address2Textbox.fill(address2);
        return this;
    }
    async selectCountry(country) {
        await this.countryDropdown.selectOption(country);
        return this;
    }
    async enterState(state) {
        await this.stateTextbox.fill(state);
        return this;
    }
    async enterCity(city) {
        await this.cityTextbox.fill(city);
        return this;
    }
    async enterZipcode(zipcode) {
        await this.zipcodeTextbox.fill(zipcode);
        return this;
    }
    async enterMobileNumber(mobileNumber) {
        await this.mobileNumberTextbox.fill(mobileNumber);
        return this;
    }
    async clickCreateAccount() {
        await this.createAccountButton.click();
        return this;
    }
    async fillRegisterForm(userData) {
        (await this.selectMr()).validateNamePopped(userData.name);
    }
}
export default RegisterFormPage;
