class mainScreen {

    // Define the constructor that accepts the Appium driver object
    constructor(driver) {
        this.driver = driver;
    }

    // Define selectors for elements
    get button() { return this.driver.$('~buttonId'); }
    get label() { return browser.$('~labelId'); }

    // Define methods to interact with the elements
    async clickButton() {
        await this.button.click();
    }

    async getLabelText() {
        return await this.label.getText();
    }

    // Optionally: Define a method to navigate to the screen (if needed)
    async open() {
        await browser.url('your-app-url'); // Replace 'your-app-url' with the actual URL or app path
    }
}

module.exports = new mainScreen(); // Export an instance of the class
