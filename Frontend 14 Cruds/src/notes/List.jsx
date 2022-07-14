import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { noteService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        noteService.getAll().then(x => setNotes(x));
    }, []);

    function deleteNote(id) {
        setNotes(notes.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        noteService.delete(id).then(() => {
            setNotes(notes => notes.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Notes</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Note</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Student</th>
                        <th style={{ width: '30%' }}>Message</th>
                        <th style={{ width: '30%' }}>Status of Emergency</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {notes && notes.map(note =>
                        <tr key={note.id}>
                            <td>{note.student}</td>
                            <td>{note.message}</td>
                            <td>{note.status}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${note.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteNote(note.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={note.isDeleting}>
                                    {note.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!notes &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {notes && !notes.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Notes To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };