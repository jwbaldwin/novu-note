import React, { Component } from 'react';

class Content extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a>Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">Navbar</li>
                    </ol>
                    <h1>Navbar</h1>
                    <hr />
                    <p>This is the body of the whole app</p>
                </div>
            </div>
        );
    }
}

export default Content;
