using System.Web.Mvc;

namespace WebAppSandbox.Web.Controllers
{
    public class WebSocketController : Controller
    {
        public ActionResult GetStockTicker()
        {
            return View("StockTicker");
        }

        // GET: WebSocket
        public ActionResult Index()
        {
            return View();
        }
    }
}
