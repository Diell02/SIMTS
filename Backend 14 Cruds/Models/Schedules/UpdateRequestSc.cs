using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Schedules
{
    public class UpdateRequestSc
    {
        public string Teacher { get; set; }
        public string Subject { get; set; }
        public string Hours { get; set; }
    }
}
