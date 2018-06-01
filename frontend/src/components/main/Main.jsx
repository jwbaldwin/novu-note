import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Register from '../register/Register';

export default class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </Switch>
        );
    }
}
