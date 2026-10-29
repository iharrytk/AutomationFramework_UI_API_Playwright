import {test,expect} from "../src/fixtures/pageFixtures";
import {csvutil} from "../src/utils/csvutil";


let searchData=csvutil.readCsv('src/data/searchProductData.csv');

for(let row of searchData){

test.beforeEach(`Precondition-Login to the application and select product-${row.selectProductdata}`,async({loginPage})=>{

    loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAMEEMAIL!,process.env.PASSWORDEMAIL!);
    // await homePage.doSearch(row.searchProductdata);
    // let productPageURL = await resultsPage.selectProduct(row.selectProductdata);
    // expect(productPageURL).toContain(`search=${row.searchProductdata}`);

});





test(`Verify product name on Product info page-${row.selectProductdata}`,async ({productInfoPage,homePage,resultsPage})=>{

    await homePage.doSearch(row.searchProductdata);
    let productPageURL = await resultsPage.selectProduct(row.selectProductdata);
    expect(productPageURL).toContain(`search=${row.searchProductdata}`);

   let ActualProductName=await productInfoPage.getProductName();
    expect(ActualProductName).toBe(row.selectProductdata);

});


test(`Verify product images on Product info page-${row.selectProductdata}`,async ({productInfoPage,homePage,resultsPage})=>{

    await homePage.doSearch(row.searchProductdata);
    let productPageURL = await resultsPage.selectProduct(row.selectProductdata);
    expect(productPageURL).toContain(`search=${row.searchProductdata}`);
   let ActualImagesProductCount=await productInfoPage.getProductImagesCount();
    expect(ActualImagesProductCount).toBe(Number(row.imagecount));

});


test(`Verify product brand details on Product info page for the product-${row.selectProductdata}`,async ({productInfoPage,homePage,resultsPage})=>{
   await homePage.doSearch(row.searchProductdata);
    let productPageURL = await resultsPage.selectProduct(row.selectProductdata);
    expect(productPageURL).toContain(`search=${row.searchProductdata}`); 
   let MetaData=await productInfoPage.getProductMetaData();
   expect(MetaData.get('Brand')).toBe(row.brand);
});


test(`Verify product code data on Product info page for the product-${row.selectProductdata}`,async ({productInfoPage,homePage,resultsPage})=>{
    await homePage.doSearch(row.searchProductdata);
    let productPageURL = await resultsPage.selectProduct(row.selectProductdata);
    expect(productPageURL).toContain(`search=${row.searchProductdata}`);
    let MetaData=await productInfoPage.getProductMetaData();
    expect(MetaData.get('Product Code')).toBe(row.productcode);
});

}


test('verify base page method to check website logo',async({productInfoPage,loginPage})=>{

    loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAMEEMAIL!,process.env.PASSWORDEMAIL!);
    let isLogoDisplayed=await productInfoPage.getOpenCartLogoExists();
    expect(isLogoDisplayed).toBeTruthy();
});


test('verify base page method to check website footer links',async({productInfoPage,loginPage})=>{

    loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAMEEMAIL!,process.env.PASSWORDEMAIL!);
    let totalFooterLinks=await productInfoPage.getTotalFooterLinks();
    expect(totalFooterLinks).toBe(15);
});