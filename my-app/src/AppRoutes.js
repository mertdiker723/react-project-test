import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import HomePage from './view/home-page.js';
import CustomerPage from './view/customer/customer-page.js';
import NotFound from './view/not-found.js';
import CountryPage from './view/country/country-page.js';

function AppRoutes() {
    return (
        <div>
            <BrowserRouter>
                <App />
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={HomePage}
                    />
                    <Route
                        exact
                        path="/customer"
                        component={CustomerPage}
                    />
                    <Route
                        exact
                        path="/country"
                        component={CountryPage}
                    />
                    <Route
                        exact
                        component={NotFound}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    )
}


export default AppRoutes;