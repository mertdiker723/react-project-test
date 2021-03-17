import { handleResponse, handleError } from '../apiUtils';
import { baseApiUrl } from '../baseApi';

const baseURL = baseApiUrl + "/customer/";


export function getCustomers() {
    return fetch(baseURL)
        .then(handleResponse)
        .catch(handleError)
}


export function deleteCustomer(id) {
    return fetch(baseURL + id, {
        method: 'DELETE'
    })
}

export function saveCustomer(customer) {
    return fetch(baseURL + (customer.id || ""), {
        method: customer.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(handleResponse)
        .catch(handleError);
}


export function editCustomer(customer) {
    return fetch(baseURL + customer.id)
        .then(handleResponse)
        .catch(handleError)
}