using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public string Teacher { get; set; }
        public string BookName { get; set; }
        public string ForClass { get; set; }
    }
}
