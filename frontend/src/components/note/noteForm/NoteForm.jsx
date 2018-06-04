import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './NoteForm.css';
import { connect } from 'react-redux';
import { addNote } from '../../../actions/noteActions';

class NoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()


        const noteData = {
            "text": this.state.text,
            "category_tags": ["redux"]
        }

        this.props.addNote(noteData);
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group" id="add-note-form">
                    <input type="text" className="form-control" id="text" onChange={this.handleChange} placeholder="Brilliant idea goes here..." />
                    <button type="submit" className="btn btn-warning" id="note-add-btn">Create</button>
                </div>
            </form>
        )
    }
}

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired
}

export default connect(null, {addNote})(NoteForm);
