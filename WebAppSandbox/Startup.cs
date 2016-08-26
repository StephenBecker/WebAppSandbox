using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebAppSandbox.Web.Startup))]

namespace WebAppSandbox.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
