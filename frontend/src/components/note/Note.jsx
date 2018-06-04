import React, { Component } from 'react'

class Note extends Component {

    render() {

        return (
            <div key={this.props.id}>
                <p>{this.props.text}</p>
                <p>{this.props.category_tags}</p>
                <hr />
            </div>
        )
    }
}


export default (Note);
