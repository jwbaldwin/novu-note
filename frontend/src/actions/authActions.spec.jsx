import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from './types';
import * as actions from './authActions'
import fetchMock from 'fetch-mock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const URL = process.env.REACT_APP_API_URL;

var goodRequest = { "status" : 200 , "statusText" : "Success" };
var badRequest = { "status" : 401 , "statusText" : "Error" };

describe('authActions: login request', () => {

    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates LOGIN_REQUEST_SUCCESS when login was successful', () => {
        fetchMock.postOnce(`${URL}/rest-auth/login/`, {
            status: 200,
            body: goodRequest
        })

        const expectedActions = [
            { type: types.LOGIN_REQUEST },
            { type: types.LOGIN_REQUEST_SUCCESS, payload: goodRequest }
        ]
        const store = mockStore({ })

        return store.dispatch(actions.loginRequest()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates LOGIN_REQUEST_ERROR when login was unsuccessful', () => {
        fetchMock.postOnce(`${URL}/rest-auth/login/`, {
            status: 401,
            body: badRequest
        })

        const expectedActions = [
            { type: types.LOGIN_REQUEST },
            { type: types.LOGIN_REQUEST_ERROR, payload: badRequest }
        ]
        const store = mockStore({ })

        return store.dispatch(actions.loginRequest()).catch(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})

describe('authActions: register request', () => {

    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates REGISTER_REQUEST_SUCCESS when registration was successful', () => {
        fetchMock.postOnce(`${URL}/rest-auth/registration/`, {
            status: 201,
            body: goodRequest
        })

        const expectedActions = [
            { type: types.REGISTER_REQUEST },
            { type: types.REGISTER_REQUEST_SUCCESS, payload: goodRequest }
        ]
        const store = mockStore({ })

        return store.dispatch(actions.registerRequest()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates REGISTER_REQUEST_ERROR when registration was unsuccessful', () => {
        fetchMock.postOnce(`${URL}/rest-auth/registration/`, {
            status: 401,
            body: badRequest
        })

        const expectedActions = [
            { type: types.REGISTER_REQUEST },
            { type: types.REGISTER_REQUEST_ERROR, payload: badRequest }
        ]
        const store = mockStore({ })

        return store.dispatch(actions.registerRequest()).catch(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})
