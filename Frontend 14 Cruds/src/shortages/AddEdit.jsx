import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { shortageService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        subject: Yup.string()
            .required('Subject is required'),
        studentName: Yup.string()
            .required('Student Name is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createShortage(data)
            : updateShortage(id, data);
    }

    function createShortage(data) {
        return shortageService.create(data)
            .then(() => {
                alertService.success('Shortage added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateShortage(id, data) {
        return shortageService.update(id, data)
            .then(() => {
                alertService.success('Shortage updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            shortageService.getById(id).then(shortage => {
                const fields = ['subject', 'studentName'];
                fields.forEach(field => setValue(field, shortage[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Shortage' : 'Edit Shortage'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Subject</label>
                    <input name="subject" type="text" ref={register} className={`form-control ${errors.subject ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.subject?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Student Name</label>
                    <input name="studentName" type="text" ref={register} className={`form-control ${errors.studentName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.studentName?.message}</div>
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