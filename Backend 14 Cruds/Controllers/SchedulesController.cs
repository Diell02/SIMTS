using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Schedules;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SchedulesController : ControllerBase
    {
        private IScheduleService _scheduleService;
        private IMapper _mapper;

        public SchedulesController(
            IScheduleService scheduleService,
            IMapper mapper)
        {
            _scheduleService = scheduleService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var schedules = _scheduleService.GetAll();
            return Ok(schedules);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var schedule = _scheduleService.GetById(id);
            return Ok(schedule);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestSc model)
        {
            _scheduleService.Create(model);
            return Ok(new { message = "Schedule created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestSc model)
        {
            _scheduleService.Update(id, model);
            return Ok(new { message = "Schedule updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _scheduleService.Delete(id);
            return Ok(new { message = "Schedule deleted" });
        }
    }
}
