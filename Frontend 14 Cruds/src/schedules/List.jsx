import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { scheduleService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [schedules, setSchedules] = useState(null);

    useEffect(() => {
        scheduleService.getAll().then(x => setSchedules(x));
    }, []);

    function deleteSchedule(id) {
        setSchedules(schedule.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        scheduleService.delete(id).then(() => {
            setSchedules(schedules => schedules.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Schedules</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Schedule</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Subject</th>
                        <th style={{ width: '30%' }}>Hours</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {schedules && schedules.map(schedule =>
                        <tr key={schedule.id}>
                            <td>{schedule.teacher}</td>
                            <td>{schedule.subject}</td>
                            <td>{schedule.hours}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${schedule.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteSchedule(schedule.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={schedule.isDeleting}>
                                    {schedule.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!schedules &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {schedules && !schedules.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Schedules To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };