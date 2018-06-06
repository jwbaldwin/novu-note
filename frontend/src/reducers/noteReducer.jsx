import {
    FETCH_NOTES,
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_ERROR,
    ADD_NOTE,
    ADD_NOTE_SUCCESS,
    ADD_NOTE_ERROR,
    UPDATE_NOTE,
    UPDATE_NOTE_SUCCESS,
    UPDATE_NOTE_ERROR,
    DELETE_NOTE,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_ERROR
} from '../actions/types';

const initialState = {
    isLoading: false,
    items: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_NOTES:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_NOTES_SUCCESS:
            return {
                ...state,
                items: action.payload,
                isLoading: false
            };
        case FETCH_NOTES_ERROR:
            return {
                ...state,
                isLoading: false
            };
        case ADD_NOTE:
            return {
                ...state,
                isLoading: true
            };
        case ADD_NOTE_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
                isLoading: false
            };
        case ADD_NOTE_ERROR:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}