import {test as BaseTest} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {HomePage} from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import {ResultsPage} from "../pages/ResultsPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";


type pageFixtures={
    loginPage:LoginPage;
    homePage:HomePage
    registerPage:RegisterPage;
    resultsPage:ResultsPage;
    productInfoPage:ProductInfoPage
  
}


export let test = BaseTest.extend<pageFixtures>({


    loginPage:async({page},use)=>{ 
        let loginPage=new LoginPage(page);
        await use(loginPage);
    },


    homePage:async({page},use)=>{

        let homePage=new HomePage(page);
        await use(homePage);
    },

    registerPage:async({page},use)=>{

      let registerPage=new RegisterPage(page);
      await use(registerPage);
    },


    resultsPage:async({page},use)=>{

      let resultsPage=new ResultsPage(page);
      await use(resultsPage);
    },


    productInfoPage:async({page},use)=>{

        let productInfoPage=new ProductInfoPage(page);
        await use(productInfoPage);


    },


    page: async ({ page }, use) => {

        // Browser console logs
        page.on('console', msg => {

            console.log(
                `[BROWSER ${msg.type()}] ${msg.text()}`
            );

        });

        // JavaScript errors
        page.on('pageerror', error => {

            console.error(
                `[PAGE ERROR] ${error.message}`
            );

        });

        // Failed network requests
        page.on('requestfailed', request => {

            console.error(
                `[REQUEST FAILED] ${request.url()}`
            );

            console.error(
                request.failure()?.errorText
            );

        });

        // HTTP errors
        page.on('response', response => {

            if (response.status() >= 400) {

                console.error(
                    `[HTTP ERROR ${response.status()}] ${response.url()}`
                );

            }

        });

        await use(page);

    }








})


export {expect} from "@playwright/test";