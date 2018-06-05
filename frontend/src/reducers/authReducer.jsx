import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../actions/types';

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false
}

export default function (state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}