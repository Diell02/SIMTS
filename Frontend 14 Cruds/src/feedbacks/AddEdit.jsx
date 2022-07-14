import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { feedbackService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        user: Yup.string()
            .required('User is required'),
        message: Yup.string()
            .required('Message is required'),
        typeOfFeedback: Yup.string()
            .required('Type of Feedback is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createFeedback(data)
            : updateFeedback(id, data);
    }

    function createFeedback(data) {
        return feedbackService.create(data)
            .then(() => {
                alertService.success('Feedback added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateFeedback(id, data) {
        return feedbackService.update(id, data)
            .then(() => {
                alertService.success('Feedback updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            feedbackService.getById(id).then(feedback => {
                const fields = ['user', 'message', 'typeOfFeedback'];
                fields.forEach(field => setValue(field, feedback[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Feedback' : 'Edit Feedback'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>User</label>
                    <input name="user" type="text" ref={register} className={`form-control ${errors.user ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.user?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Message</label>
                    <input name="message" type="text" ref={register} className={`form-control ${errors.message ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.message?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Type of Feedback</label>
                    <select name="typeOfFeedback" ref={register} className={`form-control ${errors.typeOfFeedback ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Warning">Warning</option>
                        <option value="Praise">Praise</option>
                        <option value="Suggestion">Suggestion</option>
                    </select>
                    <div className="invalid-feedback">{errors.typeOfFeedback?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };