using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public string Student { get; set; }
        public string Message { get; set; }
        public string Status { get; set; }
    }
}
