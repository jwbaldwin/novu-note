import React, { Component } from 'react';
import ColorLogo from '../../images/color-logo@3x.png';
import './Login.css';
import { login } from '../../services/auth';

export default class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          password: "",
          token: ""
        };
      }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()

        try {
            login(this.state.username, this.state.password);
        }
        catch(e) {
            console.error("error", e);
        }
    }

    render() {
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <div className="logo">
                        <img src={ColorLogo} alt="logo" />
                    </div>
                    <h1 className="form-signin-heading">NovuNote</h1>

                    <input type="text" className="form-control" id="username" placeholder="Username" autoComplete="username" autoFocus 
                        value={this.state.username} onChange={this.handleChange} />
                    <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="current-password" 
                        value={this.state.password} onChange={this.handleChange} />

                    <button className="btn btn-lg btn-success btn-block" type="submit" disabled={!this.validateForm()}>Log in</button>
                </form>
                <p className="text-center sign-up"><strong>Sign up</strong> for a new account</p>
            </div>
        );
    }
}