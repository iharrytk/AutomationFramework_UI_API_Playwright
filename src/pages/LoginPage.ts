import {BasePage} from "./BasePage"; 

import { Page,Locator } from "@playwright/test";




export class LoginPage extends BasePage {

//private Locators for the login page
private readonly emailInput:Locator;
private readonly passwordInput:Locator;
private readonly LoginButton:Locator;
private readonly forgotPasswordLink:Locator;
private readonly logo:Locator;
private readonly invalidLoginWarningMessage:Locator;

//*************************************** */
//*************************************** */

//constructor for the login page
constructor(page:Page){
    super(page);
    this.emailInput = page.getByRole('textbox',{name:'E-Mail Address'});
    this.passwordInput=page.getByRole('textbox',{name:'Password'});
    this.LoginButton=page.getByRole('button',{name:'Login'});
    this.forgotPasswordLink=page.getByRole('link',{name:'Forgotten Password'}).first();
    this.logo=page.getByRole('img',{name:'naveenopencart'});
    this.invalidLoginWarningMessage=page.locator('.alert.alert-danger.alert-dismissible');

}
//*************************************** */
//*************************************** */

//page actions for the login page

async goToLoginPage():Promise<void>{

    await this.page.goto('opencart/index.php?route=account/login');

}
//*************************************** */

async getLoginPageTitle():Promise<string>{
    return await this.page.title();
}

//*************************************** */

async isLogoDisplayed():Promise<boolean>{

    return await this.logo.isVisible();
}

//*************************************** */

async doLogin(email:string,password:string):Promise<void>{


console.log(`The user credentials are : ${email} and ${password}`);
await this.emailInput.fill(email);
await this.passwordInput.fill(password);
await this.LoginButton.click();
await this.page.waitForURL('https://naveenautomationlabs.com/opencart/index.php?route=account/account');


}

//*************************************** */



async getForgotPasswordLinkExists():Promise<boolean>{

   return await this.forgotPasswordLink.isVisible();
}


//*************************************** */


async invalidLoginMessageExists(email:string,password:string):Promise<boolean>{

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.LoginButton.click();

   return await this.invalidLoginWarningMessage.isVisible();
}

}