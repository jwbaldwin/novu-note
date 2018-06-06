import React, { Component } from 'react';
import ProfileLink from './profileLink/ProfileLink';
import { Link } from "react-router-dom";
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-fw fa-envelope"></i>
                        <span className="d-lg-none">Messages
                            <span className="badge badge-pill badge-primary">12 New</span>
                        </span>
                        <span className="indicator text-primary d-none d-lg-block">
                            <i className="fa fa-fw fa-circle"></i>
                        </span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">New Messages:</h6>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" >
                            <strong>David Miller</strong>
                            <span className="small float-right text-muted">11:21 AM</span>
                            <div className="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item small" >View all messages</a>
                    </div>
                </li> */}
                {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-fw fa-bell"></i>
                        <span className="d-lg-none">Alerts
                            <span className="badge badge-pill badge-warning">6 New</span>
                        </span>
                        <span className="indicator text-warning d-none d-lg-block">
                            <i className="fa fa-fw fa-circle"></i>
                        </span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="alertsDropdown">
                        <h6 className="dropdown-header">New Alerts:</h6>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" >
                            <span className="text-success">
                                <strong>
                                    <i className="fa fa-long-arrow-alt-up fa-fw"></i>Status Update</strong>
                            </span>
                            <span className="small float-right text-muted">11:21 AM</span>
                            <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item small" >View all alerts</a>
                    </div>
                </li> */}
                {/* <li className="nav-item">
                    <form className="form-inline my-2 my-lg-0 mr-lg-2">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Search for..." />
                            <span className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                </li> */}
                <ProfileLink auth={this.props.auth} />
            </ul>
        );
    }
}

export default Navbar;