const { When, Given, Then, And } = require('@cucumber/cucumber')
const apiUtils = require('../support/apiUtils')

When(/^I request "([^"]*)" "([^"]*)" call$/,async function(scenarioType,requestType){

    if(requestType === 'post')
    await apiUtils.postCall(scenarioType)

    if(requestType === 'get')
    await apiUtils.getCall(scenarioType)

    if(requestType === 'put')
    await apiUtils.putCall(scenarioType)

    if(requestType === 'delete')
    await apiUtils.deleteCall(scenarioType)
})

When('I validate response status code as {string}',async function(responseStatusCode){
    await apiUtils.validateResponseStatusCode(responseStatusCode)
})

Then('I validate {string} field data as {string}',async function(path,value){
    await apiUtils.validateData(path,value);
})