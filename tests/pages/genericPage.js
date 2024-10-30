const actions = require('../support/actions.lib')
const common = require('../../helpers/common.utils')
const path = process.cwd()
const env = process.env.env || 'sit';
const data = require('../../tests/conf/'+env.toLowerCase());
const scenarioContext = require('../../helpers/context/scenario_context');
const { baseURL } = require('../conf/qa');

class genericPage{
    async navigateToURL(url){
        await page.goto(data['baseURL']);
        await page.waitForTimeout(3000)
    }

    async navigateToPage(url){
        await page.goto(url);
        await page.waitForTimeout(3000)

    }

    async acceptCookie(locator){
        let acceptLocator = locators[locator];
        await actions.clickOnElement(acceptLocator);
    }

    async switchToTab(){
        let pages = await context.pages();
        let secondTab = await pages[1];
        await secondTab.bringToFront();
        await page.waitForTimeout(5000);
        return secondTab;
    }

    async getPageUrl(pageTab){
        let url = await pageTab.url();
        return url;
    }

}

module.exports = new genericPage();