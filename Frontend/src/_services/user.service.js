import config from 'config';
import { authHeader, handleResponse, fetchWrapper } from '../_helpers';

const baseUrl = `${config.apiUrl}/users`;

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(baseUrl, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${baseUrl}/${id}`, requestOptions).then(handleResponse);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
