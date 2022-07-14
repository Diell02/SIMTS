using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Activities
{
    public class CreateRequestA
    {

        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Class { get; set; }

        [Required]
        public string TypeOfActivity { get; set; }
    }
}
