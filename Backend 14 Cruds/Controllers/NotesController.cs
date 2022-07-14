using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Notes;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private INoteService _noteService;
        private IMapper _mapper;

        public NotesController(
            INoteService noteService,
            IMapper mapper)
        {
            _noteService = noteService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var notes = _noteService.GetAll();
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var note = _noteService.GetById(id);
            return Ok(note);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestN model)
        {
            _noteService.Create(model);
            return Ok(new { message = "Note created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestN model)
        {
            _noteService.Update(id, model);
            return Ok(new { message = "Note updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _noteService.Delete(id);
            return Ok(new { message = "Note deleted" });
        }
    }
}
