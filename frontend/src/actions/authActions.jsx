import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from './types';
import { handleErrors } from '../../services/auth';

const URL = 'http://localhost:8000';

export const loginUser = (userCreds) => dispatch => {

    fetch(`${URL}/rest-auth/login/`, {
            method: 'POST',
            body: JSON.stringify(userCreds),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(handleErrors)
        .then(response => response.json())
        .then(responseData => 
            dispatch({
                type: 
            })
        )
        .catch(error => console.log(error));
}