using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Club
    {
        public int Id { get; set; }
        public string Teacher { get; set; }
        public string ClubName { get; set; }
        public string Student { get; set; }
        public string Role { get; set; }
    }
}
