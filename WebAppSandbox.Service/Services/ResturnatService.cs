using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppSandbox.Core.Models;
using WebAppSandbox.Data.Repositories;
using WebAppSandbox.Data.Repositories.Interfaces;
using WebAppSandbox.Service.Services.Interfaces;

namespace WebAppSandbox.Service.Services
{
    public class ResturnatService : IResturantService
    {
        public IResturantRepository ResturantRepo
        {
            get
            {
                if (_resturantRepo == null)
                {
                    _resturantRepo = new ResturantRepository();
                }
                return _resturantRepo;
            }

            set
            {
                _resturantRepo = value;
            }
        }

        private IResturantRepository _resturantRepo { get; set; }

        public ICollection<Resturant> GetAllResturants()
        {
            return ResturantRepo.getResturants();
        }
    }
}
