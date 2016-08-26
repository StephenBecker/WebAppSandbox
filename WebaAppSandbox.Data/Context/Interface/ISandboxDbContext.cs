using System;
using System.Collections.Generic;
using System.Data.Entity;
using WebAppSandbox.Core.Models;

namespace WebAppSandbox.Data.Context.Interface
{
    public interface ISandboxDbContext : IDisposable
    {
        DbSet<RestuantReview> ResturantReviews { get; set; }
        DbSet<Resturant> Resturants { get; set; }
        DbSet<Review> Reviews { get; set; }

        int SaveChanges();
    }
}
