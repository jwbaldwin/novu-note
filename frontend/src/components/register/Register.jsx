import React, { Component } from 'react';
import ColorLogo from '../../images/color-logo@3x.png';
import './Register.css';
// import { handleErrors, getCookie } from '../../services/auth';
import { Link } from 'react-router-dom';

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
        // event.preventDefault()
        // const csrftoken = getCookie('csrftoken');

        // let userData = {
        //     "username": this.state.username,
        //     "password1": this.state.password,
        //     "password2": this.state.passwordConfirmation,
        //     "email": this.state.email
        // }

        // fetch('http://localhost:8000/rest-auth/registration/', {
        //     method: 'POST',
        //     body: JSON.stringify(userData),
        //     mode: 'cors',
        //     redirect: 'follow',
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //         'X-CSRFToken': csrftoken
        //     })
        // })
        //     .then(handleErrors)
        //     .then(response => response.json())
        //     .then(responseData => {
        //         localStorage.setItem('token', responseData['token']);
        //         this.props.history.push('/');
        //     })
        //     .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <form className="form-register" onSubmit={this.handleSubmit}>
                    <div className="logo">
                        <img src={ColorLogo} alt="logo" />
                    </div>
                    <h1 className="form-signin-heading">NovuNote</h1>
                    <h5 className="form-signin-heading text-muted">Register</h5>

                    <input type="text" className="form-control" id="email" placeholder="Email Address" autoComplete="email" autoFocus
                        value={this.state.email} onChange={this.handleChange} />

                    <input type="username" className="form-control" id="username" placeholder="Username" autoComplete="username"
                        value={this.state.username} onChange={this.handleChange} />

                    <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="current-password"
                        value={this.state.password} onChange={this.handleChange} />
                    <input type="password" className="form-control" id="passwordConfirmation" placeholder="Confirm Password" autoComplete="current-password"
                        value={this.state.passwordConfirmation} onChange={this.handleChange} />

                    <button className="btn btn-lg btn-success btn-block" type="submit" disabled={!this.validateForm()}>Sign Up</button>
                </form>
                <p className="text-center sign-up">Already have an account? <Link to='/login'><strong>Login!</strong></Link></p>
            </div>
        );
    }
}