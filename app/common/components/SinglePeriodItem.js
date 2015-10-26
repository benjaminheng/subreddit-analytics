import React, { Component, PropTypes } from 'react';

export default class SinglePeriodItem extends Component {
    render() {
        const { period } = this.props;
        return (
            <span>
                <a href='#' onClick={e => this.handleClick(e)}>{period}</a>
            </span>
        );
    }

    handleClick(e) {
        const { period, start, end } = this.props;
        e.preventDefault();
        this.props.clickHandler(period, start, end);
    }
}

SinglePeriodItem.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired
}
