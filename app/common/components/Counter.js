import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { count, name } = this.props;
        return (
            <div>
                {name}: {count}
            </div>
        );
    }
}

Counter.propTypes = {
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}
