// add required packages
const assert = require('chai').assert;
const { remote } = require('webdriverio');

// add the main screen page object
const mainScreen = require('../screens/mainScreen');

// define appium capabilities
const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android',
    //'appium:appPackage': 'com.android.settings',
    //'appium:appActivity': '.Settings',
};

const webdriverOptions = {
    hostname: process.env.APPIUM_HOST || '127.0.0.1',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
};

let driver;

// Before all tests, initialise driver
before(async function() {
    this.timeout(10000);  // setting timeout to 10 seconds for this hook
    driver = await remote(webdriverOptions);
    // Add any additional setup steps if required
});

// After all tests, close driver session
after(async function() {
    if (driver) {
        await driver.deleteSession();
    }
});

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('Can open the battery app', function() {
    this.timeout(10000);
    it('should find the battery item and click it', async function() {
        try {
            await driver.startActivity("com.android.settings",".Settings");
            const batteryItem = await driver.$('//*[@text="Battery"]');
            await batteryItem.click();
        } finally {
            await driver.pause(1000);
        }
    })
});


