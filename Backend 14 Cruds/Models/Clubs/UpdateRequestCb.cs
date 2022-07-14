using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Clubs
{
    public class UpdateRequestCb
    {
        public string Teacher { get; set; }
        public string ClubName { get; set; }
        public string Student { get; set; }
        public string Role { get; set; }
    }
}
