import {Page,Locator} from "@playwright/test";


export class BasePage{


    protected readonly page:Page;

    private readonly OpenCartLogo:Locator;
    private readonly totalFooterLinks:Locator;
   

    constructor(page:Page){
        this.page = page;
        this.OpenCartLogo=page.getByRole('img',{name:'naveenopencart'});
        this.totalFooterLinks=page.locator('footer div.row a')

}

//page actions for the base page

async getPageScreenshot():Promise<void>{

     const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-');

    await this.page.screenshot({path:`screenshots/searchResults-${timestamp}.png`,fullPage:true});
}

async getPageTitle():Promise<string>{

    return await this.page.title();


}


async getOpenCartLogoExists():Promise<boolean>{

    return await this.OpenCartLogo.isVisible();

}

async getTotalFooterLinks():Promise<number>{

    return await this.totalFooterLinks.count();
}






}