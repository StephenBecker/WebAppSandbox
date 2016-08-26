using System.Collections.Generic;
using WebAppSandbox.Core.Models;

namespace WebAppSandbox.Service.Services.Interfaces
{
    public interface IResturantService
    {
        ICollection<Resturant> GetAllResturants();
    }
}
