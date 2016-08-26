using System.ComponentModel.DataAnnotations;

namespace WebAppSandbox.Web.Models
{
    public class ResturantReview //: IValidatableObject
    {
        [Required]
        [StringLength(1024)]
        public string Body { get; set; }

        public int Id { get; set; }

        [Range(1, 10)]
        public int Rating { get; set; }

        public int ResturantId { get; set; }
        public string ReviewerName { get; set; }

        //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        //{
        //    if (Rating < 2 && ReviewerName == "a" && Body == "a")
        //    {
        //        yield return new ValidationResult("Spamming '1'and 'a' does not a review make");
        //    }
        //}
    }
}
