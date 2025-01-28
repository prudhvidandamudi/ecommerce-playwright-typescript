import { Page } from '@playwright/test';
import BasePage from './BasePage';

class HomePage extends BasePage {
  readonly homePageTitle: string;
  constructor(page: Page) {
    super(page);
    this.homePageTitle = 'Automation Exercise';
  }

  async navigateTo(): Promise<void> {
    await this.visitAutomationPractice();
  }
}

export default HomePage;
