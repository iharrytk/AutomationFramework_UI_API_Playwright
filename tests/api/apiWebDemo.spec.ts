import { test, expect, request } from '@playwright/test';

test('Add user via API and verify in UI', async ({ page }) => {

 // Step 1: API context
 const apiContext = await request.newContext({
   baseURL: 'http://localhost:3000',
   extraHTTPHeaders: { 'Content-Type': 'application/json' }
 });

 // Step 2: POST new user
 const userData = { name: 'Harithaa', job: 'Tester' };
 const response = await apiContext.post('/users', { data: userData });
 expect(response.ok()).toBeTruthy();
 const createdUser = await response.json();

 // Step 3: Open UI
 await page.goto('http://127.0.0.1:5500/tests/api/localWebsite.html');

 // Step 4: Wait for user list to load and validate
 const userItem = page.locator("(//li[contains(text(),'Harithaa (Tester)')])[1]");
 await expect(userItem).toBeVisible();

 await apiContext.dispose();
});