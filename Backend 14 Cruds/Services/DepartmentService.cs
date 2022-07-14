using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Departments;

namespace WebApi.Services
{
    public interface IDepartmentService
    {
        IEnumerable<Department> GetAll();
        Department GetById(int id);
        void Create(CreateRequestD model);
        void Update(int id, UpdateRequestD model);
        void Delete(int id);
    }

    public class DepartmentService : IDepartmentService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public DepartmentService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Department> GetAll()
        {
            return _context.Departments;
        }

        public Department GetById(int id)
        {
            return getDepartment(id);
        }

        public void Create(CreateRequestD model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var department = _mapper.Map<Department>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Departments.Add(department);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestD model)
        {
            var department = getDepartment(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, department);
            _context.Departments.Update(department);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var department = getDepartment(id);
            _context.Departments.Remove(department);
            _context.SaveChanges();
        }

        // helper methods

        private Department getDepartment(int id)
        {
            var department = _context.Departments.Find(id);
            if (department == null) throw new KeyNotFoundException("Department not found");
            return department;
        }
    }
}