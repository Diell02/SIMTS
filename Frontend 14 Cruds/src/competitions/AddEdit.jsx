import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { competitionService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        teacher: Yup.string()
            .required('Teacher is required'),
        race: Yup.string()
            .required('Race is required'),
        subject: Yup.string()
            .required('Subject is required'),
        winner: Yup.string()
            .required('Winner is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createCompetition(data)
            : updateCompetition(id, data);
    }

    function createCompetition(data) {
        return competitionService.create(data)
            .then(() => {
                alertService.success('Competition added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateCompetition(id, data) {
        return competitionService.update(id, data)
            .then(() => {
                alertService.success('Competition updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            competitionService.getById(id).then(competition => {
                const fields = ['teacher', 'race', 'subject', 'winner'];
                fields.forEach(field => setValue(field, competition[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Competition' : 'Edit Competition'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Teacher</label>
                    <input name="teacher" type="text" ref={register} className={`form-control ${errors.teacher ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.teacher?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Race</label>
                    <input name="race" type="text" ref={register} className={`form-control ${errors.race ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.race?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Subject</label>
                    <input name="subject" type="text" ref={register} className={`form-control ${errors.subject ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.subject?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Winner</label>
                    <input name="winner" type="text" ref={register} className={`form-control ${errors.winner ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.winner?.message}</div>
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