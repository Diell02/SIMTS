import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { clubService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [clubs, setClubs] = useState(null);

    useEffect(() => {
        clubService.getAll().then(x => setClubs(x));
    }, []);

    function deleteClub(id) {
        setClubs(clubs.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        clubService.delete(id).then(() => {
            setClubs(clubs => clubs.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Clubs</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Club</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Club Name</th>
                        <th style={{ width: '30%' }}>Student</th>
                        <th style={{ width: '30%' }}>Role of Student</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {clubs && clubs.map(club =>
                        <tr key={club.id}>
                            <td>{club.teacher}</td>
                            <td>{club.clubName}</td>
                            <td>{club.student}</td>
                            <td>{club.role}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${club.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteClub(club.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={club.isDeleting}>
                                    {club.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!clubs &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {clubs && !clubs.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Clubs To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };