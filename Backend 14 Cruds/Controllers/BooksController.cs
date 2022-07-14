using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Books;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private IBookService _bookService;
        private IMapper _mapper;

        public BooksController(
            IBookService bookService,
            IMapper mapper)
        {
            _bookService = bookService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var books = _bookService.GetAll();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var book = _bookService.GetById(id);
            return Ok(book);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestB model)
        {
            _bookService.Create(model);
            return Ok(new { message = "Book created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestB model)
        {
            _bookService.Update(id, model);
            return Ok(new { message = "Book updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookService.Delete(id);
            return Ok(new { message = "Book deleted" });
        }
    }
}
