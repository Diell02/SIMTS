using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Competitions
{
    public class CreateRequestCm
    {

        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Race { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Winner { get; set; }
    }
}
