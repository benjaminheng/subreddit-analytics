import React, { Component, PropTypes } from 'react';

export default class SinglePeriodItem extends Component {
    handleClick(e) {
        const { period, start, end } = this.props;
        e.preventDefault();
        this.props.clickHandler(period, start, end);
    }

    render() {
        const { period } = this.props;
        let className = 'default-button';
        if (this.props.selected) {
            className += ' selected';
        }

        return (
            <button className={className} onClick={e => this.handleClick(e)}>
                {period}
            </button>
        );
    }
}

SinglePeriodItem.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    period: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    selected: PropTypes.bool
}

SinglePeriodItem.defaultProps = {
    selected: false
}
