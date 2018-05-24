import React, { Component } from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Note from "./components/Note";
import NotFound from "./components/NotFound";
import neuroApp from "./reducers";


let store = createStore(neuroApp, applyMiddleware(thunk));

class App extends Component {
  render() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Note} />
        <Route component={NotFound} />
      </Switch>
      </BrowserRouter>
    </Provider>
  );
  }
}

export default App;
