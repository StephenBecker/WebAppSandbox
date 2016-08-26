namespace WebAppSandbox.Web.Migrations
{
    using Data;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Threading.Tasks;

    internal sealed class Configuration : DbMigrationsConfiguration<WebAppSandbox.Web.Data.OTFDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "WebAppSandbox.Web.Data.OTFDbContext";
        }

        public async Task<ApplicationUser> CreateUser(ApplicationDbContext context)
        {
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            var user = new ApplicationUser()
            { UserName = "admin@a.com", Email = "admin@a.com" };

            var result = await UserManager.CreateAsync(user, "Aa123!");

            return user;
        }

        protected override void Seed(OTFDbContext context)
        {
            CreateRestuants(context);

            ApplicationDbContext appContext = new ApplicationDbContext();
            CreateRoles(appContext: appContext);
            CreateAdmin(appContext: appContext);
        }

        private void CreateAdmin(ApplicationDbContext appContext)
        {
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(appContext));
            if (!appContext.Users.Any(u => u.Email == "admin@a.com"))
            {
                var result = CreateUser(appContext).Result;
                UserManager.AddToRole(result.Id, "Admin");
            }
            else
            {
                var user = appContext.Users.Where(x => x.Email == "admin@a.com").FirstOrDefault();
                UserManager.AddToRole(user.Id, "Admin");
            }
        }

        private void CreateRestuants(OTFDbContext context)
        {
            context.Resturants.AddOrUpdate(r => r.Name,
                new Resturant { Name = "aTest Name 1", City = "Test City 1", Country = "Test Country 1" },
                new Resturant { Name = "bTest Name 2", City = "Test City 2", Country = "Test Country 2" },
                new Resturant
                {
                    Name = "cTest Name 3",
                    City = "Test City 3",
                    Country = "Test Country 3",
                    Reviews = new List<ResturantReview>() {
                                new ResturantReview {Body="Test Body", Rating=9 }
                            }
                }

            );
            for (int i = 0; i < 1000; i++)
            {
                if (!context.Resturants.Any(r => r.Name == "Name" + i.ToString()))
                {
                    context.Resturants.AddOrUpdate(r => r.Name, new Resturant { Name = "Name" + i.ToString(), City = "City " + i.ToString(), Country = "USA" });
                }
            }
        }

        private void CreateRoles(ApplicationDbContext appContext)
        {
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(appContext));

            // In Startup iam creating first Admin Role and creating a default Admin User
            if (!roleManager.RoleExists("Admin"))
            {
                // create Admin rool
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = "Admin";
                roleManager.Create(role);
            }

            // creating Creating Manager role
            if (!roleManager.RoleExists("Manager"))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = "Manager";
                roleManager.Create(role);
            }

            // creating Creating Employee role
            if (!roleManager.RoleExists("Employee"))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = "Employee";
                roleManager.Create(role);
            }
        }
    }
}
