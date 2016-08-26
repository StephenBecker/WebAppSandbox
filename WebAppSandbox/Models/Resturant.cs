using System.Collections.Generic;

namespace WebAppSandbox.Web.Models
{
    public class Resturant
    {
        public string City { get; set; }
        public string Country { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<ResturantReview> Reviews { get; set; }
    }
}
