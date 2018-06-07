import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorLogo from '../../images/color-logo@3x.png';
import './Register.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerRequest } from '../../actions/authActions';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            email: ''
        };
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
            "password1": this.state.password,
            "password2": this.state.passwordConfirmation,
            "email": this.state.email
        }

        this.props.registerRequest(userCreds);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoggedIn){
            this.props.history.push('/')
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
                    <h5 className="form-signin-heading text-muted">Register</h5>

                    <input type="text" className="form-control" id="email" placeholder="Email Address" autoComplete="email" autoFocus
                        value={this.state.email} onChange={this.handleChange} />

                    <input type="username" className="form-control" id="username" placeholder="Username" autoComplete="username"
                        value={this.state.username} onChange={this.handleChange} />

                    <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="current-password"
                        value={this.state.password} onChange={this.handleChange} />
                    <input type="password" className="form-control" id="passwordConfirmation" placeholder="Confirm Password" autoComplete="current-password"
                        value={this.state.passwordConfirmation} onChange={this.handleChange} />

                    <button className="btn btn-lg btn-success btn-block" type="submit" disabled={this.props.isLoading}>Sign Up</button>
                </form>
                <p className="text-center sign-up">Already have an account? <Link to='/login'><strong>Login!</strong></Link></p>
            </div>
        );
    }
}

Register.propTypes = {
    registerRequest: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, { registerRequest })(Register);
