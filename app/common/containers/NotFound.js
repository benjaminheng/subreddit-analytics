import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='not-found'>
                <div className='not-found-title'>404</div>
                <div className='not-found-subtitle'>
                    Page not found
                </div>
                <p className='not-found-description'>
                    Sorry! This page doesn't exist.
                </p>
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(NotFound);
