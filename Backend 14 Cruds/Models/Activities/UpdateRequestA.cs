using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Activities
{
    public class UpdateRequestA
    {
        public string Teacher { get; set; }
        public string Class { get; set; }
        public string TypeOfActivity { get; set; }
    }
}
