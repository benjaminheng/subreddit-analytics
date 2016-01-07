import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <div>
                <h1>/r/Singapore Stats</h1>
                <Link to='/'>[SUBREDDIT]</Link>
                <Link to='/users'>[USERS]</Link>
            </div>
        );
    }
}
