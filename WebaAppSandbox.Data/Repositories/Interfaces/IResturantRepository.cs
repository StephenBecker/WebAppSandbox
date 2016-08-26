using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppSandbox.Core.Models;

namespace WebAppSandbox.Data.Repositories.Interfaces
{
    public interface IResturantRepository
    {
        ICollection<Resturant> getResturants();
    }
}
