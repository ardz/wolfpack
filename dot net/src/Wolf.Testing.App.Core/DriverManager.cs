using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.iOS;

namespace Wolf.Testing.App.Core
{
    public static class DriverManager
    {
        public static AndroidDriver<AndroidElement> CreateAndroidDriver()
        {
            return AndroidDriverFactory.CreateDriver();
        }

        public static IOSDriver<IOSElement> CreateIOSDriver()
        {
            return IOSDriverFactory.CreateDriver();
        }
    }
}