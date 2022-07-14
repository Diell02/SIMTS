using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Shortages
{
    public class UpdateRequestSh
    {
        public string Subject { get; set; }
        public string StudentName { get; set; }
    }
}
