using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Subjects;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubjectsController : ControllerBase
    {
        private ISubjectService _subjectService;
        private IMapper _mapper;

        public SubjectsController(
            ISubjectService subjectService,
            IMapper mapper)
        {
            _subjectService = subjectService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var subjects = _subjectService.GetAll();
            return Ok(subjects);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var subject = _subjectService.GetById(id);
            return Ok(subject);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestS model)
        {
            _subjectService.Create(model);
            return Ok(new { message = "Subject created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestS model)
        {
            _subjectService.Update(id, model);
            return Ok(new { message = "Subject updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _subjectService.Delete(id);
            return Ok(new { message = "User deleted" });
        }
    }
}
