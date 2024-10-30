const actions = require('../support/actions.lib')
const common = require('../../helpers/common.utils')
const path = process.cwd()
const env = process.env.env || 'sit';
const data = require('../../tests/conf/'+env.toLowerCase());
const scenarioContext = require('../../helpers/context/scenario_context');
const { expect } = require('playwright/test');

class uiEssentialsPage{

    async verifyNewPage(pageName)
    {
        await page.waitForLoadState('domcontentloaded');
        const titleLocator = page.locator('text=' + pageName);
        await expect(titleLocator).toBeVisible();
        
    }

    async verifyTitle(expectedTitle)
    {
        await expect(page).toHaveTitle(expectedTitle)
    }

    async verifyHeadingPage(derivedPage,expectedTitle)
    {
        actions.getTextOfElement
        global.page = await derivedPage;
        let actualTitle = await page.locator("//h3").innerText()
        //let actualTitle = await actions.getTextOfElement("//h3")
        await expect(actualTitle).toBe(expectedTitle);
    }


    

}

module.exports = new uiEssentialsPage();