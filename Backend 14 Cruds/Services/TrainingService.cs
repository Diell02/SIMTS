using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Trainings;

namespace WebApi.Services
{
    public interface ITrainingService
    {
        IEnumerable<Training> GetAll();
        Training GetById(int id);
        void Create(CreateRequestT model);
        void Update(int id, UpdateRequestT model);
        void Delete(int id);
    }

    public class TrainingService : ITrainingService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public TrainingService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Training> GetAll()
        {
            return _context.Trainings;
        }

        public Training GetById(int id)
        {
            return getTraining(id);
        }

        public void Create(CreateRequestT model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var training = _mapper.Map<Training>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Trainings.Add(training);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestT model)
        {
            var training = getTraining(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, training);
            _context.Trainings.Update(training);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var training = getTraining(id);
            _context.Trainings.Remove(training);
            _context.SaveChanges();
        }

        // helper methods

        private Training getTraining(int id)
        {
            var training = _context.Trainings.Find(id);
            if (training == null) throw new KeyNotFoundException("Training not found");
            return training;
        }
    }
}