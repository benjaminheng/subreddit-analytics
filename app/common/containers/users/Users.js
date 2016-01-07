import React, { Component } from 'react';
import { connect } from 'react-redux';

class Users extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>USERS SEARCH</span>
                {this.props.children}
            </div>
        );
    }
}

function select(state) {
    return state;
}
export default connect(select)(Users);
