import { combineReducers } from 'redux';
import notes from "./notes";


const neuroApp = combineReducers({
  notes,
})

export default neuroApp;