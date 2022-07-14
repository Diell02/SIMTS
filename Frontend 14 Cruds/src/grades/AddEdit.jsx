import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { gradeService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        teacher: Yup.string()
            .required('Teacher is required'),
        student: Yup.string()
            .required('Student is required'),
        gradee: Yup.string()
            .required('Grade is required'),
        subject: Yup.string()
            .required('Subject is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createGrade(data)
            : updateGrade(id, data);
    }

    function createGrade(data) {
        return gradeService.create(data)
            .then(() => {
                alertService.success('Grade added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateGrade(id, data) {
        return gradeService.update(id, data)
            .then(() => {
                alertService.success('Grade updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            gradeService.getById(id).then(grade => {
                const fields = ['teacher', 'student', 'gradee', 'subject'];
                fields.forEach(field => setValue(field, grade[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Grade' : 'Edit Grade'}</h1>
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
                <div className="form-group col">
                    <label>Grade</label>
                    <select name="gradee" ref={register} className={`form-control ${errors.gradee ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <div className="invalid-feedback">{errors.gradee?.message}</div>
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