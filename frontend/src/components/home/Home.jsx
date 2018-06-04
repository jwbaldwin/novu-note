import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/Header';
import Note from '../note/Note';
import NoteForm from '../note/noteForm/NoteForm';
import { connect } from 'react-redux';
import { fetchNotes } from '../../actions/noteActions';

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  };
  
  global.localStorage = new LocalStorageMock;

class Home extends Component {
    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.props.fetchNotes();
        }
    }

    render() {

        const Notes = this.props.notes.map( note => 
            <Note key={note.id} text={note.text} category_tags={note.category_tags}></Note> )

        return (
            <div>
                <Header />
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <h1>Notes</h1>
                        {Notes}
                    </div>
                </div>
                <NoteForm />
            </div>
        );
    }
}

Home.propTypes = {
    fetchNotes: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notes: state.notes.items
})

export default connect(mapStateToProps, { fetchNotes })(Home);
