import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { subjectService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [subjects, setSubjects] = useState(null);

    useEffect(() => {
        subjectService.getAll().then(x => setSubjects(x));
    }, []);

    function deleteSubject(id) {
        setSubjects(subjects.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        subjectService.delete(id).then(() => {
            setSubjects(subjects => subjects.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Subjects</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Subject</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {subjects && subjects.map(subject =>
                        <tr key={subject.id}>
                            <td>{subject.teacher}</td>
                            <td>{subject.name}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${subject.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteSubject(subject.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={subject.isDeleting}>
                                    {subject.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!subjects &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {subjects && !subjects.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Subjects To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };