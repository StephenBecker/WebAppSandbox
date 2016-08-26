using System.Web.Mvc;

namespace WebAppSandbox.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult AnotherPage()
        {
            return View("AnotherPage");
        }

        public ActionResult AsyncOps()
        {
            return View("AsyncOps");
        }

        public ActionResult Calculator()
        {
            return View("Calculator");
        }

        public ActionResult CssStuff()
        {
            return View("CssStuff");
        }

        public ActionResult DragAndDrop()
        {
            return View("DragAndDrop");
        }

        public ActionResult Drawing()
        {
            return View("Drawing");
        }

        public ActionResult Forms()
        {
            return View("Forms");
        }

        public ActionResult Iframes()
        {
            return View("Iframes");
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult JQuery()
        {
            return View("JQuery");
        }

        public ActionResult Location()
        {
            return View("Location");
        }

        public ActionResult VideoAudioMediaPage()
        {
            return View("VideoAudioMediaPage");
        }
    }
}
