using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Activity
    {
        public int Id { get; set; }
        public string Teacher { get; set; }

        public string Class { get; set; }

        public string TypeOfActivity { get; set; }
    }
}
