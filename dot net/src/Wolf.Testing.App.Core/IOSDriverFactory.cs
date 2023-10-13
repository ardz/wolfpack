using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Enums;
using OpenQA.Selenium.Appium.iOS;

namespace Wolf.Testing.App.Core;

// ReSharper disable once InconsistentNaming
public static class IOSDriverFactory
{
    public static IOSDriver<IOSElement> CreateDriver()
    {
        var appiumOptions = new AppiumOptions();
        // This can be replaced with a config loader.
        appiumOptions.AddAdditionalCapability(MobileCapabilityType.DeviceName, "iPhone 6");
        appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformName, "iOS");
        appiumOptions.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "11.3");
        appiumOptions.AddAdditionalCapability(MobileCapabilityType.App, "testAppPath");
        return new IOSDriver<IOSElement>(new Uri("http://127.0.0.1:4723/wd/hub"), appiumOptions);
    }
}