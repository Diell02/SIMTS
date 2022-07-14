import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { trainingService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [trainings, setTrainings] = useState(null);

    useEffect(() => {
        trainingService.getAll().then(x => setTrainings(x));
    }, []);

    function deleteTraining(id) {
        setTrainings(trainings.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        trainingService.delete(id).then(() => {
            setTrainings(trainings => trainings.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Trainings</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Training</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Subject</th>
                        <th style={{ width: '30%' }}>Creds</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {trainings && trainings.map(training =>
                        <tr key={training.id}>
                            <td>{training.teacher}</td>
                            <td>{training.subject}</td>
                            <td>{training.creds}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${training.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteTraining(training.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={training.isDeleting}>
                                    {training.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!trainings &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {trainings && !trainings.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Trainings To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };