let fsexe=require('fs-extra')
const{expect,request} = require('@playwright/test')
const jp=require('jsonpath')

let response;

class apiUtils{

    async postCall(scenarioType){
            let apiContext = await request.newContext();
            let data = await fsexe.readFileSync('testData/apiData/'+process.env.env+'/'+scenarioType+'.json','utf-8');
            let apiData = JSON.parse(data)
            response = await apiContext.post(apiData.url,
                {
                    data: apiData.data,
                    headers: apiData.header, 
                }
            )
            console.log('Response Body ',await response.json());
    }

    async putCall(scenarioType){
        let apiContext = await request.newContext();
        let data = await fsexe.readFileSync('testData/apiData/'+process.env.env+'/'+scenarioType+'.json','utf-8');
        let apiData = JSON.parse(data)
        response = await apiContext.put(apiData.url,
            {
                data: apiData.data,
                headers: apiData.header, 
            }
        )
        console.log('Response Body ',await response.json());

    }

    async getCall(scenarioType){
        let apiContext = await request.newContext();
        let data = await fsexe.readFileSync('testData/apiData/'+process.env.env+'/'+scenarioType+'.json','utf-8');
        let apiData = JSON.parse(data)
        response = await apiContext.get(apiData.url,
            {
                headers: apiData.header, 
            }
        )
        console.log('Response Body ',await response.json());
    }

    async deleteCall(scenarioType){
        let apiContext = await request.newContext();
        let data = await fsexe.readFileSync('testData/apiData/'+process.env.env+'/'+scenarioType+'.json','utf-8');
        let apiData = JSON.parse(data)
        response = await apiContext.delete(apiData.url,
            {
                headers: apiData.header, 
            }
        )
        console.log('Response Body ',await response.json());
    }

    async validateResponseStatusCode(expectedStatusCode){
        expect(response.status()).toBe(Number(expectedStatusCode))
    }

    async validateData(jsonQuery,value){
        console.log('Json Query',jsonQuery)
        let apiResponse = await response.json();
        let actualValue = await jp.query(apiResponse,jsonQuery)[0]
        console.log('Actual Value : ',actualValue)
        await expect(value).toBe(actualValue.toString())
    }
}

module.exports = new apiUtils();
