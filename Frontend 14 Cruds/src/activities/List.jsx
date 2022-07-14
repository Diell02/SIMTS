import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { activityService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [activities, setActivities] = useState(null);

    useEffect(() => {
        activityService.getAll().then(x => setActivities(x));
    }, []);

    function deleteActivity(id) {
        setActivities(activities.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        activityService.delete(id).then(() => {
            setActivities(activities => activities.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Activities</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Activity</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Teacher</th>
                        <th style={{ width: '30%' }}>Class</th>
                        <th style={{ width: '30%' }}>Type of Activity</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {activities && activities.map(activity =>
                        <tr key={activity.id}>
                            <td>{activity.teacher}</td>
                            <td>{activity.class}</td>
                            <td>{activity.typeOfActivity}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${activity.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteActivity(activity.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={activity.isDeleting}>
                                    {activity.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!activities &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {activities && !activities.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Activities To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };