import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <p>
                    Total submissions: {this.props.totals.submissions}
                    {', '}
                    Total comments: {this.props.totals.comments}
                    {', '}
                    Stats collected since: {this.props.dateSince}
                </p>
            </div>
        );
    }
}

Footer.propTypes = {
    totals: PropTypes.shape({
        submissions: PropTypes.number,
        comments: PropTypes.number
    }).isRequired,
    dateSince: PropTypes.string.isRequired
}