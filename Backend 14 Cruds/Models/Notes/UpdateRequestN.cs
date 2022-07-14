using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Notes
{
    public class UpdateRequestN
    {
        public string Student { get; set; }
        public string Message { get; set; }
        public string Status { get; set; }
    }
}
