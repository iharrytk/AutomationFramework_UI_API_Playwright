import {test,expect} from "@playwright/test";
import {LoginPage} from "../src/pages/LoginPage";
import {HomePage} from "../src/pages/HomePage";


let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async ({page})=>{ 
    loginPage=new LoginPage(page);
    homePage=new HomePage(page);
    await loginPage.goToLoginPage();
});



test.skip('Verify login page title', async ({})=>{  
    
    let title=await loginPage.getLoginPageTitle();
    console.log(`The login page title is : ${title}`);
     expect(title).toBe('Account Login');

 }); 

 //**********************************************/ 

 test.skip('Verify Logo is displayed on the login page',async({})=>{

    
    let isLogoDisplayed=await loginPage.isLogoDisplayed();
    expect(isLogoDisplayed).toBeTruthy();

 });


 //**********************************************/ 
test.skip('Verify login functionality',async ({})=>{
    
    await loginPage.doLogin('mary.jane1234@gmail.com','maryjane@1234');
   let homePageActualTitle =await homePage.getHomePageTitle();
   expect(homePageActualTitle).toBe('My Account');
    


}) ;



test.skip('Verify forgot password link is displayed on the login page',async({page})=>{

   let isForgotPasswordLinkDisplayedActual=await loginPage.getForgotPasswordLinkExists();
   expect(isForgotPasswordLinkDisplayedActual).toBeTruthy();


});