using System.Web.Mvc;

namespace WebAppSandbox.Test.Controllers
{
    public class TestController : Controller
    {
        // GET: CalculatorTests
        public ActionResult CalculatorTests()
        {
            return View("CalculatorTests");
        }

        // GET: Test
        public ActionResult Index()
        {
            return View("TestView");
        }
    }
}
