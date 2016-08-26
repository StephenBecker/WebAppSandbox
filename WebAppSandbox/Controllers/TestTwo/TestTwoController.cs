using System.Linq;
using System.Web.Mvc;
using WebAppSandbox.Web.Data;
using WebAppSandbox.Web.ViewModels.TestTwo;

namespace WebAppSandbox.Web.Controllers
{
    public class TestTwoController : Controller
    {
        // GET: TestTwo
        private OTFDbContext _db = new OTFDbContext();

        public ActionResult Index(string search = null)
        {
            //var Resturants = _db.Resturants.ToList();

            var Resturants = _db.Resturants
                .OrderByDescending(r => r.Reviews.Average(rev => rev.Rating))
                .Where(r => search == null || r.Name.StartsWith(search))
                .Take(10)
                .Select(r => new ResturantViewModel { Id = r.Id, Name = r.Name, City = r.City, Country = r.Country, CountOfReviews = r.Reviews.Count() });
            return View(Resturants.ToList());
        }

        public ActionResult JQAnim()
        {
            return View("JQAnim");
        }

        protected override void Dispose(bool disposing)
        {
            if (_db != null)
            {
                _db.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
