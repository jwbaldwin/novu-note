import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './login/Login';
import Register from './register/Register';

test('the app renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
