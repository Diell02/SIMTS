using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Subjects;

namespace WebApi.Services
{
    public interface ISubjectService
    {
        IEnumerable<Subject> GetAll();
        Subject GetById(int id);
        void Create(CreateRequestS model);
        void Update(int id, UpdateRequestS model);
        void Delete(int id);
    }

    public class SubjectService : ISubjectService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public SubjectService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Subject> GetAll()
        {
            return _context.Subjects;
        }

        public Subject GetById(int id)
        {
            return getSubject(id);
        }

        public void Create(CreateRequestS model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var subject = _mapper.Map<Subject>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Subjects.Add(subject);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestS model)
        {
            var subject = getSubject(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, subject);
            _context.Subjects.Update(subject);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var subject = getSubject(id);
            _context.Subjects.Remove(subject);
            _context.SaveChanges();
        }

        // helper methods

        private Subject getSubject(int id)
        {
            var subject = _context.Subjects.Find(id);
            if (subject == null) throw new KeyNotFoundException("Subject not found");
            return subject;
        }
    }
}