import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>404!!</span>
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(NotFound);
