using System.Web.Optimization;

namespace WebAppSandbox.Test
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                        "~/Scripts/Libraries/jquery-{version}.js",
                        "~/Scripts/Libraries/jquery.validate*",
                        "~/Scripts/Libraries/modernizr-*",
                        "~/Scripts/Libraries/bootstrap.js",
                      "~/Scripts/Libraries/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/Libraries/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/Libraries/qunit.css"
                      ));
        }
    }
}
