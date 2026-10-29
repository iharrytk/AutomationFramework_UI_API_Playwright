import {BasePage} from "./BasePage";
import {Page,Locator} from "@playwright/test";

export class HomePage extends BasePage{


    //private Locators for the home page
    private readonly homePageLogo:Locator;
    private readonly homePageFooterLinks:Locator;
    private readonly homePageSideBarLinks:Locator;
    private readonly homePageHeaders:Locator;
    private readonly logOutlink:Locator;
    private readonly searchbar:Locator;
    private readonly searchbutton:Locator;

    //*************************************** */
    //*************************************** */


    //constructor for the home page
    constructor(page:Page){
        super(page);
        this.homePageLogo = page.getByRole('img',{name:'naveenopencart'});
        this.homePageFooterLinks=page.locator(`(//div[@class='row'])[3]//a`);
        this.homePageSideBarLinks=page.locator(`//aside[@id='column-right']//a`);
        this.homePageHeaders=page.getByRole('heading',{level:2});
        this.logOutlink=page.getByRole('link',{name:'Logout'}).last();
        this.searchbar=page.getByRole('textbox',{name:'Search'});
        this.searchbutton=page.locator('.btn.btn-default.btn-lg');


    }
    //*************************************** */
    //*************************************** */

    //page actions for the home page

    async isHomePageLogoDisplayed():Promise<boolean>{

        return await this.homePageLogo.isVisible();
    }

     //*************************************** */

    async getHomePageTitle():Promise<string>{

         return await this.page.title();
    }

     //*************************************** */

     async getHomePageFooterLinksCount():Promise<number>{

        return await this.homePageFooterLinks.count();
     }

        //*************************************** */


     async getHomePageSideBarLinksCount():Promise<number>{

         return await this.homePageSideBarLinks.count();
                   
    }

        //*******************************************// 


    async getHomePageHeadersText():Promise<string[]>{

        return await this.homePageHeaders.allTextContents();
    }


    //*******************************************// 


    async doSearch(searchProduct:string):Promise<void>{

        await this.searchbar.fill(searchProduct);
        await this.searchbutton.click();


    }


}