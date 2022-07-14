import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { feedbackService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [feedbacks, setFeedbacks] = useState(null);

    useEffect(() => {
        feedbackService.getAll().then(x => setFeedbacks(x));
    }, []);

    function deleteFeedback(id) {
        setFeedbacks(feedbacks.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        feedbackService.delete(id).then(() => {
            setFeedbacks(feedbacks => feedbacks.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Feedbacks</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Feedback</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>User</th>
                        <th style={{ width: '30%' }}>Message</th>
                        <th style={{ width: '30%' }}>Type of Feedback</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks && feedbacks.map(feedback =>
                        <tr key={feedback.id}>
                            <td>{feedback.user}</td>
                            <td>{feedback.message}</td>
                            <td>{feedback.typeOfFeedback}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${feedback.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteFeedback(feedback.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={feedback.isDeleting}>
                                    {feedback.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!feedbacks &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {feedbacks && !feedbacks.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Feedbacks To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };