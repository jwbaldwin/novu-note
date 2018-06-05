import {FETCH_NOTES, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE} from './types';

const URL = 'http://localhost:8000';

export const fetchNotes = () => dispatch => {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + localStorage.getItem('token'));

    fetch(`${URL}/api/notes/`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(notes =>
            dispatch({
                type: FETCH_NOTES,
                payload: notes
            })
        );
};

export const addNote = (noteData) => dispatch => {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + localStorage.getItem('token'));

    fetch(`${URL}/api/notes/`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(noteData)
        })
        .then(response => response.json())
        .then(note =>
            dispatch({
                type: ADD_NOTE,
                payload: note
            })
        );
};