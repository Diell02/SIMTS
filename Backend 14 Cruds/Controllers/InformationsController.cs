using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Informations;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InformationsController : ControllerBase
    {
        private IInformationService _informationService;
        private IMapper _mapper;

        public InformationsController(
            IInformationService informationService,
            IMapper mapper)
        {
            _informationService = informationService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var informations = _informationService.GetAll();
            return Ok(informations);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var information = _informationService.GetById(id);
            return Ok(information);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestI model)
        {
            _informationService.Create(model);
            return Ok(new { message = "Information created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestI model)
        {
            _informationService.Update(id, model);
            return Ok(new { message = "Information updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _informationService.Delete(id);
            return Ok(new { message = "Information deleted" });
        }
    }
}
