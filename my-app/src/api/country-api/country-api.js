import { handleError, handleResponse } from '../apiUtils';
import { baseApiUrl } from '../baseApi';

const baseURL = baseApiUrl + "/country/";


export function getCountries() {
    return fetch(baseURL)
        .then(handleResponse)
        .catch(handleError)
}

export function deleteCountry(id) {
    return fetch(baseURL + id, {
        method: 'DELETE'
    })
}

export function saveCountry(country) {
    return fetch(baseURL + (country.id || ""), {
        method: country.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(country)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function editCountry(country) {
    return fetch(baseURL + country.id)
        .then(handleResponse)
        .catch(handleError)
}