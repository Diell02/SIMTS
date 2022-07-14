using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models.Subjects
{
    public class UpdateRequestS
    {
        public string Teacher { get; set; }
        public string Name { get; set; }
    
        // helpers

        private string replaceEmptyWithNull(string value)
        {
            // replace empty string with null to make field optional
            return string.IsNullOrEmpty(value) ? null : value;
        }
    }
}