using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Departments
{
    public class CreateRequestD
    {
        [Required]
        public string Teacher { get; set; }

        [Required]
        public string DepName { get; set; }

    }
}
