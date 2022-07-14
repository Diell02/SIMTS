using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Schedule
    {
        public int Id { get; set; }
        public string Teacher { get; set; }
        public string Subject { get; set; }
        public string Hours { get; set; }
    }
}
