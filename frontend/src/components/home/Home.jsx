import React, { Component } from 'react';
import Header from '../header/Header';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <h1>Home</h1>
                        <hr />
                        <p>Welcome to the homepage</p>
                    </div>
                </div>
            </div>
        );
    }
}