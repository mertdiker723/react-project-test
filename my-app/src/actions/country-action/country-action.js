import { Types } from './action.type'
import * as countryApi from '../../api/country-api/country-api';

function loadCountriesSuccess(countries) {
    return { type: Types.COUNTRY_READ_SUCCESS, countries }
}

function createCountrySuccess(country) {
    return { type: Types.COUNTRY_CREATE_SUCCESS, country }
}

function updateCountrySuccess(country) {
    return { type: Types.COUNTRY_UPDATE_SUCCESS, country }
}

function deleteCountrySuccess(country) {
    return { type: Types.COUNTRY_DELETE_SUCCESS, country }
}

function editCountrySuccess(country) {
    return { type: Types.COUNTRY_EDIT_SUCCESS, country }
}

export function loadCountries() {
    return function (dispatch) {
        return countryApi.getCountries()
            .then(countries => {
                dispatch(loadCountriesSuccess(countries))
            })
            .catch(error => console.log("Error: ", error))
    }
}

export function createCountry(country) {
    return function (dispatch) {
        return countryApi.saveCountry(country)
            .then(country => {
                dispatch(createCountrySuccess(country))
            })
            .catch(error => console.log("Error: ", error));
    }
}

export function updateCountry(country) {
    return function (dispatch) {
        return countryApi.saveCountry(country)
            .then(country => {
                dispatch(updateCountrySuccess(country))
            })
            .catch(error => console.log("Error: ", error));
    }
}

export function deleteCountry(country) {
    return function (dispatch) {
        return countryApi.deleteCountry(country.id)
            .then(data => {
                dispatch(deleteCountrySuccess(country));
            })
            .catch(error => console.log("Error: ", error));
    }
}

export function editCountry(country) {
    return function (dispatch) {
        return countryApi.editCountry(country)
            .then(data => {
                dispatch(editCountrySuccess(data));
            })
            .catch(error => console.log("Error: ", error));
    }
}