using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Grade
    {
        public int Id { get; set; }
        public string Teacher { get; set; }
        public string Student { get; set; }
        public string Gradee { get; set; }
        public string Subject { get; set; }
    }
}
