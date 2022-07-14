import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { clubService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        teacher: Yup.string()
            .required('Teacher is required'),
        clubName: Yup.string()
            .required('Club Name is required'),
        student: Yup.string()
            .required('Student Name is required'),
        role: Yup.string()
            .required('Role of Student is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createClub(data)
            : updateClub(id, data);
    }

    function createClub(data) {
        return clubService.create(data)
            .then(() => {
                alertService.success('Club added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateClub(id, data) {
        return clubService.update(id, data)
            .then(() => {
                alertService.success('Club updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            clubService.getById(id).then(club => {
                const fields = ['teacher', 'clubName', 'student', 'role'];
                fields.forEach(field => setValue(field, club[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Club' : 'Edit Club'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Teacher</label>
                    <input name="teacher" type="text" ref={register} className={`form-control ${errors.teacher ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.teacher?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Club Name</label>
                    <input name="clubName" type="text" ref={register} className={`form-control ${errors.clubName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.clubName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Student</label>
                    <input name="student" type="text" ref={register} className={`form-control ${errors.student ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.student?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Role of Student</label>
                    <select name="role" ref={register} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Leader">Leader</option>
                        <option value="Helper">Helper</option>
                        <option value="Worker">Worker</option>
                    </select>
                    <div className="invalid-feedback">{errors.role?.message}</div>
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