import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './login/Login';
import Register from './register/Register';
import Home from './home/Home';

// Mockup for local storage of jwt
class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  };
  
  global.localStorage = new LocalStorageMock;

test('the app renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});

it('loads the login page', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});

it('loads the register page', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});

//TODO: Add in tests for all actions 
