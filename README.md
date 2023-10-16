
# WOLFPACK (Submission for Tech Assessment)

A comprehensive development environment setup guide for running automated tests on an Android device. Appium's tech stack is vast, with a significant initial setup phase required to start using it. This guide demonstrates the process and includes an example mocha test project. While the guide is tailored for Windows, the principles apply to other platforms. It has been verified for compatibility with Linux.

(Note - the whole thing can be used to test an iOS app too because Appium is being used as the middleman. You'd just need to modify the page object to include iOS specific locators and tweak the driver options).

[Running Example](https://www.youtube.com/watch?v=casro3ZYTig)

## Table of Contents

- [Dev Environment Setup](#dev-environment-setup)
  - [Node.js](#nodejs)
  - [Java](#java)
  - [Android Studio](#android-studio)
  - [Appium](#appium)
- [Run Automated Tests](#run-automated-tests)
- [Bug Report](#bug-report)

## Dev Environment Setup

### Node.js

Install [node.js](https://nodejs.org/en) and confirm its successful installation by opening a command prompt and typing:

```
node -v
```

![image](https://github.com/ardz/wolfpack/assets/6310248/eba4e494-6d85-43cf-a4fb-e368bb37d8e0)

### Java

Install the [JDK](https://www.oracle.com/uk/java/technologies/downloads/) and ensure the JAVA_HOME environment variable is set. If not, add it. On Windows, I've configured it as a system-wide variable. You can store the JDK anywhere you prefer:

![env](https://github.com/ardz/wolfpack/assets/6310248/e773e4d9-9271-4f3f-a2d3-953f4d426993)

### Android Studio

Install [Android Studio](https://developer.android.com/studio/install).

Android Studio is essential to:

a) Run and connect to an emulated Android device using the Android Debug Bridge (adb)

b) Install tools and SDKs, enabling Appium's server to connect to the Android device

Clone the app we'll test: https://github.com/Palringo/QA-Automation-Android:

```
git clone https://github.com/Palringo/QA-Automation-Android.git
```

Or download it directly from GitHub as a zip.

If familiar with Kotlin or eager to inspect the app structure, open the cloned repository in Android Studio. You can deploy the app to the emulated device using the "Run" button in Android Studio. Note that the actual tests will handle the installation of the pre and release APKs onto the device.

Optionally, open Android Studio and create a new empty project (accessing the device manager to run an emulated Android phone is the main goal). Install any Android emulator (e.g., MS Android Emulator) or connect a physical device via USB/Wi-Fi. As long as adb can communicate with the device, Appium can relay commands for automated tests.

Open the SDK Manager in Android Studio:

![tools_sdk](https://github.com/ardz/wolfpack/assets/6310248/454e3dcd-9e05-4ab0-8504-504d2422170c)

Note that the SDK Platform for version 34 of the Android API is installed:

![platform](https://github.com/ardz/wolfpack/assets/6310248/1d45abe3-1667-4a24-82bc-ddcaa562d079)

Open the SDK Tools tab and ensure the items displayed are installed. Add the command line tools by selecting them and clicking "Apply":

![tools_sdk_screen](https://github.com/ardz/wolfpack/assets/6310248/2dfc9694-f02d-4f3a-a406-ead2fd4e97a7)

Remember the Android SDK location; we'll need it for the subsequent environment variable setup:

![android_sdk_location](https://github.com/ardz/wolfpack/assets/6310248/f000b666-4de1-47e7-b95e-7b4217561e92)

Take a break, then ensure all environment variables allow using adb and other SDK commands:

![sdk_tools_env_vars](https://github.com/ardz/wolfpack/assets/6310248/a4fc2215-4fcc-4ace-8618-0aa8b90a884f)

Verify the environment variables setup:

```
echo %path:;=&echo.%
```

![echo_all](https://github.com/ardz/wolfpack/assets/6310248/7a389b5c-a5df-4078-a6b7-c142b52aab65)

```
echo %ANDROID_HOME%
```

![echo_android_home](https://github.com/ardz/wolfpack/assets/6310248/86b5003f-b75b-4638-b89c-e2707426fdf0)

Now, the adb and other Android SDK commands can be used from the console:

![adb_command](https://github.com/ardz/wolfpack/assets/6310248/a2612a91-8a5d-427e-a7ea-ecade2f477f2)

Activate a device from the Device Manager in Android Studio, return to the command prompt, and enter:

```
adb devices -l
```

The emulated device should now appear:

![phone](https://github.com/ardz/wolfpack/assets/6310248/b2b95ce6-6c7f-493e-bbc7-8f163856ed4d)

*There's progress now, where there once was non.*

### Appium

We're ready to install Appium and the required driver it needs to run automated tests.

Open a command window and type:

````
npm i --location=global appium
````

https://appium.io/docs/en/2.0/quickstart/install/

Now check Appium starts up by typing `Appium` into a new console window. It runs on port 4723 by default.

![start_appium](https://github.com/ardz/wolfpack/assets/6310248/3bac6c89-065f-4118-a30d-e5fd13f5985b)

Make sure any security software isn't blocking this port otherwise:

![bad_tme](https://github.com/ardz/wolfpack/assets/6310248/2a93a232-b155-4102-bb21-6970ee776cf6)

Now install the required driver to run automated tests on Android:

```
appium driver install uiautomator2
```

https://appium.io/docs/en/2.0/quickstart/uiauto2-driver/

Now when you run Appium you should see the driver is present:

![driver_ready](https://github.com/ardz/wolfpack/assets/6310248/ea2ad673-bbd9-4926-87eb-6ec72ac179b5)

## Run Automated Tests

Clone this repo and open in your preferred JS IDE and open the test file. Change the `testingReleaseBuild` variable depending on which apk you wish to test:

```
let apk;  
const testingReleaseBuild = true;  
  
if (testingReleaseBuild) {  
    apk = path.resolve('./app/release/app-release.apk');  
} else {  
    apk = path.resolve('./app/pre-release/app-release.apk');  
}
```

You can also run the test from inside your IDE or via:

```
npm test
```

Doing it via npm test will generate a mocha test report inside the `mochawesome-report` directory.

If testing the pre-release build, there should be a bug when the button is clicked a second time:

![fail](https://github.com/ardz/wolfpack/assets/6310248/6eeeb910-1b78-4b96-bd0e-7b0808e8357a)

### Bug Report

```
Bug Report:

BUG REPORT

Title: Label isn't updating correctly on second click.

Product/Component: Button Clicker

Version: pre-release APK

Environment: Android 12

Reported by: richard@developerintest.dev

Date reported: 15/10/2023

Priority: Low

---

Description: Label isn't updating correctly on second click.

---

Steps to Reproduce:

1. Open app
2. Click button once
3. Click button again

---

Expected Behavior: Label shold be "2"

---

Actual Behavior: Label shows "Max"

---

Screenshots/Logs: N/A

---

Workarounds (if any): N/A

---

Additional Information: Found in automated regression test "Button Click Count Feature Acceptance Test":

https://github.com/ardz/wolfpack/blob/main/test/test.js

```

If testing the release build, all the steps should pass:

![pass](https://github.com/ardz/wolfpack/assets/6310248/139ef092-9988-4a8e-8ba2-02af2919fa85)
