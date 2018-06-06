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
} from './types';

const URL = 'http://localhost:8000';

export const fetchNotes = () => dispatch => {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + localStorage.getItem('token'));

    dispatch({ type: FETCH_NOTES })
    return fetch(`${URL}/api/notes/`, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(notes => {
            dispatch({
                type: FETCH_NOTES_SUCCESS,
                payload: notes
            })
        }
        )
        .catch(err => {
            dispatch({
                type: FETCH_NOTES_ERROR,
                payload: err
            })
        });
};

export const addNote = (noteData) => dispatch => {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + localStorage.getItem('token'));

    dispatch({ type: ADD_NOTE })
    return fetch(`${URL}/api/notes/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(noteData)
    })
        .then(response => response.json())
        .then(note =>
            dispatch({
                type: ADD_NOTE_SUCCESS,
                payload: note
            })
        )
        .catch(err => {
            dispatch({
                type: ADD_NOTE_ERROR,
                payload: err
            })
        });
};