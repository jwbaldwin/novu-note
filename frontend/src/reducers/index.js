import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import authReducer from './authReducer';

export default combineReducers({
    notes: noteReducer,
    auth: authReducer
});