# Playwright SDET Portfolio

[![Playwright Tests](https://github.com/bimo-prabowo/playwright-sdet-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/bimo-prabowo/playwright-sdet-portfolio/actions/workflows/playwright.yml)

Enterprise-style test automation portfolio using **Playwright**, **TypeScript**, UI testing, API testing, end-to-end testing, environment-based configuration, cross-browser execution, GitHub Actions CI, and HTML reporting.

This repository demonstrates practical QA Automation / SDET skills through a maintainable test framework structure.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Dotenv
- GitHub Actions
- SauceDemo for UI and E2E testing
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

### E2E Tests

Target application: [SauceDemo](https://www.saucedemo.com/)

Current coverage:

- Add product to cart
- Validate cart badge update
- Validate cart page item details
- Complete checkout flow
- Validate checkout overview
- Validate checkout confirmation

### API Tests

Target API: [DummyJSON](https://dummyjson.com/)

Current coverage:

- Get product list
- Get product by ID
- Search products by keyword

## Project Structure

```text
playwright-sdet-portfolio/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── CartPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── tests/
│   ├── api/
│   │   └── products.api.spec.ts
│   ├── e2e/
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── ui/
│       ├── inventory.spec.ts
│       └── login.spec.ts
├── .env.example
├── .gitignore
├── .nvmrc
├── LICENSE
├── package-lock.json
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Setup

Clone the repository:

```bash
git clone https://github.com/bimo-prabowo/playwright-sdet-portfolio.git
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

Run smoke tests only:

```bash
npm run test:smoke
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

## Continuous Integration

The test suite runs automatically on GitHub Actions for pushes and pull requests to `main`.

The workflow performs the following steps:

- Checks out the repository
- Sets up Node.js using the project `.nvmrc`
- Installs dependencies with `npm ci`
- Installs Playwright browsers and system dependencies
- Runs the Playwright test suite
- Uploads the Playwright HTML report as an artifact

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

The project currently uses Page Objects for repeated SauceDemo flows:

```text
pages/LoginPage.ts
pages/InventoryPage.ts
pages/CartPage.ts
```

Current responsibilities:

### `LoginPage.ts`

- Navigate to the login page
- Fill username and password
- Submit the login form
- Validate locked-out user error

### `InventoryPage.ts`

- Validate inventory page load state
- Locate products by product name
- Add a product to cart
- Validate cart badge count
- Navigate to the cart page

### `CartPage.ts`

- Validate cart page load state
- Validate product name
- Validate product description
- Validate product quantity
- Validate product price
- Proceed to checkout

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
5. Add E2E coverage for business-critical user journeys.
6. Expand toward reusable fixtures, test data, and CI execution.

The goal is to keep the framework practical, readable, and maintainable rather than over-engineered.

## Future Improvements

Planned enhancements:

- Add `CheckoutPage` object when checkout interactions increase
- Add reusable test fixtures
- Add test data factory utilities
- Add API client utility layer
- Add tags for smoke, regression, UI, API, and E2E test groups
- Add negative API test scenarios

## Purpose of This Repository

This repository is part of my QA Automation / SDET portfolio. It demonstrates how I approach test automation design, including:

- Readable test structure
- Stable selectors
- Reusable page actions
- API validation
- E2E user journey validation
- Environment-based configuration
- Cross-browser test execution
- Continuous integration
- Reporting and debugging support
- Incremental framework refactoring