import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { shortageService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [shortages, setShortages] = useState(null);

    useEffect(() => {
        shortageService.getAll().then(x => setShortages(x));
    }, []);

    function deleteShortage(id) {
        setShortages(shortages.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        shortageService.delete(id).then(() => {
            setShortages(shortages => shortages.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Shortages</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Shortage</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Subject</th>
                        <th style={{ width: '30%' }}>Student Name</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {shortages && shortages.map(shortage =>
                        <tr key={shortage.id}>
                            <td>{shortage.subject}</td>
                            <td>{shortage.studentName}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${shortage.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteShortage(shortage.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={shortage.isDeleting}>
                                    {shortage.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!shortages &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {shortages && !shortages.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Shortages To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };