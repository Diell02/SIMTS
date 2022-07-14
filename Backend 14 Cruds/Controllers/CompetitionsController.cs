using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Competitions;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompetitionsController : ControllerBase
    {
        private ICompetitionService _competitionService;
        private IMapper _mapper;

        public CompetitionsController(
            ICompetitionService competitionService,
            IMapper mapper)
        {
            _competitionService = competitionService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var competitions = _competitionService.GetAll();
            return Ok(competitions);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var competition = _competitionService.GetById(id);
            return Ok(competition);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestCm model)
        {
            _competitionService.Create(model);
            return Ok(new { message = "Competition created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestCm model)
        {
            _competitionService.Update(id, model);
            return Ok(new { message = "Competition updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _competitionService.Delete(id);
            return Ok(new { message = "Competition deleted" });
        }
    }
}
