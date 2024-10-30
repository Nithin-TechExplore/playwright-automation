const { When, Given, Then, And } = require('@cucumber/cucumber')
const actions = require('../support/actions.lib')
const scenario_context = require('../../helpers/context/scenario_context')
const genericPage = require('../pages/genericPage')
const common = require('../../helpers/common.utils')
let locators = common.readYamlFiles(process.cwd() + '/tests/locators/' + '/generic.yml')
let assertions = require('../support/assertions.lib')


Given(/^I launch the application$/, async function () {
    await genericPage.navigateToURL();
});

When(/^I click on "([^"]*)" (button|link)$/, async function(buttonLocator,buttonLink) {
    if (locators[buttonLocator] != null) {
        await actions.clickOnElement(locators[buttonLocator]);
        await page.waitForTimeout(1000);

    }
    else {
        await actions.clickOnElementText(buttonLocator)
        await page.waitForTimeout(1000);

    }
});

Then(/^I wait for "([^"]*)" seconds$/, async function(time) {
    await page.waitForTimeout(time * 1000);
})

Then(/^I Enter the "([^"]*)" in "([^"]*)"$/,async function(value,locator){

    await actions.enterValue(locators[locator],value)
})

Then('I verify if the title of the page is {string}',async function(expectedTitle){
  await assertions.verifyTitle(expectedTitle);  
})

