import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { bookService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [books, setBooks] = useState(null);

    useEffect(() => {
        bookService.getAll().then(x => setBooks(x));
    }, []);

    function deleteBook(id) {
        setBooks(books.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        bookService.delete(id).then(() => {
            setBooks(books => books.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Books</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Book</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Book Name</th>
                        <th style={{ width: '30%' }}>Class</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {books && books.map(book =>
                        <tr key={book.id}>
                            <td>{book.teacher}</td>
                            <td>{book.bookName}</td>
                            <td>{book.forClass}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${book.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteBook(book.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={book.isDeleting}>
                                    {book.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!books &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {books && !books.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Books To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };