import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class UserIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>USER INDEX</div>
                <Link to='/user/example_username'>/user/example_username</Link>
            </div>
        );
    }
}

function select(state) {
    return state;
}
export default connect(select)(UserIndex);
