import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_ERROR,
    REGISTER_REQUEST,
    REGISTER_REQUEST_SUCCESS,
    REGISTER_REQUEST_ERROR
} from './types';
import { getCookie } from '../services/auth';

const URL = process.env.REACT_APP_API_URL;
const csrftoken = getCookie('csrftoken');

export const loginRequest = (userCreds) => dispatch => {

    dispatch({ type: LOGIN_REQUEST })
    return fetch(`${URL}/rest-auth/login/`, {
        method: 'POST',
        body: JSON.stringify(userCreds),
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(responseData => {
                        dispatch({
                            type: LOGIN_REQUEST_SUCCESS,
                            payload: responseData
                        });
                    })
            } else {
                throw response.json();
            }
        })
        .catch(error => {
            dispatch({
                type: LOGIN_REQUEST_ERROR,
                payload: error
            })
        })
}

export const registerRequest = (userCreds) => dispatch => {

    dispatch({ type: REGISTER_REQUEST })
    return fetch(`${URL}/rest-auth/registration/`, {
        method: 'POST',
        body: JSON.stringify(userCreds),
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        })
    })
        .then(response => {
            if (response.status === 201) {
                return response.json()
                    .then(responseData => {
                        dispatch({
                            type: REGISTER_REQUEST_SUCCESS,
                            payload: responseData
                        });
                    })
            } else {
                throw response.json();
            }
        })
        .catch(error => {
            dispatch({
                type: REGISTER_REQUEST_ERROR,
                payload: error
            })
        })
}