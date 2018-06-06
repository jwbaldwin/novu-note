import reducer from './noteReducer';
import * as types from '../actions/types';

const initialMockState = {
    isLoading: false,
    items: []
}

describe('noteReducer: default case', () => {

    it('should return initial state given no action', () => {
        expect(reducer(undefined, {})).toEqual(initialMockState)
    })
})

describe('noteReducer: fetching of notes', () => {

    it('should handle FETCH_NOTES by changing isLoading to true', () => {
        expect(reducer(undefined, { type: types.FETCH_NOTES })).toEqual({
            ...initialMockState,
            isLoading: true
        })
    })

    it('should handle FETCH_NOTES_SUCCESS by changing isLoading to false and returning items', () => {
        expect(reducer(undefined, {
            type: types.FETCH_NOTES_SUCCESS,
            payload: [{ text: 'noteReducer should be tested', category_tags: ['jest'] }]
        })).toEqual({
            ...initialMockState,
            items: [{ text: 'noteReducer should be tested', category_tags: ['jest'] }],
            isLoading: false
        })
    })

    it('should handle FETCH_NOTES_ERROR by changing isLoading to true', () => {
        expect(reducer(undefined, { type: types.FETCH_NOTES_ERROR })).toEqual({
            ...initialMockState,
            isLoading: false
        })
    })
})

describe('noteReducer: adding a note', () => {

    it('should handle ADD_NOTE by changing loading to true', () => {
        expect(reducer(undefined, { type: types.ADD_NOTE })).toEqual({
            ...initialMockState,
            isLoading: true
        })
    })

    it('should handle ADD_NOTE_SUCCESS by changing isLoading to false and returning items plus new note', () => {
        expect(reducer(undefined, {
            type: types.ADD_NOTE_SUCCESS,
            payload: { text: 'noteReducer should be tested', category_tags: ['jest'] }
        })).toEqual({
            ...initialMockState,
            items: [{ text: 'noteReducer should be tested', category_tags: ['jest'] }],
            isLoading: false
        })
        // Now begin with one already in state and add another to check if it returns both
        expect(reducer({
            ...initialMockState,
            items: [{ text: 'noteReducer should be tested', category_tags: ['jest'] }]
        }, {
                type: types.ADD_NOTE_SUCCESS,
                payload: { text: 'noteReducer is tested', category_tags: ['redux'] }
            })).toEqual({
                items: [{ text: 'noteReducer should be tested', category_tags: ['jest'] }, { text: 'noteReducer is tested', category_tags: ['redux'] }],
                isLoading: false
            })
    })

    it('should handle ADD_NOTE_ERROR by changing iLoading to false', () => {
        expect(reducer(undefined, { type: types.ADD_NOTE_ERROR })).toEqual({
            ...initialMockState,
            isLoading: false
        })
    })
})