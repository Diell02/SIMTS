using System.Text.Json.Serialization;

namespace WebApi.Entities
{
    public class Subject
    {
        public int Id { get; set; }
        public string Teacher { get; set; }
        public string Name { get; set; }

    }
}