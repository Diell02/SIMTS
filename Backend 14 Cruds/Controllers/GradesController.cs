using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Grades;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GradesController : ControllerBase
    {
        private IGradeService _gradeService;
        private IMapper _mapper;

        public GradesController(
            IGradeService gradeService,
            IMapper mapper)
        {
            _gradeService = gradeService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var grades = _gradeService.GetAll();
            return Ok(grades);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var grade = _gradeService.GetById(id);
            return Ok(grade);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestG model)
        {
            _gradeService.Create(model);
            return Ok(new { message = "Grade created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestG model)
        {
            _gradeService.Update(id, model);
            return Ok(new { message = "Grade updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _gradeService.Delete(id);
            return Ok(new { message = "Grade deleted" });
        }
    }
}
