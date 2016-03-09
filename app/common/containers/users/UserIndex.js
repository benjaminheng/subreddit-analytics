import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Card from '../../components/Card';

class UserIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

function select(state) {
    return state;
}
export default connect(select)(UserIndex);
