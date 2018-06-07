import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class ProfileLink extends Component {
    render() {
        if (!this.props.auth.isLoggedIn) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to='/login' >
                        <i className="fa fa-fw fa-sign-in-alt"></i>Login
                    </Link>
                </li>
            )
        }
        return (
            <li className="dropdown nav-item">
                <a className="dropdown-toggle nav-link" data-toggle="dropdown">
                    <i className="fas fa-fw fa-user-circle"></i> 
                    <strong>{this.props.auth.user.first_name} {this.props.auth.user.last_name}</strong>
                    &nbsp;({this.props.auth.user.username})
                </a >
                <div className="dropdown-menu">
                    <a className="dropdown-item"><i className="fas fa-fw fa-user"></i> Profile</a>
                    <a className="dropdown-item"><i className="fas fa-fw fa-cogs"></i> Admin Panel</a >
                    <div className="dropdown-divider"></div >
                    <a className="dropdown-item"><i className="fas fa-fw fa-sign-out-alt"></i> Logout</a >
                </div >
            </li >
        )
    }
}
