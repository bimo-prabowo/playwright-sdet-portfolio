# Playwright SDET Portfolio

Enterprise-style test automation portfolio using **Playwright**, **TypeScript**, UI testing, API testing, environment-based configuration, cross-browser execution, and HTML reporting.

This repository is designed to demonstrate practical QA Automation / SDET skills through a maintainable test framework structure.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Dotenv
- GitHub Actions-ready configuration
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
- Product detail validation for a sample item

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