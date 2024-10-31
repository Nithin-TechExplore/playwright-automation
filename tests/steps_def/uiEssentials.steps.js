const { When, Given, Then, And, context } = require('@cucumber/cucumber')
const actions = require('../support/actions.lib')
const scenario_context = require('../../helpers/context/scenario_context')
const genericPage = require('../pages/genericPage')
const common = require('../../helpers/common.utils')
const uiEssentialsPage = require('../pages/uiEssentialsPage')
const assertions = require('../support/assertions.lib')
const locators = common.readYamlFiles(process.cwd() + '/tests/locators/' + '/generic.yml')



Then('I verify if {string} page is opened', async function (pageName) {

    uiEssentialsPage.verifyNewPage(pageName)
})

Then('I click on {string} link and switch tab', async function (linkName) {

    let pagePromise = global.context.waitForEvent('page');
    if (locators[linkName] != null) {
        await actions.clickOnElement(locators[linkName]);
        await page.waitForTimeout(5000);

    }
    else {
        await actions.clickOnElementText(linkName)
        await page.waitForTimeout(1000);
    }

    let tempPage = await pagePromise;
    scenario_context.setContext('tempPage', tempPage)

    let originalPage = await global.page;
    scenario_context.setContext('originalPage', originalPage)

})

Then('I verify if the title of the page is {string} for the switched tab', async function (expectedTitle){
    let tempPage = scenario_context.getContext('tempPage')
    await assertions.verifyTitleMultiplePages(tempPage, expectedTitle)
})

When('I click on {string} link for the switched tab',async function(elementLocator){
    global.page = scenario_context.getContext('tempPage')
    if (locators[elementLocator] != null) {
        await actions.clickOnElement(locators[elementLocator]);
        await page.waitForTimeout(5000);

    }
    else {
        await actions.clickOnElementText(elementLocator)
        await page.waitForTimeout(1000);
    }
})

Then('I switch back to main window',async function() {
    global.page = scenario_context.getContext('originalPage')
    await page.bringToFront();
    
} )

Then(/^I check if the Heading of the page is "([^"]*)"(| "([^"]*)")$/,async function(expectedTitle,switchTab) {
    let derivedPage;
    
    if(switchTab!== null)
    {
        derivedPage = await scenario_context.getContext('tempPage')
    }
    
    else{
        derivedPage = await global.page;
    }
    await uiEssentialsPage.verifyHeadingPage(derivedPage,expectedTitle)
})

When(/^I select "([^"]*)" from dropdown$/,async function(param) {
    let loc = await locators['dropdown'];
    console.log('Locators  ',locators['dropdown'])
    await actions.selectByValue(locators['dropdown'],param);

})