import React, { Component, PropTypes } from 'react';
import date from '../utils/date';

export default class Footer extends Component {
    render() {
        const { globalStats } = this.props;
        return (
            <div className='footer'>
                <div className='footer-container'>
                    <div className='site-info'>
                        <p>
                            <span className='item'>
                                <a href=''>About</a>
                            </span>
                            <span className='item'>
                                Built by <a href='http://hbenjamin.com/'>Benjamin Heng</a> (<a href='https://github.com/benjaminheng'>@benjaminheng</a>)
                            </span>
                            <span className='item'>
                                <a href='https://github.com/benjaminheng/subreddit-analytics'>Source code available</a>
                            </span>
                        </p>
                    </div>
                    <div className='stats-info'>
                        <p>
                            <span>Last post recorded at </span>
                            <span className='highlight'>
                                {date.pretty(globalStats.get('latestDate'), true)}
                            </span> 
                            <br/>
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
                    </div>
                </div>
            </div>
        );
    }
}
