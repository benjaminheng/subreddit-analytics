import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>USERNAME: {this.props.params.username}</span>
            </div>
        );
    }
}

function select(state) {
    return state;
}
export default connect(select)(UserIndex);
