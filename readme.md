# OpenCart Playwright Automation Framework

Automated end-to-end tests for the OpenCart storefront, built with Playwright Test and TypeScript. The framework uses page objects and custom fixtures to share browser interactions across tests, and supports environment-specific configuration and data-driven scenarios.

## Coverage

- Login page title, logo, forgot-password link, valid login, and invalid-login warnings.
- Account registration.
- Product search and selection from search results.
- Product detail information, including product name, images, brand, and product code.
- Shared page checks for the OpenCart logo and footer links.
- Test data loaded from CSV, JSON, and Excel files.

## Requirements

- Node.js and npm.
- The OpenCart application available at the URL configured for the selected environment.
- Valid OpenCart credentials for tests that log in.

## Setup

From the project root, install dependencies and the Chromium browser used by the configured Playwright project:

```sh
npm ci
npx playwright install chromium
```

Environment settings are loaded from `config/.env.<environment>`. The repository currently includes `config/.env.qa`, `config/.env.dev`, and `config/.env.prod`. Each file should define:

```dotenv
BASE_URL=https://your-opencart-url
USERNAMEEMAIL=your-test-account-email
PASSWORDEMAIL=your-test-account-password
```

The default environment is `qa`. Keep real credentials private and use test accounts. To select another environment:

PowerShell:

```powershell
$env:ENV = "dev"
npm test
```

Bash:

```sh
ENV=dev npm test
```

Use `prod` instead of `dev` to load `config/.env.prod`.

## Running Tests

Run the complete test suite:

```sh
npm test
```

Run a specific test file:

```sh
npx playwright test tests/loginpagefixtures.spec.ts
```

Run tests for the configured Chromium project:

```sh
npm run test:chrome
```

The `test:headed` script is also available. The current Playwright configuration sets `headless: false`, so test runs are already headed by default. Test execution uses the `chromium` project; Firefox, WebKit, mobile, and branded-browser projects are currently commented out in `playwright.config.ts`.

## Reports and Artifacts

- The console reporter prints a test summary.
- The HTML report is written to `reports/html-report`. Open it with `npx playwright show-report reports/html-report`.
- The Allure reporter writes raw results to `allure-results`. Generate and open an Allure report with `npm run allure:report` (or run `npm run allure:generate` followed by `npm run allure:open`).
- Screenshots are captured on failure, videos are retained on failure, and traces are collected on the first retry, as configured in `playwright.config.ts`.

The `allure:clean` npm script uses `rm -rf`, which requires a Unix-like shell on Windows. In PowerShell, remove generated folders with `Remove-Item -Recurse -Force allure-results, allure-report, test-results, screenshots` as needed.

## Project Layout

```text
config/                 Environment files (.env.qa, .env.dev, .env.prod)
src/
  api/                  API helper and request wrapper for REST calls
  data/                 CSV, JSON, and Excel test data
  fixtures/             Shared Playwright page-object and API fixtures
  pages/                Page objects for OpenCart pages
  utils/                CSV, Excel, and JSON data readers
tests/
  api/                  API automation scenarios (CRUD, schema validation, interception)
  ...                   UI test specifications
reports/html-report/    Generated Playwright HTML report
playwright.config.ts    Browser, environment, and reporter configuration
```

## API folder details

The `src/api/` folder contains reusable API automation support for REST-based validation scenarios. The key file is `src/api/APIHelper.ts`, which wraps Playwright's `APIRequestContext` and exposes helper methods for common HTTP actions:

- `get(endpoint, headers?)`
- `post(endpoint, data, headers?)`
- `put(endpoint, data, headers?)`
- `delete(endpoint, headers?)`

Each helper method builds the endpoint URL from a base URL provided in the constructor and returns a normalized response object with:

- `status`
- `statusText`
- `body` (for JSON responses when available)

This makes it easier to reuse the same request logic across multiple tests without repeating raw `request.get()`, `request.post()`, and related Playwright calls.

The API fixture in `src/fixtures/apiFixtures.ts` injects an `apiHelper` instance into tests using Playwright's fixture extension. That pattern keeps API tests clean and consistent while allowing the same helper to be shared across multiple specs in `tests/api/`.

The API test suite includes scenarios such as:

- fetching users from a public REST API
- creating, updating, and deleting users
- validating response schemas
- testing request/response interception concepts

These tests demonstrate how the framework combines Playwright's API testing capabilities with the custom helper layer for maintainable automation.

## Test Data

Data-driven scenarios use files under `src/data/`:

- `NegativeLoginData.csv`, `NegativeLoginJSONData.json`, and `OpencartLoginNegativedata.xlsx` provide invalid-login cases.
- `searchProductData.csv` provides product search and product-detail expectations.

Update the test data files when the target OpenCart catalog or expected product details change.