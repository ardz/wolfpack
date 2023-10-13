using OpenQA.Selenium.Appium.Service;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.iOS;
using OpenQA.Selenium.Appium.Service.Options;

namespace Wolf.Testing.App.Core;

public sealed class TestSession
{
    private readonly AppiumServiceBuilder _appiumServiceBuilder = new();

    private AppiumLocalService _appiumLocalService;
    
    private TestSession()
    {
        Cleanup();
        
        AdbInitiate();
        
        AppiumStart();
    }
    
    private static void Cleanup()
    {
        
    }

    private static void AdbInitiate()
    {
        
    }
    
    private void AppiumStart()
    {
        const string appiumJsPath 
            = @"C:\Users\richa.DESKTOP-3VVPELV\AppData\Roaming\npm\node_modules\appium\build\lib\main.js";
        _appiumServiceBuilder
            .WithAppiumJS(new FileInfo(appiumJsPath))
            .UsingDriverExecutable(new FileInfo(@"C:\Program Files\nodejs\node.exe"));
        _appiumLocalService = _appiumServiceBuilder.Build();
        if (!_appiumLocalService.IsRunning)
            _appiumLocalService.Start();
        
        // Setup the Appium service options
        var options = new OptionCollector().AddArguments(GeneralOptionList.LogLevel("info"));

        // Start the Appium server with options
        var appiumService = new AppiumServiceBuilder().UsingAnyFreePort().WithArguments(options).Build();
        appiumService.Start();

        // Check if the service is running
        Console.WriteLine(appiumService.IsRunning
            ? "Appium service started successfully!"
            : "Appium service failed to start.");

        // Remember to stop the service when you're done
        // appiumService.Dispose();
    }

    // public static AndroidDriver<AndroidElement> AndroidDriver => AndroidDriverFactory.CreateDriver();
    //
    // public static IOSDriver<IOSElement> IOSDriver => IOSDriverFactory.CreateDriver();

    public static readonly TestSession Manager = new();
}