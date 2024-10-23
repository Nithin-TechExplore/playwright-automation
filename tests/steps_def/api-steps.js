const { When, Given, Then, And } = require('@cucumber/cucumber')
let {apiUtils} = require('../support/apiUtils')

When('I request "([^"]*)" post call',async function(scenarioType){
    await apiUtils.postCall(scenarioType)
})

When('I validate response status code as {string}',async function(responseStatusCode){
    await apiUtils.validateResponseStatusCode(responseStatusCode)
})

Then('I validate "{string}" field data as "{string}"',async function(path,value){
    await apiUtils.validateData(path,value);
})