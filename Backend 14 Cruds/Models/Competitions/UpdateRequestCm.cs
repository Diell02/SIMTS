using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Competitions
{
    public class UpdateRequestCm
    {
        public string Teacher { get; set; }
        public string Race { get; set; }
        public string Subject { get; set; }
        public string Winner { get; set; }
    }
}
