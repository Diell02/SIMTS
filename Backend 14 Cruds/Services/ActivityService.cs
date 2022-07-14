using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Activities;

namespace WebApi.Services
{
    public interface IActivityService
    {
        IEnumerable<Activity> GetAll();
        Activity GetById(int id);
        void Create(CreateRequestA model);
        void Update(int id, UpdateRequestA model);
        void Delete(int id);
    }

    public class ActivityService : IActivityService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public ActivityService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Activity> GetAll()
        {
            return _context.Activities;
        }

        public Activity GetById(int id)
        {
            return getActivity(id);
        }

        public void Create(CreateRequestA model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var activity = _mapper.Map<Activity>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Activities.Add(activity);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestA model)
        {
            var activity = getActivity(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, activity);
            _context.Activities.Update(activity);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var activity = getActivity(id);
            _context.Activities.Remove(activity);
            _context.SaveChanges();
        }

        // helper methods

        private Activity getActivity(int id)
        {
            var activity = _context.Activities.Find(id);
            if (activity == null) throw new KeyNotFoundException("Activity not found");
            return activity;
        }
    }
}