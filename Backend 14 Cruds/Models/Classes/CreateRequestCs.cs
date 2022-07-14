using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Classes
{
    public class CreateRequestCs
    {
        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Student { get; set; }

        [Required]
        public string Subject { get; set; }
    }
}
