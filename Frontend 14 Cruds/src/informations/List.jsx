import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { informationService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [informations, setInformations] = useState(null);

    useEffect(() => {
        informationService.getAll().then(x => setInformations(x));
    }, []);

    function deleteInformation(id) {
        setInformation(informations.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        informationService.delete(id).then(() => {
            setInformations(informations => informations.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Informations</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Information</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Subject</th>
                        <th style={{ width: '30%' }}>News</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {informations && informations.map(information =>
                        <tr key={information.id}>
                            <td>{information.teacher}</td>
                            <td>{information.subject}</td>
                            <td>{information.news}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${information.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteInformation(information.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={information.isDeleting}>
                                    {information.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!informations &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {informations && !informations.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Informations To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };