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


    }








})


export {expect} from "@playwright/test";