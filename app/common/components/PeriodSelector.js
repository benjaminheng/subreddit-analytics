import React, { Component, PropTypes } from 'react';

export default class PeriodSelector extends Component {
    render() {
        // TODO: onClick: add period, fetch stats, select period
        return (
            <div>
                <span>
                    <a href='#'>1 day</a>
                </span>
                <span>
                    <a href='#'>1 week</a>
                </span>
                <span>
                    <a href='#'>1 month</a>
                </span>
                <span>
                    <a href='#'>6 months</a>
                </span>
                <span>
                    <a href='#'>1 year</a>
                </span>
            </div>
        );
    }
}
