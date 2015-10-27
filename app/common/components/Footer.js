import React, { Component, PropTypes } from 'react';

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
                    Since: {globalStats.get('earliestDate')}
                </p>
            </div>
        );
    }
}
