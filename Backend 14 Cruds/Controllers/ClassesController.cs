using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Classes;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClassesController : ControllerBase
    {
        private IClassService _classService;
        private IMapper _mapper;

        public ClassesController(
            IClassService classService,
            IMapper mapper)
        {
            _classService = classService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var classes = _classService.GetAll();
            return Ok(classes);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var classs = _classService.GetById(id);
            return Ok(classs);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestCs model)
        {
            _classService.Create(model);
            return Ok(new { message = "Class created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestCs model)
        {
            _classService.Update(id, model);
            return Ok(new { message = "Class updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _classService.Delete(id);
            return Ok(new { message = "Class deleted" });
        }
    }
}
