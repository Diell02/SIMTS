import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { gradeService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [grades, setGrades] = useState(null);

    useEffect(() => {
        gradeService.getAll().then(x => setGrades(x));
    }, []);

    function deleteGrade(id) {
        setGrades(grades.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        gradeService.delete(id).then(() => {
            setGrades(grades => grades.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Grades</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Grade</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Student</th>
                        <th style={{ width: '30%' }}>Grade</th>
                        <th style={{ width: '30%' }}>Subject</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {grades && grades.map(grade =>
                        <tr key={grade.id}>
                            <td>{grade.teacher}</td>
                            <td>{grade.student}</td>
                            <td>{grade.gradee}</td>
                            <td>{grade.subject}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${grade.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteGrade(grade.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={grade.isDeleting}>
                                    {grade.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!grades &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {grades && !grades.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Grades To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };