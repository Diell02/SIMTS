using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Shortages;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShortagesController : ControllerBase
    {
        private IShortageService _shortageService;
        private IMapper _mapper;

        public ShortagesController(
            IShortageService shortageService,
            IMapper mapper)
        {
            _shortageService = shortageService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var shortages = _shortageService.GetAll();
            return Ok(shortages);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var shortage = _shortageService.GetById(id);
            return Ok(shortage);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestSh model)
        {
            _shortageService.Create(model);
            return Ok(new { message = "Shortage created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestSh model)
        {
            _shortageService.Update(id, model);
            return Ok(new { message = "Shortage updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _shortageService.Delete(id);
            return Ok(new { message = "Shortage deleted" });
        }
    }
}
