import { Types } from './action-type';
import * as customerApi from '../../api/customer-api/customer-api.js';

export function loadCustomerSuccess(customers) {
    return { type: Types.CUSTOMER_READ_SUCCESS, customers }
}
export function createCustomerSuccess(customer) {
    return { type: Types.CUSTOMER_CREATE_SUCCESS, customer }
}

export function deleteCustomerSuccess(customer) {
    return { type: Types.CUSTOMER_DELETE_SUCCESS, customer }
}

export function updateCustomerSuccess(customer) {
    return { type: Types.CUSTOMER_UPDATE_SUCCESS, customer }
}

export function editCustomerSuccess(customer) {
    return { type: Types.CUSTOMER_EDIT_SUCCESS, customer }
}
export function loadCustomers() {
    return function (dispatch) {
        return customerApi.getCustomers()
            .then(customers => {
                dispatch(loadCustomerSuccess(customers));
            })
            .catch(error => console.log(error));
    }
}

export function createCustomer(customer) {
    return function (dispatch) {
        return customerApi.saveCustomer(customer)
            .then(customer => {
                dispatch(createCustomerSuccess(customer));
            })
            .catch(error => console.log(error));
    }
}

export function deleteCustomer(customer) {
    return function (dispatch) {
        return customerApi.deleteCustomer(customer.id)
            .then(data => {
                dispatch(deleteCustomerSuccess(customer))
            })
            .catch(error => console.log(error));
    }
}

export function editCustomer(customer) {
    return function (dispatch) {
        return customerApi.editCustomer(customer)
            .then(customer => {
                dispatch(editCustomerSuccess(customer))
            })
            .catch(error => console.log(error))
    }
}

export function updateCustomer(customer) {
    return function (dispatch) {
        return customerApi.saveCustomer(customer)
            .then(customer => {
                dispatch(updateCustomerSuccess(customer))
            })
            .catch(error => console.log(error))
    }
}