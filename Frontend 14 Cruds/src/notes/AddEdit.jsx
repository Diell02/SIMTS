import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { noteService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        student: Yup.string()
            .required('Teacher is required'),
        message: Yup.string()
            .required('Name is required'),
        status: Yup.string()
            .required('Name is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createNote(data)
            : updateNote(id, data);
    }

    function createNote(data) {
        return noteService.create(data)
            .then(() => {
                alertService.success('Note added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateNote(id, data) {
        return noteService.update(id, data)
            .then(() => {
                alertService.success('Note updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            noteService.getById(id).then(note => {
                const fields = ['student', 'message', 'status'];
                fields.forEach(field => setValue(field, note[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Note' : 'Edit Note'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Student</label>
                    <input name="student" type="text" ref={register} className={`form-control ${errors.student ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.student?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Message</label>
                    <input name="message" type="text" ref={register} className={`form-control ${errors.message ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.message?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Status of Emergency</label>
                    <select name="status" ref={register} className={`form-control ${errors.status ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Red">Red</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Green">Green</option>
                    </select>
                    <div className="invalid-feedback">{errors.status?.message}</div>
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