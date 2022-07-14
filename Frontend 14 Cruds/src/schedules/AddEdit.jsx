import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { scheduleService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        teacher: Yup.string()
            .required('Teacher is required'),
        subject: Yup.string()
            .required('Name is required'),
        hours: Yup.string()
            .required('Name is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createSchedule(data)
            : updateSchedule(id, data);
    }

    function createSchedule(data) {
        return scheduleService.create(data)
            .then(() => {
                alertService.success('Schedule added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateSchedule(id, data) {
        return scheduleService.update(id, data)
            .then(() => {
                alertService.success('Schedule updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            scheduleService.getById(id).then(schedule => {
                const fields = ['teacher', 'subject', 'hours'];
                fields.forEach(field => setValue(field, schedule[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Schedule' : 'Edit Schedule'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Teacher</label>
                    <input name="teacher" type="text" ref={register} className={`form-control ${errors.teacher ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.teacher?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Subject</label>
                    <input name="subject" type="text" ref={register} className={`form-control ${errors.subject ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.subject?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Hours</label>
                    <input name="hours" type="text" ref={register} className={`form-control ${errors.hours ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.hours?.message}</div>
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