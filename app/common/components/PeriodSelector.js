import React, { Component, PropTypes } from 'react';
import SinglePeriodItem from './SinglePeriodItem';

export default class PeriodSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // TODO: onClick: add period, fetch stats, select period
        const { onPeriodSelect } = this.props;
        return (
            <div>
                <SinglePeriodItem period='1 day' start={128} end={256} clickHandler={onPeriodSelect} />
                <SinglePeriodItem period='1 week' start={128} end={1024} clickHandler={onPeriodSelect} />
                <SinglePeriodItem period='1 month' start={128} end={4096} clickHandler={onPeriodSelect} />
            </div>
        );
    }
}

PeriodSelector.propTypes = {
    selectedPeriod: PropTypes.string.isRequired,
    onPeriodSelect: PropTypes.func.isRequired
}
