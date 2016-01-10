import React, { Component, PropTypes } from 'react';

export default class LoadingIndicator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='loading-indicator'>
                <span className='text'>
                    Fetching stats
                </span>
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        );
    }
}
