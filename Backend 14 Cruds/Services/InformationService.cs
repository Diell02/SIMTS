using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Informations;

namespace WebApi.Services
{
    public interface IInformationService
    {
        IEnumerable<Information> GetAll();
        Information GetById(int id);
        void Create(CreateRequestI model);
        void Update(int id, UpdateRequestI model);
        void Delete(int id);
    }

    public class InformationService : IInformationService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public InformationService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Information> GetAll()
        {
            return _context.Informations;
        }

        public Information GetById(int id)
        {
            return getInformation(id);
        }

        public void Create(CreateRequestI model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var information = _mapper.Map<Information>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Informations.Add(information);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestI model)
        {
            var information = getInformation(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, information);
            _context.Informations.Update(information);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var information = getInformation(id);
            _context.Informations.Remove(information);
            _context.SaveChanges();
        }

        // helper methods

        private Information getInformation(int id)
        {
            var information = _context.Informations.Find(id);
            if (information == null) throw new KeyNotFoundException("Information not found");
            return information;
        }
    }
}