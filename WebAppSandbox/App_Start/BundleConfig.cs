using System.Web.Optimization;

namespace WebAppSandbox.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/script/lib").Include(
                "~/Scripts/Libraries/modernizr-2.8.3.js",
                    "~/Scripts/Libraries/jquery-{version}.js",
                    "~/Scripts/Libraries/jquery-ui.js",
                    "~/Scripts/Libraries/jquery.validate*",
                    "~/Scripts/Libraries/jquery.validate.unobtrusive.js",
                    "~/Scripts/Libraries/jquery.unobtrusive-ajax.js",
                    "~/Scripts/Libraries/bootstrap.js",
                    "~/Scripts/Libraries/respond.js",
                    "~/Scripts/Libraries/SocketIO/socket.io.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/script/app").Include(
                    "~/Scripts/App/App.js",
                    "~/Scripts/App/Services/CookieServices.js",
                    "~/Scripts/App/Services/WebSocketServices.js",
                    "~/Scripts/App/Home/JQueryController.js",
                    "~/Scripts/App/Home/AnotherPage.js",
                    "~/Scripts/App/Home/CalculatorCotroller.js",
                    "~/Scripts/App/Home/FormsController.js",
                    "~/Scripts/App/Home/AsyncOpsController.js",
                    "~/Scripts/App/Home/WebSocketsController.js",
                    "~/Scripts/App/Home/VideoPageController.js",
                    "~/Scripts/App/Home/DrawingController.js",
                    "~/Scripts/App/Home/DragAndDropController.js",
                    "~/Scripts/App/Location/LocationController.js",
                    "~/Scripts/App/Data/DataController.js",
                    "~/Scripts/App/Data/FileSysteAPIController.js",
                    "~/Scripts/App/Websocket/WebSocketController.js"

                    ));

            bundles.Add(new StyleBundle("~/bundles/css/lib").Include(
                    "~/Content/CSS/Libraries/bootstrap.css"
                    ));

            bundles.Add(new StyleBundle("~/bundles/css/app").Include(
                    "~/Content/CSS/site.css",
                    "~/Content/CSS/Home/Calculator.css",
                    "~/Content/CSS/Home/CssStuff.css",
                    "~/Content/CSS/Home/JQueryExample.css",
                    "~/Content/Css/Home/Forms.css",
                    "~/Content/Css/Home/WebSockets.css",
                    "~/Content/Css/Home/VideoPage.css",
                    "~/Content/Css/Home/DragAndDrop.css",
                    "~/Content/Css/Home/Drawing.css",
                    "~/Content/Css/Location/Location.css",
                    "~/Content/Css/Data/Data.css"
                    ));
        }
    }
}
