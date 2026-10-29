
import { test, expect } from '@playwright/test';
import {HomePage} from '../src/pages/HomePage';
import {LoginPage} from '../src/pages/LoginPage';

let homePage:HomePage;
let loginPage:LoginPage;


test.beforeEach(async({page})=>{ 
    loginPage=new LoginPage(page);
    homePage=new HomePage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('mary.jane1234@gmail.com','maryjane@1234');
});

 //**********************************************/ 


test.skip('To Verify the homePage sidebar links counts',async ({})=>{
   let sideBarCount= await homePage.getHomePageSideBarLinksCount();
   expect(sideBarCount).toBe(13);

});

 //**********************************************/ 

test.skip('To Verify the homePage footer links counts',async ({})=>{

    let footerLinksCount= await homePage.getHomePageFooterLinksCount();
    expect(footerLinksCount).toBe(15);


});


test.skip('To verify HomaPage headers text',async({})=>{ 


    let homePageHeadersText=await homePage.getHomePageHeadersText();
    expect.soft(homePageHeadersText).toHaveLength(4);
    expect.soft(homePageHeadersText).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
});