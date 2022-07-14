using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Grades
{
    public class CreateRequestG
    {
        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Student { get; set; }
        
        [Required]
        public string Gradee { get; set; }

        [Required]
        public string Subject { get; set; }
    }
}
