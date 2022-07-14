using AutoMapper;
using BCryptNet = BCrypt.Net.BCrypt;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Books;

namespace WebApi.Services
{
    public interface IBookService
    {
        IEnumerable<Book> GetAll();
        Book GetById(int id);
        void Create(CreateRequestB model);
        void Update(int id, UpdateRequestB model);
        void Delete(int id);
    }

    public class BookService : IBookService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public BookService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Book> GetAll()
        {
            return _context.Books;
        }

        public Book GetById(int id)
        {
            return getBook(id);
        }

        public void Create(CreateRequestB model)
        {
            // validate
            //if (_context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // map model to new user object
            var book = _mapper.Map<Book>(model);

            // hash password
            //user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // save user
            _context.Books.Add(book);
            _context.SaveChanges();
        }

        public void Update(int id, UpdateRequestB model)
        {
            var book = getBook(id);

            // validate
            //if (model.Email != user.Email && _context.Users.Any(x => x.Email == model.Email))
            //    throw new AppException("User with the email '" + model.Email + "' already exists");

            // hash password if it was entered
            //if (!string.IsNullOrEmpty(model.Password))
            //    user.PasswordHash = BCryptNet.HashPassword(model.Password);

            // copy model to user and save
            _mapper.Map(model, book);
            _context.Books.Update(book);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var book = getBook(id);
            _context.Books.Remove(book);
            _context.SaveChanges();
        }

        // helper methods

        private Book getBook(int id)
        {
            var book = _context.Books.Find(id);
            if (book == null) throw new KeyNotFoundException("Book not found");
            return book;
        }
    }
}