import { combineReducers } from "redux";
import { customerReducer, oneCustomerReducer } from './customer-reducer/customer-reducer';
import { countryReducer, oneCountryReducer } from './country-reducer/country-reducer';


const rootReducer = combineReducers({
    customerReducer,
    countryReducer,
    oneCountryReducer,
    oneCustomerReducer,
})

export default rootReducer;