import React, { Component } from 'react';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';

class Header extends Component {
    render() {
        return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                    <a className="navbar-brand" >NovuNote</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <Navbar />
                        <Sidebar />
                    </div>
                </nav>
        );
    }
}

export default Header;