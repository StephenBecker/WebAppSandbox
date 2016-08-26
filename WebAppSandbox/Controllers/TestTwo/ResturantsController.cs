using PagedList;
using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using WebAppSandbox.Web.Data;
using WebAppSandbox.Web.Models;
using WebAppSandbox.Web.ViewModels.TestTwo;

namespace WebAppSandbox.Web.Controllers
{
    public class ResturantsController : Controller
    {
        private OTFDbContext db = new OTFDbContext();

        [Authorize(Roles = "Admin")]
        // GET: Resturants/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Resturants/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,City,Country,Name")] Resturant resturant)
        {
            if (ModelState.IsValid)
            {
                db.Resturants.Add(resturant);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(resturant);
        }

        // GET: Resturants/Delete/5
        [Authorize]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Resturant resturant = db.Resturants.Find(id);
            if (resturant == null)
            {
                return HttpNotFound();
            }
            return View(resturant);
        }

        // POST: Resturants/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize]
        public ActionResult DeleteConfirmed(int id)
        {
            Resturant resturant = db.Resturants.Find(id);
            db.Resturants.Remove(resturant);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: Resturants/Edit/5
        [Authorize]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Resturant resturant = db.Resturants.Find(id);
            if (resturant == null)
            {
                return HttpNotFound();
            }
            return View(resturant);
        }

        // POST: Resturants/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public ActionResult Edit([Bind(Include = "Id,City,Country,Name")] Resturant resturant)
        {
            if (ModelState.IsValid)
            {
                db.Entry(resturant).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(resturant);
        }

        // GET: Resturants
        [OutputCache(Duration = 60)]
        public ActionResult Index(string search = null, int page = 1)
        {
            //var Resturants = _db.Resturants.ToList();

            var Resturants = db.Resturants
                .OrderByDescending(r => r.Reviews.Average(rev => rev.Rating))
                .Where(r => search == null || r.Name.Contains(search));
            //   .Take(10)
            var ResturantViewModels = Resturants.Select(r => new ResturantViewModel { Name = r.Name, City = r.City, Country = r.Country, CountOfReviews = r.Reviews.Count(), Id = r.Id })
                .ToPagedList(page, 10);

            if (Request.IsAjaxRequest())
            {
                return PartialView("Partials/ResturantList", ResturantViewModels);
            }

            return View(ResturantViewModels);
        }

        public ActionResult throwError()
        {
            var message = Server.HtmlEncode("Message here");
            throw new Exception("You brought this on yourself");

            return Content(message);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
