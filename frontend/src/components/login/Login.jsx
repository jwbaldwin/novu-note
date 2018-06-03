import React, { Component } from 'react';
import ColorLogo from '../../images/color-logo@3x.png';
import './Login.css';
import { handleErrors } from '../../services/auth';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoggedIn: false,
            username: "",
            password: ""
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


        let userData = {
            "username": this.state.username,
            "password": this.state.password
        }

        fetch('http://localhost:8000/rest-auth/login/', {
            method: 'POST',
            body: JSON.stringify(userData),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(handleErrors)
        .then(response => response.json())
        .then(responseData => {
            localStorage.setItem('token', responseData['token']);
            this.props.history.push('/');
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <div className="logo">
                        <img src={ColorLogo} alt="logo" />
                    </div>
                    <h1 className="form-signin-heading">NovuNote</h1>
                    <h5 className="form-signin-heading text-muted">Login</h5>

                    <input type="text" className="form-control" id="username" placeholder="Username" autoComplete="username" autoFocus 
                        value={this.state.username} onChange={this.handleChange} />
                    <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="on" 
                        value={this.state.password} onChange={this.handleChange} />

                    <button className="btn btn-lg btn-success btn-block" type="submit" disabled={!this.validateForm()}>Log in</button>
                </form>
                <p className="text-center sign-up">Don't have an account? <Link to='/register'><strong>Sign up!</strong></Link></p>
            </div>
        );
    }
}