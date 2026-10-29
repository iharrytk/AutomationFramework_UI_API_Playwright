import Ajv from 'ajv'
import {test,expect } from '../../src/fixtures/apiFixtures'


//create object of AJV-which is used for schema validation
let ajv=new Ajv();


let AUTHORIZATION_HEADER={Authorization: `Bearer ${process.env.API_TOKEN}`};

let usersSchema={
  
  "type": "array",
  "items": {
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
}




test('Get the user id using GET API in GoREST',async ({apiHelper})=>{  

  let getResponse= await apiHelper.get(`public/v2/users`,AUTHORIZATION_HEADER);
  expect(getResponse.status).toBe(200);
  let ActualGetResponseBody=getResponse.body;
 let validate= ajv.compile(usersSchema);
 let isSchemaValid=validate(ActualGetResponseBody);
 if(!isSchemaValid){


    console.log('Schema Errors:',validate.errors);
 }
 expect(isSchemaValid).toBeTruthy();
 console.log('The get response body of user is:',ActualGetResponseBody);

  


});