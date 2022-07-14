using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Informations
{
    public class UpdateRequestI
    {
        public string Teacher { get; set; }
        public string Subject { get; set; }
        public string News { get; set; }
    }
}
