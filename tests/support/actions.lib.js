let timeOut = 60000;
const env = process.env.env || 'sit';
const data = require('../../tests/conf/' + env.toLowerCase())

const actions = {
    getLocator: async (locator) => {

        if (locator != null) {
            return await page.locator(locator);
        } else {
            return await page.getByText(locator);
        }
    },

    getElement: async (locator, wait = timeOut) => {

        if (locator != null) {
            try {
                let element = await page.waitForSelector(locator, { timeout: wait })
                return element;
            } catch (error) {
                throw new Error('Element not found with locator: ' + locator + ' within timeout ' + timeOut)
            }

        } else {
            return await page.getByText(locator);

        }

    },

    clickOnElement: async (locator) => {
        let ele = await actions.getElement(locator);
        await ele.click();
    },

    clickOnElementText: async(locator) => {
        let ele = await page.getByText(locator);
        await ele.click();
    },

    clickOnElementByRole: async(locator,role) => {
        let ele = await actions.getElementByRole(locator,role);
        await ele.first().click()
    },

    enterValue: async(locator, value) => {
        await page.waitForSelector(locator,{timeout:timeOut})
        let ele = await actions.getLocator(locator)
        await ele.fill(value);
    },

    clearAndEnterValue: async (locator,value) => {
        await page.waitForSelector(locator,{timeout: timeout})
        let ele = await actions.getLocator(locator)
        await ele.clear();
        await ele.fill(value);

    },

    checkElementVisible: async(locator) =>{
        let flag = true;
        try{
            let element = await actions.getElement(locator,5000);
            flag = await element.isVisible();
        } catch(error){
            flag = false;
        }
        return flag;
    },

    getElementByRole: async(locator,role) => {
        return await page.getByRole(role,{name:locator})
    },

    clearValue: async(locator,value) => {
        await page.waitForSelector(locator,{timeout:timeOut})
        let ele = await actions.getLocator(locator)
        await ele.clear();
    },

    checkRadio: async(locator)=>{
            let button = await actions.getLocator(locator);

       
            if(!await button.isChecked()){
                await button.check()
            }

    },

    unCheckRadio: async(locator)=>{
        let button = await actions.getLocator(locator);
        if(await button.isChecked()){
            button.check()
        }
    },
    hoverOnELement: async(locator) => {
        let ele = await actions.getLocator(locator);
        await ele.hover();
    },
    getTextOfElement: async(locator) => {
        let ele = await actions.getLocator(locator);
        return await ele.innerText()
    },
    getElementAttribute: async(locator,attribute) => {
        let ele = await actions.getLocator(locator);
        return await ele.getAttribute(attribute);
    },
    isElementEnabled: async(locator) => {
        let ele = await actions.getLocator(locator);
        return await ele.isEnabled();
    },
    isElementVisible: async(locator) => {
        let ele = await actions.getLocator(locator);
        return await ele.isVisible();
    },
    isChecked: async(locator) => {
        let button = await actions.getLocator(locator);
        return await button.isChecked();
    },
    setCookie: async(cookieDetails)=>{
        let name = cookieDetails['name'];
        let value = cookieDetails['value'];
        const href = await page.evaluate(() => document.cookie = "authCookie=GG_TEST_USER;path=/")

    },
    async getCookieValue(){
        let authToken = "";
        let url = new URL(data['baseUrl']);
        let domain = url.hostname;
        let cookies = await context.cookies('https://'+domain);
            if(cookies[0]['name'] === 'authCookie'){
                authToken = cookies[0]['value'];
            }
            return authToken;
    },

    clearValue: async(locator) =>{
        await page.waitForSelector(locator,{timeout:timeOut})
        let ele = await actions.getLocator(locator)
        await ele.clear();
    },

    waitForTextLocator: async(textContent) =>{
        let textSel = "//*[text()='"+textContent+"']";
        await page.waitForSelector(textSel,{timeout:timeOut})
    },

    chooseDropDown: async(locator,option) =>{
        await page.getByRole(locator,{timeout:timeOut})
    },

    tabOut: async(locator)=>{
        await page.locator(locator).press('Tab')
    },

    countOfElements: async(locator)=>{
        return await page.locator(locator).count();
    },

    selectByValue: async(locator,value) =>{
        let ele = await actions.getLocator(locator);
        await ele.selectOption(value);
    },

    selectByIndex: async(locator,index) =>{
        let ele = await actions.getLocator(locator);
        await ele.selectOption({index:index});
    },

    selectMultiple: async(locator,array) =>{
        let ele = await actions.getLocator(locator);
        await ele.selectOption(array);
    }
}

module.exports = actions;