import {test,expect} from "../src/fixtures/pageFixtures";
import {csvutil} from "../src/utils/csvutil";


test.beforeEach(async({loginPage})=>{

   await loginPage.goToLoginPage();
   await loginPage.doLogin(process.env.USERNAMEEMAIL!,process.env.PASSWORDEMAIL!);


});


let searchData=csvutil.readCsv('src/data/searchProductData.csv');

for(let row of searchData){

test(`Verify search functionality with productname as ${row.searchProductdata}`,async ({homePage,resultsPage})=>{

     await homePage.doSearch(row.searchProductdata);
     const resultCountActual = await resultsPage.getSearchResults();
     expect(resultCountActual).toBeGreaterThan(0);
     
});

}



for(let row of searchData){

test(`verify search functionality with a product-${row.searchProductdata} and click on the product result-${row.selectProductdata}`,async ({homePage,resultsPage})=>{

    await homePage.doSearch(`${row.searchProductdata}`);
    const urlActual=await resultsPage.selectProduct(`${row.selectProductdata}`);
    await resultsPage.getPageScreenshot();
    expect(urlActual).toContain(`search=${row.searchProductdata}`);
    let titleActual=await resultsPage.getPageTitle();
    //expect.soft(titleActual).toContain(`${row.selectProductdata}`);
    
    

});

}