using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Feedbacks
{
    public class CreateRequestF
    {

        [Required]
        public string User { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public string TypeOfFeedback { get; set; }
    }
}
