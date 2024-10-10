const { When, Given, Then, And } = require('@cucumber/cucumber')
const actions = require('../support/actions.lib')
const scenario_context = require('../../helpers/context/scenario_context')
const registerPage = require('../pages/registerationPage')
const common = require('../../helpers/common.utils')
let locators = common.readYamlFiles(process.cwd() + '/tests/locators/' + '/register.yml')

Then(/^I enter the following values$/,async function(data){

    let fieldDetails = data.hashes();
    
   await  registerPage.enterDetails(fieldDetails)

});