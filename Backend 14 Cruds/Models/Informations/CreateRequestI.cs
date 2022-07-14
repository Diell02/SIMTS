using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Informations
{
    public class CreateRequestI
    {

        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string News { get; set; }
    }
}
