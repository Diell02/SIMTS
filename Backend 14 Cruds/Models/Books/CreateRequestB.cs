using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Books
{
    public class CreateRequestB
    {
        [Required]
        public string Teacher { get; set; }

        [Required]
        public string BookName { get; set; }

        [Required]
        public string ForClass { get; set; }

    }
}
