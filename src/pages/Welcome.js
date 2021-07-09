/**
 * @author Cesar Verduzco Reyna <cesar11augusto95@hotmail.com> 
 * @description Component to manage the data of the user after get all the data info
 * Path of the different routes: /welcome 
 * @version 1.0
 * * Version description:
 * v1.0 Created Component and created routes
 * @date Created at 16/06/2021 Last Modified at 16/06/2021 
 * @status In Used
 */


/**
 * imports sections
 */
import React from 'react';
import {
    useHistory,
    useLocation,
} from 'react-router-dom';
import { useAuth, useInput } from '../helpers/Helpers';
import Logo from '../components/Logo';
import InputText from '../components/InputText';

export default function Welcome(){

    /**}
     * creating the const that we're gonna use in the component
     */
    const history = useHistory();
    const location = useLocation();
    //Getting the useAuth to get the signin fake function
    const auth = useAuth();
    /**
     * Creating all the inputs that we're gonna ask to the final user
     */
    const {value:firstName, bind: bindFirstName} = useInput('');
    const {value:lastName, bind: bindLastName} = useInput('');
    const {value:emailInput, bind: bindEmailInput} = useInput('');
    const {value:phoneInput, bind: bindPhoneInput} = useInput('');

    /** sending the info to the login and redirect to the dashboard */
    const { from } = location.state || { from: { pathname: "/" } };
    const login = (evt) => {
        evt.preventDefault();
        //simply validation
        if(firstName === '' || lastName === '' || emailInput === '' || phoneInput === '')
        {return alert('Please fill all the fields.')}else{
            auth.signin(() => {
            history.replace(from);
            },firstName,lastName,emailInput,phoneInput);
        }
    };
    
    return(<>
        <div className="bg-overlay"></div>
        <div className="container d-flex justify-content-center align-items-center">
            <form className="p-2" onSubmit={login}>
                <div className="text-center">
                    <h3>
                        Welcome to
                    </h3>
                    <Logo />
                </div>
                <div className="d-flex">
                    <InputText name="name" label="First Name" bind={bindFirstName} />
                    <InputText name="lastName" label="Last Name" bind={bindLastName} />
                </div>
                <InputText name="emailInput" label="Email" bind={bindEmailInput} />
                <InputText name="phoneInput" label="Phone" bind={bindPhoneInput} />
                <div className="text-right">
                    <input className="m-1" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    </>)
}

