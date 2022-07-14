using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Activities;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private IActivityService _activityService;
        private IMapper _mapper;

        public ActivitiesController(
            IActivityService activityService,
            IMapper mapper)
        {
            _activityService = activityService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var activities = _activityService.GetAll();
            return Ok(activities);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var activity = _activityService.GetById(id);
            return Ok(activity);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestA model)
        {
            _activityService.Create(model);
            return Ok(new { message = "Activity created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestA model)
        {
            _activityService.Update(id, model);
            return Ok(new { message = "Activity updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _activityService.Delete(id);
            return Ok(new { message = "Activity deleted" });
        }
    }
}
