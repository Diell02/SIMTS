using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Schedules
{
    public class CreateRequestSc
    {

        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Hours { get; set; }
    }
}
