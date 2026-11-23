import { test, expect } from "../src/fixtures/pageFixtures";

test.beforeEach(async ({ loginPage, page }) => {

    // ERROR 1: Incorrect URL navigation
    await loginPage.goToLoginPageDebugging();

    // ERROR 2: Incorrect environment variable
    await loginPage.doLoginDebugging(
        process.env.USERNAMEEMAIL!,
        process.env.PASSWORD_EMAIL!
    );

    // ERROR 5: Incorrect assertion
    await expect(page.locator('.invalid-dashboard')).toBeVisible();

    

});

 //**********************************************/ 


test('To Verify the homePage sidebar links counts',{tag:['@sanity','@smoke','@regression']},async ({homePage})=>{
   let sideBarCount= await homePage.getHomePageSideBarLinksCount();
   expect(sideBarCount).toBe(13);

});


