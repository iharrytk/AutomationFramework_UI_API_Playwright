import {Page,Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ProductInfoPage extends BasePage {

    //private locators of ProductInfoPage
    private readonly ProductName:Locator;
    private readonly ProductImages:Locator;
    private readonly ProductMetaData:Locator;;
    private readonly ProductPriceData:Locator;
    private readonly productInfo:Map<string,string|number>;

 
 //********************************************************* */
//********************************************************* */


    //constructor of the ProductInfoPage
    constructor(page: Page) {
    super(page);
    this.ProductName=page.getByRole('heading',{level:1});
    this.ProductImages=page.locator('div#content ul.thumbnails img');
    this.ProductMetaData=page.locator('div#content div.row div.col-sm-4 ul:nth-of-type(1) li');
    this.ProductPriceData=page.locator('div#content div.row div.col-sm-4 ul:nth-of-type(2) li');
    this.productInfo=new Map<string,string|number>();
    }


    //********************************************************* */
    //********************************************************* */

    //page actions of the ProductInfoPage

    async getProductName():Promise<string>{


       return await this.ProductName.innerText();
    }

    async getProductImagesCount():Promise<number>{

       return this.ProductImages.count();

    }

    //data format:
    //     [
    //   'Brand: Apple',
    //   'Product Code: Product 18',
    //   'Reward Points: 800',
    //   'Availability: Out Of Stock'
    // ]

    async getProductMetaData():Promise<Map<string,string|number>>{


        let productMetaData=await this.ProductMetaData.allInnerTexts();
       for(let data of productMetaData){

       let splitteddata= data.split(':');
       let key=splitteddata[0].trim();
       let value=splitteddata[1].trim();
       this.productInfo.set(key,value);
       
       }
       return this.productInfo;
    }


    //data format:
    //[ '$2,000.00', 'Ex Tax: $2,000.00' ]

    async getProductPriceData():Promise<Map<string,string|number>>{


        let productPriceData=await this.ProductPriceData.allInnerTexts();
        let price=productPriceData[0].trim();
        let exTaxPrice=productPriceData[1].split(':')[1].trim();
        this.productInfo.set('Total Price',price);
        this.productInfo.set('Ex Tax Price',exTaxPrice);
        return this.productInfo;
    }





}
