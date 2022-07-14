using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Books
{
    public class UpdateRequestB
    {
        public string Teacher { get; set; }
        public string BookName { get; set; }
        public string ForClass { get; set; }
    }
}