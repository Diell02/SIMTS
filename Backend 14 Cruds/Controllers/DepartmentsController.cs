using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Departments;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private IDepartmentService _departmentService;
        private IMapper _mapper;

        public DepartmentsController(
            IDepartmentService departmentService,
            IMapper mapper)
        {
            _departmentService = departmentService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var departments = _departmentService.GetAll();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var department = _departmentService.GetById(id);
            return Ok(department);
        }

        [HttpPost]
        public IActionResult Create(CreateRequestD model)
        {
            _departmentService.Create(model);
            return Ok(new { message = "Department created" });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequestD model)
        {
            _departmentService.Update(id, model);
            return Ok(new { message = "Department updated" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _departmentService.Delete(id);
            return Ok(new { message = "Department deleted" });
        }
    }
}
