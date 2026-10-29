
import {test,expect} from '../../src/fixtures/apiFixtures';

const TOKEN=process.env.API_TOKEN!;
let AUTH_HEADER={Authorization: `Bearer ${TOKEN}`};
let userid:any;

test.describe.serial('Running test cases sequentially to avoid flakiness due to depency in test cases',()=>{

test('GET API_ get all the users from goRest API',async ({apiHelper})=>{

   let getResponse=await apiHelper.get('public/v2/users',AUTH_HEADER);
   expect(getResponse.status).toBe(200);
   expect(getResponse.body.length).toBeGreaterThan(0);
   expect(getResponse.statusText).toEqual('OK');

});


test('POST API_ post or create a user in goRest API',async ({apiHelper})=>{

   let userData={
  "name": "jkkar",
  "email": "jkkar@example.com",
  "gender": "male",
  "status": "inactive"
}
   let postResponse=await apiHelper.post('public/v2/users',userData,AUTH_HEADER);
   expect(postResponse.status).toBe(201);
   expect(postResponse.statusText).toEqual('Created');
   userid=postResponse.body.id
   

});

test('PUT API_ update the user in GOREST API ',async ({apiHelper})=>{

   let userData={
  "name": "jkkarnam",
  "email": "jkkarnam@example.com",
  "gender": "male",
  "status": "active"
}
   let putResponse=await apiHelper.put(`public/v2/users/${userid}`,userData,AUTH_HEADER);
   expect(putResponse.status).toBe(200);
   expect(putResponse.statusText).toEqual('OK');
   
});

test('DELETE API_ delete the user in GOREST API ',async ({apiHelper})=>{

 
   let deleteResponse=await apiHelper.delete(`public/v2/users/${userid}`,AUTH_HEADER);
   expect(deleteResponse.status).toBe(204);
   
   
});

});