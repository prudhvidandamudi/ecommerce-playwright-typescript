import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

class ContactUsPage extends BasePage {
  private readonly name: Locator;
  private readonly email: Locator;
  private readonly subject: Locator;
  private readonly message: Locator;
  private readonly inputFile: Locator;
  private readonly submitButton: Locator;
  private readonly successMessage: Locator;
  constructor(page: Page) {
    super(page);
    this.name = page.getByTestId('name');
    this.email = page.getByTestId('email');
    this.subject = page.getByTestId('subject');
    this.message = page.getByTestId('message');
    this.inputFile = page.locator('input[name="upload_file"]');
    this.submitButton = page.getByTestId('submit-button');
    this.successMessage = page.getByTestId('contact-success');
  }

  async navigateTo(): Promise<void> {
    await this.visitAutomationPractice();
    await this.contactUsLink.click();
  }
}

export default ContactUsPage;
