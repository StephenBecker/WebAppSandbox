using System.Collections.Generic;

namespace WebAppSandbox.Core.Models
{
    public class RestuantReview
    {
        public int Id { get; set; }
        public int RestuarantId { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}
