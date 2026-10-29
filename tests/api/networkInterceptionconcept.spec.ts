import {test,expect} from '@playwright/test';

//intercept the network calls -Normal interception
test('intercept and log all the network API requests',async ({page})=>{

    //listener-running in background
  await  page.route('**/*',async (route)=>{

        console.log(route.request().method(),route.request().url());
        await route.continue();
    });

    await page.goto('https://naveenautomationlabs.com/opencart/');



});



//intercept the network calls -with Mocking
test('intercept with mocking',async ({page})=>{

    let fakeProducts=[{name: 'Fake Mackbook pro pro',price:'500$'},{name: 'Fake Mackbook pro max',price:'1000$'}]

    //listener-running in background
  await  page.route('**/index.php?route=product/product&product_id=43',async (route)=>{

        route.fulfill({
            status:200,
            contentType:'application/json',
            body:JSON.stringify(fakeProducts)
        });
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=43');

    await page.pause();



});


