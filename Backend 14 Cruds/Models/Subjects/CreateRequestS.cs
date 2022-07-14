using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Subjects
{
    public class CreateRequestS
    {
        [Required]
        public string Teacher { get; set; }

        [Required]
        public string Name { get; set; }

    }
}