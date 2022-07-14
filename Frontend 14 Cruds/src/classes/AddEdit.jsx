import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { classService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        teacher: Yup.string()
            .required('Teacher is required'),
        student: Yup.string()
            .required('Name is required'),
        subject: Yup.string()
            .required('Name is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createClass(data)
            : updateClass(id, data);
    }

    function createClass(data) {
        return classService.create(data)
            .then(() => {
                alertService.success('Class added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateClass(id, data) {
        return classService.update(id, data)
            .then(() => {
                alertService.success('Class updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            classService.getById(id).then(classs => {
                const fields = ['teacher', 'student', 'subject'];
                fields.forEach(field => setValue(field, classs[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Class' : 'Edit Class'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Teacher</label>
                    <input name="teacher" type="text" ref={register} className={`form-control ${errors.teacher ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.teacher?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Student</label>
                    <input name="student" type="text" ref={register} className={`form-control ${errors.student ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.student?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Subject</label>
                    <input name="subject" type="text" ref={register} className={`form-control ${errors.subject ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.subject?.message}</div>
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