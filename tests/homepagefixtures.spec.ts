
import { test, expect } from "../src/fixtures/pageFixtures";


test.beforeEach(async({loginPage})=>{ 
   
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAMEEMAIL!,process.env.PASSWORDEMAIL!);
});

 //**********************************************/ 


test('To Verify the homePage sidebar links counts',async ({homePage})=>{
   let sideBarCount= await homePage.getHomePageSideBarLinksCount();
   expect(sideBarCount).toBe(13);

});

 //**********************************************/ 

test('To Verify the homePage footer links counts',async ({homePage})=>{

    let footerLinksCount= await homePage.getHomePageFooterLinksCount();
    expect(footerLinksCount).toBe(15);


});


test('To verify HomaPage headers text',async({homePage})=>{ 


    let homePageHeadersText=await homePage.getHomePageHeadersText();
    expect.soft(homePageHeadersText).toHaveLength(4);
    expect.soft(homePageHeadersText).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
});