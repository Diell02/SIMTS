using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Shortages
{
    public class CreateRequestSh
    {
        [Required]
        public string Subject { get; set; }

        [Required]
        public string StudentName { get; set; }
    }
}
