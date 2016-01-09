import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { count, name } = this.props;
        return (
            <div className='counter'>
                <div className='counter-label'>{name}</div>
                <div className='counter-count'>{count}</div>
            </div>
        );
    }
}

Counter.propTypes = {
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}
