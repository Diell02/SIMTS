using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Trainings;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrainingsController : ControllerBase
    {
        private ITrainingService _trainingService;
        private IMapper _mapper;

        public TrainingsController(
            ITrainingService trainingService,
            IMapper mapper)
        {
            _trainingService = trainingService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var trainings = _trainingService.GetAll();
            return Ok(trainings);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var training = _trainingService.GetById(id);
            return Ok(training);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestT model)
        {
            _trainingService.Create(model);
            return Ok(new { message = "Training created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestT model)
        {
            _trainingService.Update(id, model);
            return Ok(new { message = "Training updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _trainingService.Delete(id);
            return Ok(new { message = "Training deleted" });
        }
    }
}
