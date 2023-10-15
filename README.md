
# WOLFPACK

![image](https://github.com/ardz/wolfpack/assets/6310248/9b3e3414-a839-4ce8-8149-ace4ed7522b5)

Complete development environment setup guide for running automated tests on an android device. The tech stack for Appium is pretty deep and there is a significant initial setup phase in order to start using it. This guide shows you how to do it and an example mocha test project. I've written the guide for Windows but the principles are the same on other platforms. I've verified it also works with Linux.

## Dev Environment Setup

### Node.js

Install node.js https://nodejs.org/en and verify correct installation by opening a command prompt and typing

```
node -v
```

![node](https://github.com/ardz/wolfpack/assets/6310248/eb781a24-718d-466c-af69-e376e0dc01f1)

### Java

Install the JDK https://www.oracle.com/uk/java/technologies/downloads/ and verify the JAVA_HOME environment variable is present. Add it if not. On Windows I've set this as a system wide variable. You can have the JDK wherever you like though:

![env](https://github.com/ardz/wolfpack/assets/6310248/e773e4d9-9271-4f3f-a2d3-953f4d426993)

### Android Studio
Install Android studio https://developer.android.com/studio/install. 

Android studio is required to:
	
a) allow you to run and connect to emulated android device using the **Android Debug Bridge** (adb)

b) install tools and SDKs to support the above and allow Appium server to connect to said android device

Clone the app we're going to be testing https://github.com/Palringo/QA-Automation-Android* :

```
git clone https://github.com/Palringo/QA-Automation-Android.git
```

*(or just download it directly from GitHub as a zip).*

If you're comfortable with Kotlin or want to inspect the app structure yourself you can open the repository you cloned above in Android Studio. You can also then deploy the app to the emulated device from within android studio if you so wish just to see it working by using the Run button at the top of Android Studio. **Note the actual tests handle installing the pre and release apks onto the device themselves though.**

*Optionally, just open Android studio and create a new empty project (we just need to be able to access the device manager to be able to run an emulated android phone). You can just install and use whatever android emulator you wish (MS provide another android emulator for example https://visualstudio.microsoft.com/vs/msft-android-emulator/) OR just connect an actual physical device to your dev machine using USB/Wi-Fi. As long as adb can communicate with the device, Appium can send commands to run automated tests.*

Open the SDK Manager in Android Studio:

![tools_sdk](https://github.com/ardz/wolfpack/assets/6310248/454e3dcd-9e05-4ab0-8504-504d2422170c)

and note the SDK Platform for version 34 of the Android API is now installed: 

![platform](https://github.com/ardz/wolfpack/assets/6310248/1d45abe3-1667-4a24-82bc-ddcaa562d079)

Open the SDK Tools tab and verify the items shown below are installed. You will have to add the command line tools by ticking them then clicking "Apply":

![tools_sdk_screen](https://github.com/ardz/wolfpack/assets/6310248/2dfc9694-f02d-4f3a-a406-ead2fd4e97a7)

`:exclamation:`*note the location of the Android SDK, we'll need this for setting up the rest of the environment variables:*

![android_sdk_location](https://github.com/ardz/wolfpack/assets/6310248/f000b666-4de1-47e7-b95e-7b4217561e92)

Okay, halfway there. Go grab a coffee/tea. Let's now ensure all the environment variables are setup to allow to use adb and other sdk commands in a command window:

![sdk_tools_env_vars](https://github.com/ardz/wolfpack/assets/6310248/a4fc2215-4fcc-4ace-8618-0aa8b90a884f)

Now check the environment variables are setup by opening a command prompt and typing:

```
echo %path:;=&echo.%
```

![echo_all](https://github.com/ardz/wolfpack/assets/6310248/7a389b5c-a5df-4078-a6b7-c142b52aab65)

```
echo %ANDROID_HOME%
```

![echo_android_home](https://github.com/ardz/wolfpack/assets/6310248/86b5003f-b75b-4638-b89c-e2707426fdf0)

You can now use the `adb` command and other android SDK commands from a console/command window:

![adb_command](https://github.com/ardz/wolfpack/assets/6310248/a2612a91-8a5d-427e-a7ea-ecade2f477f2)

Go back to Android Studio, start a device from Device Manager, go back to your command prompt and type:

```
adb devices -l
```

You should see the emulated device now attached:

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
