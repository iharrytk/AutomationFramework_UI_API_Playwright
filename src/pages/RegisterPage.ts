import {BasePage} from "./BasePage";
import {Locator,Page} from "@playwright/test";


export class RegisterPage extends BasePage{


//private locators for the Register PAge

private readonly firstNameInput:Locator;
private readonly LastNAmeInput:Locator;
private readonly emailInput:Locator;
private readonly telephoneInput:Locator;
private readonly passwordInput:Locator;
private readonly confirmPasswordInput:Locator;
private readonly subscribeYesRadioInput:Locator;
private readonly subscribeNoRadioInput:Locator;
private readonly privacyPolicyCheckbox:Locator;
private readonly continueButton:Locator;
private readonly successMessage:Locator;


//constructor for the reagiter page
constructor(page:Page){

    super(page);
    this.firstNameInput=page.getByRole('textbox',{name:'* First Name'});
    this.LastNAmeInput=page.getByRole('textbox',{name:'* Last Name'});
    this.emailInput=page.getByRole('textbox',{name:'* E-Mail'});
    this.telephoneInput=page.getByRole('textbox',{name:'* Telephone'});
    this.passwordInput=page.getByRole('textbox',{name:'* Password'}).first();
    this.confirmPasswordInput=page.getByRole('textbox',{name:'* Password Confirm'}).last();
    this.subscribeYesRadioInput=page.getByRole('radio',{name:'Yes'});
    this.subscribeNoRadioInput=page.getByRole('radio',{name:'No'});
    this.privacyPolicyCheckbox=page.getByRole('checkbox');
    this.continueButton=page.getByRole('button',{name:'Continue'});
    this.successMessage=page.getByRole('heading',{level:1});

}


async doRegister(firstName:string,lastName:string,email:string,telephone:string,password:string):Promise<string>{

    await this.page.goto('opencart/index.php?route=account/register',{waitUntil:'load'});
    await this.firstNameInput.fill(firstName);
    await this.LastNAmeInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.telephoneInput.fill(telephone);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.subscribeYesRadioInput.check();
    await this.privacyPolicyCheckbox.check();
    await this.continueButton.click();
    await this.page.waitForURL('https://naveenautomationlabs.com/opencart/index.php?route=account/success');
   return await this.successMessage.innerText();                

}


}
