using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Grades;

namespace WebApi.Services
{
    public interface IGradeService
    {
        IEnumerable<Grade> GetAll();
        Grade GetById(int id);
        void Create(CreateRequestG model);
        void Update(int id, UpdateRequestG model);
        void Delete(int id);
    }

    public class GradeService : IGradeService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public GradeService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Grade> GetAll()
        {
            return _context.Grades;
        }

        public Grade GetById(int id)
        {
            return getGrade(id);
        }

        public void Create(CreateRequestG model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var grade = _mapper.Map<Grade>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Grades.Add(grade);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestG model)
        {
            var grade = getGrade(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, grade);
            _context.Grades.Update(grade);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var grade = getGrade(id);
            _context.Grades.Remove(grade);
            _context.SaveChanges();
        }

        // helper methods

        private Grade getGrade(int id)
        {
            var grade = _context.Grades.Find(id);
            if (grade == null) throw new KeyNotFoundException("Grade not found");
            return grade;
        }
    }
}