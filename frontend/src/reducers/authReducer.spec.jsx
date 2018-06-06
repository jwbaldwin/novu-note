import reducer from './authReducer';
import * as types from '../actions/types';

const initialMockState = {
    isLoading: false,
    isLoggedIn: false,
    token: '',
    user: null
}

describe('authReducer: default case', () => {

    it('should return initial state given no action', () => {
        expect(reducer(undefined, {})).toEqual(initialMockState)
    })
})

describe('authReducer: logging in user', () => {

    it('should handle LOGIN_REQUEST by changing isLoading to true', () => {
        expect(reducer(undefined, { type: types.LOGIN_REQUEST })).toEqual({
            ...initialMockState,
            isLoading: true
        })
    })

    it('should handle LOGIN_REQUEST_SUCCESS by changing isLoading to false and populating state', () => {
        expect(reducer(undefined,
            {
                type: types.LOGIN_REQUEST_SUCCESS,
                payload: {token: 'SUPERSECURETESTTOKEN', user: {first: 'billy', last: 'bob'}}
            })).toEqual({
                ...initialMockState,
                isLoading: false,
                isLoggedIn: true,
                token: 'SUPERSECURETESTTOKEN',
                user: {first: 'billy', last: 'bob'}
            })
    })

    it('should handle LOGIN_REQUEST_ERROR by changing isLoading to true', () => {
        expect(reducer(undefined, { type: types.LOGIN_REQUEST_ERROR })).toEqual({
            ...initialMockState,
            isLoading: false
        })
    })

})

describe('authReducer: registering user', () => {

    it('should handle REGISTER_REQUEST by changing isLoading to true', () => {
        expect(reducer(undefined, { type: types.REGISTER_REQUEST })).toEqual({
            ...initialMockState,
            isLoading: true
        })
    })

    // it('should handle REGISTER_REQUEST_SUCCESS by changing isLoading to false and populating state', () => {
    //     expect(reducer(undefined,
    //         {
    //             type: types.REGISTER_REQUEST_SUCCESS,
    //             payload: {token: 'SUPERSECURETESTTOKEN', user: {first: 'billy', last: 'bob'}}
    //         })).toEqual({
    //             ...initialMockState,
    //             isLoading: false,
    //             isLoggedIn: true,
    //             token: 'SUPERSECURETESTTOKEN',
    //             user: {first: 'billy', last: 'bob'}
    //         })
    // })

    it('should handle REGISTER_REQUEST_ERROR by changing isLoading to true', () => {
        expect(reducer(undefined, { type: types.REGISTER_REQUEST_ERROR })).toEqual({
            ...initialMockState,
            isLoading: false
        })
    })
})
