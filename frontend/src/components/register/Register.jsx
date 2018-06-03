import React, { Component } from 'react';
import ColorLogo from '../../images/color-logo@3x.png';
import './Register.css';
import { register } from '../../services/auth';

export default class Register extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          password: "",
          passwordConfirmation: "",
          email: ""
        };
      }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()

        try {
            let params= [
                this.state.email,
                this.state.password
            ]
            register(params);
        }
        catch(e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div className="container">
                <form className="form-register" onSubmit={this.handleSubmit}>
                    <div className="logo">
                        <img src={ColorLogo} alt="logo" />
                    </div>
                    <h1 className="form-signin-heading">NovuNote</h1>

                    <input type="text" className="form-control" id="email" placeholder="Email Address" autoComplete="email" autoFocus 
                        value={this.state.email} onChange={this.handleChange} />
                    <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="current-password" 
                        value={this.state.password} onChange={this.handleChange} />

                    <button className="btn btn-lg btn-success btn-block" type="submit" disabled={!this.validateForm()}>Sign Up!</button>
                </form>
                <p className="text-center sign-up"><strong>Sign up</strong> for a new account</p>
            </div>
        );
    }
}