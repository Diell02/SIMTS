using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Clubs;

namespace WebApi.Services
{
    public interface IClubService
    {
        IEnumerable<Club> GetAll();
        Club GetById(int id);
        void Create(CreateRequestCb model);
        void Update(int id, UpdateRequestCb model);
        void Delete(int id);
    }

    public class ClubService : IClubService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public ClubService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Club> GetAll()
        {
            return _context.Clubs;
        }

        public Club GetById(int id)
        {
            return getClub(id);
        }

        public void Create(CreateRequestCb model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var club = _mapper.Map<Club>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Clubs.Add(club);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestCb model)
        {
            var club = getClub(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, club);
            _context.Clubs.Update(club);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var club = getClub(id);
            _context.Clubs.Remove(club);
            _context.SaveChanges();
        }

        // helper methods

        private Club getClub(int id)
        {
            var club = _context.Clubs.Find(id);
            if (club == null) throw new KeyNotFoundException("Club not found");
            return club;
        }
    }
}