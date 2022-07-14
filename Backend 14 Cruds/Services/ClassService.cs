using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Classes;

namespace WebApi.Services
{
    public interface IClassService
    {
        IEnumerable<Class> GetAll();
        Class GetById(int id);
        void Create(CreateRequestCs model);
        void Update(int id, UpdateRequestCs model);
        void Delete(int id);
    }

    public class ClassService : IClassService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public ClassService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Class> GetAll()
        {
            return _context.Classes;
        }

        public Class GetById(int id)
        {
            return getClass(id);
        }

        public void Create(CreateRequestCs model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var classs = _mapper.Map<Class>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Classes.Add(classs);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestCs model)
        {
            var classs = getClass(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, classs);
            _context.Classes.Update(classs);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var classs = getClass(id);
            _context.Classes.Remove(classs);
            _context.SaveChanges();
        }

        // helper methods

        private Class getClass(int id)
        {
            var classs = _context.Classes.Find(id);
            if (classs == null) throw new KeyNotFoundException("Class not found");
            return classs;
        }
    }
}