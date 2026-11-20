import {test,expect} from "../src/fixtures/pageFixtures";






test('register page-register a user with valid credentials',async ({registerPage})=>{


    const uniqueEmail=`ron_${Date.now()}@ygmail.com`;
    let actualSuccessMessage=await registerPage.doRegister('ron','Dotee',uniqueEmail,'2541236978','Password1234');
    expect(actualSuccessMessage).toContain('Your Account Has Been Created!');


});