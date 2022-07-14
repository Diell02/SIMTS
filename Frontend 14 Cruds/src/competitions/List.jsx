import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { competitionService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [competitions, setCompetitions] = useState(null);

    useEffect(() => {
        competitionService.getAll().then(x => setCompetitions(x));
    }, []);

    function deleteCompetition(id) {
        setCompetitions(competitions.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        competitionService.delete(id).then(() => {
            setCompetitions(competitions => competitions.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Competitions</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Competition</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Race</th>
                        <th style={{ width: '30%' }}>Subject</th>
                        <th style={{ width: '30%' }}>Winner</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {competitions && competitions.map(competition =>
                        <tr key={competition.id}>
                            <td>{competition.teacher}</td>
                            <td>{competition.race}</td>
                            <td>{competition.subject}</td>
                            <td>{competition.winner}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${competition.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCompetition(competition.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={competition.isDeleting}>
                                    {competition.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!competitions &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {competitions && !competitions.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Competitions To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };