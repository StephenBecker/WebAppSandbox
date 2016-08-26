using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppSandbox.Core.Models;
using WebAppSandbox.Data.Context.Interface;

namespace WebAppSandbox.Data.Context
{
    public class SandboxDbContext : DbContext, ISandboxDbContext
    {
        public virtual DbSet<RestuantReview> ResturantReviews { get; set; }
        public virtual DbSet<Resturant> Resturants { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }
    }
}
