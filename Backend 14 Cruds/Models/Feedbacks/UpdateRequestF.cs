using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Feedbacks
{
    public class UpdateRequestF
    {
        public string User { get; set; }
        public string Message { get; set; }
        public string TypeOfFeedback { get; set; }
    }
}
