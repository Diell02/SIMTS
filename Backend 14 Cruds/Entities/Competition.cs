using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Competition
    {
        public int Id { get; set; }
        public string Teacher { get; set; }
        public string Race { get; set; }
        public string Subject { get; set; }
        public string Winner { get; set; }
    }
}
