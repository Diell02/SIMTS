using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Feedbacks;

namespace WebApi.Services
{
    public interface IFeedbackService
    {
        IEnumerable<Feedback> GetAll();
        Feedback GetById(int id);
        void Create(CreateRequestF model);
        void Update(int id, UpdateRequestF model);
        void Delete(int id);
    }

    public class FeedbackService : IFeedbackService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public FeedbackService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Feedback> GetAll()
        {
            return _context.Feedbacks;
        }

        public Feedback GetById(int id)
        {
            return getFeedback(id);
        }

        public void Create(CreateRequestF model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var feedback = _mapper.Map<Feedback>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Feedbacks.Add(feedback);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestF model)
        {
            var feedback = getFeedback(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, feedback);
            _context.Feedbacks.Update(feedback);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var feedback = getFeedback(id);
            _context.Feedbacks.Remove(feedback);
            _context.SaveChanges();
        }

        // helper methods

        private Feedback getFeedback(int id)
        {
            var feedback = _context.Feedbacks.Find(id);
            if (feedback == null) throw new KeyNotFoundException("Feedback not found");
            return feedback;
        }
    }
}