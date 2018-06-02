import React, { Component } from 'react';
import ColorLogo from '../../images/color-logo@3x.png';
import './Login.css';

export default class Login extends Component {
    // constructor() {
    //     super();
    // }

    handleSubmit = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <div className="logo">
                        <img src={ColorLogo} alt="logo" />
                    </div>
                    <h1 className="form-signin-heading">NovuNote</h1>
                    <input type="text" className="form-control" name="username" placeholder="Email Address" required="" autoComplete="username" autoFocus="" ref="email" />
                    <input type="password" className="form-control" name="password" placeholder="Password" required="" autoComplete="current-password" ref="password" />

                    <button className="btn btn-lg btn-success btn-block" type="submit">Log in</button>
                </form>
                <p className="text-center sign-up"><strong>Sign up</strong> for a new account</p>
            </div>
        );
    }
}