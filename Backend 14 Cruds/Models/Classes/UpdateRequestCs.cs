using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Classes
{
    public class UpdateRequestCs
    {
        public string Teacher { get; set; }
        public string Student { get; set; }
        public string Subject { get; set; }
    }
}
