const { expect } = require('playwright/test');
const actions = require('../support/actions.lib');
const { verifyTitle } = require('../pages/uiEssentialsPage');


const assertions = {
    verifyText: async(text) => {
        await expect(await actions.getLocator(text)).toHaveText(text);
    },
    verifyContainsText: async(locator,text) =>{
        let ele = await actions.getLocator(locator)
        await expect(await ele.innerText()).toContain(text)
    },
    verifyRadioChecked: async(locator)=>{
        await expect(await actions.getLocator(locator)).toBeChecked()
    },
    verifyElementEnabled: async(locator)=>{
        await expect(await actions.getLocator(locator)).toBeEnabled()
    },
    verifyElementDisabled: async(locator)=>{
        await expect(await actions.getLocator(locator)).toBeDisabled()
    },
    verifyElementVisible: async(locator)=>{
        await expect(await actions.getLocator(locator)).toBeVisible()
    },
    verifyElementHasAttribute: async(locator,attribute,value)=>{
        await expect(await actions.getLocator(locator)).toHaveAttribute(attribute,value)
    },
    verifyCountOfElements: async(locator,count)=>{
        await expect(await actions.getLocator(locator)).toHaveCount(count)
    },
    verifyElemntContainsText: async(locator,text)=>{
        let element = await actions.getElement(locator);
        let actual = await element.innerText();
        await expect(actual).toContain(text);
    },
    verifyUrl: async(pageUrl) =>{
        let actualUrl = await page.url();
        await expect(actualUrl).toBe(pageUrl)
    },
    verifyUrlContains: async(partUrl)=>{
        let actualUrl = await page.url();
        await expect(actualUrl).toContain(partUrl);
    },
    verifyElementHidden: async(locator)=>{
        await expect(await actions.getLocator(locator)).toBeHidden()
    },
    verifyTitle: async(expectedTitle)=>{
        await expect(page).toHaveTitle(expectedTitle);
    },
    verifyTitleMultiplePages: async(tempPage,expectedTitle)=>{
        await expect(tempPage).toHaveTitle(expectedTitle);

    }

};

module.exports = assertions;