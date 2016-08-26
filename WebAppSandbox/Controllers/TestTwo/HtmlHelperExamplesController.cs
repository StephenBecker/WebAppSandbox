using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAppSandbox.Web.ViewModels.TestTwo;

namespace WebAppSandbox.Web.Controllers.TestTwo
{
    public class HtmlHelperExamplesController : Controller
    {
        // GET: HtmlHelperExamples
        public ActionResult Index()
        {
            return View("Index", new HtmlHelperViewModel());
        }

        [HttpPost]
        // GET: HtmlHelperExamples
        public ActionResult Index(HtmlHelperViewModel model)
        {
            if (ModelState.IsValid)
            {
                ModelState.AddModelError(string.Empty, "No Errors");
                return View("Index", model);
            }
            else
            {
                return View("Index", model);
            }
        }

        public JsonResult UserNameTaken(string username)
        {
            var takenName = "taken";
            var isTaken = (username == takenName);

            if (!isTaken)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            string suggestedUID = String.Format(CultureInfo.InvariantCulture,
            "{0} is not available.", username);
            for (int i = 1; i < 100; i++)
            {
                string altCandidate = username + i.ToString();
                if (!(altCandidate == takenName))
                {
                    suggestedUID = String.Format(CultureInfo.InvariantCulture,
                    "{0} is not available. Try {1}.", username, altCandidate);
                    break;
                }
            }
            return Json(suggestedUID, JsonRequestBehavior.AllowGet);
        }
    }
}
