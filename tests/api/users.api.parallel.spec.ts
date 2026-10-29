
import {test,expect} from '../../src/fixtures/apiFixtures';

const TOKEN=process.env.API_TOKEN!;
let AUTH_HEADER={Authorization: `Bearer ${TOKEN}`};



async function postUser(apiHelper:any) {

     let userData={
      "name": "jkkar",
      "email": `jkkar_${Date.now()}@example.com`,
      "gender": "male",
      "status": "inactive"
    }
       let postResponse=await apiHelper.post('public/v2/users',userData,AUTH_HEADER);
       expect(postResponse.status).toBe(201);
       
      return postResponse.body;
        
    
}



test('POST API_ post or create a user in goRest API parallel execution and get the user',async ({apiHelper})=>{

    //call the asynchronous function to create a user
  let postResponse= await postUser(apiHelper);
   console.log('The async function has created the user:',postResponse);

   //GET call --confirm the user has been posted
  let getResponse=await apiHelper.get(`public/v2/users/${postResponse.id}`,AUTH_HEADER);
   expect(getResponse.status).toBe(200);
   //expect(getResponse.body.length).toBeGreaterThan(0);
   expect(getResponse.statusText).toEqual('OK');
   console.log('The response body of GET call is:',getResponse.body);

});




test('PUT API_ update the user in GOREST API parallel execution ',async ({apiHelper})=>{

    //call the asynchronous function to create a user
  let postResponse= await postUser(apiHelper);
   console.log('The async function has created the user:',postResponse);

   //Update the user using a put call
   let userData={
  "name": "jkkarnam",
  "email": `jkkarnam_${Date.now()}@example.com`,
  "gender": "male",
  "status": "active"
}
   let putResponse=await apiHelper.put(`public/v2/users/${postResponse.id}`,userData,AUTH_HEADER);
   expect(putResponse.status).toBe(200);
   expect(putResponse.statusText).toEqual('OK');
   console.log('The response body of PUT call :',putResponse.body);


   //get the user that has been updated
    let getResponse=await apiHelper.get(`public/v2/users/${putResponse.body.id}`,AUTH_HEADER);
   expect(getResponse.status).toBe(200);
  // expect(getResponse.body.length).toBeGreaterThan(0);
   expect(getResponse.statusText).toEqual('OK');
   console.log('The response body of GET call after being updated by PUT call:',getResponse.body);

   
});



test('DELETE API_ delete the user in GOREST API parallel execution ',async ({apiHelper})=>{

    //call the asynchronous function to create a user
  let postResponse= await postUser(apiHelper);
   console.log('The async function has created the user:',postResponse);

   //delete the user using a delete call

   let putResponse=await apiHelper.delete(`public/v2/users/${postResponse.id}`,AUTH_HEADER);
   expect(putResponse.status).toBe(204);
   expect(putResponse.statusText).toEqual('No Content');
   


   //get the user that has been updated
    let getResponse=await apiHelper.get(`public/v2/users/${postResponse.id}`,AUTH_HEADER);
   expect(getResponse.status).toBe(404);
   console.log('The response body of GET call after being deleted by delete call is:',getResponse.body);

   
});




