using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Trainings
{
    public class CreateRequestT
    {

        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Creds { get; set; }
    }
}
