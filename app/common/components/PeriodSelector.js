import React, { Component, PropTypes } from 'react';
import SinglePeriodItem from './SinglePeriodItem';
import date from '../utils/date';
import defaultPeriods from '../utils/defaultPeriods';

export default class PeriodSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onPeriodSelect } = this.props;
        return (
            <div>
                {Object.keys(defaultPeriods).map(key => 
                    <SinglePeriodItem key={key} period={key} start={defaultPeriods[key].start} end={defaultPeriods[key].end} clickHandler={onPeriodSelect} />
                )}
            </div>
        );
    }
}

PeriodSelector.propTypes = {
    selectedPeriod: PropTypes.string.isRequired,
    onPeriodSelect: PropTypes.func.isRequired
}
