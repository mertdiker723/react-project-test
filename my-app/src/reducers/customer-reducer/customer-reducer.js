import { Types } from '../../actions/customer-action/action-type';
import initialState from './initial-reducer';

export function customerReducer(state = initialState.customers, action) {
    switch (action.type) {
        case Types.CUSTOMER_READ_SUCCESS:
            return action.customers;
        case Types.CUSTOMER_CREATE_SUCCESS:
            return [...state, action.customer]
        case Types.CUSTOMER_DELETE_SUCCESS:
            return state.filter(customer => customer.id !== action.customer.id);
        case Types.CUSTOMER_UPDATE_SUCCESS:
            return state.map(customer => customer.id === action.customer.id ? action.customer : customer)
        default:
            return state;
    }
}
export const oneCustomerReducer = (state = { id: "", Name: "", Surname: "", Age: "", CountryId: "" }, action) => {
    switch (action.type) {
        case Types.CUSTOMER_EDIT_SUCCESS:
            return action.customer
        default:
            return state;
    }
}