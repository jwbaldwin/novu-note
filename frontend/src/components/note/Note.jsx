import React, { Component } from 'react'

class Note extends Component {

    render() {
        return (
            <div className="card" key={this.props.id}>
                <div className="card-body">{this.props.text}</div>
                <div className="card-footer">{this.props.category_tags}</div>
            </div>
        )
    }
}


export default (Note);
