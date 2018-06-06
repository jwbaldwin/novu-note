import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_ERROR,
    REGISTER_REQUEST,
    REGISTER_REQUEST_SUCCESS,
    REGISTER_REQUEST_ERROR
} from '../actions/types';

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    token: localStorage.getItem('token'),
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { 
                ...state,
                isLoading: true
            }
        case LOGIN_REQUEST_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return { 
                ...state,
                isLoading: false,
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload.user
            }
        case LOGIN_REQUEST_ERROR:
            return { 
                ...state,
                isLoading: false
            }
        case REGISTER_REQUEST:
            return { 
                ...state,
                isLoading: true
            }
        case REGISTER_REQUEST_SUCCESS:
            return { 
                ...state,
                isLoading: false
            }
        case REGISTER_REQUEST_ERROR:
            return { 
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}