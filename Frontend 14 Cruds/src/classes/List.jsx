import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { classService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [classes, setClasses] = useState(null);

    useEffect(() => {
        classService.getAll().then(x => setClasses(x));
    }, []);

    function deleteClass(id) {
        setClasses(classes.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        classService.delete(id).then(() => {
            setClasses(classes => classes.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Classes</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Class</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Student</th>
                        <th style={{ width: '30%' }}>Subject</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {classes && classes.map(classs =>
                        <tr key={classs.id}>
                            <td>{classs.teacher}</td>
                            <td>{classs.student}</td>
                            <td>{classs.subject}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${classs.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteClass(classs.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={classs.isDeleting}>
                                    {classs.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!classes &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {classes && !classes.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Classes To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };