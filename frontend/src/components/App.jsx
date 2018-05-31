import React, { Component } from 'react';
import './App.css';

import Header from "./header/Header";
import Content from './content/Content';
import Footer from "./footer/Footer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}

export default App;
