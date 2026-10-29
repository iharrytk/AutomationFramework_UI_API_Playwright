import {test,expect} from "../src/fixtures/pageFixtures";
import {csvutil} from "../src/utils/csvutil";
import {excelutil} from "../src/utils/excelutil";
import { jsonutil } from "../src/utils/jsonutil";


test.beforeEach(async ({loginPage})=>{ 
    await loginPage.goToLoginPage();
});



test('Verify login page title', async ({loginPage})=>{  
    
    let title=await loginPage.getLoginPageTitle();
    console.log(`The login page title is : ${title}`);
    expect(title).toBe('Account Login');

    }); 

 //**********************************************/ 

    test('Verify Logo is displayed on the login page',async({loginPage})=>{

        
        let isLogoDisplayed=await loginPage.isLogoDisplayed();
        expect(isLogoDisplayed).toBeTruthy();

    });


 //**********************************************/ 
test('Verify login functionality',async ({loginPage,homePage})=>{
    
    await loginPage.doLogin(process.env.USERNAMEEMAIL!,process.env.PASSWORDEMAIL!);
    let homePageActualTitle =await homePage.getHomePageTitle();
    expect(homePageActualTitle).toBe('My Account');
    


}) ;

 //**********************************************/ 

test('Verify forgot password link is displayed on the login page',async({loginPage})=>{

   let isForgotPasswordLinkDisplayedActual=await loginPage.getForgotPasswordLinkExists();
   expect(isForgotPasswordLinkDisplayedActual).toBeTruthy();


});

 //**********************************************/ 

 let invalidLoginDataCSV=csvutil.readCsv('src/data/NegativeLoginData.csv');

 for(let row of invalidLoginDataCSV){

    test(`Data from CSV Verify invalid Login warning message is displayed on the Login Page ${row.usernameemailid} -${row.passwordemailid}`,async ({loginPage})=>{

    let isInvalidLoginMessageDisplayed=await loginPage.invalidLoginMessageExists(row.usernameemailid,row.passwordemailid);
    expect(isInvalidLoginMessageDisplayed).toBeTruthy();


 });

}


  //**********************************************/ 


let invalidLoginDataExcel=excelutil.readExcel('src/data/OpencartLoginNegativedata.xlsx','Sheet1');

 for(let row of invalidLoginDataExcel){

    test(`Data from Excel Verify invalid Login warning message is displayed on the Login Page ${row.usernameemail} -${row.passwordemail}`,async ({loginPage})=>{

    let isInvalidLoginMessageDisplayed=await loginPage.invalidLoginMessageExists(row.usernameemail,row.passwordemail);
    expect(isInvalidLoginMessageDisplayed).toBeTruthy();


 });


}



  //**********************************************/ 


let invalidLoginDataJSON=jsonutil.readJson('src/data/NegativeLoginJSONData.json');

 for(let row of invalidLoginDataJSON){

    test(`Data from JSON Verify invalid Login warning message is displayed on the Login Page ${row.usernameemailid} -${row.passwordemailid}`,async ({loginPage})=>{

    let isInvalidLoginMessageDisplayed=await loginPage.invalidLoginMessageExists(row.usernameemailid,row.passwordemailid);
    expect(isInvalidLoginMessageDisplayed).toBeTruthy();


 });


}



