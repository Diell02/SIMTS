using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Clubs
{
    public class CreateRequestCb
    {
        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Student { get; set; }

        [Required]
        public string ClubName { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
