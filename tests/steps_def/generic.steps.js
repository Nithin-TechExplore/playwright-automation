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

Then('I enter the value {string} in {string} textbox',async function(value,txtBox){

    await actions.enterValue(locators[txtBox],value)
    await page.waitForTimeout(3000);
})

Then('I select the {string} radio',async function(value) {

    await actions.checkRadio(locators[value])
    await page.waitForTimeout(3000);

})

Then('I select {string} values from {string}',async function(values,locator) {
    let days=values.split(',');
    let arrDays =[];
    let derivedLocator = await locators[locator];

    for(let i=0;i<days.length;i++)
    {
       await arrDays.push(derivedLocator.replace('value',days[i].trim())) 
    }

    for(day of arrDays)
    {
        await actions.checkRadio(day);
    }
    await page.waitForTimeout(3000);

})

Then('I select {string} from {string}',async function(value,locator) {
    await actions.selectByValue(locators[locator],value);
    await page.waitForTimeout(3000);

})

When('I select date {string} from {string}',async function(date,dateLocator){

    await genericPage.datePicker((date.split("-")[2]).toString(),(date.split("-")[1]).toString(),(date.split("-")[0]).toString(),dateLocator)
    await page.waitForTimeout(4000);
})