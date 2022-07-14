using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Shortages;

namespace WebApi.Services
{
    public interface IShortageService
    {
        IEnumerable<Shortage> GetAll();
        Shortage GetById(int id);
        void Create(CreateRequestSh model);
        void Update(int id, UpdateRequestSh model);
        void Delete(int id);
    }

    public class ShortageService : IShortageService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public ShortageService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Shortage> GetAll()
        {
            return _context.Shortages;
        }

        public Shortage GetById(int id)
        {
            return getShortage(id);
        }

        public void Create(CreateRequestSh model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var shortage = _mapper.Map<Shortage>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Shortages.Add(shortage);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestSh model)
        {
            var shortage = getShortage(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, shortage);
            _context.Shortages.Update(shortage);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var shortage = getShortage(id);
            _context.Shortages.Remove(shortage);
            _context.SaveChanges();
        }

        // helper methods

        private Shortage getShortage(int id)
        {
            var shortage = _context.Shortages.Find(id);
            if (shortage == null) throw new KeyNotFoundException("Shortage not found");
            return shortage;
        }
    }
}