import React, { Component, PropTypes } from 'react';
import date from '../utils/date';

export default class Footer extends Component {
    render() {
        const { globalStats } = this.props;
        return (
            <div className='footer'>
                <p>
                    <span>Collected </span>
                    <span className='highlight'>
                        {globalStats.get('submissions')} submissions
                    </span> 
                    <span> and </span>
                    <span className='highlight'>
                        {globalStats.get('comments')} comments
                    </span> 
                    <span> since </span>
                    <span className='highlight'>
                        {date.pretty(globalStats.get('earliestDate'))}
                    </span> 
                </p>
                <p>
                    <a href='https://github.com/benjaminheng/subreddit-analytics'>Source</a>
                </p>
            </div>
        );
    }
}
