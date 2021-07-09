/**
 * @author Cesar Verduzco Reyna <cesar11augusto95@hotmail.com> 
 * @description helper component where its the fake auth function and retrieve all the data input by the final user
 * @version 1.0
 * * Version description:
 * v1.0 Created functions
 * Documentation about some funtions of the router: https://reactrouter.com/
 * @date Created at 16/06/2021 Last Modified at 17/06/2021 
 * @status In Used
*/

/**
 * imports sections
 */

import React, { useContext, createContext, useState } from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";


/**
 * creating a fake authentification this will be change if we have where to get data of the previous user register
 * in this case we create this to private the route dashboard in case the final user doesn't no give any info about himself
 */
const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };
  
  /** For more details on
   * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
   * refer to: https://usehooks.com/useAuth/
   */
const authContext = createContext();

/**
 * ProvideAuth
 * @param {*} param0 
 * @returns authContext.provider to get the data of the auth 
 */
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
    );
}

/**
 * 
 * @returns useContext of the auth user
 */
export const useAuth= () => {
    return useContext(authContext);
}

/**
 * Getting the info of the user put it in the welcome component and creating a sing up with these info and log
 * @returns the info of the user
 */
function useProvideAuth() {
  const [user, setUser] = useState();

  const signin = (cb,name,lastname,email,phone) => {
    return fakeAuth.signin(() => {
      setUser(
        {
          name : name,
          lastname: lastname,
          email : email,
          phone : phone
        }
      );
      cb();
    });
  };
  
  return {
    user,
    signin
  };
}
  
  
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/welcome",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

/**
 * handling the inputs of the form from the welcome page, setting the value when it changes it
 * @param {*} initialValue 
 * @returns 
 */
export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    return {
      value,
      setValue,
      bind: {
        value,
        onChange: event => {
          setValue(event.target.value);
        }
      }
    };
};