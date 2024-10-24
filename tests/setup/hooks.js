const {
    Before,
    After,
    BeforeAll,
    AfterAll,
    BeforeStep,
    AfterStep,
    Status,
    setDefaultTimeout
} = require('@cucumber/cucumber')
const { chromium, firefox, webkit } = require('playwright')
require("dotenv/config")
const fs = require("fs")
const os = require("os")
const moment = require('moment')
const propertiesPath = "executionDateAndTime.properties"
const scenarioContext = require('../../helpers/context/scenario_context')
let DEFAULT_TIMEOUT = 180000;
setDefaultTimeout(DEFAULT_TIMEOUT)
const path = require('path')
const common = require('../../helpers/common.utils')

const { snapshot } = require('node:test')
let envDetails;
let dateTime;
let folderPath;
let currentDate;
const options = {
    headless: false,
    args: ['--start-maximized']
}

if (process.env.HTTP_PROXY) {
    options.proxy = {
        server: process.env.HTTP_PROXY
    }
}

let executablePath = '/root/.cache/ms-playwright/chromium-1134/chrome-linux/chrome'
let headless = true
let userProfile = os.homedir()
let osName = process.platform


if (osName.includes('win32')) {
    executablePath = path.join(userProfile, 'AppData', 'Local', 'ms-playwright', 'chromium-1134', 'chrome-win', 'chrome.exe');
    headless = false;
}

// Check if the executable exists
if (!fs.existsSync(executablePath)) {
    console.error(`Executable not found at: ${executablePath}`);
    throw new Error(`Chromium executable not found at ${executablePath}`);
}

BeforeAll(async () => {
    console.log('Path  ', executablePath)
    console.log('Started Execution')
    currentDate = moment().format('YYYY-MM-DD');
    let currentTime = moment().format('HH.mm.ss')
    dateTime = `${currentDate}_${currentTime}`
    folderPath = path.resolve(`./reports/traces/${currentDate}/${currentTime}`);
    fs.open('executionDateAndTime.properties', 'w', function (err) {
        if (err) throw err;
    })
    fs.appendFileSync(propertiesPath, 'executionDateAndTime=' + currentDate + " " + currentTime + "\n")
    await common.deleteFolder('./reports/accessibility');
    console.log('Launch Browser')
    global.environment = process.env.env;
    global.brand = process.env.brand;
    global.projectType = process.env.project;
    global.globalTimeout = DEFAULT_TIMEOUT;
    const browserType = (process.env.BROWSER != null) ? process.env.BROWSER : 'chromium';
    console.log('@BeforeAllHook: Launch Browser')
    switch (browserType) {
        case 'chromium':
            options.channel = 'chromium';
            global.browser = await chromium.launch(
                {
                    executablePath: `${executablePath}`,
                    headless: headless,
                    args: ['--start-maximized']
                }
            );
            break;
    }
})

Before(async function (scenario) {
    console.log('@Before Scenario Hook');
    scenarioContext.setContext("tags", scenario.pickle.tags);
    global.context = await global.browser.newContext({ ignoreHTTPSErrors: true })
    context = await global.browser.newContext({
        viewport: null,
        ignoreHTTPSErrors: true,
        recordVideo: {
            dir: "reports/video_reports",
            size: { width: 1280, height: 720 }
        }
    })
    global.page = await global.context.newPage();
    await context.tracing.start({ screenshots: true, snapshots: true })
}
)

After(async function (scenario) {
    console.log('Finished Executing the Scenario: ' + scenario.pickle.name.toUpperCase())
    console.log('Execution End Time: ' + new Date().toString());
    scenarioContext.getScenarioContext().clear();

    let scenarioName = scenario.pickle.name.replaceAll(' ', '_') + "_" + moment().format('HH.mm.ss')
    let buffer = await page.screenshot({ path: "reports/screenshots/" + scenarioName + ".png", fullPage: true });
    await this.attach(buffer, 'image/png');
    let videoPath = await page.video().path();

    const traceFileName = `trace-${scenarioName}-${Date.now()}.zip`;
    await context.tracing.stop({ path: `${folderPath}/${traceFileName}` });
    const zipper = await fs.readFileSync(`${folderPath}/${traceFileName}`);
    await this.attach(zipper, 'application/zip');
    await context.close();
})

AfterStep(async function (scenario) {
    let scenarioName = scenario.pickle.name.replaceAll(' ', '_') + "_" + moment().format('HH.mm.ss')
    if (scenario.result?.status !== 'PASSED') {
        let buffer = await page.screenshot({
            path: "reports/screenshots/" + scenarioName + ".png",
            fullPage: true
        });
        await this.attach(buffer, 'image/png')
    }
})

AfterAll(async () => {
    console.log('@AfterAllHook: Close Browser')
    await global.browser.close()
})