import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test-automation/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : '50%',
  reporter: 'html',
  use: {
    baseURL: 'https://www.automationexercise.com',
    // screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
    trace: 'on-first-retry',
    testIdAttribute: 'data-qa',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
