using System.Data.Entity;
using WebAppSandbox.Web.Models;

namespace WebAppSandbox.Web.Data
{
    public class OTFDbContext : DbContext
    {
        public OTFDbContext() : base("name=DefaultConnection")
        {
        }

        public DbSet<Resturant> Resturants { get; set; }
        public DbSet<ResturantReview> Reviews { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
    }
}
