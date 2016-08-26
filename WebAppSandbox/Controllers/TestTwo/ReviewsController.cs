using System.Linq;
using System.Web.Mvc;
using WebAppSandbox.Web.Data;
using WebAppSandbox.Web.Models;

namespace WebAppSandbox.Web.Controllers.TestTwo
{
    public class ReviewsController : Controller
    {
        private OTFDbContext _db = new OTFDbContext();

        public ActionResult Create(int resturantId)
        {
            var model = new ResturantReview() { ResturantId = resturantId };
            return View("Create", model);
        }

        [HttpPost]
        public ActionResult Create(ResturantReview review)
        {
            if (ModelState.IsValid)
            {
                _db.Reviews.Add(review);
                _db.SaveChanges();
                return RedirectToAction("Index", new { id = review.ResturantId });
            }
            return View(review);
        }

        public ActionResult Edit(int id)
        {
            var model = _db.Reviews.Where(r => r.Id == id).FirstOrDefault();
            return View("Edit", model);
        }

        [HttpPost]
        public ActionResult Edit(ResturantReview review)
        {
            if (ModelState.IsValid)
            {
                var model = _db.Reviews.Where(r => r.Id == review.Id).FirstOrDefault();
                if (model.Rating != review.Rating) { model.Rating = review.Rating; };
                if (model.ReviewerName != review.ReviewerName) { model.ReviewerName = review.ReviewerName; };
                if (model.Body != review.Body) { model.Body = review.Body; };
                _db.SaveChanges();
                return RedirectToAction("Index", new { id = review.ResturantId });
            }
            return View(review);
        }

        // GET: Reviews
        public ActionResult Index([Bind(Prefix = "id")]int restaurantId)
        {
            var restaurant = _db.Resturants
                .Include("Reviews")
                .Where(r => r.Id == restaurantId).FirstOrDefault();
            if (restaurant != null)
            {
                return View(restaurant);
            }
            return HttpNotFound();
        }

        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }
    }
}
