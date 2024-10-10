const { When, Given, Then, And } = require('@cucumber/cucumber')
const actions = require('../support/actions.lib')
const scenario_context = require('../../helpers/context/scenario_context')
const genericPage = require('../pages/genericPage')
const common = require('../../helpers/common.utils')
let locators = common.readYamlFiles(process.cwd() + '/tests/locators/' + '/generic.yml')


Given(/^I launch the application$/, async function () {
    await genericPage.navigateToURL();
    await page.waitForTimeout(3000);
});

When(/^I click on "([^"]*)" button$/, async function(buttonLocator) {
    if (locators[buttonLocator] != null) {
        await actions.clickOnElement(locators[buttonLocator]);
    }
    else {
        await actions.clickOnElementText(buttonLocator)
    }
});

Then(/^I wait for "([^"]*)" seconds$/, async function(time) {
    await page.waitForTimeout(time * 1000);
})
