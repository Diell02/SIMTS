using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Trainings
{
    public class UpdateRequestT
    {
        public string Teacher { get; set; }
        public string Subject { get; set; }
        public string Creds { get; set; }
    }
}
