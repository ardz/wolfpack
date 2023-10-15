
# WOLFPACK

![[wolf.png]]

Complete development environment setup guide for running automated tests on an android device. The tech stack for Appium is pretty deep and there is a significant initial setup phase in order to start using it. This guide shows you how to do it and an example mocha test project. I've written the guide for Windows but the principles are the same on other platforms. I've verified it also works with Linux.

## Table of Contents

1. [Dev Environment Setup](#Dev Environment Setup)
2. [Run Automated Tests](#Run Automated Tests)
3. [Bug Report](###Bug Report)

## Dev Environment Setup

### Node.js

Install node.js https://nodejs.org/en and verify correct installation by opening a command prompt and typing

```
node -v
```

![[node.png]]
Install JDK https://www.oracle.com/uk/java/technologies/downloads/ and verify the JAVA_HOME environment variable is present. Add it if not. On Windows I've set this as a system wide variable. You can have the JDK wherever you like though:
![[env.png]]

### Android Studio
Install Android studio https://developer.android.com/studio/install. 

Android studio is required to:
	
a) allow you to run and connect to emulated android device using the **Android Debug Bridge** (adb)

b) install tools and SDKs to support the above and allow Appium server to connect to said android device

Clone the app we're going to be testing https://github.com/Palringo/QA-Automation-Android* :

`git clone https://github.com/Palringo/QA-Automation-Android.git` 

*(or just download it directly from GitHub as a zip).*

If you're comfortable with Kotlin or want to inspect the app structure yourself you can open the repository you cloned above in Android Studio. You can also then deploy the app to the emulated device from within android studio if you so wish just to see it working by using the Run button at the top of Android Studio. **Note the actual tests handle installing the pre and release apks onto the device themselves though.**

*Optionally, just open Android studio and create a new empty project (we just need to be able to access the device manager to be able to run an emulated android phone). You can just install and use whatever android emulator you wish (MS provide another android emulator for example https://visualstudio.microsoft.com/vs/msft-android-emulator/) OR just connect an actual physical device to your dev machine using USB/Wi-Fi. As long as adb can communicate with the device, Appium can send commands to run automated tests.*

Open the SDK Manager in Android Studio:

![[tools_sdk.png]]

and note the SDK Platform for version 34 of the Android API is now installed: 

![[platform.png]]

Open the SDK Tools tab and verify the items shown below are installed. You will have to add the command line tools by ticking them then clicking "Apply":

![[tools_sdk_screen.png]]

`:exclamation:`*note the location of the Android SDK, we'll need this for setting up the rest of the environment variables:*

![[android_sdk_location.png]]

Okay, halfway there. Go grab a coffee/tea. Let's now ensure all the environment variables are setup to allow to use adb and other sdk commands in a command window:

![[sdk_tools_env_vars.png]]

Now check the environment variables are setup by opening a command prompt and typing:

```
echo %path:;=&echo.%
```

![[echo_all.png]]

`echo %ANDROID_HOME%`

![[echo_android_home.png]]

You can now use the `adb` command and other android SDK commands from a console/command window:

![[adb_command.png]]

Go back to Android Studio, start a device from Device Manager, go back to your command prompt and type:

```
adb devices -l
```

You should see the emulated device now attached:

![[phone.png]]

*There's progress now, where there once was non.*

### Appium

We're ready to install Appium and the required driver it needs to run automated tests.

Open a command window and type:

````
npm i --location=global appium
````

https://appium.io/docs/en/2.0/quickstart/install/

Now check Appium starts up by typing `Appium` into a new console window. It runs on port 4723 by default.

![[start_appium.png]]

Make sure any security software isn't blocking this port otherwise:

![[bad_tme.jpg]]

Now install the required driver to run automated tests on Android:

```
appium driver install uiautomator2
```

https://appium.io/docs/en/2.0/quickstart/uiauto2-driver/

Now when you run Appium you should see the driver is present:

![[driver_ready.png]]

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

![[fail.png]]

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

![[pass.png]]