/**
 * @author Cesar Verduzco Reyna <cesar11augusto95@hotmail.com> 
 * @description Component to manage the router. There are 2 routes in this component which are Welcome and Dashboard
 * Path of the different routes: Welcome /welcome,  Dashboard /dashboard and every different path will redirect to Dashboard, but if there is no
 * data of the user will redirect to welcome
 * @version 1.0
 * * Version description:
 * v1.0 Created Component and created routes
 * @date Created at 16/06/2021 Last Modified at 17/06/2021 
 * @status In Used
*/

/**
 * Imports 
 * React
 * Router Dom, documentation https://reactrouter.com/
 * Imports the 2 components of the project and also importing some function helpers to have a fake login and get a privated route,
 * in this case the private route will be the dashboard
*/

import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from "react-router-dom";
import Welcome from "../../pages/Welcome";
import Dashboard from "../../pages/Dashboard";
import Profile from "../../pages/Profile";
import {ProvideAuth, PrivateRoute} from '../../helpers/Helpers';
import LayoutAuth from "../../layout/LayoutAuth";


export default function RouteComponent(){
    return(
        <ProvideAuth>
            <Router>
                <Switch>
                    <Route path="/welcome">
                        <Welcome />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <LayoutAuth>
                            <Dashboard />
                        </LayoutAuth>
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                        <LayoutAuth>
                            <Profile />
                        </LayoutAuth>
                    </PrivateRoute>
                    <Route path="*">
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                        }}
                    />
                    </Route>
                </Switch>
            </Router>
        </ProvideAuth>
    );
}
