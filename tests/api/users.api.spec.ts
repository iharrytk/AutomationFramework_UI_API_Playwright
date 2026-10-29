
import {test, expect} from  '@playwright/test';

let AUTH_TOKEN={Authorization: 'Bearer 5ee47f56d925756ce83a60228c3579cee8f845e9d20338714fcdc37aa57ec419'};

/**********************************************************************************/
test('get all users',async({request})=>{  

   let response=await request.get('https://gorest.co.in/public/v2/users',
        
        {headers:AUTH_TOKEN})


   console.log('The status code is :',response.status());
   console.log('The status text is:',response.statusText());
   let jsonResponseBody = await response.json();
   console.log(jsonResponseBody);



});


/**********************************************************************************/
test('create a new user',async({request})=>{  
    //JS Object
    let userData={ 
    "name": "Avani Iyer",
    "email": `avani_${Date.now()}@gmail.com`,
    "gender": "female",
    "status": "active"
  }
    //JSObject to JSON-Serialization which is Automatically done by Playwright when we pass the JS Object in the data field of the request.
   let response=await request.post('https://gorest.co.in/public/v2/users',
        
        {headers:AUTH_TOKEN,
        data:userData

        })

   console.log('The status code is :',response.status());
   console.log('The status text is:',response.statusText());
   let jsonResponseBody = await response.json();
   console.log(jsonResponseBody);//8674639
});

/**********************************************************************************/
test('Update the user using PUT call',async({request})=>{  
    //JS Object
    let userData={
    
    "name": "Avani Iyer updated using Put",
    "email": `avani_${Date.now()}@gmail.com`,
    "gender": "female",
    "status": "active"
  }
    //JSObject to JSON-Serialization which is Automatically done by Playwright when we pass the JS Object in the data field of the request.
   let response=await request.put('https://gorest.co.in/public/v2/users/8674639',
        
        {headers:AUTH_TOKEN,
        data:userData
        })
   console.log('The status code is :',response.status());
   console.log('The status text is:',response.statusText());
   let jsonResponseBody = await response.json();
   console.log(jsonResponseBody);//8674639
});


/**********************************************************************************/

test('Delete the user using DELETE call',async({request})=>{  

    //JSObject to JSON-Serialization which is Automatically done by Playwright when we pass the JS 
    // Object in the data field of the request.
   let response=await request.delete('https://gorest.co.in/public/v2/users/8674639',
        
        {headers:AUTH_TOKEN})


   console.log('The status code is :',response.status());
   console.log('The status text is:',response.statusText());
 


});

/**********************************************************************************/