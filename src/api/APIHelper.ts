import { APIRequestContext } from "@playwright/test";


export class APIHelper{

    private readonly API_BASEURL:string;
    private readonly request:APIRequestContext;

    constructor(API_BASEURL:string,request:APIRequestContext){

        this.API_BASEURL=API_BASEURL;
        this.request=request

    }

    //GET
    async  get(endpoint:string,headers?:Record<string,string>){

     let response= await this.request.get(`${this.API_BASEURL}${endpoint}`,{headers:headers});

     return{

        status:response.status(),
        statusText:response.statusText(),
        body:await response.json()
     }

    }

    //POST

    async  post(endpoint:string,data:object,headers?:Record<string,string>){

     let response= await this.request.post(`${this.API_BASEURL}${endpoint}`,
        {
            headers:headers,
            data:data
        }
    
    );

     return{

        status:response.status(),
        statusText:response.statusText(),
        body:await response.json()
     }

    }


    //PUT
    async  put(endpoint:string,data:object,headers?:Record<string,string>){

     let response= await this.request.put(`${this.API_BASEURL}${endpoint}`,
        {
            headers:headers,
            data:data
        }
    
    );

     return{

        status:response.status(),
        statusText:response.statusText(),
        body:await response.json()
     }

    }

    //DELETE
    async  delete(endpoint:string,headers?:Record<string,string>){

     let response= await this.request.delete(`${this.API_BASEURL}${endpoint}`,
        {
            headers:headers
            
        }
    
    );

     return{

        status:response.status(),
        statusText:response.statusText()
        
     }

    }


}