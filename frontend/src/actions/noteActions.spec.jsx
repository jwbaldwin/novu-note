import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from './types';
import * as actions from './noteActions'
import fetchMock from 'fetch-mock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const URL = process.env.REACT_APP_API_URL;

describe('noteActions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })
    
    it('creates FETCH_NOTES_SUCCESS when fetching notes has been done', () => {
        fetchMock.getOnce(`${URL}/api/notes/`, {
                items: [{text: 'testing something', category_tags:['django']}]
            })

        const expectedActions = [
            { type: types.FETCH_NOTES },
            { type: types.FETCH_NOTES_SUCCESS, payload: { items: [{text: 'testing something', category_tags:['django']}] } }
        ]
        const store = mockStore({ items: [] })

        return store.dispatch(actions.fetchNotes()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates ADD_NOTE_SUCCESS when fetching notes has been done', () => {
        fetchMock.postOnce(`${URL}/api/notes/`, {
            item: [{text: 'adding this test', category_tags:['jest']}]
        })

        const expectedActions = [
            { type: types.ADD_NOTE },
            { type: types.ADD_NOTE_SUCCESS, payload: { item: [{text: 'adding this test', category_tags:['jest']}] } }
        ]
        const store = mockStore({ items: [] })

        return store.dispatch(actions.addNote()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})
