using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Schedules;

namespace WebApi.Services
{
    public interface IScheduleService
    {
        IEnumerable<Schedule> GetAll();
        Schedule GetById(int id);
        void Create(CreateRequestSc model);
        void Update(int id, UpdateRequestSc model);
        void Delete(int id);
    }

    public class ScheduleService : IScheduleService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public ScheduleService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Schedule> GetAll()
        {
            return _context.Schedules;
        }

        public Schedule GetById(int id)
        {
            return getSchedule(id);
        }

        public void Create(CreateRequestSc model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var schedule = _mapper.Map<Schedule>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Schedules.Add(schedule);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestSc model)
        {
            var schedule = getSchedule(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, schedule);
            _context.Schedules.Update(schedule);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var schedule = getSchedule(id);
            _context.Schedules.Remove(schedule);
            _context.SaveChanges();
        }

        // helper methods

        private Schedule getSchedule(int id)
        {
            var schedule = _context.Schedules.Find(id);
            if (schedule == null) throw new KeyNotFoundException("Schedule not found");
            return schedule;
        }
    }
}