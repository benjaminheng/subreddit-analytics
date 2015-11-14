import React, { Component, PropTypes } from 'react';
import SinglePeriodItem from './SinglePeriodItem';
import date from '../utils/date';

export default class PeriodSelector extends Component {
    constructor(props) {
        super(props);
        this.defaultPeriods = {
            '1 day': {
                start: date.minus(date.now(), 1, 'days'),
                end: date.now()
            },
            '1 week': {
                start: date.minus(date.now(), 7, 'days'),
                end: date.now()
            },
            '1 month': {
                start: date.minus(date.now(), 30, 'days'),
                end: date.now()
            }
        }
    }

    render() {
        // TODO: onClick: add period, fetch stats, select period
        const { onPeriodSelect } = this.props;
        return (
            <div>
                {Object.keys(this.defaultPeriods).map(key => 
                    <SinglePeriodItem key={key} period={key} start={this.defaultPeriods[key].start} end={this.defaultPeriods[key].end} clickHandler={onPeriodSelect} />
                )}
            </div>
        );
    }
}

PeriodSelector.propTypes = {
    selectedPeriod: PropTypes.string.isRequired,
    onPeriodSelect: PropTypes.func.isRequired
}
