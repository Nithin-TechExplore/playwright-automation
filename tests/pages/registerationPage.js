const actions = require('../support/actions.lib')
const common = require('../../helpers/common.utils')
const path = process.cwd()
const env = process.env.env || 'sit';
const data = require('../../tests/conf/'+env.toLowerCase());
const scenarioContext = require('../../helpers/context/scenario_context');
let locators = common.readYamlFiles(process.cwd() + '/tests/locators/' + 'register.yml')


class registerationPage{

    async enterDetails(data){

        let fieldDetails = Object.keys(data[0]);
        let row = data[0];
        for(let i=0;i<fieldDetails.length;i++)
        {
            let key = fieldDetails[i]
            let value = row[key];
            actions.enterValue(locators[key],value);
            await page.waitForTimeout(3000);
        }


    }

}

module.exports = new registerationPage();