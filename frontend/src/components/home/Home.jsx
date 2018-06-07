import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';
import Header from '../header/Header';
import Note from '../note/Note';
import NoteForm from '../note/noteForm/NoteForm';
import { connect } from 'react-redux';
import { fetchNotes } from '../../actions/noteActions';

class Home extends Component {
    componentWillMount() {
        if (localStorage.getItem('token') && this.props.auth.isLoggedIn) {
            this.props.fetchNotes();
        }
    }

    render() {

        const Notes = this.props.notes.map( note => 
            <Note key={note.id} text={note.text} category_tags={note.category_tags}></Note> )
        
            if( !this.props.auth.isLoggedIn ){
            return (
            <div>
                <Header auth={this.props.auth}/>
                <div className="content-wrapper">
                    <div className="container-fluid">
                    <h6><Link to='/login'><strong>Login</strong></Link> or <Link to='/register'><strong>Sign up!</strong></Link></h6>
                    </div>
                </div>
            </div>
            );
        }

        return (
            <div>
                <Header auth={this.props.auth} />
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <h1>Notes</h1>
                        <div className="card-columns">{Notes}</div>
                    </div>
                </div>
                <NoteForm />
            </div>
        );
    }
}

Home.propTypes = {
    fetchNotes: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    notes: state.notes.items,
    auth: state.auth
})

export default connect(mapStateToProps, { fetchNotes })(Home);
