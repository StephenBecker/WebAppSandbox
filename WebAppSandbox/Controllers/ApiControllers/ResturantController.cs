using System.Data;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.OData;
using WebAppSandbox.Web.Data;
using WebAppSandbox.Web.Models;

namespace WebAppSandbox.Web.Controllers.ApiControllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using WebAppSandbox.Web.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Resturant>("Resturant");
    builder.EntitySet<ResturantReview>("Reviews");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */

    public class ResturantController : ODataController
    {
        private OTFDbContext db = new OTFDbContext();

        // DELETE: odata/Resturant(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Resturant resturant = db.Resturants.Find(key);
            if (resturant == null)
            {
                return NotFound();
            }

            db.Resturants.Remove(resturant);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Resturant
        [EnableQuery]
        public IQueryable<Resturant> GetResturant()
        {
            return db.Resturants;
        }

        // GET: odata/Resturant(5)
        [EnableQuery]
        public SingleResult<Resturant> GetResturant([FromODataUri] int key)
        {
            return SingleResult.Create(db.Resturants.Where(resturant => resturant.Id == key));
        }

        // GET: odata/Resturant(5)/Reviews
        [EnableQuery]
        public IQueryable<ResturantReview> GetReviews([FromODataUri] int key)
        {
            return db.Resturants.Where(m => m.Id == key).SelectMany(m => m.Reviews);
        }

        // PATCH: odata/Resturant(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Resturant> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Resturant resturant = db.Resturants.Find(key);
            if (resturant == null)
            {
                return NotFound();
            }

            patch.Patch(resturant);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResturantExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(resturant);
        }

        // POST: odata/Resturant
        public IHttpActionResult Post(Resturant resturant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Resturants.Add(resturant);
            db.SaveChanges();

            return Created(resturant);
        }

        // PUT: odata/Resturant(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Resturant> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Resturant resturant = db.Resturants.Find(key);
            if (resturant == null)
            {
                return NotFound();
            }

            patch.Put(resturant);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResturantExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(resturant);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ResturantExists(int key)
        {
            return db.Resturants.Count(e => e.Id == key) > 0;
        }
    }
}
