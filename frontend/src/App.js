import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Note from "./components/Note";
import NotFound from "./components/NotFound";
import { createStore } from "redux";
import ponyApp from "./reducers";

let store = createStore(ponyApp);

class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Note} />
      <Route component={NotFound} />
    </Switch>
    </BrowserRouter>
  );
  }
}

export default App;
