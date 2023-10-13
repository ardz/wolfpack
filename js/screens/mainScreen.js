class mainScreen {

    // Define the constructor that accepts the Appium driver object
    constructor(driver) {
        this.driver = driver;
    }

    // Define selectors for elements
    get button() { return this.driver.$('~buttonId'); }
    get label() { return this.driver.$('~labelId'); }

    // Define methods to interact with the elements
    async clickButton() {
        await this.button.click();
    }

    async getLabelText() {
    }

    // Optionally: Define a method to navigate to the screen (if needed)
    async open() {
        // BUG?
        // the AndroidManifest.xml file doesn't have
        // a package attribute below the <manifest> tag
        // got this by using:
        // ```adb shell
        // dumpsys window displays | grep -E 'mCurrentFocus'```

        await this.driver.startActivity("com.palringo.qa_automation_android",
            ".MainActivity");

    }
}

module.exports = new mainScreen(); // Export an instance of the class
