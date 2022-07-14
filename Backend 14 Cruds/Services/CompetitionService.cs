using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Competitions;

namespace WebApi.Services
{
    public interface ICompetitionService
    {
        IEnumerable<Competition> GetAll();
        Competition GetById(int id);
        void Create(CreateRequestCm model);
        void Update(int id, UpdateRequestCm model);
        void Delete(int id);
    }

    public class CompetitionService : ICompetitionService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public CompetitionService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Competition> GetAll()
        {
            return _context.Competitions;
        }

        public Competition GetById(int id)
        {
            return getCompetition(id);
        }

        public void Create(CreateRequestCm model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var competition = _mapper.Map<Competition>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Competitions.Add(competition);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestCm model)
        {
            var competition = getCompetition(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, competition);
            _context.Competitions.Update(competition);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var competition = getCompetition(id);
            _context.Competitions.Remove(competition);
            _context.SaveChanges();
        }

        // helper methods

        private Competition getCompetition(int id)
        {
            var competition = _context.Competitions.Find(id);
            if (competition == null) throw new KeyNotFoundException("Competition not found");
            return competition;
        }
    }
}