using System.Web;
using System.Web.Mvc;

namespace WebAppSandbox.Web.Controllers
{
    public class DataController : Controller
    {
        public ActionResult FileSystemAPI()
        {
            return View("FileSystemAPI");
        }

        // GET: Data
        public ActionResult Index()
        {
            //add new cookie if does not exist
            var serverCookie = new HttpCookie("servercookie", "is a server generated cookie");
            serverCookie.Expires.AddDays(1);
            HttpContext.Response.Cookies.Set(serverCookie);

            var browser = Request.Browser;

            return View("Index");
        }
    }
}
