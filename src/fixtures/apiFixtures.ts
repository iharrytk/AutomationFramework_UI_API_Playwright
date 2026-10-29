import { test as BaseTest } from '@playwright/test';
import { APIHelper } from '../api/APIHelper';


type apiFixtures={

    apiHelper:APIHelper;
}


export let test=BaseTest.extend<apiFixtures>({


  apiHelper: async ({request},use)=>{

   let apiHelper=new APIHelper(process.env.API_BASEURL!,request);

    await use(apiHelper);



   }

});



export {expect} from '@playwright/test';
