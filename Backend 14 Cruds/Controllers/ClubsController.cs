using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Clubs;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClubsController : ControllerBase
    {
        private IClubService _clubService;
        private IMapper _mapper;

        public ClubsController(
            IClubService clubService,
            IMapper mapper)
        {
            _clubService = clubService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var clubs = _clubService.GetAll();
            return Ok(clubs);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var club = _clubService.GetById(id);
            return Ok(club);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestCb model)
        {
            _clubService.Create(model);
            return Ok(new { message = "Club created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestCb model)
        {
            _clubService.Update(id, model);
            return Ok(new { message = "Club updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _clubService.Delete(id);
            return Ok(new { message = "Club deleted" });
        }
    }
}
