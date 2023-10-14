const { remote } = require('webdriverio');
const assert = require('chai').assert;

const ClickMeScreen = require('../screens/MainScreen.js');

let driver = null;
let mainScreen = null;

//TODO move to config file
const remoteOptions = {
    hostname: process.env.APPIUM_HOST || '127.0.0.1',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android',
        'appium:appPackage':'com.palringo.qa_automation_android',
        'appium:appActivity': '.MainActivity',
        'appium:fastReset': true
    }
};

before(async function() {
    this.timeout(10000); // set timeout to 10 seconds
    driver = await remote(remoteOptions);
    mainScreen = new ClickMeScreen(driver);
});

after(async function() {
    try {
        await driver.deleteSession();
    } catch(err) {
        console.error("Error while deleting the session:", err);
    }
});

describe('Button Click Count Feature Acceptance Test', function() {

    this.timeout(10000);

    // Scenario: Click me screen opens
    // WHEN the app is opened
    // THEN its main screen contains a button with text “Click me” and a label with text “0”
    it('should display a button with text "Click me" and a label with text "0"', async function() {
        assert.equal(await mainScreen.getButtonText(), 'Click me', 'The clickValue did not match expected value');
        assert.equal(await mainScreen.getLabelText(), '0', 'Label did not match expected')
    });

    // Scenario: Click button when label is "0"
    // GIVEN the label is "0"
    // WHEN clicking the button
    // THEN the label should change to "1"
    it('should update the label to "1" when the label is "0" and the button is clicked', async function() {
        await mainScreen.clickButton();
        assert.equal(await mainScreen.getLabelText(), '1', 'Label did not match expected')
    });

    // Scenario: Click button when label is "1"
    // GIVEN the label is "1"
    // WHEN clicking the button
    // THEN the label should change to "2"
    it('should update the label to "2" when the label is "1" and the button is clicked', async function() {
        await mainScreen.clickButton();
        assert.equal(await mainScreen.getLabelText(), '2', 'Label did not match expected')
    });

    // Scenario: Click button when label is "2"
    // GIVEN the label is "2"
    // WHEN clicking the button
    // THEN the label should change to "MAX"
    it('should update the label to "MAX" when the label is "2" and the button is clicked', async function() {
        await mainScreen.clickButton();
        assert.equal(await mainScreen.getLabelText(), 'MAX', 'Label did not match expected')
    });

});
