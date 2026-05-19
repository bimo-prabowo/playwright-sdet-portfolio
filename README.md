# Playwright SDET Portfolio

Enterprise-style test automation portfolio using **Playwright**, **TypeScript**, UI testing, API testing, environment-based configuration, cross-browser execution, and HTML reporting.

This repository demonstrates practical QA Automation / SDET skills through a maintainable test framework structure.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Dotenv
- SauceDemo for UI testing
- DummyJSON for API testing

## Test Coverage

### UI Tests

Target application: [SauceDemo](https://www.saucedemo.com/)

Current coverage:

- Successful login with valid credentials
- Locked-out user login validation
- Inventory page rendering after login
- Product list visibility
- Product detail validation for a sample inventory item

### API Tests

Target API: [DummyJSON](https://dummyjson.com/)

Current coverage:

- Get product list
- Get product by ID
- Search products by keyword

## Project Structure

```text
playwright-sdet-portfolio/
├── pages/
│   └── LoginPage.ts
├── tests/
│   ├── api/
│   │   └── products.api.spec.ts
│   └── ui/
│       ├── inventory.spec.ts
│       └── login.spec.ts
├── .env.example
├── package.json
├── playwright.config.ts
└── README.md
```

## Setup

Clone the repository:

```bash
git clone <your-repository-url>
cd playwright-sdet-portfolio
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Create a local `.env` file:

```bash
cp .env.example .env
```

Update the `.env` file with the required values:

```env
SAUCEDEMO_BASE_URL=https://www.saucedemo.com
SAUCEDEMO_STANDARD_USER=standard_user
SAUCEDEMO_LOCKED_OUT_USER=locked_out_user
SAUCEDEMO_PASSWORD=secret_sauce

DUMMYJSON_BASE_URL=https://dummyjson.com
```

## Running Tests

Run all tests:

```bash
npm test
```

Run UI tests only:

```bash
npm run test:ui
```

Run API tests only:

```bash
npm run test:api
```

Run E2E tests only:

```bash
npm run test:e2e
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests in debug mode:

```bash
npm run test:debug
```

Open the HTML report:

```bash
npm run report
```

## Test Configuration

The framework uses `playwright.config.ts` for shared test settings.

Current configuration includes:

- Parallel test execution
- CI-safe `test.only` prevention
- Retry logic on CI
- Single worker execution on CI for stability
- HTML reporting
- Trace collection on first retry
- Screenshot capture on failure
- Video recording on failure
- Chromium and Firefox browser projects
- Required environment variable validation

## Environment Variables

The framework validates required environment variables before test execution.

Required variables:

```text
SAUCEDEMO_BASE_URL
SAUCEDEMO_STANDARD_USER
SAUCEDEMO_LOCKED_OUT_USER
SAUCEDEMO_PASSWORD
DUMMYJSON_BASE_URL
```

If any required variable is missing, the test run stops early with a clear error message.

## Page Object Model

The project currently uses a Page Object for the SauceDemo login flow:

```text
pages/LoginPage.ts
```

Current responsibilities:

- Navigate to the login page
- Fill username and password
- Submit the login form
- Validate locked-out user error

Additional Page Objects will be added when repeated page-level interactions emerge.

## Reporting and Debugging

Playwright artifacts are configured to support debugging:

- HTML report
- Trace viewer on retry
- Screenshot on failure
- Video on failure

To open the latest HTML report:

```bash
npm run report
```

## Current Test Strategy

This project follows an incremental test automation approach:

1. Build direct tests for core user flows.
2. Identify repeated test actions.
3. Refactor repeated flows into Page Objects.
4. Add API coverage for service-level validation.
5. Expand toward reusable fixtures, test data, and CI execution.

The goal is to keep the framework practical, readable, and maintainable rather than over-engineered.

## Future Improvements

Planned enhancements:

- Add cart and checkout E2E coverage
- Add `InventoryPage` and `CartPage` objects when duplication increases
- Add reusable test fixtures
- Add test data factory utilities
- Add GitHub Actions workflow
- Add API client utility layer
- Add tags for smoke, regression, UI, and API test groups
- Add negative API test scenarios
- Add README badges for CI status

## Purpose of This Repository

This repository is part of my QA Automation / SDET portfolio. It demonstrates how I approach test automation design, including:

- Readable test structure
- Stable selectors
- Reusable page actions
- API validation
- Environment-based configuration
- Cross-browser test execution
- Reporting and debugging support
- Incremental framework refactoring