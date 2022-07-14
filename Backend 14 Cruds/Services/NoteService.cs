using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Notes;

namespace WebApi.Services
{
    public interface INoteService
    {
        IEnumerable<Note> GetAll();
        Note GetById(int id);
        void Create(CreateRequestN model);
        void Update(int id, UpdateRequestN model);
        void Delete(int id);
    }

    public class NoteService : INoteService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public NoteService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Note> GetAll()
        {
            return _context.Notes;
        }

        public Note GetById(int id)
        {
            return getNote(id);
        }

        public void Create(CreateRequestN model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var note = _mapper.Map<Note>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Notes.Add(note);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestN model)
        {
            var note = getNote(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, note);
            _context.Notes.Update(note);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var note = getNote(id);
            _context.Notes.Remove(note);
            _context.SaveChanges();
        }

        // helper methods

        private Note getNote(int id)
        {
            var note = _context.Notes.Find(id);
            if (note == null) throw new KeyNotFoundException("Note not found");
            return note;
        }
    }
}