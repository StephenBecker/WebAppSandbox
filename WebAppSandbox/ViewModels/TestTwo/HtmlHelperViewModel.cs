using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebAppSandbox.Web.ViewModels.TestTwo
{
    public class HtmlHelperViewModel
    {
        [Required]
        [DisplayName("City")]
        public string City { get; set; }

        [Required]
        [DisplayName("Country")]
        public string Contry { get; set; }

        [Required]
        [DisplayName("e-mail")]
        [DataType(DataType.EmailAddress)]
        public string email { get; set; }

        [Required]
        [DisplayName("First Name")]
        public string FirstName { get; set; }

        public int Id { get; set; }

        [Required]
        [DisplayName("Join Date")]
        public DateTime JoinDate { get; set; }

        [Required]
        [DisplayName("LastName")]
        public string LastName { get; set; }

        [Required]
        [DisplayName("Multi Select")]
        public ICollection<int> MultiSelect { get; set; }

        [Required]
        [DisplayName("Password")]
        [DataType(DataType.Password)]
        public string password { get; set; }

        [Required]
        [DisplayName("Select a radio")]
        public int Radio { get; set; }

        [Required]
        [DisplayName("Single Select")]
        public int Select { get; set; }

        [Required]
        [DisplayName("User Name")]
        [Remote("UserNameTaken", "HtmlHelperExamples")]
        public string userName { get; set; }

        [Required]
        [DisplayName("Zip Code")]
        [DataType(DataType.PostalCode)]
        public string ZipCode { get; set; }
    }
}
