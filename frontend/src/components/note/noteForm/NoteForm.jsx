import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './NoteForm.css';
import { connect } from 'react-redux';
import { addNote } from '../../../actions/noteActions';

class NoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            category_tags: []
        };
    }

    // TODO: need to come back to this and redo the tags adition to make it nice
    handleChange = event => {
        if(event.target.id === 'category_tags'){
            this.setState({
                [event.target.id]: [...this.state.category_tags, event.target.value]
            });
        } else {
            this.setState({
                [event.target.id]: event.target.value
            });
        }
        console.log(this.state)
    }

    handleSubmit = event => {
        event.preventDefault()


        const noteData = {
            "text": this.state.text,
            "category_tags": this.state.category_tags
        }

        this.props.addNote(noteData);
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group" id="add-note-form">
                    <input type="text" className="form-control" id="text" onChange={this.handleChange} placeholder="Brilliant idea goes here..." />
                    <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="category_tags" onChange={this.handleChange}>
                        <option defaultValue>Choose...</option>
                        <option value="Django">Django</option>
                        <option value="React">React</option>
                        <option value="Redux">Redux</option>
                    </select>
                    <button type="submit" className="btn btn-warning" id="note-add-btn">Create</button>
                </div>
            </form>
        )
    }
}

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired
}

export default connect(null, { addNote })(NoteForm);
