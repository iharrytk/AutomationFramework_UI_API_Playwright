import {Locator,Page} from "@playwright/test"
import {BasePage} from "./BasePage";


export class ResultsPage extends BasePage{



    //private locators of ResultsPage


    private readonly searchResults:Locator;

        //********************************************************* */
        //********************************************************* */

    //constructor of the ResultsPage

    constructor(page:Page){

        super(page);
        this.searchResults=page.locator('.product-layout.product-grid.col-lg-3.col-md-3.col-sm-6.col-xs-12');
    }

      //********************************************************* */
        //********************************************************* */

    //page actions of the Results page


    async getSearchResults():Promise<number>{

        return await this.searchResults.count();
    }


    async selectProduct(productName:string):Promise<string>{

        await this.page.getByRole('link',{name:productName,exact:true}).first().click();
        await this.page.waitForURL(/.*product\/product.*/);
        const url=this.page.url();
        return url;
    }
}