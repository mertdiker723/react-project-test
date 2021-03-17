import { Types } from '../../actions/country-action/action.type';
import initialState from './initial-reducer';

export function countryReducer(state = initialState.countries, action) {
    switch (action.type) {
        case Types.COUNTRY_READ_SUCCESS:
            return action.countries;
        case Types.COUNTRY_DELETE_SUCCESS:
            return state.filter(data => data.id !== action.country.id);
        case Types.COUNTRY_CREATE_SUCCESS:
            return [...state, { ...action.country }];
        case Types.COUNTRY_UPDATE_SUCCESS:
            return state.map(country =>
                country.id === action.country.id ? action.country : country
            );
        default:
            return state;
    }
}

export const oneCountryReducer = (state = { id: "", Name: "" }, action) => {
    switch (action.type) {
        case Types.COUNTRY_EDIT_SUCCESS:
            return action.country
        default:
            return state;
    }
}