using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Grades
{
    public class UpdateRequestG
    {
        public string Teacher { get; set; }
        public string Student { get; set; }
        public string Gradee { get; set; }
        public string Subject { get; set; }
    }
}
