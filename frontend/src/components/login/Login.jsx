import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorLogo from '../../images/color-logo@3x.png';
import './Login.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoggedIn: false,
            username: '',
            password: ''
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


        let userCreds = {
            "username": this.state.username,
            "password": this.state.password
        }

        this.props.loginRequest(userCreds);
    }

    render() {
        if(this.props.isLoggedIn) {
            return <Redirect to='/'></Redirect>
        }

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

                    <button className="btn btn-lg btn-success btn-block" type="submit" disabled={!this.validateForm() || this.props.isLoading}>Log in</button>
                </form>
                <p className="text-center sign-up">Don't have an account? <Link to='/register'><strong>Sign up!</strong></Link></p>
            </div>
        );
    }
}

Login.propTypes = {
    loginRequest: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, { loginRequest })(Login);
