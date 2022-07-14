import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { bookService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        teacher: Yup.string()
            .required('Teacher is required'),
        bookName: Yup.string()
            .required('Name is required'),
        forClass: Yup.string()
            .required('Name is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createBook(data)
            : updateBook(id, data);
    }

    function createBook(data) {
        return bookService.create(data)
            .then(() => {
                alertService.success('Book added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateBook(id, data) {
        return bookService.update(id, data)
            .then(() => {
                alertService.success('Book updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            bookService.getById(id).then(book => {
                const fields = ['teacher', 'bookName', 'forClass'];
                fields.forEach(field => setValue(field, book[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Book' : 'Edit Book'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Teacher</label>
                    <input name="teacher" type="text" ref={register} className={`form-control ${errors.teacher ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.teacher?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Book Name</label>
                    <input name="bookName" type="text" ref={register} className={`form-control ${errors.bookName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.bookName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Class</label>
                    <input name="forClass" type="text" ref={register} className={`form-control ${errors.forClass ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.forClass?.message}</div>
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