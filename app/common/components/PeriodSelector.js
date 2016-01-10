import React, { Component, PropTypes } from 'react';
import SinglePeriodItem from './SinglePeriodItem';
import date from '../utils/date';
import defaultPeriods from '../utils/defaultPeriods';

export default class PeriodSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onPeriodSelect, selectedPeriod } = this.props;
        return (
            <div className='period-selector'>
                {Object.keys(defaultPeriods).map(key => 
                    <SinglePeriodItem key={key} period={key} selected={key === selectedPeriod} start={defaultPeriods[key].start} end={defaultPeriods[key].end} clickHandler={onPeriodSelect} />
                )}
            </div>
        );
    }
}

PeriodSelector.propTypes = {
    selectedPeriod: PropTypes.string.isRequired,
    onPeriodSelect: PropTypes.func.isRequired
}
