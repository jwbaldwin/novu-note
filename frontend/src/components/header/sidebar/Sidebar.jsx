import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {

    render() {
        return (
            <div>
                <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                        <a className="nav-link" >
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span className="nav-link-text">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                        <a className="nav-link" href="charts.html">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span className="nav-link-text">Charts</span>
                        </a>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Example Pages">
                        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseExamplePages" data-parent="#exampleAccordion">
                            <i className="fas fa-fw fa-file"></i>
                            <span className="nav-link-text">Example Pages</span>
                        </a>
                        <ul className="sidenav-second-level collapse" id="collapseExamplePages">
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                        </ul>
                    </li>
                    <a className="nav-link text-center" id="sidenavToggler">
                        <i className="fa fa-fw fa-3x fa-angle-left"></i>
                    </a>
                </ul>
            </div>
        );
    }
}

export default Sidebar;
