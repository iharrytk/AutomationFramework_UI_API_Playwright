import Ajv from 'ajv'
import {test,expect } from '../../src/fixtures/apiFixtures'


//create object of AJV-which is used for schema validation
let ajv=new Ajv();


let AUTHORIZATION_HEADER={Authorization: `Bearer ${process.env.API_TOKEN}`};
let userid:any;

//store the schema in let or some external file
let userSchema={
  
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
}



test.beforeEach('Create a user in GOREST API using POST Method',async ({apiHelper})=>{ 

       let userData={
      "name": "jkkar",
      "email": `jkkar_${Date.now()}@example.com`,
      "gender": "male",
      "status": "inactive"
    }

   let postResponse=await apiHelper.post("public/v2/users",userData,AUTHORIZATION_HEADER);
   expect(postResponse.status).toBe(201);
   userid=postResponse.body.id;
   console.log('The user created has id:',userid);

});


test('Get the user id using GET API in GoREST',async ({apiHelper})=>{  

  let getResponse= await apiHelper.get(`public/v2/users/${userid}`,AUTHORIZATION_HEADER);
  expect(getResponse.status).toBe(200);
  let ActualGetResponseBody=getResponse.body;
 let validate= ajv.compile(userSchema);
 let isSchemaValid=validate(ActualGetResponseBody);
 if(!isSchemaValid){


    console.log('Schema Errors:',validate.errors);
 }
 expect(isSchemaValid).toBeTruthy();
 console.log('The get response body of user is:',ActualGetResponseBody);

  


});