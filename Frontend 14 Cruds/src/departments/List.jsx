import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { departmentService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [departments, setDepartments] = useState(null);

    useEffect(() => {
        departmentService.getAll().then(x => setDepartments(x));
    }, []);

    function deleteDepartment(id) {
        setDepartments(departments.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        departmentService.delete(id).then(() => {
            setDepartments(departments => departments.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Departments</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Department</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Dep. Name</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {departments && departments.map(department =>
                        <tr key={department.id}>
                            <td>{department.teacher}</td>
                            <td>{department.depName}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${department.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteDepartment(department.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={department.isDeleting}>
                                    {department.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!departments &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {departments && !departments.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Departments To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };