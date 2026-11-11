import { test, expect, APIRequestContext, request } from '@playwright/test';


const REPO = 'AutomationFramework_UI_API_Playwright';
const USER = 'iharrytk';


// Request context is reused by all tests in the file.
let apiContext: APIRequestContext;


test.beforeAll(async ({ playwright }) => {
 apiContext = await playwright.request.newContext({
   // All requests we send go to this API endpoint.
   baseURL: 'https://api.github.com',
   extraHTTPHeaders: {
     // We set this header per GitHub guidelines.
     'Accept': 'application/vnd.github.v3+json',
     // Add authorization token to all requests.
     // Assuming personal access token available in the environment.
     'Authorization': `token ${process.env.GITHUB_TOKEN}`,
   },
 });
});

test.afterAll(async ({ }) => {
 // Dispose all responses.
 await apiContext.dispose();
});

test.skip('last created issue should be first in the provided list', async ({ page }) => {
 const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
   data: {
     title: '[Feature] request 1',
   }
 });
 expect(newIssue.ok()).toBeTruthy();

 await page.goto(`https://github.com/${USER}/${REPO}/issues`);
 const firstIssue = page.locator('a[data-testid="issue-listitem-title-link"]').first();
 await expect(firstIssue).toHaveText('[Feature] request 1', { timeout: 15000 });

//   const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
//   await expect(firstIssue).toHaveText('[Feature] request 1');
});