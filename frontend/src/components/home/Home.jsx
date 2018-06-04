import React, { Component } from 'react';
import Header from '../header/Header';

export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            notes:[]
        };
    }

    componentDidMount() {
        // const headers = new Headers();

        // headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', "JWT " + localStorage.getItem('token'));

        // fetch('http://localhost:8000/api/notes/', {
        //     method: 'GET',
        //     headers: headers,
        // })
        // .then( response => response.json())
        // .then( data => { this.setState({ notes: data }) }
        // );
    }
    
    render() {
        return (
            <div>
                <Header />
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <h1>Home</h1>
                        <hr />
                        {/* {this.state.notes.map((note, i) => <div key={i}> {note.text}, {note.creator}, {note.category_tags}, {note.id}</div>)} */}
                    </div>
                </div>
            </div>
        );
    }
}