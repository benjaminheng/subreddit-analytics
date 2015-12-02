import React, { Component, PropTypes } from 'react';
import date from '../utils/date';

export default class Footer extends Component {
    render() {
        const { globalStats } = this.props;
        return (
            <div className='footer'>
                <p>
                    {globalStats.get('submissions')} submissions
                    {', '}
                    {globalStats.get('comments')} comments
                    {', '}
                    Since: {date.pretty(globalStats.get('earliestDate'))}
                </p>
            </div>
        );
    }
}
