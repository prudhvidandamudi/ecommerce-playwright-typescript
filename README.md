# Playwright E-Commerce Test Framework

An end-to-end testing framework built with Playwright and TypeScript for testing an e-commerce application. The framework implements the Page Object Model (POM) pattern, utilizes data factories for test data generation, and supports UI, API, Visual, and Accessibility testing.

## 🌟 Features

- TypeScript implementation with strict type checking
- Page Object Model pattern with base page implementation
- API Testing with custom BaseClient implementation
- Data Factory pattern using @faker-js/faker
- Custom fixtures for test data and page objects
- HTML reporting with screenshots and videos
- ESLint + Prettier code formatting
- Husky pre-commit hooks
- Multi-browser support
- Visual and Accessibility testing capabilities

## 🛠 Setup

### Prerequisites

- Node.js (Latest LTS version)
- Git
- VS Code (Recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/prudhvidandamudi/ecommerce-playwright-typescript.git

# Navigate to project directory
cd ecommerce-playwright-typescript

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🧹 Development Setup & Code Quality

### VS Code Extensions

Install the following VS Code extensions for the best development experience:

- ESLint
- Prettier - Code formatter
- Playwright Test for VSCode
- TypeScript + JavaScript

### Code Formatting

The project uses Prettier with the following configuration (.prettierrc):

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "es5",
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

### ESLint Integration

The framework uses ESLint configured with:

- TypeScript support
- Playwright-specific rules
- Prettier integration
- Strict type checking

### VS Code Settings

For consistent formatting, add these to your VS Code settings.json:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Git Hooks with Husky

Pre-commit hooks ensure code quality:

```bash
# Install Husky
npm install husky --save-dev

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

## 🚀 Running Tests

### Test Execution

```bash
# Run all tests
npm test

# Run specific test types
npm run test:ui
npm run test:api
npm run test:visual
npm run test:accessibility

# Run tests in specific browsers
npm run test:chrome
npm run test:firefox

# Run tests with different configurations
npm run test:dev
npm run test:prod
```

## 📝 Best Practices

### UI Testing Best Practices

1. **Use API Calls for Test Data Setup/Cleanup**

   ```typescript
   // Good Practice
   test('login test', async ({ loginPage, testUser }) => {
     // Test data already created via API in fixture
     await loginPage.login(testUser.email, testUser.password);
     await expect(page).toHaveURL('/dashboard');
   });

   // Avoid
   test('login test', async ({ page }) => {
     // Don't create test data through UI
     await page.goto('/register');
     await registerPage.fillForm(userData);
   });
   ```

   Benefits:

   - Faster test execution (API calls vs UI interaction)
   - More reliable test setup/cleanup
   - Clear separation between test data management and UI testing
   - Reduced test flakiness
   - Better test isolation

2. **Page Objects Implementation**

   ```typescript
   export class LoginPage {
     constructor(private page: Page) {}

     private readonly emailInput = this.page.getByLabel('Email');
     private readonly passwordInput = this.page.getByLabel('Password');
     private readonly loginButton = this.page.getByRole('button', {
       name: 'Login',
     });

     async login(email: string, password: string) {
       await this.emailInput.fill(email);
       await this.passwordInput.fill(password);
       await this.loginButton.click();
     }
   }
   ```

3. **Fixtures for Data Management**

   ```typescript
   export const test = base.extend<Fixtures>({
     testUser: async ({ request }, use) => {
       // Setup: Create user via API
       const accountClient = new AccountClient(request);
       const userData = DataFactory.generateUserData();
       await accountClient.createAccount(userData);

       // Provide data to test
       await use(userData);

       // Cleanup: Delete user via API
       await accountClient.deleteAccount({
         email: userData.email,
         password: userData.password,
       });
     },
   });
   ```

### API Testing Best Practices

1. **BaseClient Implementation**

```typescript
export class BaseClient {
  constructor(protected request: APIRequestContext) {}

  protected async post(
    url: string,
    options?: APIRequestOptions
  ): Promise<APIResponse> {
    try {
      const response = await this.request.post(url, {
        headers: {
          'Content-Type': options?.form
            ? 'application/x-www-form-urlencoded'
            : 'application/json',
          ...options?.headers,
        },
        data: options?.data,
        form: options?.form,
        failOnStatusCode: options?.failOnStatusCode ?? true,
      });
      return this.handleResponse(response);
    } catch (error) {
      throw new Error(`POST request failed: ${error.message}`);
    }
  }
}
```

2. **API Clients**

```typescript
export class AccountClient extends BaseClient {
  async createAccount(userData: UserData): Promise<APIResponse> {
    return this.post('/api/createAccount', {
      form: userData,
      failOnStatusCode: true,
    });
  }

  async deleteAccount(loginData: LoginData): Promise<APIResponse> {
    return this.delete('/api/deleteAccount', {
      form: loginData,
      failOnStatusCode: true,
    });
  }
}
```

## 🔄 Project Structure

```
test-automation/
├── api/                    # API clients
│   ├── BaseClient.ts
│   └── AccountClient.ts
├── fixtures/              # Test fixtures
├── pages/                # Page Objects
├── tests/
│   ├── ui/              # UI tests
│   ├── api/             # API tests
│   ├── visual/          # Visual tests
│   └── accessibility/   # Accessibility tests
├── types/               # TypeScript types
└── utils/
    ├── DataFactory.ts
    └── DataTransformer.ts
```

## 📊 Reporting

- HTML reports with test execution details
- Screenshots and videos for failed tests
- Trace viewer for debugging
- API response logging

## 🚧 Coming Soon

- Visual Testing Implementation
- Accessibility Testing Framework
- CI/CD Pipeline with GitHub Actions
- Performance Testing
- Cross-browser Testing Configuration
