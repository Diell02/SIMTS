using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Feedbacks;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FeedbacksController : ControllerBase
    {
        private IFeedbackService _feedbackService;
        private IMapper _mapper;

        public FeedbacksController(
            IFeedbackService feedbackService,
            IMapper mapper)
        {
            _feedbackService = feedbackService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var feedbacks = _feedbackService.GetAll();
            return Ok(feedbacks);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var feedback = _feedbackService.GetById(id);
            return Ok(feedback);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestF model)
        {
            _feedbackService.Create(model);
            return Ok(new { message = "Feedback created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestF model)
        {
            _feedbackService.Update(id, model);
            return Ok(new { message = "Feedback updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _feedbackService.Delete(id);
            return Ok(new { message = "Feedback deleted" });
        }
    }
}
