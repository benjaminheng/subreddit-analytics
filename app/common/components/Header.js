import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <div className='header-wrapper'>
                <div className='header'>
                    <div className='title'>
                        <Link to='/'>Subreddit Analytics</Link>
                    </div>
                    <div className='subtitle'>
                        Stats for <span className='subreddit'>/r/Singapore</span>
                    </div>
                </div>
                <div className='navbar'>
                    <ul>
                        <li>
                            <IndexLink to='/' activeClassName='active'>Home</IndexLink>
                        </li>
                        <li>
                            <Link to='/users' activeClassName='active'>User Stats</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
