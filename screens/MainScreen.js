// FileName: MainScreen.js

class MainScreen {
    // Constructor to initialize elements on the screen
    constructor(driver) {
        this.driver = driver;
    }

    async getLabelText(){
        const [clickValue] = await Promise
            .all([this.driver.$(`android=new UiSelector().resourceId("tag_label")`)
                .getAttribute("text")]);

        return clickValue;
    }

    async clickButton(){
        return await this.driver.$(`android=new UiSelector().resourceId("tag_button")`).click();
    }

    async getButtonText(){

        // there was a shorter way of doing this, but I've lost the snippet :S
        // xpath obviously sucks

        let element = await this.driver.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/" +
            "android.widget.FrameLayout/androidx.compose.ui.platform.ComposeView/android.view.View/" +
            "android.view.View/android.view.View/android.widget.TextView");

        return element.getAttribute("text");
    }
}

module.exports = MainScreen;
