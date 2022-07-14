using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Notes
{
    public class CreateRequestN
    {

        [Required]
        public string Student { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
